'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const features = [
  { icon: '🎨', title: 'Template Aesthetic', desc: 'Desain editorial yang bikin undangan kamu tidak terlihat seperti template. Pilih, isi, jadi.' },
  { icon: '📱', title: 'Mobile-First', desc: 'Tamu kamu buka dari HP. Setiap detail dioptimasi untuk layar kecil dulu.' },
  { icon: '⚡', title: 'Setup 5 Menit', desc: 'Tanpa coding. Isi data, upload foto, langsung dapat link untuk dibagikan.' },
  { icon: '🖼️', title: 'Galeri Foto', desc: 'Prewedding kamu tampil cantik di grid galeri yang rapi dan ringan.' },
  { icon: '💌', title: 'RSVP & Ucapan', desc: 'Tamu konfirmasi kehadiran dan kirim ucapan langsung dari undangan.' },
  { icon: '🗺️', title: 'Maps Tersemat', desc: 'Lokasi acara satu ketuk. Tamu tidak nyasar, kamu tidak di-chat terus.' },
];

const plans = [
  { plan: 'Gratis', price: 'Rp 0', features: ['2 Template', '100 Tamu', 'RSVP Dasar', 'Link Sharing'], cta: 'Mulai Gratis', highlight: false },
  { plan: 'Pro', price: 'Rp 49K', features: ['Semua Template Pro', 'Tamu Unlimited', 'Galeri Foto', 'Musik Latar', 'Countdown'], cta: 'Mulai Gratis', highlight: true },
  { plan: 'Premium', price: 'Rp 99K', features: ['Semua di Pro', 'Full Animasi', 'Custom Domain', 'Prioritas Support', 'Analytics'], cta: 'Mulai Gratis', highlight: false },
];

const faqs = [
  { q: 'Apakah bisa dipakai tanpa coding?', a: 'Tentu. Tinggal pilih template, isi data acara, dan undangan kamu langsung jadi. Semudah posting di Instagram.' },
  { q: 'Berapa lama undangan aktif?', a: 'Paket Gratis aktif 30 hari. Paket Pro & Premium aktif selamanya selama akun kamu aktif.' },
  { q: 'Bisa custom domain sendiri?', a: 'Bisa, tersedia di paket Pro dan Premium. Contoh: undangan.namakamu.com' },
  { q: 'Support pembayaran apa aja?', a: 'Transfer bank, QRIS, GoPay, OVO, Dana, dan ShopeePay.' },
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-[100dvh] bg-[#FAF7F2] text-[#2A2622] font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#FAF7F2]/85 border-b border-[#E5DED2]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-serif font-semibold tracking-tight">
            <span className="text-[#7C8B6F]">ARS</span>
            <span className="text-[#2A2622]">.invitation</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6B6157]">
            <a href="#features" className="hover:text-[#2A2622] transition">Fitur</a>
            <a href="#templates" className="hover:text-[#2A2622] transition">Template</a>
            <a href="#pricing" className="hover:text-[#2A2622] transition">Harga</a>
            <a href="#faq" className="hover:text-[#2A2622] transition">FAQ</a>
          </div>
          <Link href="/editor" className="bg-[#7C8B6F] text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-[#5F6E54] transition hover:scale-105 active:scale-95">
            Mulai Gratis
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[100dvh] flex items-center px-6 pt-32 pb-16">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D6CBB9] to-transparent" />
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#D6CBB9] to-transparent" />

        <div className="relative max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Kiri: copy */}
          <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block mb-8 px-4 py-1.5 rounded-full border border-[#D6CBB9] bg-[#FFFDF9] text-sm text-[#6B6157]">
              ✨ Undangan digital untuk pasangan modern
            </div>

            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-8">
              Undangan yang
              <br />
              <span className="italic text-[#7C8B6F]">terasa hangat</span>
              <span className="text-[#C08552]">,</span>
              <br />
              bukan otomatis.
            </h2>

            <p className="text-lg md:text-xl text-[#6B6157] max-w-xl mb-10 leading-relaxed">
              Pilih template, isi data, bagikan link. Selesai dalam 5 menit, tapi tamu kamu akan ingat berhari-hari.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4">
              <Link href="/editor" className="w-full sm:w-auto bg-[#C08552] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#A66B3F] transition hover:scale-105 active:scale-95 shadow-lg shadow-[#C08552]/20">
                Mulai Gratis
              </Link>
              <a href="#templates" className="w-full sm:w-auto border border-[#D6CBB9] text-[#2A2622] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#FFFDF9] transition">
                Lihat Template
              </a>
            </div>
          </div>

          {/* Kanan: foto prewedding asli */}
          <div className={`relative transition-all duration-1000 delay-150 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-[#E5DED2] shadow-2xl shadow-[#2A2622]/10">
              <img
                src="/images/hero-prewedding.jpg"
                alt="Foto prewedding pasangan di ladang saat matahari terbenam"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2A2622]/30 via-transparent to-transparent" />
            </div>
            {/* cart dayang: tanggal di luar frame */}
            <div className="absolute -bottom-6 -left-6 bg-[#FFFDF9] border border-[#E5DED2] rounded-2xl px-6 py-4 shadow-lg hidden sm:block">
              <p className="text-xs tracking-[0.2em] uppercase text-[#756C61]">Save The Date</p>
              <p className="font-serif text-2xl font-semibold text-[#2A2622] mt-1">31 Desember 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-[#FFFDF9] border-y border-[#E5DED2]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.25em] uppercase text-[#7C8B6F] mb-3">Fitur</p>
            <h3 className="font-serif text-4xl md:text-5xl mb-4">
              Semua yang dibutuhkan, <span className="italic text-[#7C8B6F]">tidak lebih</span>
            </h3>
            <p className="text-[#6B6157] text-lg max-w-xl mx-auto">Detail-detail kecil yang membuat undangan terasa dibuat dengan tangan.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E5DED2] rounded-2xl overflow-hidden">
            {features.map((f, i) => (
              <div key={i} className="group p-8 bg-[#FFFDF9] hover:bg-[#FAF7F2] transition-colors duration-300">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h4 className="text-lg font-bold mb-2 group-hover:text-[#7C8B6F] transition">{f.title}</h4>
                <p className="text-[#6B6157] leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.25em] uppercase text-[#7C8B6F] mb-3">Template</p>
            <h3 className="font-serif text-4xl md:text-5xl mb-4">
              Desain yang <span className="italic text-[#7C8B6F]">bisa kamu banggakan</span>
            </h3>
            <p className="text-[#6B6157] text-lg">Setiap template punya karakter sendiri. Tidak ada yang terlihat generik.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Classic Elegant', id: 'classic-elegant', desc: 'Serif timeless untuk acara formal', tone: 'bg-[#FFFDF9] border-[#E5DED2]', text: 'text-[#1a1a2e]', tag: 'Free' },
              { name: 'Rustic Garden', id: 'rustic-garden', desc: 'Earth-tone, hangat, dekat dengan alam', tone: 'bg-[#F3EFE5] border-[#D6CBB9]', text: 'text-[#1b4332]', tag: 'Pro' },
              { name: 'Modern Purple', id: 'modern-purple', desc: 'Gelap, elegan, sedikit futuristik', tone: 'bg-[#131231] border-[#2a2852]', text: 'text-[#f1f5f9]', tag: 'Pro' },
            ].map((t, i) => (
              <div key={i} className={`group rounded-2xl border ${t.tone} overflow-hidden transition-all duration-300 hover:-translate-y-1`}>
                <div className="h-56 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-5xl mb-3">💍</p>
                    <p className={`font-serif text-2xl font-semibold ${t.text}`}>{t.name}</p>
                  </div>
                </div>
                <div className="p-6 border-t border-current/10">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-[#6B6157]">{t.desc}</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#7C8B6F]/10 text-[#7C8B6F] shrink-0">{t.tag}</span>
                  </div>
                  <div className="mt-5 flex gap-2">
                    <Link href="/editor" className="flex-1 text-center bg-[#C08552] text-white py-3 rounded-full font-bold text-sm hover:bg-[#A66B3F] transition hover:scale-105 active:scale-95">
                      Mulai Gratis
                    </Link>
                    <a
                      href={`/preview/${t.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center border border-[#D6CBB9] text-[#6B6157] hover:text-[#2A2622] px-4 py-3 rounded-full font-semibold text-sm transition whitespace-nowrap"
                    >
                      👁️ Contoh
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-[#FFFDF9] border-y border-[#E5DED2]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="font-serif text-4xl md:text-5xl mb-4">
              Transparan, <span className="italic text-[#7C8B6F]">tanpa biaya tersembunyi</span>
            </h3>
            <p className="text-[#6B6157] text-lg">Mulai gratis. Upgrade hanya saat butuh lebih banyak.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p, i) => (
              <div
                key={i}
                className={`p-8 rounded-2xl border transition-all duration-300 ${
                  p.highlight
                    ? 'bg-[#FAF7F2] border-[#7C8B6F] shadow-lg shadow-[#7C8B6F]/10 md:-translate-y-2'
                    : 'bg-[#FFFDF9] border-[#E5DED2] hover:border-[#D6CBB9]'
                }`}
              >
                {p.highlight && (
                  <div className="inline-block text-[#7C8B6F] text-xs font-bold mb-3 px-2.5 py-1 rounded-full bg-[#7C8B6F]/10">
                    ⭐ PALING DIPILIH
                  </div>
                )}
                <h4 className="font-serif text-2xl font-semibold mb-1">{p.plan}</h4>
                <p className="font-serif text-4xl font-bold text-[#2A2622] mb-6">{p.price}</p>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-[#6B6157]">
                      <span className="text-[#7C8B6F]">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/editor"
                  className={`block w-full text-center py-3 rounded-full font-bold text-sm transition hover:scale-105 active:scale-95 ${
                    p.highlight ? 'bg-[#C08552] text-white hover:bg-[#A66B3F]' : 'border border-[#D6CBB9] text-[#2A2622] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="font-serif text-4xl md:text-5xl">
              Pertanyaan <span className="italic text-[#7C8B6F]">yang sering muncul</span>
            </h3>
          </div>
          <div className="divide-y divide-[#E5DED2] border-y border-[#E5DED2]">
            {faqs.map((item, i) => (
              <details key={i} className="group py-6">
                <summary className="font-bold text-lg flex items-center justify-between cursor-pointer list-none">
                  <span className="pr-4">{item.q}</span>
                  <span className="text-[#7C8B6F] group-open:rotate-45 transition-transform text-2xl shrink-0">+</span>
                </summary>
                <p className="mt-4 text-[#6B6157] leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center bg-[#7C8B6F]">
        <div className="max-w-3xl mx-auto">
          <h3 className="font-serif text-4xl md:text-5xl mb-6 text-white">
            Siap memulai?
          </h3>
          <p className="text-white/80 text-lg mb-10 max-w-md mx-auto">
            Ribuan pasangan sudah membuat undangan yang benar-benar mereka sukai. Giliran kamu.
          </p>
          <Link href="/editor" className="inline-block bg-[#FAF7F2] text-[#2A2622] px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition hover:scale-105 active:scale-95">
            Mulai Gratis
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#E5DED2]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <Link href="/" className="font-serif text-lg font-semibold transition hover:opacity-80">
              <span className="text-[#7C8B6F]">ARS</span>.invitation
            </Link>
            <p className="text-[#756C61] text-sm mt-1">© 2026 ARS.invitation. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-[#6B6157]">
            <a href="#" className="hover:text-[#7C8B6F] transition">Privacy</a>
            <a href="#" className="hover:text-[#7C8B6F] transition">Terms</a>
            <a href="#" className="hover:text-[#7C8B6F] transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
