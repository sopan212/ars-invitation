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
    { id: 'free', label: 'Gratis', icon: '🆓', color: 'text-green-400' },
    { id: 'pro', label: 'Pro', icon: '⭐', color: 'text-yellow-400' },
    { id: 'premium', label: 'Premium', icon: '💎', color: 'text-purple-400' },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-4">
        {categories.map((cat) => {
          const isLocked = planOrder[cat.id] > userPlanLevel;
          return (
            <button
              key={cat.id}
              onClick={() => !isLocked && setActiveCategory(cat.id)}
              disabled={isLocked}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all 
                ${activeCategory === cat.id 
                  ? 'bg-white/10 border border-white/20' 
                  : 'text-gray-500 hover:text-white/70'} 
                ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              {isLocked && <span className="text-xs text-gray-400">(Upgrade)</span>}
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
            className={`relative group p-4 rounded-2xl border transition-all duration-300 
              ${selectedTemplate === template.id 
                ? 'border-yellow-400 bg-yellow-400/10 ring-2 ring-yellow-400/20' 
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'}`}
          >
            {/* Category Badge */}
            <div className="absolute top-3 right-3">
              <span className={`px-2 py-1 text-xs font-bold rounded-full 
                ${template.category === 'free' ? 'bg-green-500/20 text-green-400' : 
                 template.category === 'pro' ? 'bg-yellow-500/20 text-yellow-400' : 
                 'bg-purple-500/20 text-purple-400'}`}>
                {template.category.toUpperCase()}
              </span>
            </div>

            {/* Thumbnail */}
            <div className="aspect-square rounded-xl bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center mb-4 text-5xl group-hover:scale-105 transition-transform">
              {template.thumbnail}
            </div>

            {/* Info */}
            <h4 className="font-bold text-white mb-1 group-hover:text-yellow-400 transition">{template.name}</h4>
            <p className="text-xs text-gray-400 mb-3 line-clamp-2">{template.description}</p>

            {/* Features */}
            <div className="flex flex-wrap gap-1 mb-4">
              {template.features.music && <span className="px-2 py-0.5 text-xs bg-purple-500/20 text-purple-400 rounded">🎵 Musik</span>}
              {template.features.countdown && <span className="px-2 py-0.5 text-xs bg-blue-500/20 text-blue-400 rounded">⏱ Countdown</span>}
              {template.features.gallery && <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded">🖼 Gallery</span>}
              {template.features.map && <span className="px-2 py-0.5 text-xs bg-orange-500/20 text-orange-400 rounded">🗺 Map</span>}
            </div>

            {/* Selection Indicator */}
            {selectedTemplate === template.id && (
              <div className="absolute inset-0 border-2 border-yellow-400 rounded-2xl pointer-events-none animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Upgrade Notice */}
      {activeCategory !== 'free' && userPlanLevel < planOrder[activeCategory] && (
        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-center">
          <p className="text-yellow-300 text-sm">
            Template ini butuh paket <span className="font-bold">{activeCategory.toUpperCase()}</span>. 
            <a href="#pricing" className="text-yellow-400 underline hover:text-yellow-300">Upgrade di sini</a>
          </p>
        </div>
      )}
    </div>
  );
}