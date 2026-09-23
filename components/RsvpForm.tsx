'use client';

import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://100.74.92.59:8090');
pb.autoCancellation(false);

interface Props {
  eventId: string;
  accent: string;
  headingFont: string;
}

interface Wish {
  id: string;
  guest_name: string;
  presence: string;
  message: string;
  created: string;
}

const PRESENCE_LABEL: Record<string, string> = {
  hadir: 'Hadir',
  tidak: 'Tidak Hadir',
  belum: 'Belum Pasti',
};

export function RsvpForm({ eventId, accent, headingFont }: Props) {
  const [name, setName] = useState('');
  const [presence, setPresence] = useState('hadir');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Ambil ucapan yang sudah masuk
  useEffect(() => {
    if (!eventId) return;
    let cancelled = false;
    pb.collection('wishes')
      .getList(1, 20, {
        filter: `event_id = "${eventId}"`,
        // -id: record PocketBase urut-insert, id string random jadi pakai id
        // (field "created" tidak di-expose di collection custom ini)
        sort: '-id',
      })
      .then((res) => {
        if (!cancelled) setWishes(res.items as unknown as Wish[]);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [eventId, refreshKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Isi nama kamu dulu ya 🙏');
      return;
    }
    setSending(true);
    setError('');
    try {
      await pb.collection('wishes').create({
        event_id: eventId,
        guest_name: name.trim(),
        presence,
        message: message.trim(),
      });
      setSuccess(true);
      setName('');
      setMessage('');
      setRefreshKey((k) => k + 1);
      setTimeout(() => setSuccess(false), 2500);
    } catch (err: any) {
      setError(err?.message || 'Gagal mengirim. Coba lagi.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="py-20 px-6" style={{ backgroundColor: accent + '08' }}>
      <div className="max-w-md mx-auto space-y-6">
        <h3
          className="text-2xl font-bold text-center tracking-widest uppercase"
          style={{ color: accent, fontFamily: headingFont + ', serif' }}
        >
          Ucapan &amp; Doa
        </h3>

        {success && (
          <div
            className="p-4 rounded-xl text-center text-sm font-medium animate-fadeIn"
            style={{ backgroundColor: accent + '15', color: accent }}
          >
            💌 Terima kasih! Ucapan kamu sudah terkirim.
          </div>
        )}

        {error && (
          <div className="p-3 rounded-xl text-center text-sm bg-red-50 text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nama Kamu"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 rounded-xl border bg-transparent text-center focus:outline-none focus:ring-2 transition"
            style={{ borderColor: accent + '40', color: 'inherit' }}
          />
          <div className="flex gap-2">
            {Object.entries(PRESENCE_LABEL).map(([val, label]) => (
              <button
                key={val}
                type="button"
                onClick={() => setPresence(val)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium border transition"
                style={
                  presence === val
                    ? { backgroundColor: accent, borderColor: accent, color: '#fff' }
                    : { borderColor: accent + '40', color: 'inherit' }
                }
              >
                {label}
              </button>
            ))}
          </div>
          <textarea
            placeholder="Tulis ucapan dan doa untuk mempelai..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full p-3 rounded-xl border bg-transparent focus:outline-none focus:ring-2 transition resize-none"
            style={{ borderColor: accent + '40', color: 'inherit' }}
          />
          <button
            type="submit"
            disabled={sending}
            className="w-full py-3 rounded-full font-bold transition hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ backgroundColor: accent, color: '#fff' }}
          >
            {sending ? 'Mengirim...' : '💌 Kirim Ucapan'}
          </button>
        </form>

        {/* Daftar ucapan masuk */}
        {wishes.length > 0 && (
          <div className="space-y-3 pt-4 border-t" style={{ borderColor: accent + '20' }}>
            <p className="text-xs tracking-widest uppercase opacity-60">
              {wishes.length} Ucapan
            </p>
            {wishes.map((w) => (
              <div
                key={w.id}
                className="p-4 rounded-xl border text-left animate-fadeIn"
                style={{ borderColor: accent + '20', backgroundColor: accent + '05' }}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-sm">{w.guest_name}</span>
                  {w.presence && (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: accent + '15', color: accent }}
                    >
                      {PRESENCE_LABEL[w.presence] || w.presence}
                    </span>
                  )}
                </div>
                {w.message && (
                  <p className="text-sm opacity-75 leading-relaxed">{w.message}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
