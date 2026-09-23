# AGENTS.md — SOP Coding ARS.invitation

> Aturan main untuk AI agent (Hermes/Claude/dll) yang kerja di repo ini. **Baca dulu sebelum ngoding.**

**Versi:** 1.0 · **Pemilik repo:** Sopan Mukti (sopan212)

---

## 0. Baca Berurutan

Sebelum ngerjain task, baca file ini dulu, lalu yang relevan:

1. **AGENTS.md** (ini) — SOP & cara komunikasi
2. **PRD.md** — fitur apa & kenapa (jangan bikin di luar scope)
3. **DESIGN_SYSTEM.md** — warna/font/spacing WAJIB ikut
4. **ARCHITECTURE.md** — struktur folder, DB schema, alur data

Kalau task minta sesuatu yang konflik sama salah satu di atas, **tanya dulu**, jangan langsung bikin.

## 1. Identitas & Komunikasi

- Pemilik repo: **Sopan Mukti**, panggil **"mas bro"** (santai) atau **"BOSS!"** (serius)
- Bahasa default: **Bahasa Indonesia** untuk semua chat & commit message
- Zona waktu: WIB (UTC+7)
- User tidak suka: reasoning block panjang, raw JSON, tool-call output muncul di chat. **Yang disampaikan: hasilnya saja, langsung.**
- Style: singkat, padat, no filler. Lengkap tapi tidak bertele-tele.

## 2. Stack — Jangan Diganti Tanpa Izin

- **Framework:** Next.js 16.3 App Router (Turbopack), React 19
- **Styling:** Tailwind CSS v4 (via PostCSS)
- **Backend:** PocketBase 0.25 (self-hosted, port 8090)
- **DB:** SQLite (bawaan PocketBase)
- **Bahasa:** TypeScript strict
- **Runtime:** Node.js (server Ubuntu, Tailscale)

**Tidak pakai** library tambahan sebelum minta izin. Prefer stdlib + native. Dependency hanya kalau jelas menghemat waktu signifikan.

## 3. Aturan Koding

### 3.1 Next.js 16 — Breaking Changes

Ini **bukan** Next.js versi lama. Yang sering nyangkut:

```tsx
// ✅ params & searchParams adalah PROMISE (Next 15+)
export async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
}
```

- Selalu cek `node_modules/next/dist/docs/` atau error log kalau API berperilaku aneh
- Halaman publik (`/undangan/[id]`) = **Server Component** (SSR). Halaman interaktif (`/editor`, landing) = Client Component (`'use client'`).

### 3.2 PocketBase

```ts
// Auto-cancellation WAJIB dimatikan, atau request gantung di dev (React double-render)
const pb = new PocketBase('http://100.74.92.59:8090');
pb.autoCancellation(false);
```

- Schema diubah **hanya via migration** (`backend/pb_migrations/`), 1 file per perubahan, timestamp-prefixed
- Jangan edit migration yang sudah jalan — buat baru
- File upload: gunakan multipart `FormData` (PocketBase SDK handle otomatis kalau dilempar `File`)

### 3.3 Tailwind & Styling

- **Halaman undangan:** SEMUA warna/font dari `template.colors` / `template.fonts`. **DILARANG** hardcode hex di `/undangan`
- **UI app (editor/landing/dashboard):** pakai token di DESIGN_SYSTEM.md (`#1a1a4e`, `#FFD700`, dll)
- Class Tailwind langsung di JSX (tidak pakai `@apply` / CSS module kecuali harus)
- Mobile-first: tulis class mobile dulu, `md:` / `lg:` untuk desktop

### 3.4 TypeScript

- `strict: true` aktif — tidak boleh `any` sembarangan
- Tipe data dari PocketBase: buat interface di dekat pemakaian kalau perlu
- Komponen: explicit `Props` type, tidak inline `any`

### 3.5 Penamaan

- **File component:** `PascalCase.tsx` (`TemplateSelector.tsx`)
- **File page/util:** `kebab-case` atau camelCase (`templates.ts`)
- **Route folder:** sesuai URL (`/undangan/[id]`)
- **Variable/fungsi:** camelCase
- **Constant:** UPPER_SNAKE atau PascalCase
- **Migration:** `<unix-timestamp>_<deskripsi-kebab>.js`

### 3.6 Komponen

- 1 file = 1 tanggung jawab. Komponen > 300 baris = pecah.
- Reusable → pindah ke `components/`. Logic murni → `lib/`.
- Client component hanya kalau butuh state/effect. Selebihnya server component.

## 4. Workflow Standar

Sebelum mulai ngoding, pastikan service jalan:

```bash
# Cek PocketBase
curl -s http://localhost:8090/api/health

# Cek Next (ini app, bukan 9router di port 20128!)
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/
```

Kalau mati, nyalakan dulu (lihat ARCHITECTURE.md bagian 7).

### Checklist Sebelum Bilang "Selesai"

- [ ] Kode jalan — tidak ada error compile di `next dev` log
- [ ] Route yang diubah dikunjungi manual (curl), status bukan 500
- [ ] Warna/font di halaman undangan dari template token
- [ ] Tidak ada `console.log` debug yang tertinggal
- [ ] Migration baru di-test: restart PocketBase, cek field muncul
- [ ] Commit message jelas
- [ ] Kalau ada perubahan schema/struktur → update ARCHITECTURE.md
- [ ] Kalau ada perubahan visual → cek DESIGN_SYSTEM.md masih relevan

## 5. Git & Commit

- Branch default: `main`
- Remote: `github.com/sopan212/ars-invitation`
- **Commit kecil sering** lebih baik dari 1 commit raksasa
- Format message: `<apa yang berubah> — <kenapa singkat>` (bisa Bahasa Indonesia)

```
✓ Contoh: "Tambah field photo_bg + gallery ke events — fitur foto undangan"
✗ Contoh: "update" / "fix bug" / "wip"
```

- Jangan commit: `node_modules/`, `.next/`, `.env`, binary besar
- Push hanya kalau diminta atau setelah milestone signifikan

## 6. Dilarang Keras

- ❌ Hardcode warna di `/undangan/*` — harus `template.colors`
- ❌ Ubah schema DB tanpa migration file
- ❌ Tambah dependency tanpa izin
- ❌ Commit secret / token / `.env`
- ❌ `git push --force` ke main tanpa konfirmasi
- ❌ Hapus migration yang sudah ter-apply
- ❌ Bikin fitur di luar scope PRD.md tanpa tanya
- ❌ Tinggalkan `console.log` debug
- ❌ Pakai `any` untuk mengakali error tipe

## 7. Kalau Macet / Error

1. **Baca errornya, jangan nebak.** Log Next ada di `/tmp/ars-next.log` kalau dijalankan dari sana.
2. **Cek ini dulu:** PocketBase jalan? Next jalan? Portnya bener (3000, bukan 20128)?
3. **Test pakai curl** sebelum bilang berhasil — status code + grep konten.
4. Kalau 404 di dynamic route → cek `params` di-await belum?
5. Kalau request PocketBase gantung → cek `autoCancellation(false)`?
6. Kalau masih bingung → laporkan: **errornya apa, di file mana, baris berapa, opsi fix apa.** Jangan diam.

## 8. Prioritas

Konflik aturan? Urutan ini menang:

1. **Keamanan & data user**
2. **Tamu bisa buka undangan** (halaman publik cepat & ringan)
3. **Konsistensi visual** (DESIGN_SYSTEM.md)
4. **Kode rapi & terbaca**
5. **Fitur baru**

## 9. File ini Hidup

Dokumen ini akan berubah seiring project. Kalau ada aturan baru, lesson learned, atau konvensi yang berkembang → **update file ini**. Yang tidak tertulis = tidak ada.

---

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
