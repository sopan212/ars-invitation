import { TemplateConfig } from '@/lib/templates';
import { Countdown } from './Countdown';
import { MusicPlayer } from './MusicPlayer';
import { RsvpForm } from './RsvpForm';
import { StoryTimeline } from './StoryTimeline';

export interface InvitationData {
  groom_name: string;
  groom_parents: string;
  bride_name: string;
  bride_parents: string;
  event_date?: string;
  akad_time?: string;
  resepsi_time?: string;
  location?: string;
  address_detail?: string;
  maps_url?: string;
  quote?: string;
  bank_name?: string;
  bank_account?: string;
  bank_holder?: string;
  photo_bg?: string;
  gallery?: string[];
  music_url?: string;
  music_track?: string;
  story_mood?: boolean;
}

function formatDate(iso?: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * View undangan lengkap. Dipakai oleh:
 * - /undangan/[id]  → data dari PocketBase
 * - /preview/[tpl]  → data contoh, supaya user lihat hasil jadi tiap template
 */
export function InvitationView({ event, template, eventId }: { event: InvitationData; template: TemplateConfig; eventId?: string }) {
  const formattedDate = formatDate(event.event_date);
  const c = template.colors;
  const f = template.fonts;

  return (
    <div
      className="min-h-full flex flex-col"
      style={{ backgroundColor: c.background, color: c.text, fontFamily: f.body + ', system-ui, sans-serif' }}
    >
      {/* Hero / Cover */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-6 py-20 text-center">
        {event.photo_bg ? (
          <>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${event.photo_bg})` }} />
            <div className="absolute inset-0" style={{ backgroundColor: c.background + 'CC' }} />
          </>
        ) : (
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, ${c.accent} 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
            }}
          />
        )}

        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <p className="text-sm tracking-[0.3em] uppercase opacity-70">The Wedding Of</p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight" style={{ fontFamily: f.heading + ', serif' }}>
            {event.groom_name}
            <span className="block my-2 text-2xl opacity-60">&</span>
            {event.bride_name}
          </h1>

          <div className="w-16 h-0.5 mx-auto" style={{ backgroundColor: c.accent }} />

          <p className="text-lg opacity-80">{formattedDate}</p>
          <p className="text-sm opacity-60">{event.location}</p>

          {/* Countdown, hanya jika template mendukung */}
          {template.features.countdown && event.event_date && (
            <div className="pt-6">
              <Countdown targetDate={event.event_date} accent={c.accent} />
            </div>
          )}

          <div className="pt-8">
            <a
              href="#detail"
              className="inline-block px-8 py-3 rounded-full text-sm font-bold transition hover:scale-105"
              style={{ backgroundColor: c.accent, color: c.background }}
            >
              💍 Buka Undangan
            </a>
          </div>
        </div>
      </section>

      {/* Couple Details */}
      <section id="detail" className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          {event.quote && (
            <blockquote
              className="text-lg italic opacity-80 leading-relaxed max-w-xl mx-auto border-l-4 pl-6 text-left"
              style={{ borderColor: c.accent }}
            >
              &ldquo;{event.quote}&rdquo;
            </blockquote>
          )}

          <div className="space-y-3">
            <p className="text-sm tracking-widest uppercase opacity-60">Mempelai Pria</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: f.heading + ', serif' }}>
              {event.groom_name}
            </h2>
            <p className="text-sm opacity-70">{event.groom_parents}</p>
          </div>

          <div className="text-4xl opacity-40">💕</div>

          <div className="space-y-3">
            <p className="text-sm tracking-widest uppercase opacity-60">Mempelai Wanita</p>
            <h2 className="text-3xl font-bold" style={{ fontFamily: f.heading + ', serif' }}>
              {event.bride_name}
            </h2>
            <p className="text-sm opacity-70">{event.bride_parents}</p>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {event.gallery && event.gallery.length > 0 && template.features.gallery && (
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-center tracking-widest uppercase mb-10" style={{ color: c.accent }}>
              Galeri Kami
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {event.gallery.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-2xl overflow-hidden border shadow-sm transition hover:scale-105"
                  style={{ borderColor: c.accent + '30' }}
                >
                  <img src={src} alt={`Galeri ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Story Timeline, premium only */}
      {template.story?.enabled && template.story.chapters.length > 0 && (
        <StoryTimeline
          chapters={template.story.chapters}
          accent={c.accent}
          headingFont={f.heading}
          brideName={event.bride_name}
          groomName={event.groom_name}
          weddingDate={formattedDate}
        />
      )}

      {/* Event Details */}
      <section className="py-20 px-6" style={{ backgroundColor: c.secondary + '15' }}>
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <h3 className="text-2xl font-bold tracking-widest uppercase" style={{ color: c.accent }}>
            Jadwal Acara
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border space-y-4" style={{ borderColor: c.accent + '30' }}>
              <p className="text-sm tracking-widest uppercase opacity-60">Akad Nikah</p>
              <p className="text-2xl font-bold">{event.akad_time || '08:00 WIB'}</p>
              <p className="text-sm opacity-80">{formattedDate}</p>
            </div>

            <div className="p-8 rounded-2xl border space-y-4" style={{ borderColor: c.accent + '30' }}>
              <p className="text-sm tracking-widest uppercase opacity-60">Resepsi</p>
              <p className="text-2xl font-bold">{event.resepsi_time || '11:00 WIB'}</p>
              <p className="text-sm opacity-80">{formattedDate}</p>
            </div>
          </div>

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
                style={{ borderColor: c.accent, color: c.accent }}
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
            <h3 className="text-2xl font-bold tracking-widest uppercase" style={{ color: c.accent }}>
              Amplop Digital
            </h3>
            <p className="text-sm opacity-70">
              Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda
              kasih, kami dengan senang hati menerimanya.
            </p>
            <div
              className="p-6 rounded-2xl border space-y-3"
              style={{ borderColor: c.accent + '30', backgroundColor: c.secondary + '10' }}
            >
              <p className="text-lg font-bold">{event.bank_name}</p>
              <p className="text-2xl font-mono tracking-wider">{event.bank_account}</p>
              <p className="text-sm opacity-70">a.n. {event.bank_holder}</p>
            </div>
          </div>
        </section>
      )}

      {/* RSVP / Wishes Form */}
      {template.features.rsvp && (
        <RsvpForm
          eventId={eventId}
          accent={c.accent}
          headingFont={f.heading}
        />
      )}

      {/* Music, floating toggle, hanya jika template mendukung */}
      {template.features.music && (event.music_url || event.music_track) && (
        <MusicPlayer
          src={event.music_url || `/music/${event.music_track}`}
          label={template.music?.label}
          accent={c.accent}
        />
      )}

      <footer className="py-12 px-6 text-center border-t" style={{ borderColor: c.accent + '20' }}>
        <p className="text-xs opacity-50">
          Made with ❤️ by <span style={{ color: c.accent }}>ARS.invitation</span>
        </p>
      </footer>
    </div>
  );
}
