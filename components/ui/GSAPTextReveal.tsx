'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface GSAPTextRevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  stagger?: number;      // used
  duration?: number;     // used
  yOffset?: number;      // unused in SplitText mode (kept for compat)
  start?: string;        // unused (kept for compat)
  split?: 'words' | 'lines'; // unused (SplitText handles lines)
  highlightLastWords?: number; // unused (kept for compat)
  highlightClassName?: string; // unused (kept for compat)
}

export const GSAPTextReveal = ({
  children,
  className = '',
  style = {},
  stagger = 0.1,
  duration = 0.6,
  start = 'top 80%',
}: GSAPTextRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const timelineRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, [children]);

  useEffect(() => {
    if (!isClient || typeof window === 'undefined') return;

    let cleanup: (() => void) | null = null;
    let tween: gsap.core.Tween | gsap.core.Timeline | null = null;
    let trigger: any = null;

    (async () => {
      try {
        // dynamic import of SplitText plugin
        const [splitMod, stMod]: any = await Promise.all([
          import('gsap/SplitText'),
          import('gsap/ScrollTrigger'),
        ]);
        const SplitText = splitMod.SplitText || splitMod.default || splitMod;
        const ScrollTrigger = stMod.ScrollTrigger || stMod.default || stMod;
        gsap.registerPlugin(SplitText, ScrollTrigger);

        // wait for fonts to be ready to avoid layout shift
        try {
          // @ts-ignore
          if (document?.fonts?.ready) await (document as any).fonts.ready;
        } catch {}

        const root = containerRef.current;
        if (!root) return;
        const target = root.querySelector<HTMLElement>('.split');
        if (!target) return;

        gsap.set(target, { opacity: 1 });

        // create split and animate lines
        let splitInst: any = null;
        SplitText.create(target, {
          type: 'words,lines',
          linesClass: 'line',
          autoSplit: true,
          mask: 'lines',
          onSplit: (self: any) => {
            // set initial state and build a paused tween
            gsap.set(self.lines, { yPercent: 100, opacity: 0 });
            tween = gsap.to(self.lines, {
              duration,
              yPercent: 0,
              opacity: 1,
              stagger,
              ease: 'expo.out',
              paused: true,
            });
            splitInst = self;
            return tween;
          },
        });

        // ScrollTrigger to control tween both ways
        trigger = ScrollTrigger.create({
          trigger: target,
          start: start || 'top 80%',
          end: 'bottom 20%',
          onEnter: () => tween && (tween as gsap.core.Tween).play(0),
          onEnterBack: () => tween && (tween as gsap.core.Tween).play(0),
          onLeave: () => tween && (tween as gsap.core.Tween).reverse(),
          onLeaveBack: () => tween && (tween as gsap.core.Tween).reverse(),
        });

        // optional replay on first button click (global button like snippet)
        const btn = document.querySelector('button');
        const handler = () => {
          if (tween) (tween as gsap.core.Tween).timeScale(0.2).play(0);
        };
        if (btn) btn.addEventListener('click', handler);

        cleanup = () => {
          if (btn) btn.removeEventListener('click', handler);
          if (tween) tween.kill();
          try { trigger?.kill?.(); } catch {}
          // Attempt to revert split if available
          try { splitInst?.revert?.(); } catch {}
        };
      } catch (e) {
        // SplitText not available; skip
      }
    })();

    return () => {
      if (cleanup) cleanup();
    };
  }, [isClient, duration, stagger, start]);

  return (
    <div ref={containerRef}>
      <h1 className={`split ${className}`} style={{ opacity: 0, ...style }}>
        {children}
      </h1>
    </div>
  );
};
