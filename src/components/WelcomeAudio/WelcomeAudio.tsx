'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function WelcomeAudio() {
  const pathname = usePathname();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Only play on the landing page
    if (pathname !== '/') return;

    const audio = new Audio('/welcome-clip.mp3');
    audioRef.current = audio;

    const tryPlay = () => audio.play().catch(() => {});

    audio.play().catch(() => {
      // Autoplay blocked — play on first interaction
      const events = ['click', 'keydown', 'touchstart'] as const;
      const onInteraction = () => {
        tryPlay();
        events.forEach(e => window.removeEventListener(e, onInteraction));
      };
      events.forEach(e => window.addEventListener(e, onInteraction, { once: true }));
    });

    return () => {
      // Stop if user navigates away mid-play
      audio.pause();
      audio.src = '';
    };
  }, [pathname]);

  return null;
}
