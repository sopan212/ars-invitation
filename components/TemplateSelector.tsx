'use client';

import { useState } from 'react';
import { TEMPLATES, TemplateConfig, getTemplatesByCategory } from '@/lib/templates';

export function TemplateSelector({ 
  selectedTemplate, 
  onSelect, 
  userPlan = 'free' 
}: { 
  selectedTemplate: string; 
  onSelect: (id: string) => void;
  userPlan?: 'free' | 'pro' | 'premium';
}) {
  const [activeCategory, setActiveCategory] = useState<'free' | 'pro' | 'premium'>('free');
  
  const planOrder = { free: 0, pro: 1, premium: 2 };
  const userPlanLevel = planOrder[userPlan];

  const categories = [
    { id: 'free', label: 'Gratis', icon: '🆓' },
    { id: 'pro', label: 'Pro', icon: '⭐' },
    { id: 'premium', label: 'Premium', icon: '💎' },
  ] as const;

  const badgeColor: Record<string, string> = {
    free: 'bg-[#7C8B6F]/10 text-[#7C8B6F]',
    pro: 'bg-[#C08552]/15 text-[#A66B3F]',
    premium: 'bg-[#2A2622]/10 text-[#2A2622]',
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex gap-2 border-b border-[#E5DED2] pb-4">
        {categories.map((cat) => {
          const isLocked = planOrder[cat.id] > userPlanLevel;
          return (
            <button
              key={cat.id}
              onClick={() => !isLocked && setActiveCategory(cat.id)}
              disabled={isLocked}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border 
                ${activeCategory === cat.id 
                  ? 'bg-[#7C8B6F] border-[#7C8B6F] text-white' 
                  : 'text-[#6B6157] border-[#E5DED2] hover:text-[#2A2622] hover:border-[#D6CBB9]'} 
                ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              {isLocked && <span className="text-xs opacity-70">(Upgrade)</span>}
            </button>
          );
        })}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {getTemplatesByCategory(activeCategory).map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={`relative group p-4 rounded-2xl border transition-all duration-300 text-left
              ${selectedTemplate === template.id 
                ? 'border-[#7C8B6F] bg-[#7C8B6F]/5 ring-2 ring-[#7C8B6F]/20' 
                : 'border-[#E5DED2] bg-[#FAF7F2] hover:border-[#D6CBB9] hover:bg-[#FFFDF9]'}`}
          >
            {/* Category Badge */}
            <div className="absolute top-3 right-3">
              <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase tracking-wide ${badgeColor[template.category]}`}>
                {template.category}
              </span>
            </div>

            {/* Thumbnail, preview warna template asli */}
            <div 
              className="aspect-square rounded-xl flex items-center justify-center mb-4 text-5xl group-hover:scale-105 transition-transform"
              style={{ 
                backgroundColor: template.colors.background,
                color: template.colors.accent,
              }}
            >
              {template.thumbnail}
            </div>

            {/* Info */}
            <h4 className="font-bold text-[#2A2622] mb-1 group-hover:text-[#7C8B6F] transition">{template.name}</h4>
            <p className="text-xs text-[#6B6157] mb-3 line-clamp-2">{template.description}</p>

            {/* Features */}
            <div className="flex flex-wrap gap-1 mb-4">
              {template.features.music && <span className="px-2 py-0.5 text-xs bg-[#7C8B6F]/10 text-[#7C8B6F] rounded">🎵 Musik</span>}
              {template.features.countdown && <span className="px-2 py-0.5 text-xs bg-[#7C8B6F]/10 text-[#7C8B6F] rounded">⏱ Countdown</span>}
              {template.features.gallery && <span className="px-2 py-0.5 text-xs bg-[#7C8B6F]/10 text-[#7C8B6F] rounded">🖼 Gallery</span>}
              {template.features.map && <span className="px-2 py-0.5 text-xs bg-[#7C8B6F]/10 text-[#7C8B6F] rounded">🗺 Map</span>}
            </div>

            {/* Selection Indicator */}
            {selectedTemplate === template.id && (
              <div className="absolute inset-0 border-2 border-[#7C8B6F] rounded-2xl pointer-events-none" />
            )}

            {/* Preview link, hasil jadi template ini */}
            <a
              href={`/preview/${template.id}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-3 right-3 inline-flex items-center gap-1 text-[11px] font-medium text-[#7C8B6F] hover:text-[#5F6E54] bg-[#FFFDF9]/90 backdrop-blur px-2.5 py-1 rounded-full border border-[#E5DED2] transition z-10"
            >
              👁️ Contoh jadi
            </a>
          </button>
        ))}
      </div>

      {/* Upgrade Notice */}
      {activeCategory !== 'free' && userPlanLevel < planOrder[activeCategory] && (
        <div className="p-4 rounded-xl bg-[#C08552]/10 border border-[#C08552]/30 text-center">
          <p className="text-[#A66B3F] text-sm">
            Template ini butuh paket <span className="font-bold">{activeCategory.toUpperCase()}</span>. 
            <a href="#pricing" className="underline hover:opacity-70">Upgrade di sini</a>
          </p>
        </div>
      )}
    </div>
  );
}
