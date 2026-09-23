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

  // Photo state — ponytail: preview via object URL, replaced by PB url after save
  const [photoBg, setPhotoBg] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);
  const [photoBgPreview, setPhotoBgPreview] = useState<string>('');
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  const template = getTemplate(selectedTemplate);

  const handlePhotoBg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setPhotoBg(f);
    setPhotoBgPreview(f ? URL.createObjectURL(f) : '');
  };

  const handleGallery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setGallery(files);
    setGalleryPreviews(files.map((f) => URL.createObjectURL(f)));
  };

  const handleSave = async () => {
    try {
      const data: Record<string, any> = { 
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

      if (photoBg) data.photo_bg = photoBg;
      if (gallery.length > 0) data.gallery = gallery;
      
      const record = await pb.collection('events').create(data);
      const publicUrl = `http://100.74.92.59:3000/undangan/${record.id}`;
      alert(`Berhasil disimpan ke Database! 🚀\n\nID Undangan: ${record.id}\nLink Undangan: ${publicUrl}`);
    } catch (error: any) {
      console.error('Save error details:', error);
      alert('Gagal simpan: ' + (error?.message || JSON.stringify(error)));
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A2622] font-sans">
      {/* Header */}
      <div className="border-b border-[#E5DED2] px-6 py-4 sticky top-0 bg-[#FAF7F2]/90 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="font-serif text-2xl font-semibold">
            <span className="text-[#7C8B6F]">ARS</span>.editor
          </h1>
          <button 
            onClick={handleSave} 
            className="bg-[#C08552] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#A66B3F] transition hover:scale-105 active:scale-95 shadow-sm shadow-[#C08552]/30"
          >
            💾 Simpan & Terbitkan Undangan
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[#E5DED2] pb-4">
          {[
            { id: 'couple', label: '💑 Pengantin' },
            { id: 'event', label: '📅 Waktu & Lokasi' },
            { id: 'gift', label: '💳 Hadiah & Quote' },
            { id: 'template', label: '🎨 Desain & Tema' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition border ${
                activeTab === tab.id 
                  ? 'bg-[#7C8B6F] border-[#7C8B6F] text-white font-bold shadow-sm' 
                  : 'bg-transparent border-[#E5DED2] text-[#6B6157] hover:text-[#2A2622] hover:border-[#D6CBB9]'
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
              <div className="bg-[#FFFDF9] border border-[#E5DED2] p-6 rounded-2xl space-y-6">
                <h3 className="font-serif text-xl font-bold">Informasi Mempelai</h3>
                
                <div>
                  <label className="block text-sm font-medium text-[#6B6157] mb-1.5">Judul Undangan / Acara</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl border border-[#E5DED2] bg-[#FAF7F2] p-3 text-[#2A2622] focus:outline-none focus:ring-2 focus:ring-[#C08552]/40 focus:border-[#C08552]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Groom */}
                  <div className="space-y-4 p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DED2]">
                    <h4 className="font-bold text-[#7C8B6F]">🤵 Mempelai Pria</h4>
                    <div>
                      <label className="block text-xs text-[#6B6157] mb-1">Nama Lengkap</label>
                      <input 
                        type="text" 
                        value={groomName}
                        onChange={(e) => setGroomName(e.target.value)}
                        className="w-full rounded-lg border border-[#E5DED2] bg-[#FFFDF9] p-2.5 text-sm text-[#2A2622] focus:outline-none focus:ring-2 focus:ring-[#C08552]/40 focus:border-[#C08552]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6B6157] mb-1">Nama Orang Tua</label>
                      <input 
                        type="text" 
                        value={groomParents}
                        onChange={(e) => setGroomParents(e.target.value)}
                        className="w-full rounded-lg border border-[#E5DED2] bg-[#FFFDF9] p-2.5 text-sm text-[#2A2622] focus:outline-none focus:ring-2 focus:ring-[#C08552]/40 focus:border-[#C08552]"
                      />
                    </div>
                  </div>

                  {/* Bride */}
                  <div className="space-y-4 p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DED2]">
                    <h4 className="font-bold text-[#C08552]">👰 Mempelai Wanita</h4>
                    <div>
                      <label className="block text-xs text-[#6B6157] mb-1">Nama Lengkap</label>
                      <input 
                        type="text" 
                        value={brideName}
                        onChange={(e) => setBrideName(e.target.value)}
                        className="w-full rounded-lg border border-[#E5DED2] bg-[#FFFDF9] p-2.5 text-sm text-[#2A2622] focus:outline-none focus:ring-2 focus:ring-[#C08552]/40 focus:border-[#C08552]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6B6157] mb-1">Nama Orang Tua</label>
                      <input 
                        type="text" 
                        value={brideParents}
                        onChange={(e) => setBrideParents(e.target.value)}
                        className="w-full rounded-lg border border-[#E5DED2] bg-[#FFFDF9] p-2.5 text-sm text-[#2A2622] focus:outline-none focus:ring-2 focus:ring-[#C08552]/40 focus:border-[#C08552]"
                      />
                    </div>
                  </div>
                </div>

                {/* Background photo */}
                <div className="space-y-3 pt-2 border-t border-[#E5DED2]">
                  <label className="block text-sm font-medium text-[#6B6157]">
                    🌅 Foto Background (Hero / Cover)
                  </label>
                  <p className="text-xs text-[#9C9286]">JPG / PNG / WEBP, maks 5MB. Ditampilkan sebagai latar belakang halaman utama undangan.</p>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handlePhotoBg}
                    className="block w-full text-sm text-[#6B6157] file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#7C8B6F] file:text-white hover:file:bg-[#5F6E54] cursor-pointer"
                  />
                  {photoBgPreview && (
                    <div className="relative rounded-xl overflow-hidden border border-[#E5DED2] max-h-64">
                      <img src={photoBgPreview} alt="Preview background" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Gallery photos */}
                <div className="space-y-3 pt-2 border-t border-[#E5DED2]">
                  <label className="block text-sm font-medium text-[#6B6157]">
                    📚 Galeri Foto (maks 10 foto)
                  </label>
                  <p className="text-xs text-[#9C9286]">JPG / PNG / WEBP, maks 5MB per foto. Ditampilkan sebagai galeri prewedding di undangan.</p>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    onChange={handleGallery}
                    className="block w-full text-sm text-[#6B6157] file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#7C8B6F] file:text-white hover:file:bg-[#5F6E54] cursor-pointer"
                  />
                  {galleryPreviews.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {galleryPreviews.map((src, i) => (
                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-[#E5DED2]">
                          <img src={src} alt={`Galeri ${i + 1}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'event' && (
              <div className="bg-[#FFFDF9] border border-[#E5DED2] p-6 rounded-2xl space-y-5">
                <h3 className="font-serif text-xl font-bold">Waktu & Tempat Acara</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#6B6157] mb-1.5">Tanggal Utama</label>
                    <input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-xl border border-[#E5DED2] bg-[#FAF7F2] p-3 text-[#2A2622] focus:outline-none focus:ring-2 focus:ring-[#C08552]/40 focus:border-[#C08552]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#6B6157] mb-1.5">Waktu Akad</label>
                    <input 
                      type="text" 
                      value={akadTime}
                      onChange={(e) => setAkadTime(e.target.value)}
                      placeholder="08:00 - 10:00 WIB"
                      className="w-full rounded-xl border border-[#E5DED2] bg-[#FAF7F2] p-3 text-[#2A2622] focus:outline-none focus:ring-2 focus:ring-[#C08552]/40 focus:border-[#C08552] placeholder:text-[#B4A99A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#6B6157] mb-1.5">Waktu Resepsi</label>
                    <input 
                      type="text" 
                      value={resepsiTime}
                      onChange={(e) => setResepsiTime(e.target.value)}
                      placeholder="11:00 - 14:00 WIB"
                      className="w-full rounded-xl border border-[#E5DED2] bg-[#FAF7F2] p-3 text-[#2A2622] focus:outline-none focus:ring-2 focus:ring-[#C08552]/40 focus:border-[#C08552] placeholder:text-[#B4A99A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B6157] mb-1.5">Nama Gedung / Tempat</label>
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-xl border border-[#E5DED2] bg-[#FAF7F2] p-3 text-[#2A2622] focus:outline-none focus:ring-2 focus:ring-[#C08552]/40 focus:border-[#C08552]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B6157] mb-1.5">Alamat Lengkap</label>
                  <textarea 
                    value={addressDetail}
                    onChange={(e) => setAddressDetail(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-[#E5DED2] bg-[#FAF7F2] p-3 text-[#2A2622] focus:outline-none focus:ring-2 focus:ring-[#C08552]/40 focus:border-[#C08552]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6B6157] mb-1.5">Link Google Maps</label>
                  <input 
                    type="url" 
                    value={mapsUrl}
                    onChange={(e) => setMapsUrl(e.target.value)}
                    placeholder="https://maps.google.com/..."
                    className="w-full rounded-xl border border-[#E5DED2] bg-[#FAF7F2] p-3 text-[#2A2622] focus:outline-none focus:ring-2 focus:ring-[#C08552]/40 focus:border-[#C08552] placeholder:text-[#B4A99A]"
                  />
                </div>
              </div>
            )}

            {activeTab === 'gift' && (
              <div className="bg-[#FFFDF9] border border-[#E5DED2] p-6 rounded-2xl space-y-5">
                <h3 className="font-serif text-xl font-bold">Amplop Digital & Kutipan</h3>
                
                <div>
                  <label className="block text-sm font-medium text-[#6B6157] mb-1.5">Ayat / Kata Mutiara / Quote</label>
                  <textarea 
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-[#E5DED2] bg-[#FAF7F2] p-3 text-[#2A2622] focus:outline-none focus:ring-2 focus:ring-[#C08552]/40 focus:border-[#C08552]"
                  />
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E5DED2] space-y-4">
                  <h4 className="font-bold text-[#7C8B6F]">💳 Rekening Hadiah / Amplop Digital</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-[#6B6157] mb-1">Bank / E-Wallet</label>
                      <input 
                        type="text" 
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        placeholder="BCA / Mandiri / GoPay"
                        className="w-full rounded-lg border border-[#E5DED2] bg-[#FFFDF9] p-2.5 text-sm text-[#2A2622] focus:outline-none focus:ring-2 focus:ring-[#C08552]/40 focus:border-[#C08552] placeholder:text-[#B4A99A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6B6157] mb-1">No. Rekening</label>
                      <input 
                        type="text" 
                        value={bankAccount}
                        onChange={(e) => setBankAccount(e.target.value)}
                        className="w-full rounded-lg border border-[#E5DED2] bg-[#FFFDF9] p-2.5 text-sm text-[#2A2622] focus:outline-none focus:ring-2 focus:ring-[#C08552]/40 focus:border-[#C08552]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#6B6157] mb-1">Atas Nama</label>
                      <input 
                        type="text" 
                        value={bankHolder}
                        onChange={(e) => setBankHolder(e.target.value)}
                        className="w-full rounded-lg border border-[#E5DED2] bg-[#FFFDF9] p-2.5 text-sm text-[#2A2622] focus:outline-none focus:ring-2 focus:ring-[#C08552]/40 focus:border-[#C08552]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'template' && (
              <div className="bg-[#FFFDF9] border border-[#E5DED2] p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <h3 className="font-serif text-xl font-bold">Pilih Desain & Tema Undangan</h3>
                  <a
                    href={`/preview/${selectedTemplate}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7C8B6F] hover:text-[#5F6E54] transition border border-[#E5DED2] hover:border-[#D6CBB9] px-4 py-2 rounded-full"
                  >
                    👁️ Lihat contoh jadi →
                  </a>
                </div>
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
              <div className="flex items-center justify-between text-xs text-[#6B6157] px-1">
                <span>📱 Mockup Tampilan Tamu</span>
                <span className="text-[#7C8B6F] font-medium">{template?.name}</span>
              </div>

              {/* Phone Frame */}
              <div className="relative mx-auto rounded-[36px] border-[8px] border-[#2A2622] shadow-2xl overflow-hidden bg-black aspect-[9/18] max-h-[640px] flex flex-col">
                <div 
                  className="flex-1 overflow-y-auto p-6 text-center space-y-6 flex flex-col justify-between relative"
                  style={{ 
                    backgroundColor: template?.colors.background || '#ffffff',
                    color: template?.colors.text || '#1a1a1a',
                  }}
                >
                  {photoBgPreview && (
                    <>
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${photoBgPreview})` }} />
                      <div className="absolute inset-0" style={{ backgroundColor: (template?.colors.background || '#000000') + 'CC' }} />
                    </>
                  )}

                  <div className="relative pt-6 space-y-3">
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

                  <div className="p-3 rounded-xl border text-xs space-y-1 relative" style={{ borderColor: template?.colors.accent + '40', backgroundColor: template?.colors.secondary + '10' }}>
                    <p className="font-bold">{location}</p>
                    <p className="text-[10px] opacity-70 line-clamp-2">{addressDetail}</p>
                  </div>

                  <div className="pb-4 space-y-2 relative">
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
