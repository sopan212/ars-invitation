// ARS.invitation — Platform UI theme tokens (Warm Minimalist)
// Single source of truth untuk warna/font UI app (bukan halaman undangan).
// Halaman undangan tetap baca template.colors/fonts dari lib/templates.ts
// Update DESIGN_SYSTEM.md jika token di sini berubah.

export const theme = {
  cream: '#FAF7F2',       // background utama
  ivory: '#FFFDF9',       // panel/card di atas cream
  ink: '#2A2622',         // teks utama (warm near-black)
  inkSoft: '#6B6157',     // teks sekunder (label/hint)
  sage: '#7C8B6F',        // accent 1 (nav, badge, heading highlight)
  sageDeep: '#5F6E54',    // hover/active sage
  terra: '#C08552',       // accent 2 (CTA, focus ring)
  terraDeep: '#A66B3F',   // hover terra
  line: '#E5DED2',        // divider / border lembut
  lineStrong: '#D6CBB9',  // border hover/aktif
} as const;

// Kelas warna teks (Tailwind arbitrary) biar konsisten & gampang ganti massal
export const tc = {
  text: 'text-[#2A2622]',
  textSoft: 'text-[#6B6157]',
  textFaint: 'text-[#9C9286]',
  sage: 'text-[#7C8B6F]',
  terra: 'text-[#C08552]',
} as const;

// Kelas komponen siap pakai
export const cc = {
  page: 'bg-[#FAF7F2] text-[#2A2622]',
  header: 'bg-[#FAF7F2]/90 backdrop-blur border-b border-[#E5DED2]',
  panel: 'bg-[#FFFDF9] border border-[#E5DED2] p-6 rounded-2xl',
  panelSub: 'p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DED2]',
  label: 'block text-sm font-medium text-[#6B6157] mb-1.5',
  labelSm: 'block text-xs text-[#6B6157] mb-1',
  input: 'w-full rounded-xl border border-[#E5DED2] bg-[#FAF7F2] p-3 text-[#2A2622] focus:outline-none focus:ring-2 focus:ring-[#C08552]/40 focus:border-[#C08552] placeholder:text-[#B4A99A]',
  inputSm: 'w-full rounded-lg border border-[#E5DED2] bg-[#FAF7F2] p-2.5 text-sm text-[#2A2622] focus:outline-none focus:ring-2 focus:ring-[#C08552]/40 focus:border-[#C08552] placeholder:text-[#B4A99A]',
  cta: 'bg-[#C08552] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#A66B3F] transition hover:scale-105 active:scale-95 shadow-sm shadow-[#C08552]/30',
  ctaLg: 'inline-block bg-[#C08552] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#A66B3F] transition hover:scale-105 active:scale-95 shadow-lg shadow-[#C08552]/25',
  ghost: 'border border-[#D6CBB9] text-[#2A2622] px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#FAF7F2] transition',
  tab: (active: boolean) =>
    `px-5 py-2.5 rounded-full font-medium text-sm transition border ${
      active
        ? 'bg-[#7C8B6F] border-[#7C8B6F] text-white font-bold shadow-sm'
        : 'bg-transparent border-[#E5DED2] text-[#6B6157] hover:text-[#2A2622] hover:border-[#D6CBB9]'
    }`,
  fileInput: 'block w-full text-sm text-[#6B6157] file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#7C8B6F] file:text-white hover:file:bg-[#5F6E54] cursor-pointer',
  sectionHeading: 'text-xl font-bold text-[#2A2622]',
} as const;
