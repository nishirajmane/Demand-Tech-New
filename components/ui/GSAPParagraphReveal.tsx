'use client';

import React from 'react';
import gsap from 'gsap';

// We will dynamically import SplitText and ScrollTrigger to avoid SSR issues

interface GSAPParagraphRevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;      // animation duration
  yOffset?: number;       // kept for API compat (unused in line split)
  start?: string;         // ScrollTrigger start point
  delay?: number;         // optional delay
  stagger?: number;       // line stagger
}

export default function GSAPParagraphReveal({
  children,
  className = '',
  style = {},
  duration = 0.6,
  yOffset = 30,
  start = 'top 85%',
  delay = 0,
  stagger = 0.08,
}: GSAPParagraphRevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    let cleanup: (() => void) | null = null;

    (async () => {
      try {
        const [splitMod, stMod]: any = await Promise.all([
          import('gsap/SplitText'),
          import('gsap/ScrollTrigger'),
        ]);
        const SplitText = splitMod.SplitText || splitMod.default || splitMod;
        const ScrollTrigger = stMod.ScrollTrigger || stMod.default || stMod;
        gsap.registerPlugin(SplitText, ScrollTrigger);

        // Ensure fonts loaded to keep line breaks consistent
        try {
          // @ts-ignore
          if (document?.fonts?.ready) await (document as any).fonts.ready;
        } catch {}

        const container = ref.current;
        if (!container) return;

        const target = container.querySelector<HTMLElement>('.gsap-paragraph');
        if (!target) return;

        gsap.set(target, { opacity: 1 });

        let tween: gsap.core.Tween | null = null;
        let splitInst: any = null;

        SplitText.create(target, {
          type: 'lines',
          linesClass: 'para-line',
          autoSplit: true,
          mask: 'lines',
          onSplit: (self: any) => {
            gsap.set(self.lines, { yPercent: 110, opacity: 0 });
            tween = gsap.to(self.lines, {
              yPercent: 0,
              opacity: 1,
              duration,
              ease: 'expo.out',
              stagger,
              delay,
              paused: true,
            });
            splitInst = self;
            return tween;
          },
        });

        const trigger = ScrollTrigger.create({
          trigger: target,
          start: start || 'top 85%',
          end: 'bottom 20%',
          onEnter: () => tween?.play(0),
          onEnterBack: () => tween?.play(0),
          onLeave: () => tween?.reverse(),
          onLeaveBack: () => tween?.reverse(),
        });

        cleanup = () => {
          try { tween?.kill(); } catch {}
          try { trigger?.kill?.(); } catch {}
          try { splitInst?.revert?.(); } catch {}
        };
      } catch (e) {
        // fallback: simple fade/rise if SplitText unavailable
        const el = ref.current;
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 10 });
        const tween = gsap.to(el, {
          opacity: 1,
          y: 0,
          duration,
          ease: 'power3.out',
          delay,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        });
        cleanup = () => { try { tween?.kill(); } catch {} };
      }
    })();

    return () => { if (cleanup) cleanup(); };
  }, [duration, yOffset, start, delay, stagger]);

  return (
    <div ref={ref} className={className} style={style}>
      {/* Wrap content in an element we can safely split into lines without affecting styles */}
      <div className="gsap-paragraph" style={{ opacity: 0 }}>
        {children}
      </div>
    </div>
  );
}
