'use client';

import { useEffect, useRef, useState } from 'react';

interface Chapter {
  id: string;
  label: string;
  desc: string;
}

interface Props {
  chapters: Chapter[];
  accent: string;
  headingFont: string;
  brideName: string;
  groomName: string;
  weddingDate?: string;
}

/**
 * Story timeline 3 babak: Pertemuan → Lamaran → Hari Bahagia.
 * Tiap babak fade-in saat masuk viewport (IntersectionObserver).
 */
export function StoryTimeline({
  chapters,
  accent,
  headingFont,
  brideName,
  groomName,
  weddingDate,
}: Props) {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-2xl mx-auto">
        <h3
          className="text-2xl font-bold text-center tracking-widest uppercase mb-3"
          style={{ color: accent }}
        >
          Kisah Cinta Kami
        </h3>
        <p className="text-center text-sm opacity-60 mb-14">
          Perjalanan {groomName} &amp; {brideName} sampai ke hari ini
        </p>

        {/* Garis tengah vertikal */}
        <div
          className="absolute left-1/2 top-32 bottom-20 w-px -translate-x-1/2 hidden sm:block"
          style={{ background: `linear-gradient(180deg, transparent, ${accent}55, transparent)` }}
        />

        <div className="space-y-16 sm:space-y-24">
          {chapters.map((ch, i) => (
            <StoryChapter
              key={ch.id}
              chapter={ch}
              index={i}
              accent={accent}
              headingFont={headingFont}
            />
          ))}
        </div>

        {weddingDate && (
          <div className="mt-16 text-center">
            <p className="text-sm opacity-60 tracking-widest uppercase">Dan hari ini...</p>
            <p
              className="text-2xl font-bold mt-2"
              style={{ fontFamily: headingFont + ', serif', color: accent }}
            >
              {weddingDate}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function StoryChapter({
  chapter,
  index,
  accent,
  headingFont,
}: {
  chapter: Chapter;
  index: number;
  accent: string;
  headingFont: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Babak ganjil ke kiri, genap ke kanan (zig-zag di desktop)
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex ${isLeft ? 'sm:justify-start' : 'sm:justify-end'} justify-center`}
    >
      <div
        className="relative max-w-sm transition-all duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible
            ? 'translateY(0) scale(1)'
            : `translateY(24px) scale(0.98)`,
        }}
      >
        {/* Titik di garis */}
        <div
          className="absolute top-6 w-3 h-3 rounded-full hidden sm:block"
          style={{
            backgroundColor: accent,
            [isLeft ? 'right' : 'left']: 'calc(50% + 1.5rem)',
            boxShadow: `0 0 0 6px ${accent}20`,
          }}
        />

        <div
          className="px-6 py-6 rounded-2xl border backdrop-blur-sm"
          style={{ borderColor: accent + '25', backgroundColor: accent + '05' }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span
              className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0"
              style={{ backgroundColor: accent, color: '#fff' }}
            >
              {index + 1}
            </span>
            <h4
              className="text-xl font-bold"
              style={{ fontFamily: headingFont + ', serif' }}
            >
              {chapter.label}
            </h4>
          </div>
          <p className="text-sm opacity-75 leading-relaxed">{chapter.desc}</p>
        </div>
      </div>
    </div>
  );
}
