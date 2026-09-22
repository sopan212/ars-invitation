import PocketBase from 'pocketbase';
import { getTemplate } from '@/lib/templates';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

const pb = new PocketBase('http://100.74.92.59:8090');
pb.autoCancellation(false);

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const { id } = await params;
    const event = await pb.collection('events').getOne(id);
    return {
      title: `${event.title} - Undangan Digital`,
      description: `Undangan pernikahan ${event.groom_name} & ${event.bride_name}`,
    };
  } catch {
    return { title: 'Undangan Digital' };
  }
}

export default async function UndanganPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const event = await pb.collection('events').getOne(id);
    const template = getTemplate(event.template_id || 'classic-elegant');
    
    if (!template) return notFound();

    const eventDate = event.event_date ? new Date(event.event_date) : null;
    const formattedDate = eventDate ? eventDate.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : '';

    const pbUrl = 'http://100.74.92.59:8090';
    const photoBg = event.photo_bg ? `${pbUrl}/api/files/${event.collectionId}/${event.id}/${event.photo_bg}` : '';
    const gallery: string[] = Array.isArray(event.gallery)
      ? event.gallery.map((f: string) => `${pbUrl}/api/files/${event.collectionId}/${event.id}/${f}`)
      : [];

    return (
      <div 
        className="min-h-screen flex flex-col"
        style={{ 
          backgroundColor: template.colors.background,
          color: template.colors.text,
          fontFamily: template.fonts.body + ', system-ui, sans-serif'
        }}
      >
        {/* Hero / Cover Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center">
          {/* Background photo */}
          {photoBg ? (
            <>
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${photoBg})` }} />
              <div className="absolute inset-0" style={{ backgroundColor: template.colors.background + 'CC' }} />
            </>
          ) : (
            <div className="absolute inset-0 opacity-10" style={{ 
              backgroundImage: `radial-gradient(circle at 50% 50%, ${template.colors.accent} 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }} />
          )}
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <p className="text-sm tracking-[0.3em] uppercase opacity-70">The Wedding Of</p>
            
            <h1 
              className="text-4xl md:text-6xl font-bold leading-tight"
              style={{ fontFamily: template.fonts.heading + ', serif' }}
            >
              {event.groom_name}
              <span className="block my-2 text-2xl opacity-60">&</span>
              {event.bride_name}
            </h1>

            <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: template.colors.accent }} />

            <p className="text-lg opacity-80">{formattedDate}</p>
            <p className="text-sm opacity-60">{event.location}</p>

            <div className="pt-8">
              <a 
                href="#detail" 
                className="inline-block px-8 py-3 rounded-full text-sm font-bold transition hover:scale-105"
                style={{ backgroundColor: template.colors.accent, color: template.colors.background }}
              >
                💍 Buka Undangan
              </a>
            </div>
          </div>
        </section>

        {/* Couple Details */}
        <section id="detail" className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center space-y-12">
            {/* Quote */}
            {event.quote && (
              <blockquote className="text-lg italic opacity-80 leading-relaxed max-w-xl mx-auto border-l-4 pl-6" style={{ borderColor: template.colors.accent }}>
                &ldquo;{event.quote}&rdquo;
              </blockquote>
            )}

            {/* Groom */}
            <div className="space-y-3">
              <p className="text-sm tracking-widest uppercase opacity-60">Mempelai Pria</p>
              <h2 className="text-3xl font-bold" style={{ fontFamily: template.fonts.heading + ', serif' }}>
                {event.groom_name}
              </h2>
              <p className="text-sm opacity-70">{event.groom_parents}</p>
            </div>

            <div className="text-4xl opacity-40">💕</div>

            {/* Bride */}
            <div className="space-y-3">
              <p className="text-sm tracking-widest uppercase opacity-60">Mempelai Wanita</p>
              <h2 className="text-3xl font-bold" style={{ fontFamily: template.fonts.heading + ', serif' }}>
                {event.bride_name}
              </h2>
              <p className="text-sm opacity-70">{event.bride_parents}</p>
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        {gallery.length > 0 && (
          <section className="py-20 px-6">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-center tracking-widest uppercase mb-10" style={{ color: template.colors.accent }}>
                Galeri Kami
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {gallery.map((src, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-2xl overflow-hidden border shadow-sm transition hover:scale-105"
                    style={{ borderColor: template.colors.accent + '30' }}
                  >
                    <img
                      src={src}
                      alt={`Galeri ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Event Details */}
        <section className="py-20 px-6" style={{ backgroundColor: template.colors.secondary + '15' }}>
          <div className="max-w-3xl mx-auto text-center space-y-12">
            <h3 className="text-2xl font-bold tracking-widest uppercase" style={{ color: template.colors.accent }}>
              Jadwal Acara
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Akad */}
              <div className="p-8 rounded-2xl border space-y-4" style={{ borderColor: template.colors.accent + '30' }}>
                <p className="text-sm tracking-widest uppercase opacity-60">Akad Nikah</p>
                <p className="text-2xl font-bold">{event.akad_time || '08:00 WIB'}</p>
                <p className="text-sm opacity-80">{formattedDate}</p>
              </div>

              {/* Resepsi */}
              <div className="p-8 rounded-2xl border space-y-4" style={{ borderColor: template.colors.accent + '30' }}>
                <p className="text-sm tracking-widest uppercase opacity-60">Resepsi</p>
                <p className="text-2xl font-bold">{event.resepsi_time || '11:00 WIB'}</p>
                <p className="text-sm opacity-80">{formattedDate}</p>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4 pt-8">
              <p className="text-sm tracking-widest uppercase opacity-60">Lokasi</p>
              <h4 className="text-xl font-bold">{event.location}</h4>
              <p className="text-sm opacity-70 max-w-md mx-auto">{event.address_detail}</p>
              
              {event.maps_url && (
                <a 
                  href={event.maps_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-2.5 rounded-full text-sm font-bold border transition hover:scale-105"
                  style={{ borderColor: template.colors.accent, color: template.colors.accent }}
                >
                  🗺️ Buka Google Maps
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Gift Section */}
        {(event.bank_name || event.bank_account) && (
          <section className="py-20 px-6">
            <div className="max-w-md mx-auto text-center space-y-6">
              <h3 className="text-2xl font-bold tracking-widest uppercase" style={{ color: template.colors.accent }}>
                Amplop Digital
              </h3>
              <p className="text-sm opacity-70">
                Doa restu Anda merupakan karunia yang sangat berarti bagi kami. 
                Namun jika memberi adalah ungkapan tanda kasih, kami dengan senang hati menerimanya.
              </p>
              <div className="p-6 rounded-2xl border space-y-3" style={{ borderColor: template.colors.accent + '30', backgroundColor: template.colors.secondary + '10' }}>
                <p className="text-lg font-bold">{event.bank_name}</p>
                <p className="text-2xl font-mono tracking-wider">{event.bank_account}</p>
                <p className="text-sm opacity-70">a.n. {event.bank_holder}</p>
              </div>
            </div>
          </section>
        )}

        {/* RSVP / Wishes Form */}
        {template.features.rsvp && (
          <section className="py-20 px-6" style={{ backgroundColor: template.colors.secondary + '15' }}>
            <div className="max-w-md mx-auto space-y-6">
              <h3 className="text-2xl font-bold text-center tracking-widest uppercase" style={{ color: template.colors.accent }}>
                Ucapan & Doa
              </h3>
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Nama Kamu" 
                  className="w-full p-3 rounded-xl border bg-transparent text-center"
                  style={{ borderColor: template.colors.accent + '40' }}
                />
                <select 
                  className="w-full p-3 rounded-xl border bg-transparent text-center"
                  style={{ borderColor: template.colors.accent + '40' }}
                >
                  <option>Konfirmasi Kehadiran</option>
                  <option>Hadir</option>
                  <option>Tidak Hadir</option>
                  <option>Belum Pasti</option>
                </select>
                <textarea 
                  placeholder="Tulis ucapan dan doa untuk mempelai..." 
                  rows={4}
                  className="w-full p-3 rounded-xl border bg-transparent text-center"
                  style={{ borderColor: template.colors.accent + '40' }}
                />
                <button 
                  type="submit"
                  className="w-full py-3 rounded-full font-bold transition hover:scale-105"
                  style={{ backgroundColor: template.colors.accent, color: template.colors.background }}
                >
                  💌 Kirim Ucapan
                </button>
              </form>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="py-12 px-6 text-center border-t" style={{ borderColor: template.colors.accent + '20' }}>
          <p className="text-xs opacity-50">
            Made with ❤️ by <span style={{ color: template.colors.accent }}>ARS.invitation</span>
          </p>
        </footer>
      </div>
    );
  } catch {
    return notFound();
  }
}
