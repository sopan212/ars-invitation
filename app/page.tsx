'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a4e] text-white overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#1a1a4e]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-[#FFD700]">ARS</span>
            <span className="text-white">.invitation</span>
          </h1>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className="hover:text-[#FFD700] transition">Fitur</a>
            <a href="#templates" className="hover:text-[#FFD700] transition">Template</a>
            <a href="#pricing" className="hover:text-[#FFD700] transition">Harga</a>
            <a href="#faq" className="hover:text-[#FFD700] transition">FAQ</a>
          </div>
          <Link href="/editor" className="bg-[#FFD700] text-[#1a1a4e] px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#ffdd33] transition hover:scale-105 active:scale-95">
            Buat Undangan →
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#7c3aed]/30 rounded-full blur-[128px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFD700]/20 rounded-full blur-[128px]" />

        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-[#7c3aed]/50 bg-[#7c3aed]/10 text-sm text-[#c4b5fd]">
            ✨ Platform Undangan Digital #1 di Indonesia
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6">
            Bikin Undangan
            <br />
            <span className="text-[#FFD700]">Sekeren</span>{' '}
            <span className="bg-gradient-to-r from-[#FFD700] to-[#7c3aed] bg-clip-text text-transparent">Momen Kamu</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Ga perlu ribet. Pilih template, isi data, share link. 
            Undangan digital yang aesthetic, responsive, dan bikin tamu bilang <span className="text-[#FFD700] font-semibold">&quot;keren banget!&quot;</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/editor" className="w-full sm:w-auto bg-[#FFD700] text-[#1a1a4e] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#ffdd33] transition hover:scale-105 active:scale-95 shadow-lg shadow-[#FFD700]/25">
              Mulai Gratis 🚀
            </Link>
            <a href="#templates" className="w-full sm:w-auto border border-white/20 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/5 transition">
              Lihat Template
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-500">Tanpa kartu kredit • Setup 5 menit</p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-extrabold mb-4">
              Kenapa <span className="text-[#FFD700]">ARS</span>?
            </h3>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Semua yang kamu butuhkan untuk undangan digital yang sempurna</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🎨', title: 'Template Aesthetic', desc: 'Desain modern yang bikin undangan kamu stand out. Tinggal pilih, edit, jadi!' },
              { icon: '📱', title: 'Responsive Design', desc: 'Tampil sempurna di HP, tablet, dan desktop. Tamu buka dari mana aja tetap cakep.' },
              { icon: '⚡', title: 'Setup 5 Menit', desc: 'Ga perlu skill coding. Isi form, pilih tema, langsung share link ke tamu.' },
              { icon: '🔗', title: 'Custom Link', desc: 'Dapet link unik buat setiap undangan. Share via WA, IG, atau media sosial lainnya.' },
              { icon: '💌', title: 'RSVP & Ucapan', desc: 'Tamu bisa konfirmasi kehadiran dan kirim ucapan langsung dari undangan.' },
              { icon: '🎵', title: 'Background Music', desc: 'Tambahkan musik latar yang bikin suasana undangan makin berkesan dan emosional.' },
            ].map((f, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FFD700]/30 hover:bg-white/10 transition-all duration-300">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h4 className="text-xl font-bold mb-2 group-hover:text-[#FFD700] transition">{f.title}</h4>
                <p className="text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section id="templates" className="py-24 px-6 bg-[#141440]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-extrabold mb-4">
              Template <span className="text-[#FFD700]">Pilihan</span>
            </h3>
            <p className="text-gray-400 text-lg">Desain premium yang bisa kamu pakai gratis</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Elegant Gold', color: 'from-[#FFD700]/20 to-[#1a1a4e]', tag: 'Popular' },
              { name: 'Rustic Garden', color: 'from-green-900/30 to-[#1a1a4e]', tag: 'New' },
              { name: 'Modern Purple', color: 'from-[#7c3aed]/30 to-[#1a1a4e]', tag: 'Trending' },
            ].map((t, i) => (
              <div key={i} className={`relative rounded-2xl overflow-hidden bg-gradient-to-b ${t.color} border border-white/10 hover:border-[#FFD700]/30 transition-all duration-300 group`}>
                <div className="absolute top-4 right-4 bg-[#FFD700] text-[#1a1a4e] text-xs font-bold px-3 py-1 rounded-full">{t.tag}</div>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-6xl mb-4">💍</p>
                    <p className="text-xl font-bold">{t.name}</p>
                  </div>
                </div>
                <div className="p-6 bg-[#1a1a4e]/80">
                  <Link href="/editor" className="block w-full text-center bg-[#FFD700] text-[#1a1a4e] py-3 rounded-full font-bold hover:bg-[#ffdd33] transition hover:scale-105 active:scale-95">
                    Pakai Template
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-extrabold mb-4">
              Harga <span className="text-[#FFD700]">Terjangkau</span>
            </h3>
            <p className="text-gray-400 text-lg">Pilih paket yang sesuai kebutuhan kamu</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { plan: 'Gratis', price: 'Rp 0', features: ['1 Template', '100 Tamu', 'RSVP', 'Link Sharing'], cta: 'Mulai Gratis', highlight: false },
              { plan: 'Pro', price: 'Rp 49K', features: ['Semua Template', 'Unlimited Tamu', 'RSVP + Ucapan', 'Custom Domain', 'Background Music', 'Countdown Timer'], cta: 'Pilih Pro', highlight: true },
              { plan: 'Premium', price: 'Rp 99K', features: ['Semua di Pro', 'Video Invitation', 'Gallery Foto', 'Multi Event', 'Priority Support', 'Analytics'], cta: 'Pilih Premium', highlight: false },
            ].map((p, i) => (
              <div key={i} className={`p-8 rounded-2xl border transition-all duration-300 ${p.highlight ? 'bg-gradient-to-b from-[#FFD700]/10 to-[#7c3aed]/10 border-[#FFD700]/50 scale-105' : 'bg-white/5 border-white/10 hover:border-white/20'}`}>
                {p.highlight && <div className="text-[#FFD700] text-sm font-bold mb-2">⭐ BEST VALUE</div>}
                <h4 className="text-2xl font-bold mb-1">{p.plan}</h4>
                <p className="text-4xl font-extrabold text-[#FFD700] mb-6">{p.price}</p>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-300">
                      <span className="text-[#FFD700]">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/editor" className={`block w-full text-center py-3 rounded-full font-bold transition hover:scale-105 active:scale-95 ${p.highlight ? 'bg-[#FFD700] text-[#1a1a4e]' : 'border border-white/20 hover:bg-white/5'}`}>
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-[#141440]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-extrabold mb-4">
              <span className="text-[#FFD700]">FAQ</span>
            </h3>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Apakah bisa dipakai tanpa coding?', a: 'Tentu! Tinggal pilih template, isi data acara, dan undangan kamu langsung jadi. Semudah posting di Instagram.' },
              { q: 'Berapa lama undangan aktif?', a: 'Paket Gratis aktif 30 hari. Paket Pro & Premium aktif selamanya selama akun kamu aktif.' },
              { q: 'Bisa custom domain sendiri?', a: 'Bisa! Tersedia di paket Pro dan Premium. Contoh: undangan.namakamu.com' },
              { q: 'Support pembayaran apa aja?', a: 'Kami mendukung transfer bank, QRIS, GoPay, OVO, Dana, dan ShopeePay.' },
            ].map((item, i) => (
              <details key={i} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FFD700]/30 transition cursor-pointer">
                <summary className="font-bold text-lg flex items-center justify-between cursor-pointer list-none">
                  {item.q}
                  <span className="text-[#FFD700] group-open:rotate-45 transition-transform text-2xl">+</span>
                </summary>
                <p className="mt-4 text-gray-400 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-[#7c3aed]/20 to-transparent" />
        <div className="relative max-w-3xl mx-auto">
          <h3 className="text-4xl md:text-5xl font-extrabold mb-6">
            Siap Bikin Undangan <span className="text-[#FFD700]">yang Viral</span>?
          </h3>
          <p className="text-gray-400 text-lg mb-10">Join 10,000+ pasangan yang udah pakai ARS.invitation</p>
          <Link href="/editor" className="inline-block bg-[#FFD700] text-[#1a1a4e] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#ffdd33] transition hover:scale-105 active:scale-95 shadow-lg shadow-[#FFD700]/25">
            Buat Undangan Sekarang 🚀
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-xl font-bold">
              <span className="text-[#FFD700]">ARS</span>.invitation
            </h1>
            <p className="text-gray-500 text-sm mt-1">© 2026 ARS.invitation. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-[#FFD700] transition">Privacy</a>
            <a href="#" className="hover:text-[#FFD700] transition">Terms</a>
            <a href="#" className="hover:text-[#FFD700] transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
