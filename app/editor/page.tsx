'use client';

import { useState } from 'react';
import Link from 'next/link';
import PocketBase from 'pocketbase';
import { TemplateSelector } from '@/components/TemplateSelector';
import { getTemplate } from '@/lib/templates';

const pb = new PocketBase('http://100.74.92.59:8090');
pb.autoCancellation(false);

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState<'couple' | 'event' | 'gift' | 'template'>('couple');

  // Hasil save, link undangan user
  const [savedUrl, setSavedUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [copied, setCopied] = useState(false);
  
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

  // Photo state, ponytail: preview via object URL, replaced by PB url after save
  const [photoBg, setPhotoBg] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);
  const [photoBgPreview, setPhotoBgPreview] = useState<string>('');
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [compressing, setCompressing] = useState(false);

  // Musik latar
  const [musicFile, setMusicFile] = useState<File | null>(null);
  const [musicTrack, setMusicTrack] = useState<string>('');

  // Daftar lagu bawaan di /public/music/
  const TRACK_OPTIONS = [
    { file: 'wedding-piano.mp3', label: 'Piano Dream' },
    { file: 'wedding-strings.mp3', label: 'Strings Romance' },
    { file: 'wedding-acoustic.mp3', label: 'Acoustic Warm' },
  ];

  const handleMusicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    if (f && f.size > 10 * 1024 * 1024) {
      setSaveError(`Lagu "${f.name}" berukuran ${(f.size / 1024 / 1024).toFixed(1)}MB. Maksimal 10MB.`);
      return;
    }
    setMusicFile(f);
    if (f) setMusicTrack('');
  };

  const template = getTemplate(selectedTemplate);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB, batas PocketBase

  // Compress foto di browser: resize ke max 1920px, re-encode JPEG 80%
  // Ponytail: kalau perlu kualitas lebih tinggi nanti, naikkan ke 0.9 / 2560px
  async function compressPhoto(file: File): Promise<File> {
    const MAX_DIM = 1920;
    const QUALITY = 0.8;

    if (!file.type.startsWith('image/')) return file;

    // createImageBitmap({ imageOrientation: 'from-image' }) baca EXIF orientation
    // → foto HP lanskap tidak miring. Fallback ke <img> biasa kalau tidak support.
    type Bmp = ImageBitmap & { width: number; height: number };
    let bmp: Bmp | null = null;
    try {
      bmp = (await createImageBitmap(file, {
        imageOrientation: 'from-image',
      } as ImageBitmapOptions)) as Bmp;
    } catch {
      bmp = null;
    }

    let img: Bmp | null = bmp;
    let objUrl = '';
    if (!img) {
      img = await new Promise<Bmp | null>((resolve) => {
        const el = new Image();
        el.onload = () => resolve(el as unknown as Bmp);
        el.onerror = () => resolve(null);
        objUrl = URL.createObjectURL(file);
        el.src = objUrl;
      });
    }
    if (!img) return file;

    let { width, height } = img;
    if (width > MAX_DIM || height > MAX_DIM) {
      const scale = MAX_DIM / Math.max(width, height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.drawImage(img, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, 'image/jpeg', QUALITY)
    );
    URL.revokeObjectURL(objUrl);
    if (bmp && 'close' in bmp) bmp.close();
    if (!blob) return file;

    return new File([blob], file.name.replace(/\.(png|webp)$/i, '.jpg'), {
      type: 'image/jpeg',
      lastModified: Date.now(),
    });
  }

  const handlePhotoBg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.files?.[0] || null;
    if (!raw) { setPhotoBg(null); setPhotoBgPreview(''); return; }
    setCompressing(true);
    const f = await compressPhoto(raw);
    setCompressing(false);
    setPhotoBg(f);
    setPhotoBgPreview(URL.createObjectURL(f));
  };

  const handleGallery = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setCompressing(true);
    const compressed = await Promise.all(files.map(compressPhoto));
    setCompressing(false);
    setGallery(compressed);
    setGalleryPreviews(compressed.map((f) => URL.createObjectURL(f)));
  };

  const removePhotoBg = () => {
    if (photoBgPreview) URL.revokeObjectURL(photoBgPreview);
    setPhotoBg(null);
    setPhotoBgPreview('');
    // reset input supaya bisa pilih file yang sama lagi
    const inp = document.querySelector<HTMLInputElement>('input[data-field="photo_bg"]');
    if (inp) inp.value = '';
  };

  const removeGalleryPhoto = (i: number) => {
    URL.revokeObjectURL(galleryPreviews[i]);
    const nextFiles = gallery.filter((_, idx) => idx !== i);
    const nextPreviews = galleryPreviews.filter((_, idx) => idx !== i);
    setGallery(nextFiles);
    setGalleryPreviews(nextPreviews);
  };

  function checkPhoto(file: File, label: string): string | null {
    if (file.size > MAX_FILE_SIZE) {
      return `${label} "${file.name}" berukuran ${(file.size / 1024 / 1024).toFixed(1)}MB. Maksimal 5MB, silakan kecilkan dulu.`;
    }
    const okTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!okTypes.includes(file.type)) {
      return `${label} "${file.name}" format ${file.type || 'tidak dikenal'} tidak didukung. Pakai JPG, PNG, atau WEBP.`;
    }
    return null;
  }

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError('');

    // Validasi foto sebelum upload, beri pesan jelas, jangan biarkan 400 dari server
    if (photoBg) {
      const err = checkPhoto(photoBg, 'Foto background');
      if (err) { setSaveError(err); setIsSaving(false); return; }
    }
    if (gallery.length > 0) {
      const errs = gallery.map((f) => checkPhoto(f, 'Galeri')).filter((e): e is string => !!e);
      if (errs.length > 0) { setSaveError(errs[0]); setIsSaving(false); return; }
    }

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
      if (musicFile) data.music_url = musicFile;
      else if (musicTrack) data.music_track = musicTrack;
      // story_mood: ikut kemampuan template premium
      data.story_mood = !!(template?.story?.enabled);
      
      const record = await pb.collection('events').create(data);
      setSavedUrl(`http://100.74.92.59:3000/undangan/${record.id}`);
      setCopied(false);
    } catch (error: any) {
      // Ambil pesan validation PocketBase (400) kalau ada
      const valErr = error?.response?.data;
      let msg = error?.message || 'Gagal menyimpan. Coba lagi.';
      if (valErr) {
        const parts = Object.entries(valErr).map(
          ([k, v]: any) => `${k}: ${v?.message || JSON.stringify(v)}`
        );
        msg = parts.join(' | ') || msg;
      }
      setSaveError(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(savedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback untuk browser tanpa clipboard API
      const input = document.createElement('input');
      input.value = savedUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareWa = () => {
    const text = `Halo! Kamu diundang ke pernikahan ${groomName} & ${brideName} 💍\n\nLihat undangannya di sini:\n${savedUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A2622] font-sans">
      {/* Header */}
      <div className="border-b border-[#E5DED2] px-6 py-4 sticky top-0 bg-[#FAF7F2]/90 backdrop-blur z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-serif text-2xl font-semibold transition hover:opacity-80">
            <span className="text-[#7C8B6F]">ARS</span>.editor
          </Link>
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-[#C08552] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#A66B3F] transition hover:scale-105 active:scale-95 shadow-sm shadow-[#C08552]/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSaving ? 'Menyimpan...' : '💾 Simpan & Terbitkan Undangan'}
          </button>
        </div>
      </div>

      {/* Panel hasil save, link undangan user */}
      {savedUrl && (
        <div className="sticky top-[65px] z-40 px-6">
          <div className="max-w-7xl mx-auto mt-4 bg-[#FFFDF9] border border-[#7C8B6F]/40 rounded-2xl p-5 shadow-lg shadow-[#7C8B6F]/10 space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl shrink-0">🎉</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-lg font-bold text-[#2A2622]">Undangan berhasil diterbitkan!</h3>
                <p className="text-sm text-[#6B6157]">Simpan link ini, bagikan ke tamu undangan kamu.</p>
              </div>
              <button
                onClick={() => setSavedUrl('')}
                className="text-[#756C61] hover:text-[#2A2622] text-xl leading-none px-1 shrink-0"
                aria-label="Tutup"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <input
                readOnly
                value={savedUrl}
                className="flex-1 min-w-0 rounded-xl border border-[#E5DED2] bg-[#FAF7F2] px-4 py-2.5 text-sm text-[#2A2622] font-mono"
              />
              <button
                onClick={handleCopy}
                className="shrink-0 px-5 py-2.5 rounded-xl font-bold text-sm border border-[#D6CBB9] text-[#2A2622] hover:bg-[#FAF7F2] transition"
              >
                {copied ? '✓ Tersalin' : '📋 Salin'}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href={savedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 rounded-xl font-bold text-sm border border-[#D6CBB9] text-[#2A2622] hover:bg-[#FAF7F2] transition"
              >
                👁️ Lihat Undangan
              </a>
              <button
                onClick={handleShareWa}
                className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-[#25D366] text-white hover:bg-[#1da851] transition"
              >
                💬 Bagikan via WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error save */}
      {saveError && (
        <div className="sticky top-[65px] z-40 px-6">
          <div className="max-w-7xl mx-auto mt-4 bg-[#C08552]/10 border border-[#C08552]/40 rounded-2xl p-4 flex items-center gap-3">
            <span className="text-xl shrink-0">⚠️</span>
            <p className="flex-1 text-sm text-[#A66B3F]">{saveError}</p>
            <button
              onClick={() => setSaveError('')}
              className="text-[#A66B3F] hover:opacity-70 text-xl leading-none px-1 shrink-0"
              aria-label="Tutup"
            >
              ×
            </button>
          </div>
        </div>
      )}

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
                  <p className="text-xs text-[#756C61]">JPG / PNG / WEBP. Foto otomatis dikompres (maks 1920px, ≤5MB), aman untuk foto HP berukuran besar.</p>
                  {compressing && (
                    <p className="text-xs text-[#7C8B6F] font-medium animate-pulse">⏳ Mengompres foto...</p>
                  )}
                  <input
                    type="file"
                    data-field="photo_bg"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handlePhotoBg}
                    className="block w-full text-sm text-[#6B6157] file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#7C8B6F] file:text-white hover:file:bg-[#5F6E54] cursor-pointer"
                  />
                  {photoBgPreview && (
                    <div className="relative rounded-xl overflow-hidden border border-[#E5DED2] max-h-64 group">
                      <img src={photoBgPreview} alt="Preview background" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={removePhotoBg}
                        aria-label="Hapus foto background"
                        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                {/* Gallery photos */}
                <div className="space-y-3 pt-2 border-t border-[#E5DED2]">
                  <label className="block text-sm font-medium text-[#6B6157]">
                    📚 Galeri Foto (maks 10 foto)
                  </label>
                  <p className="text-xs text-[#756C61]">JPG / PNG / WEBP. Setiap foto otomatis dikompres (maks 1920px, ≤5MB).</p>
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
                          <button
                            type="button"
                            onClick={() => removeGalleryPhoto(i)}
                            aria-label={`Hapus foto galeri ${i + 1}`}
                            className="absolute top-1.5 right-1.5 w-7 h-7 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition text-xs"
                          >
                            ✕
                          </button>
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

                {/* Musik latar, hanya template pro/premium */}
                {template?.features.music ? (
                  <div className="mb-6 p-5 rounded-2xl border border-[#E5DED2] bg-[#FAF7F2] space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#6B6157]">
                        🎵 Musik Latar
                      </label>
                      <p className="text-xs text-[#756C61] mt-0.5">
                        Template {template.name} mendukung musik. Pilih lagu bawaan atau upload MP3 sendiri (maks 10MB).
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <select
                        value={musicTrack}
                        onChange={(e) => {
                          setMusicTrack(e.target.value);
                          setMusicFile(null);
                        }}
                        className="w-full p-3 rounded-xl border border-[#E5DED2] bg-white text-sm text-[#2A2622] focus:outline-none focus:ring-2 focus:ring-[#7C8B6F]/30"
                      >
                        <option value="">- Pilih lagu bawaan -</option>
                        {TRACK_OPTIONS.map((t) => (
                          <option key={t.file} value={t.file}>
                            {t.label}
                          </option>
                        ))}
                        {template.music?.defaultTrack &&
                          !TRACK_OPTIONS.some((t) => t.file === template.music!.defaultTrack) && (
                            <option value={template.music.defaultTrack}>
                              {template.music.label || template.music.defaultTrack}
                            </option>
                          )}
                      </select>

                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept="audio/mpeg,audio/mp3"
                          onChange={handleMusicUpload}
                          className="block w-full text-xs text-[#6B6157] file:mr-3 file:py-2 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#7C8B6F] file:text-white hover:file:bg-[#5F6E54] cursor-pointer"
                        />
                        {musicFile && (
                          <button
                            type="button"
                            onClick={() => { setMusicFile(null); }}
                            aria-label="Hapus lagu upload"
                            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 text-xs"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>

                    {(musicFile || musicTrack) && (
                      <p className="text-xs text-[#7C8B6F] font-medium">
                        ✓ {musicFile ? `Lagu upload: ${musicFile.name}` : `Lagu: ${TRACK_OPTIONS.find((t) => t.file === musicTrack)?.label || musicTrack}`}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="mb-6 p-4 rounded-xl border border-dashed border-[#E5DED2] text-center">
                    <p className="text-xs text-[#756C61]">
                      🔒 Template gratis belum mendukung musik latar &amp; animasi. Pilih template Pro/Premium untuk fitur lengkap.
                    </p>
                  </div>
                )}

                <TemplateSelector
                  selectedTemplate={selectedTemplate}
                  onSelect={(id) => {
                    setSelectedTemplate(id);
                    const tpl = getTemplate(id);
                    // reset musik kalau template baru tidak mendukung
                    if (!tpl?.features.music) {
                      setMusicTrack('');
                      setMusicFile(null);
                    }
                  }}
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
