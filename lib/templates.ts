export type TemplateCategory = 'free' | 'pro' | 'premium';

export interface TemplateConfig {
  id: string;
  name: string;
  category: TemplateCategory;
  thumbnail: string; // emoji or image path
  description: string;
  // Style tokens
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  // Layout options
  layout: 'classic' | 'modern' | 'minimal' | 'elegant';
  // Animation
  animations: {
    enabled: boolean;
    type?: 'fade' | 'slide' | 'parallax' | 'particles';
    intensity?: 'low' | 'medium' | 'high';
  };
  // Features
  features: {
    music: boolean;
    countdown: boolean;
    gallery: boolean;
    rsvp: boolean;
    map: boolean;
  };
  // Musik latar bawaan (hanya jika features.music)
  music?: {
    defaultTrack?: string;   // nama file di /public/music/
    label?: string;
  };
  // Story timeline (premium: 3 babak kisah cinta)
  story?: {
    enabled: boolean;
    chapters: Array<{
      id: string;
      label: string;   // Pertemuan / Lamaran / Hari Bahagia
      desc: string;
    }>;
  };
}

export const TEMPLATES: Record<string, TemplateConfig> = {
  // ===== FREE / STATIC =====
  'classic-elegant': {
    id: 'classic-elegant',
    name: 'Classic Elegant',
    category: 'free',
    thumbnail: '🤍',
    description: 'Klasik, bersih, dan timeless. Cocok buat acara formal.',
    colors: {
      primary: '#1a1a2e',
      secondary: '#16213e',
      accent: '#e94560',
      background: '#ffffff',
      text: '#1a1a2e',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Inter',
    },
    layout: 'classic',
    animations: { enabled: false },
    features: { music: false, countdown: true, gallery: false, rsvp: true, map: true },
  },
  'minimal-gold': {
    id: 'minimal-gold',
    name: 'Minimal Gold',
    category: 'free',
    thumbnail: '✨',
    description: 'Minimalis dengan sentuhan gold. Simple tapi mewah.',
    colors: {
      primary: '#1a1a1a',
      secondary: '#2d2d2d',
      accent: '#d4a843',
      background: '#fafafa',
      text: '#1a1a1a',
    },
    fonts: {
      heading: 'Cormorant Garamond',
      body: 'DM Sans',
    },
    layout: 'minimal',
    animations: { enabled: false },
    features: { music: false, countdown: false, gallery: false, rsvp: true, map: false },
  },

  // ===== PRO / SEMI-ANIMATED =====
  'modern-purple': {
    id: 'modern-purple',
    name: 'Modern Purple',
    category: 'pro',
    thumbnail: '💜',
    description: 'Modern, gradient ungu, animasi halus. Cocok buat gen-Z.',
    colors: {
      primary: '#1a1a4e',
      secondary: '#16213e',
      accent: '#a855f7',
      background: '#0f0f23',
      text: '#f1f5f9',
    },
    fonts: {
      heading: 'Space Grotesk',
      body: 'Inter',
    },
    layout: 'modern',
    animations: { enabled: true, type: 'fade', intensity: 'low' },
    features: { music: true, countdown: true, gallery: true, rsvp: true, map: true },
    music: { defaultTrack: 'wedding-piano.mp3', label: 'Piano Dream' },
  },
  'rustic-garden': {
    id: 'rustic-garden',
    name: 'Rustic Garden',
    category: 'pro',
    thumbnail: '🌿',
    description: 'Nuansa taman, warna earth-tone, animasi leaf-fall.',
    colors: {
      primary: '#1b4332',
      secondary: '#2d6a4f',
      accent: '#d4a843',
      background: '#fefae0',
      text: '#1b4332',
    },
    fonts: {
      heading: 'Great Vibes',
      body: 'Nunito',
    },
    layout: 'elegant',
    animations: { enabled: true, type: 'parallax', intensity: 'medium' },
    features: { music: true, countdown: true, gallery: true, rsvp: true, map: true },
    music: { defaultTrack: 'wedding-strings.mp3', label: 'Strings Romance' },
  },

  // ===== PREMIUM / FULL ANIMATED =====
  'royal-gold': {
    id: 'royal-gold',
    name: 'Royal Gold',
    category: 'premium',
    thumbnail: '👑',
    description: 'Full animated: particle gold, parallax depth, cinematic transition.',
    colors: {
      primary: '#0d0d0d',
      secondary: '#1a1a1a',
      accent: '#ffd700',
      background: '#050505',
      text: '#fff8e7',
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Lora',
    },
    layout: 'elegant',
    animations: { enabled: true, type: 'particles', intensity: 'high' },
    features: { music: true, countdown: true, gallery: true, rsvp: true, map: true },
    music: { defaultTrack: 'wedding-piano.mp3', label: 'Royal Piano' },
    story: {
      enabled: true,
      chapters: [
        { id: 'meet', label: 'Pertemuan', desc: 'Awal mula kisah kami berdua dimulai' },
        { id: 'propose', label: 'Lamaran', desc: 'Janji suci untuk sehidup semati' },
        { id: 'wedding', label: 'Hari Bahagia', desc: 'Hari di mana kami resmi jadi satu' },
      ],
    },
  },
  'cosmic-dream': {
    id: 'cosmic-dream',
    name: 'Cosmic Dream',
    category: 'premium',
    thumbnail: '🌌',
    description: 'Space theme: starfield, nebula gradient, 3D card flip.',
    colors: {
      primary: '#0a0a2a',
      secondary: '#1a1a4e',
      accent: '#00ffff',
      background: '#03031a',
      text: '#e0e7ff',
    },
    fonts: {
      heading: 'Orbitron',
      body: 'Rajdhani',
    },
    layout: 'modern',
    animations: { enabled: true, type: 'parallax', intensity: 'high' },
    features: { music: true, countdown: true, gallery: true, rsvp: true, map: true },
    music: { defaultTrack: 'wedding-acoustic.mp3', label: 'Cosmic Acoustic' },
    story: {
      enabled: true,
      chapters: [
        { id: 'meet', label: 'Pertemuan', desc: 'Seperti bintang yang ditakdirkan bertabrakan' },
        { id: 'propose', label: 'Lamaran', desc: 'Galaksi menyaksikan janji suci kami' },
        { id: 'wedding', label: 'Hari Bahagia', desc: 'Semesta merayakan hari penyatuan kami' },
      ],
    },
  },
};

export function getTemplatesByCategory(category: TemplateCategory): TemplateConfig[] {
  return Object.values(TEMPLATES).filter(t => t.category === category);
}

export function getTemplate(id: string): TemplateConfig | undefined {
  return TEMPLATES[id];
}