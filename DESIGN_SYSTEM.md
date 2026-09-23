# DESIGN_SYSTEM — ARS.invitation

> Single source of truth untuk visual. Setiap UI yang dibangun **harus** mengikuti ini.

**Versi:** 1.0 · **Terakhir update:** Sept 2026

---

## 1. Prinsip Desain

1. **Mobile-first, selalu.** 90%+ tamu buka undangan via HP. Desain untuk layar 375px dulu, baru scale up.
2. **Elegan bukan ramai.** Wedding = emosi, bukan dashboard. Banyak white space, tipografi menjadi pahlawan.
3. **Satu fokus per section.** Tamu scroll cepat. Tiap section punya 1 job: bikin mereka merasakan sesuatu.
4. **Konsisten, bukan seragam.** Setiap template punya karakter, tapi struktur & rhythm-nya sama.

## 2. Palet Warna

### Platform UI (Editor, Landing, Dashboard)

Warna khas ARS. **Pakai ini untuk semua UI app**, bukan untuk halaman undangan (halaman undangan ikut warna template).

| Token | Hex | Penggunaan |
|---|---|---|
| `navy` | `#1a1a4e` | Background utama, teks putih di atasnya |
| `gold` | `#FFD700` | CTA, highlight, logo, selected state |
| `gold-hover` | `#ffdd33` | Hover state CTA |
| `surface` | `rgba(255,255,255,0.05)` | Card, panel input |
| `border` | `rgba(255,255,255,0.10)` | Divider, border card |
| `text-muted` | `gray-300/400` | Label, hint text |

**Gradient orbs** (landing): `purple-700/30` + `gold/20` dengan `blur-[128px]` — lihat `app/page.tsx`.

### Template Colors

Setiap template punya 5 token warna sendiri. **Halaman undangan WAJIB baca dari `template.colors`**, jangan hardcode.

```ts
template.colors = {
  primary,    // heading utama
  secondary,  // panel, section alt
  accent,     // CTA, garis pembatas, badge
  background, // latar utama
  text,       // teks body
}
```

Daftar lengkap & nilai hex: `lib/templates.ts`.

## 3. Tipografi

### Platform UI
- **Font:** Geist Sans (default Next.js) + Geist Mono (angka rekening)
- Heading editor: `text-2xl font-bold`
- Label form: `text-sm font-medium text-gray-300`
- Hint: `text-xs text-gray-500`

### Halaman Undangan
Baca dari `template.fonts`:
- **`heading`** — font serif/dekoratif untuk nama mempelai & judul section
- **`body`** — font sans untuk teks

Font yang dipakai template: Playfair Display, Cormorant Garamond, Great Vibes, Space Grotesk, Orbitron, Inter, DM Sans, Nunito, Lora, Rajdhani.

**Catatan implementasi:** font Google belum di-`import` semua di layout. Saat ini hanya Geist. Saat menambah section undangan baru, pastikan font template ter-load (cek `app/layout.tsx`) atau fallback ke `serif`/`sans-serif`.

## 4. Spacing & Rhythm

| Token | Nilai | Untuk |
|---|---|---|
| Section padding | `py-20 px-6` | Section utama halaman undangan |
| Card padding | `p-6` | Panel form editor |
| Input padding | `p-3` (utama) / `p-2.5` (sekunder) | Field form |
| Max width content | `max-w-3xl` (undangan) / `max-w-7xl` (editor) | Konten tengah |
| Gap grid | `gap-8` (layout) / `gap-4` (form) / `gap-3` (galeri) | Grid |

**Vertical rhythm undangan:** tiap section `py-20`, dengan section alternate punya background `template.colors.secondary + '15'` (transparansi 15%).

## 5. Border Radius

| Token | Nilai |
|---|---|
| Button | `rounded-full` (pill) |
| Card panel | `rounded-2xl` |
| Input | `rounded-xl` (utama) / `rounded-lg` (sekunder) |
| Foto galeri | `rounded-2xl` |
| Phone mockup | `rounded-[36px]` border `8px` |

## 6. Komponen Utama

### Button CTA
```tsx
<button className="px-6 py-2.5 rounded-full font-bold text-sm 
  bg-[#FFD700] text-[#1a1a4e] hover:bg-[#ffdd33] 
  transition hover:scale-105 active:scale-95 
  shadow-lg shadow-[#FFD700]/20">
  Aksi
</button>
```
Di halaman undangan, ganti warna ke `template.colors.accent` + `template.colors.background`.

### Card Panel (Editor)
```tsx
<div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
```

### Field Form
```tsx
<input className="w-full rounded-xl border border-white/10 bg-white/5 p-3 
  text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50" />
```

### File Input (upload foto)
```tsx
<input type="file" className="block w-full text-sm text-gray-300 
  file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 
  file:text-sm file:font-semibold file:bg-[#FFD700] file:text-[#1a1a4e] 
  hover:file:bg-[#ffdd33] cursor-pointer" />
```

### Phone Mockup (Live Preview Editor)
Frame HP di kanan editor, `aspect-[9/18] max-h-[640px]`, border `8px border-[#2d2d44]`, `rounded-[36px]`, `shadow-2xl`, `bg-black`.

## 7. Template Tier System

| Tier | Karakter Visual |
|---|---|
| **Free** | Statis, bersih, tanpa animasi. Warna lembut/netral |
| **Pro** | Animasi halus (fade/parallax), background gelap atau earth-tone, musik |
| **Premium** | Full animasi (particles/parallax intensity high), gelap + accent mencolok |

`TemplateSelector` menampilkan badge warna: free=`green-500/20`, pro=`yellow-500/20`, premium=`purple-500/20`.

## 8. Animasi & Interaksi

- **Hover scale:** `hover:scale-105 active:scale-95` pada semua elemen clickable
- **Transition:** `transition` standar, `duration-1000` untuk fade-in landing
- **Reveal on load:** landing pakai opacity+translate pattern (`opacity-0 translate-y-10` → `opacity-100 translate-y-0`)
- **Foto galeri hover:** `hover:scale-105` dengan `transition`
- **Lazy load:** `loading="lazy"` pada semua `<img>` galeri

## 9. Copywriting

- Bahasa **Indonesia** untuk semua UI dan konten default
- Tone: hangat, sopan, sedikit formal tapi tidak kaku
- CTA pakai kata kerja + emoji: "💍 Buka Undangan", "💌 Kirim Ucapan", "💾 Simpan & Terbitkan"
- Section undangan pakai label Indonesia: "The Wedding Of" (pengecualian, brand wedding), "Mempelai Pria/Wanita", "Jadwal Acara", "Amplop Digital", "Ucapan & Doa", "Galeri Kami"

## 10. Aksesibilitas Minimum

- Kontras teks cukup (cek accent vs background sebelum pakai)
- `alt` text pada semua gambar
- `target="_blank"` wajib `rel="noopener noreferrer"`
- Touch target minimal 44px (`py-2.5 px-6` sudah cukup)
- Form punya `<label>` untuk setiap input

## 11. Dilarang

- ❌ Hardcode warna di halaman undangan (harus dari `template.colors`)
- ❌ Campur font diluar `template.fonts`
- ❌ Border radius diluar token di atas
- ❌ Tabel/data-dense layout di halaman undangan
- ❌ Auto-play audio tanpa kontrol (fitur musik = tombol play manual)
