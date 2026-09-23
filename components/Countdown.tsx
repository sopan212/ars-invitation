'use client';

import { useEffect, useState } from 'react';

interface Props {
  targetDate: string;       // ISO
  accent: string;
  label?: string;
}

function calcRemaining(ms: number) {
  if (ms < 0) ms = 0;
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const seconds = Math.floor((ms / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export function Countdown({ targetDate, accent, label = 'Menuju Hari Bahagia' }: Props) {
  // Hydration-safe: mulai kosong, isi di client saja.
  // Date.now() di SSR beda dengan di client -> hydration mismatch.
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const tick = () =>
      setRemaining(new Date(targetDate).getTime() - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (remaining === null) {
    // skeleton sebelum mount, bentrok dengan layout final
    return (
      <div className="text-center space-y-4">
        <p className="text-sm tracking-[0.25em] uppercase opacity-60">{label}</p>
        <div className="flex justify-center gap-3 sm:gap-4">
          {['', '', '', ''].map((_, i) => (
            <div
              key={i}
              className="min-w-[64px] sm:min-w-[80px] h-[78px] rounded-2xl border animate-pulse"
              style={{ borderColor: accent + '20', backgroundColor: accent + '06' }}
            />
          ))}
        </div>
      </div>
    );
  }

  const { days, hours, minutes, seconds } = calcRemaining(remaining);
  const done = remaining <= 0;

  const units = [
    { v: days, l: 'Hari' },
    { v: hours, l: 'Jam' },
    { v: minutes, l: 'Menit' },
    { v: seconds, l: 'Detik' },
  ];

  return (
    <div className="text-center space-y-4">
      <p className="text-sm tracking-[0.25em] uppercase opacity-60">{label}</p>
      {done ? (
        <p className="text-2xl font-bold" style={{ fontFamily: 'inherit' }}>
          🎉 Hari ini adalah hari bahagia kami!
        </p>
      ) : (
        <div className="flex justify-center gap-3 sm:gap-4">
          {units.map((u, i) => (
            <div
              key={i}
              className="min-w-[64px] sm:min-w-[80px] p-3 sm:p-4 rounded-2xl border backdrop-blur-sm"
              style={{ borderColor: accent + '30', backgroundColor: accent + '08' }}
            >
              <div
                className="text-2xl sm:text-3xl font-bold tabular-nums"
                style={{ color: accent }}
              >
                {String(u.v).padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs opacity-60 tracking-wider uppercase mt-1">
                {u.l}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
