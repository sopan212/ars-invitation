'use client';

import { useState } from 'react';
import PocketBase from 'pocketbase';
import { TemplateSelector } from '@/components/TemplateSelector';
import { getTemplate } from '@/lib/templates';

const pb = new PocketBase('http://100.74.92.59:8090');

export default function EditorPage() {
  const [title, setTitle] = useState('Pernikahan Kami');
  const [date, setDate] = useState('2026-12-31');
  const [location, setLocation] = useState('Jakarta, Indonesia');
  const [selectedTemplate, setSelectedTemplate] = useState('classic-elegant');
  const [activeTab, setActiveTab] = useState<'data' | 'template'>('data');

  const template = getTemplate(selectedTemplate);

  const handleSave = async () => {
    try {
      const data = { 
        title, 
        event_date: new Date(date).toISOString(), 
        location,
        template_id: selectedTemplate,
      };
      
      const record = await pb.collection('events').create(data);
      console.log('Saved:', record);
      alert('Data berhasil disimpan ke database, BOSS! ID: ' + record.id);
    } catch (error: any) {
      console.error('Save error details:', error);
      alert('Gagal simpan: ' + (error?.message || JSON.stringify(error)));
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a4e] text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <span className="text-[#FFD700]">ARS</span>.editor
          </h1>
          <button 
            onClick={handleSave} 
            className="bg-[#FFD700] text-[#1a1a4e] px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#ffdd33] transition hover:scale-105 active:scale-95"
          >
            💾 Simpan Undangan
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Switcher */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('data')}
            className={`px-6 py-2.5 rounded-full font-medium text-sm transition ${activeTab === 'data' ? 'bg-white/10 border border-white/20 text-white' : 'text-gray-500 hover:text-white/70'}`}
          >
            📝 Data Acara
          </button>
          <button
            onClick={() => setActiveTab('template')}
            className={`px-6 py-2.5 rounded-full font-medium text-sm transition ${activeTab === 'template' ? 'bg-white/10 border border-white/20 text-white' : 'text-gray-500 hover:text-white/70'}`}
          >
            🎨 Pilih Template
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Form or Template Selector */}
          <div className="lg:col-span-2">
            {activeTab === 'data' ? (
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Judul Acara</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700]/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Tanggal</label>
                  <input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700]/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Lokasi</label>
                  <textarea 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700]/50"
                  />
                </div>
              </div>
            ) : (
              <TemplateSelector 
                selectedTemplate={selectedTemplate} 
                onSelect={setSelectedTemplate}
                userPlan="premium"
              />
            )}
          </div>

          {/* Right Panel - Live Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Preview Undangan</h3>
              <div 
                className="rounded-2xl overflow-hidden border border-white/10 aspect-[9/16] flex flex-col items-center justify-center p-8 text-center transition-all duration-500"
                style={{ 
                  backgroundColor: template?.colors.background || '#ffffff',
                  color: template?.colors.text || '#1a1a1a',
                }}
              >
                <div className="text-5xl mb-6">{template?.thumbnail || '💍'}</div>
                <h4 
                  className="text-2xl font-bold mb-3 leading-tight"
                  style={{ color: template?.colors.primary }}
                >
                  {title}
                </h4>
                <p 
                  className="text-sm mb-2"
                  style={{ color: template?.colors.accent }}
                >
                  {new Date(date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-xs opacity-70">{location}</p>
                
                {/* Template Name Badge */}
                <div className="mt-8 px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: template?.colors.accent + '20', color: template?.colors.accent }}>
                  {template?.name || 'No Template'}
                </div>

                {/* Feature Icons */}
                <div className="mt-4 flex gap-2 text-xs opacity-50">
                  {template?.features.music && <span>🎵</span>}
                  {template?.features.countdown && <span>⏱</span>}
                  {template?.features.gallery && <span>🖼</span>}
                  {template?.features.rsvp && <span>💌</span>}
                  {template?.features.map && <span>🗺</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
