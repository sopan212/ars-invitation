# DESIGN_SYSTEM — ARS.invitation

> Single source of truth untuk visual. Setiap UI yang dibangun **harus** mengikuti ini.

**Versi:** 2.0 (Warm Minimalist) · **Terakhir update:** Sept 2026

---

## 1. Konsep: "Warm Minimalist"

Vibe Pinterest wedding aesthetic — itempas-pas, elegan, hangat. Tidak terlihat "dibuat AI".

**Karakter:**
- Background cream terang, BUKAN navy gelap
- Tidak ada gradient orb / glow / blur raksasa
- Tipografi serif editorial jadi pilar utama
- Accent: sage (hijau lumut redup) + terracotta (tanah liat hangat)
- White space generous, border garis tipis, tanpa shadow berlebihan
- Detail tipis (1px gradient line) pengganti efek glow

## 2. Prinsip Desain

1. **Mobile-first, selalu.** 90%+ tamu buka undangan via HP. Desain untuk 375px dulu.
2. **Elegan bukan ramai.** Wedding = emosi. White space, tipografi jadi pahlawan.
3. **Satu fokus per section.** Tiap section punya 1 job.
4. **Konsisten, bukan seragam.** Tiap template punya karakter, struktur & rhythm sama.

## 3. Palet Warna

### Platform UI (Landing, Editor, Dashboard)

Implementasi: `lib/theme.ts` (token + class siap pakai). Update file itu kalau token berubah.

| Token | Hex | Penggunaan |
|---|---|---|
| `cream` | `#FAF7F2` | Background utama |
| `ivory` | `#FFFDF9` | Panel / card di atas cream |
| `ink` | `#2A2622` | Teks utama (warm near-black) |
| `inkSoft` | `#6B6157` | Label, hint, teks sekunder |
| `inkFaint` | `#9C9286` | Teks tersier / copyright |
| `sage` | `#7C8B6F` | Accent 1: logo, badge, heading highlight, tab aktif |
| `sageDeep` | `#5F6E54` | Hover/active sage |
| `terra` | `#C08552` | Accent 2: CTA utama, focus ring |
| `terraDeep` | `#A66B3F` | Hover terra |
| `line` | `#E5DED2` | Divider / border lembut |
| `lineStrong` | `#D6CBB9` | Border hover / ghost button |

**Section alternasi:** `cream` ↔ `ivory` (dengan `border-y border-[#E5DED2]`), BUKAN navy gelap.

### Template Colors

Setiap template punya 5 token sendiri. **Halaman undangan WAJIB baca dari `template.colors`**, jangan hardcode.

```ts
template.colors = { primary, secondary, accent, background, text }
```

Daftar lengkap: `lib/templates.ts`.

## 4. Tipografi

### Platform UI
- **`--font-serif`** = Cormorant Garamond (heading: logo, hero, judul section, harga) — class `font-serif`
- **`--font-sans`** = Inter (body, label, tombol, teks) — default `<body>`
- Ukuran: hero `text-5xl md:text-7xl`, section `text-4xl md:text-5xl`, card title `text-lg`

### Halaman Undangan
Baca dari `template.fonts` (`heading` + `body`). Font: Playfair Display, Cormorant Garamond, Great Vibes, Space Grotesk, Orbitron, Inter, DM Sans, Nunito, Lora, Rajdhani.

**Catatan:** font Google template belum semua di-import di layout (saat ini Cormorant + Inter). Saat tambah section undangan, pastikan font template ter-load atau fallback `serif`/`sans-serif`.

## 5. Spacing & Rhythm

| Token | Nilai |
|---|---|
| Section padding | `py-24 px-6` (landing) / `py-20 px-6` (undangan) |
| Max width | `max-w-6xl` (landing) / `max-w-3xl` (FAQ, undangan) / `max-w-7xl` (editor) |
| Card padding | `p-6` panel / `p-8` card fitur |
| Input padding | `p-3` utama / `p-2.5` sekunder |
| Gap | `gap-8` layout / `gap-6` pricing / `gap-4` form / `gap-3` galeri |

## 6. Border Radius

| Token | Nilai |
|---|---|
| Button | `rounded-full` (pill) |
| Card panel | `rounded-2xl` |
| Input | `rounded-xl` utama / `rounded-lg` sekunder |
| Foto galeri | `rounded-2xl` |
| Phone mockup | `rounded-[36px]` border `8px` |

## 7. Komponen Utama

Class siap pakai di `lib/theme.ts` (`cc.cta`, `cc.panel`, `cc.input`, dll). Versi inline:

### Button CTA
```tsx
<button className="bg-[#C08552] text-white px-6 py-2.5 rounded-full font-bold text-sm 
  hover:bg-[#A66B3F] transition hover:scale-105 active:scale-95 
  shadow-sm shadow-[#C08552]/30">
```

### Button Ghost
```tsx
<button className="border border-[#D6CBB9] text-[#2A2622] px-6 py-2.5 rounded-full 
  font-bold text-sm hover:bg-[#FAF7F2] transition">
```

### Card Panel
```tsx
<div className="bg-[#FFFDF9] border border-[#E5DED2] p-6 rounded-2xl">
```

### Field Form
```tsx
<input className="w-full rounded-xl border border-[#E5DED2] bg-[#FAF7F2] p-3 
  text-[#2A2622] focus:outline-none focus:ring-2 focus:ring-[#C08552]/40 
  focus:border-[#C08552] placeholder:text-[#B4A99A]" />
```

### Tab (Editor)
```tsx
// aktif:  bg-[#7C8B6F] border-[#7C8B6F] text-white font-bold
// idle:   bg-transparent border-[#E5DED2] text-[#6B6157] hover:text-[#2A2622] hover:border-[#D6CBB9]
```

### File Input
```tsx
<input type="file" className="block w-full text-sm text-[#6B6157] 
  file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 
  file:font-semibold file:bg-[#7C8B6F] file:text-white hover:file:bg-[#5F6E54] 
  cursor-pointer" />
```

### Phone Mockup (Editor)
`rounded-[36px] border-8 border-[#2A2622] shadow-2xl bg-black aspect-[9/18] max-h-[640px]`.

### Feature Grid (Landing)
Grid tanpa gap antar kartu, dipisah garis tipis: `grid grid-cols-1 md:grid-cols-3 gap-px bg-[#E5DED2] rounded-2xl overflow-hidden`, tiap cell `bg-[#FFFDF9] hover:bg-[#FAF7F2]`.

### FAQ
Tanpa card. Divider-only: `divide-y divide-[#E5DED2] border-y border-[#E5DED2]`.

## 8. Template Tier System

| Tier | Karakter |
|---|---|
| **Free** | Statis, bersih, warna lembut/netral |
| **Pro** | Animasi halus, gelap atau earth-tone, musik |
| **Premium** | Full animasi, gelap + accent mencolok |

Badge (TemplateSelector): free=`bg-[#7C8B6F]/10 text-[#7C8B6F]`, pro=`bg-[#C08552]/15 text-[#A66B3F]`, premium=`bg-[#2A2622]/10 text-[#2A2622]`.

Thumbnail template pakai `template.colors.background` asli (preview nyata, BUKAN placeholder gray).

## 9. Animasi & Interaksi

- **Hover scale:** `hover:scale-105 active:scale-95` elemen clickable
- **Lift on hover:** card template `hover:-translate-y-1`
- **Reveal on load:** hero `opacity-0 translate-y-8` → `opacity-100 translate-y-0`, `duration-1000 ease-out`
- **Transition warna:** `transition-colors duration-300` untuk card hover
- **FAQ:** `group-open:rotate-45` pada ikon `+`
- **Lazy load:** `loading="lazy"` semua `<img>` galeri
- **Tidak ada:** pulse animated border, blur orb, gradient glow

## 10. Copywriting

- Bahasa **Indonesia**, tone hangat-sopan, tidak kaku
- CTA kata kerja: "Mulai Gratis", "Buat Undangan Sekarang", "💾 Simpan & Terbitkan"
- Eyebrow kecil di atas judul section: `text-xs tracking-[0.25em] uppercase text-[#7C8B6F]`
- Heading pakai italic aksen: `<span className="italic text-[#7C8B6F]">frase</span>`
- Undangan: "The Wedding Of", "Mempelai Pria/Wanita", "Jadwal Acara", "Amplop Digital", "Ucapan & Doa", "Galeri Kami"

## 11. Aksesibilitas Minimum

- Kontras teks cukup (`#6B6157` di atas `#FAF7F2` = 5.9:1, aman)
- `alt` di semua gambar
- `target="_blank"` wajib `rel="noopener noreferrer"`
- Touch target ≥ 44px (`py-2.5 px-6` cukup)
- `<label>` untuk setiap input

## 12. Dilarang

- ❌ Hardcode warna di halaman undangan (harus `template.colors`)
- ❌ Background gelap untuk UI platform (cream adalah dasar)
- ❌ Gradient orb / blur glow / neon shadow
- ❌ `#1a1a4e`, `#FFD700`, `#7c3aed` — token lama, sudah pensiun
- ❌ Font di luar `template.fonts` (undangan) / Cormorant+Inter (UI)
- ❌ Border radius di luar token
- ❌ Auto-play audio tanpa kontrol
- ❌ `animate-pulse` border seleksi (diganti solid ring)
- ❌ Tabel/data-dense layout di halaman undangan
