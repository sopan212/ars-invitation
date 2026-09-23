'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  src: string;
  label?: string;
  accent: string;
}

/**
 * Floating music toggle. Autoplay diblokir browser sampai user interaksi -
 * tombol ini cara satu-satunya untuk mulai. Lalu muter loop.
 */
export function MusicPlayer({ src, label, accent }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.4;

    const onEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => setPlaying(false));
    };
    audio.addEventListener('ended', onEnded);
    return () => audio.removeEventListener('ended', onEnded);
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} preload="none" loop />
      <button
        onClick={toggle}
        aria-label={playing ? 'Matikan musik' : 'Putar musik'}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg backdrop-blur-md transition hover:scale-105"
        style={{ backgroundColor: accent, color: '#fff' }}
      >
        <span className="text-sm">
          {playing ? (
            // equalizer animasi
            <span className="flex items-end gap-[2px] h-4">
              <i className="w-[3px] bg-white rounded animate-eq1" />
              <i className="w-[3px] bg-white rounded animate-eq2" />
              <i className="w-[3px] bg-white rounded animate-eq3" />
            </span>
          ) : (
            '🎵'
          )}
        </span>
        <span className="text-xs font-semibold whitespace-nowrap">
          {playing ? (label || 'Musik') : 'Putar Musik'}
        </span>
      </button>
    </>
  );
}
