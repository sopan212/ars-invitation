# PRD — ARS.invitation

> Product Requirements Document. Single source of truth untuk *apa* yang dibangun dan *kenapa*.

**Versi:** 1.0 · **Status:** Development (MVP+)

---

## 1. Visi

**"Undangan pernikahan digital yang bikin tamu bertanya 'kok bisa sebagus ini?' — tanpa biaya cetak, tanpa ribet."**

ARS.invitation adalah platform SaaS pembuat undangan digital pernikahan. Pengguna memilih template, mengisi data, upload foto, dan langsung dapat link undangan yang bisa dibagikan. Tamu membuka link, melihat undangan, konfirmasi kehadiran, dan mengirim ucapan.

## 2. Masalah yang Diselesaikan

| Tanpa ARS | Dengan ARS |
|---|---|
| Cetak fisik 500 lembar = Rp 1–3 juta, sekali pakai | 1 link, biaya nol per tamu |
| Salah ketik? Cetak ulang semua | Edit data, langsung update |
| Tidak tahu siapa yang hadir | RSVP digital tercatat otomatis |
| Foto fisik terbatas | Galeri foto tak terbatas |
| Tersebar di WA grup, susah dilacak | 1 link resmi, bisa dibagikan mana saja |

## 3. Target Pengguna

**Primary:** Pasangan muda Indonesia (usia 23–32) yang sedang menikah, kelas menengah, aktif digital, menggunakan WhatsApp/Instagram sebagai komunikasi utama.

**Secondary:** Wedding organizer & vendor yang butuh platform undangan untuk klien mereka.

**User persona:**
- **Sinta & Didi** — pasangan gen-Z, budget terbatas, mau undangan estetis tapi gratis. Mulai dari template free.
- **Rina** — bride yang "semua harus sempurna", rela bayar untuk template premium full animasi.
- **Pak Bowo** — WO, butuh 30+ undangan per tahun, butuh harga grosir.

## 4. Goals & Success Metrics

| Goal | Metric | Target Tahun-1 |
|---|---|---|
| Adopsi | Undangan dibuat per bulan | 1.000+ |
| Viralitas | Rata-rata tamu per undangan | 150+ |
| Konversi free→pro | % user upgrade | 8–12% |
| Keandalan | Uptime halaman undangan | 99.9% |
| Kualitas | Tamu memberi feedback positif | NPS 40+ |

## 5. Fitur Utama (MVP — saat ini)

### 5.1 Landing Page (`/`)
- Hero, fitur, showcase template, pricing (Free/Pro/Premium), FAQ
- CTA "Buat Undangan" → ke `/editor`

### 5.2 Editor (`/editor`)
Form tab-based dengan **live preview** (mockup HP) di samping kanan:

| Tab | Isi |
|---|---|
| 💑 Pengantin | Nama mempelai, orang tua, **foto background**, **galeri foto** (max 10) |
| 📅 Waktu & Lokasi | Tanggal, jam akad/resepsi, tempat, alamat, Google Maps |
| 💳 Hadiah & Quote | Rekening amplop digital, ayat/kata mutiara |
| 🎨 Desain & Tema | Pilih template (Free/Pro/Premium) |

**Simpan** → record tersimpan ke PocketBase → dapat link publik `/undangan/[id]`.

### 5.3 Halaman Undangan (`/undangan/[id]`)
Halaman publik yang dilihat tamu:
- **Hero** — nama mempelai + foto background + overlay warna template
- **Detail Mempelai** — nama & orang tua, quote
- **Galeri Kami** — grid foto prewedding
- **Jadwal Acara** — akad & resepsi, lokasi, tombol Google Maps
- **Amplop Digital** — rekening hadiah
- **Ucapan & Doa** — form RSVP + ucapan (collection `wishes`)
- **Footer** — branding ARS.invitation

### 5.4 Template System
6 template dalam 3 tier. Lihat `DESIGN_SYSTEM.md` untuk detail visual, `lib/templates.ts` untuk implementasi.

| Tier | Template | Fitur |
|---|---|---|
| Free | Classic Elegant, Minimal Gold | Statis, RSVP, tanpa musik/galeri |
| Pro | Modern Purple, Rustic Garden | Animasi, musik, galeri, countdown |
| Premium | Royal Gold, Cosmic Dream | Full animasi particles/parallax |

## 6. Fitur Mendatang (Roadmap)

**v1.1 — Q4 2026**
- Autentikasi user (login/register, PocketBase auth)
- Dashboard: kelola banyak undangan, edit ulang, lihat statistik tamu
- RSVP wajib nama + simpan ke DB (form sekarang belum tersimpan)
- Embed music player (sesuai template `features.music`)

**v1.2 — Q1 2027**
- Countdown timer otomatis dari `event_date`
- Lightbox galeri (klik foto → full screen)
- Custom domain (`undangan.nama.com`)
- QR code check-in untuk WO

**v1.3 — Q2 2027**
- Multi-bahasa (EN toggle)
- Template builder visual (drag-drop section)
- Analytics detail: views, RSVP rate, tamu unik
- White-label untuk vendor

## 7. Monetisasi

| Plan | Harga | Isi |
|---|---|---|
| **Free** | Rp 0 | 2 template statis, 1 undangan, tanpa galeri |
| **Pro** | Rp 49.000 / undangan | Semua template Pro, galeri, musik, countdown, RSVP |
| **Premium** | Rp 99.000 / undangan | Semua template + full animasi, prioritas support |
| **Vendor** | Rp 299.000 / bulan | 10 undangan/bulan, white-label, dashboard batch |

**Payment gateway:** Midtrans / Xendit (belum diimplementasi). Untuk sekarang, `userPlan="premium"` di-hardcode di editor sebagai demo.

## 8. Asumsi & Risiko

**Asumsi:**
- Pengguna punya foto prewedding siap (atau setidaknya 1 foto bagus)
- Tamu mengakses via HP (mobile-first, wajib)
- Koneksi internet tamu cukup untuk gambar (optimasi + lazy load)

**Risiko:**
- Kompetitor besar (invite.rinja.id, datengdong.com) sudah punya brand awareness → menang via harga + SEO lokal
- Template statis kurang menarik vs video invitation → pro/premium harus benar-benar mengesankan
- Fraud/SPAM undangan palsu → butuh rate limiting + verifikasi di v1.1

## 9. Non-Goals (Sengaja TIDAK Dibangun)

- Undangan video (fokus web dulu)
- Cetak fisik
- Marketplace vendor pernikahan
- App mobile native (PWA sudah cukup)
- Multi-event dalam 1 link (1 undangan = 1 acara)
