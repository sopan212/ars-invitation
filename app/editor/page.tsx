'use client';

import { useState } from 'react';
import PocketBase from 'pocketbase';
import { TemplateSelector } from '@/components/TemplateSelector';
import { getTemplate } from '@/lib/templates';

const pb = new PocketBase('http://100.74.92.59:8090');

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState<'couple' | 'event' | 'gift' | 'template'>('couple');
  
  // Form State
  const [title, setTitle] = useState('Pernikahan Romeo & Juliet');
  const [groomName, setGroomName] = useState('Romeo Montague');
  const [groomParents, setGroomParents] = useState('Putra dari Bapak Montague & Ibu Montague');
  const [brideName, setBrideName] = useState('Juliet Capulet');
  const [brideParents, setBrideParents] = useState('Putri dari Bapak Capulet & Ibu Capulet');
  
  const [date, setDate] = useState('2026-12-31');
  const [akadTime, setAkadTime] = useState('08:00 - 10:00 WIB');
  const [resepsiTime, setResepsiTime] = useState('11:00 - 14:00 WIB');
  const [location, setLocation] = useState('Grand Ballroom Hotel Mulia');
  const [addressDetail, setAddressDetail] = useState('Jl. Asia Afrika No.6, Gelora, Tanah Abang, Jakarta Pusat');
  const [mapsUrl, setMapsUrl] = useState('https://maps.google.com');
  const [quote, setQuote] = useState('Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya (QS. Ar-Rum: 21)');
  
  const [bankName, setBankName] = useState('BCA');
  const [bankAccount, setBankAccount] = useState('1234567890');
  const [bankHolder, setBankHolder] = useState('Romeo Montague');

  const [selectedTemplate, setSelectedTemplate] = useState('classic-elegant');

  const template = getTemplate(selectedTemplate);

  const handleSave = async () => {
    try {
      const data = { 
        title, 
        groom_name: groomName,
        groom_parents: groomParents,
        bride_name: brideName,
        bride_parents: brideParents,
        event_date: date ? new Date(date).toISOString() : new Date().toISOString(), 
        akad_time: akadTime,
        resepsi_time: resepsiTime,
        location,
        address_detail: addressDetail,
        maps_url: mapsUrl,
        quote,
        bank_name: bankName,
        bank_account: bankAccount,
        bank_holder: bankHolder,
        template_id: selectedTemplate,
      };
      
      const record = await pb.collection('events').create(data);
      const publicUrl = `http://100.74.92.59:3000/undangan/${record.id}`;
      alert(`Berhasil disimpan ke Database! 🚀\n\nID Undangan: ${record.id}\nLink Undangan: ${publicUrl}`);
    } catch (error: any) {
      console.error('Save error details:', error);
      alert('Gagal simpan: ' + (error?.message || JSON.stringify(error)));
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a4e] text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4 sticky top-0 bg-[#1a1a4e]/90 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <span className="text-[#FFD700]">ARS</span>.editor
          </h1>
          <button 
            onClick={handleSave} 
            className="bg-[#FFD700] text-[#1a1a4e] px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#ffdd33] transition hover:scale-105 active:scale-95 shadow-lg shadow-[#FFD700]/20"
          >
            💾 Simpan & Terbitkan Undangan
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
          {[
            { id: 'couple', label: '💑 Pengantin' },
            { id: 'event', label: '📅 Waktu & Lokasi' },
            { id: 'gift', label: '💳 Hadiah & Quote' },
            { id: 'template', label: '🎨 Desain & Tema' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition ${
                activeTab === tab.id 
                  ? 'bg-[#FFD700] text-[#1a1a4e] font-bold shadow' 
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'couple' && (
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-6">
                <h3 className="text-xl font-bold text-[#FFD700]">Informasi Mempelai</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Judul Undangan / Acara</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Groom */}
                  <div className="space-y-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <h4 className="font-bold text-blue-400">🤵 Mempelai Pria</h4>
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">Nama Lengkap</label>
                      <input 
                        type="text" 
                        value={groomName}
                        onChange={(e) => setGroomName(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/5 p-2.5 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">Nama Orang Tua</label>
                      <input 
                        type="text" 
                        value={groomParents}
                        onChange={(e) => setGroomParents(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/5 p-2.5 text-sm text-white"
                      />
                    </div>
                  </div>

                  {/* Bride */}
                  <div className="space-y-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <h4 className="font-bold text-pink-400">👰 Mempelai Wanita</h4>
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">Nama Lengkap</label>
                      <input 
                        type="text" 
                        value={brideName}
                        onChange={(e) => setBrideName(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/5 p-2.5 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">Nama Orang Tua</label>
                      <input 
                        type="text" 
                        value={brideParents}
                        onChange={(e) => setBrideParents(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/5 p-2.5 text-sm text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'event' && (
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-5">
                <h3 className="text-xl font-bold text-[#FFD700]">Waktu & Tempat Acara</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Tanggal Utama</label>
                    <input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Waktu Akad</label>
                    <input 
                      type="text" 
                      value={akadTime}
                      onChange={(e) => setAkadTime(e.target.value)}
                      placeholder="08:00 - 10:00 WIB"
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Waktu Resepsi</label>
                    <input 
                      type="text" 
                      value={resepsiTime}
                      onChange={(e) => setResepsiTime(e.target.value)}
                      placeholder="11:00 - 14:00 WIB"
                      className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Nama Gedung / Tempat</label>
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Alamat Lengkap</label>
                  <textarea 
                    value={addressDetail}
                    onChange={(e) => setAddressDetail(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Link Google Maps</label>
                  <input 
                    type="url" 
                    value={mapsUrl}
                    onChange={(e) => setMapsUrl(e.target.value)}
                    placeholder="https://maps.google.com/..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50"
                  />
                </div>
              </div>
            )}

            {activeTab === 'gift' && (
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-5">
                <h3 className="text-xl font-bold text-[#FFD700]">Amplop Digital & Kutipan</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Ayat / Kata Mutiara / Quote</label>
                  <textarea 
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50"
                  />
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-4">
                  <h4 className="font-bold text-yellow-400">💳 Rekening Hadiah / Amplop Digital</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">Bank / E-Wallet</label>
                      <input 
                        type="text" 
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="BCA / Mandiri / GoPay"
                        className="w-full rounded-lg border border-white/10 bg-white/5 p-2.5 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">No. Rekening</label>
                      <input 
                        type="text" 
                        value={bankAccount}
                        onChange={(e) => setBankAccount(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/5 p-2.5 text-sm text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-300 mb-1">Atas Nama</label>
                      <input 
                        type="text" 
                        value={bankHolder}
                        onChange={(e) => setBankHolder(e.target.value)}
                        className="w-full rounded-lg border border-white/10 bg-white/5 p-2.5 text-sm text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'template' && (
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-[#FFD700] mb-6">Pilih Desain & Tema Undangan</h3>
                <TemplateSelector 
                  selectedTemplate={selectedTemplate} 
                  onSelect={setSelectedTemplate}
                  userPlan="premium"
                />
              </div>
            )}
          </div>

          {/* Right Column: Live Mobile Mockup */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-400 px-1">
                <span>📱 Mockup Tampilan Tamu</span>
                <span className="text-[#FFD700]">{template?.name}</span>
              </div>

              {/* Phone Frame */}
              <div className="relative mx-auto rounded-[36px] border-[8px] border-[#2d2d44] shadow-2xl overflow-hidden bg-black aspect-[9/18] max-h-[640px] flex flex-col">
                <div 
                  className="flex-1 overflow-y-auto p-6 text-center space-y-6 flex flex-col justify-between"
                  style={{ 
                    backgroundColor: template?.colors.background || '#ffffff',
                    color: template?.colors.text || '#1a1a1a',
                  }}
                >
                  <div className="pt-6 space-y-3">
                    <p className="text-[10px] tracking-widest uppercase opacity-70">The Wedding Of</p>
                    <h3 
                      className="text-2xl font-bold leading-tight"
                      style={{ color: template?.colors.primary }}
                    >
                      {groomName.split(' ')[0]} & {brideName.split(' ')[0]}
                    </h3>
                    <div className="w-10 h-0.5 mx-auto opacity-30" style={{ backgroundColor: template?.colors.accent }} />
                    <p className="text-xs opacity-80">
                      {date ? new Date(date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl border text-xs space-y-1" style={{ borderColor: template?.colors.accent + '40', backgroundColor: template?.colors.secondary + '10' }}>
                    <p className="font-bold">{location}</p>
                    <p className="text-[10px] opacity-70 line-clamp-2">{addressDetail}</p>
                  </div>

                  <div className="pb-4 space-y-2">
                    <div className="w-full py-2.5 rounded-full text-xs font-bold shadow" style={{ backgroundColor: template?.colors.accent, color: template?.colors.background }}>
                      ✉️ Buka Undangan
                    </div>
                    <p className="text-[9px] opacity-40">ARS.invitation Digital Card</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
