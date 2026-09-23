# ARCHITECTURE — ARS.invitation

> Struktur folder, alur data, dan kontrak sistem. Baca ini sebelum menyentuh kode.

**Versi:** 1.0 · **Stack:** Next.js 16 (App Router) + PocketBase 0.25 + TypeScript + Tailwind v4

---

## 1. Diagram Alur

```
[Pengguna] → /editor (form + preview)
                ↓ submit (multipart/form-data)
          PocketBase API (:8090) → collection `events` (+ file foto)
                ↓ record.id
          /undangan/[id] (SSR) ← baca record + template
                ↓
          [Tamu] buka link → lihat undangan → RSVP/ucapan → `wishes`
```

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Next.js    │     │   PocketBase     │     │   Tamu          │
│  (:3000)    │────▶│   (:8090)        │◀────│   (browser)     │
│  SSR/RSC    │     │  SQLite + files  │     │   mobile-first  │
└─────────────┘     └──────────────────┘     └─────────────────┘
```

## 2. Struktur Folder

```
ars-invitation/                    ← repo root (ini folder 'programming' di server)
├── app/                           ← Next.js App Router (routing = folder)
│   ├── layout.tsx                 ← Root layout: metadata, font, lang="id"
│   ├── page.tsx                   ← Landing page (client component)
│   ├── globals.css                ← Style global Tailwind
│   ├── editor/
│   │   └── page.tsx               ← Editor undangan (client, form + mockup)
│   └── undangan/
│       └── [id]/page.tsx          ← Halaman undangan publik (server, SSR)
├── components/
│   └── TemplateSelector.tsx       ← Grid pilihan template (client)
├── lib/
│   └── templates.ts               ← Definisi 6 template + helper getTemplate()
├── backend/
│   ├── pocketbase                 ← Binary PocketBase 0.25 (jangan commit beda versi sembarangan)
│   ├── pb_migrations/             ← JS migration schema DB (auto-run saat serve)
│   └── pb_data/                   ← SQLite + file upload (DIRENKAN commit — ada .gitignore lokal)
├── PRD.md                         ← Bisnis & fitur (apa & kenapa)
├── DESIGN_SYSTEM.md               ← Token visual (warna, font, spacing)
├── ARCHITECTURE.md                ← File ini
└── AGENTS.md                      ← SOP coding untuk AI agent
```

## 3. Routing & Rendering

| Route | Jenis | Render | Keterangan |
|---|---|---|---|
| `/` | Client | CSR | Landing marketing |
| `/editor` | Client | CSR | Form interaktif + live preview |
| `/undangan/[id]` | Server | **SSR** | Baca PocketBase tiap request, SEO-friendly |

**Kenapa undangan SSR?** Tamu tidak login; harus langsung dapat HTML berisi data (CEP di +3G, share preview OG). Editor client karena butuh interaksi form real-time.

### Kontrak `params` (PENTING — Next 16)

`params` di dynamic route adalah **Promise**, harus di-await:

```tsx
// ✅ BENAR
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
}

// ❌ SALAH — akan 404 diam-diam
export default async function Page({ params }: { params: { id: string } }) {
  const event = await pb.collection('events').getOne(params.id);
}
```

## 4. Database — PocketBase

URL: `http://100.74.92.59:8090` (Tailscale IP server)
Admin: `http://localhost:8090/_/`

### Collection: `events`

| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `id` | text | auto | Primary key, jadi URL `/undangan/[id]` |
| `title` | text | – | Judul acara |
| `groom_name` | text | – | Nama mempelai pria |
| `groom_parents` | text | – | Orang tua pria |
| `bride_name` | text | – | Nama mempelai wanita |
| `bride_parents` | text | – | Orang tua wanita |
| `event_date` | date | – | Tanggal acara (ISO string) |
| `akad_time` | text | – | Jam akad (string bebas, bukan timestamp) |
| `resepsi_time` | text | – | Jam resepsi |
| `location` | text | – | Nama gedung/tempat |
| `address_detail` | text | – | Alamat lengkap |
| `maps_url` | text | – | Link Google Maps |
| `bank_name` | text | – | Bank amplop digital |
| `bank_account` | text | – | No. rekening |
| `bank_holder` | text | – | Atas nama |
| `quote` | text | – | Ayat/kata mutiara |
| `template_id` | text | – | ID template dari `lib/templates.ts` |
| `photo_bg` | **file** | – | Foto background hero (1 file) |
| `gallery` | **file** | – | Galeri foto (maks 10 file) |
| `created` / `updated` | autodate | auto | Timestamp PocketBase |

**File constraints:** `image/jpeg`, `image/png`, `image/webp`, max 5MB per file.

### Collection: `wishes`

| Field | Tipe | Keterangan |
|---|---|---|
| `id` | text | Primary key |
| `event_id` | relation→`events` | Relasi ke undangan |
| `guest_name` | text | Nama tamu |
| `presence` | text | `Hadir` / `Tidak Hadir` / `Belum Pasti` |
| `message` | text | Isi ucapan |

### Migrations

File JS di `backend/pb_migrations/`, **auto-run saat PocketBase start**. Format: `<timestamp>_<deskripsi>.js`.

```bash
# Buat schema baru: JANGAN edit DB lewat admin UI langsung tanpa migrate
# PocketBase generate migration otomatis saat ubah schema via admin,
# atau tulis manual mengikuti pola file yang ada.
```

**Aturan:** setiap perubahan schema = 1 file migration baru. Jangan edit migration lama yang sudah ter-apply.

### Akses File Upload

URL file: `http://100.74.92.59:8090/api/files/{collectionId}/{recordId}/{filename}`

Konstruksi di kode (pattern yang dipakai `app/undangan/[id]/page.tsx`):

```ts
const pbUrl = 'http://100.74.92.59:8090';
const url = `${pbUrl}/api/files/${event.collectionId}/${event.id}/${event.photo_bg}`;
```

## 5. Template Engine

Template didefinisikan statis di `lib/templates.ts`, bukan di database. Alasannya: template = kode (animasi, layout), bukan data user.

```ts
getTemplate(id)              // ambil 1 template by id
getTemplatesByCategory(cat)  // filter by free/pro/premium
```

Tier gating ada di `TemplateSelector` via prop `userPlan` (`'free' | 'pro' | 'premium'`). Saat ini editor hardcode `userPlan="premium"` (demo) — nanti diganti data user dari auth.

## 6. Data Flow — Editor → Undangan

```
1. User isi form di /editor (state useState lokal)
2. Upload foto → state File[], preview via URL.createObjectURL()
3. Klik "Simpan & Terbitkan"
4. pb.collection('events').create(formData)     ← multipart: text + file digabung
5. Dapat record.id → alert link /undangan/{id}
6. Tamu buka → SSR baca record + getTemplate(template_id)
7. Render halaman dengan template.colors + template.fonts
```

## 7. Lingkungan & Perintah

```bash
# PocketBase
cd backend
./pocketbase serve --http=0.0.0.0:8090 --publicDir=./pb_public

# Next.js
npx next dev -p 3000 -H 0.0.0.0

# Build produksi
npx next build && npx next start
```

**Server:** Ubuntu, Tailscale IP `100.74.92.59`, port 3000 (web) + 8090 (PocketBase).

## 8. Gotcha yang Sudah Pernah Ngerti

- **PocketBase SDK autocancel di dev:** React StrictMode double-render membatalkan request pertama. Fix: `pb.autoCancellation(false)` setelah `new PocketBase()`.
- **`params` Promise:** Next 16 breaking change, lihat bagian 3.
- **`package-lock.json` di `/home/hermes`:** Next warning karena di luar repo. Abaikan, atau set `turbopack.root`.
- **Port 20128 di server:** itu app lain (`9router`), BUKAN proyek ini. Proyek ini port 3000.

## 9. Roadmap Arsitektur

- **Auth:** PocketBase Auth (email/password + OAuth Google) → cookie session Next.js
- **Dashboard:** route group `(dashboard)` dengan middleware auth
- **Media:** PocketBase thumbnails (`thumbs` di field file) untuk optimasi + CDN depan (BunnyCDN)
- **Deployment:** Docker compose (web + pocketbase) atau VPS baremetal + Nginx reverse proxy
