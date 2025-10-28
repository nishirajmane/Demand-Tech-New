"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useOutsideClick } from "../../hooks/use-outside-click";
import Button4 from "./Button4";

type ExpandableReadMoreProps = {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  content?: React.ReactNode; // Optional explicit content
  includeRandom?: boolean; // Append random filler content
  triggerClassName?: string;
};

const RANDOM_PARAGRAPHS: string[] = [
  "We align strategy with your ICP, market motion, and pipeline velocity goals, then execute with precision.",
  "Advanced segmentation, creative testing, and message-market fit validation ensure efficient spend.",
  "We track influenced and sourced pipeline with UTM rigor and CRM sync to show real business impact.",
  "Our multi-touch journeys span email, paid, syndication, webinar, and direct to accelerate readiness.",
  "Compliance-first data and opt-ins across NA, EMEA, and APAC with transparent validation."
];

const RANDOM_BULLETS: string[][] = [
  ["ICP modeling", "Intent scoring", "Offer strategy"],
  ["Channel mix planning", "Creative variants", "A/B testing"],
  ["Lead QA", "Enrichment", "Routing & SLAs"],
  ["Attribution setup", "Dashboards", "Weekly optimizations"],
];

export default function ExpandableReadMore({
  title,
  subtitle,
  imageSrc,
  content,
  includeRandom = true,
  triggerClassName,
}: ExpandableReadMoreProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null!);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useOutsideClick(containerRef, () => handleClose());

  // Lock body scroll while modal is open
  useEffect(() => {
    const original = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original || "auto";
    }
    return () => {
      document.body.style.overflow = original || "auto";
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const randomBlocks = useMemo(() => {
    if (!includeRandom) return null;
    const paragraphs = shuffle(RANDOM_PARAGRAPHS).slice(0, 2);
    const bullets = RANDOM_BULLETS[Math.floor(Math.random() * RANDOM_BULLETS.length)];
    return (
      <div className="mt-4 space-y-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-[#000]/80 leading-relaxed font-neu">
            {p}
          </p>
        ))}
        <ul className="list-disc pl-5 space-y-1 text-[#000]/80 font-neu">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    );
  }, [includeRandom]);

  return (
    <>
      {/* Trigger */}
      <div aria-haspopup="dialog" aria-expanded={open} className={triggerClassName}>
        <Button4 label="Read More" onClick={handleOpen} />
      </div>

      {/* Dialog */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-lg"
              onClick={() => setOpen(false)}
            />

            {/* Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              ref={containerRef}
              role="dialog"
              aria-modal="true"
              aria-label={`${title} details`}
              className="relative z-[90] w-[94vw] sm:w-[90vw] md:w-auto max-w-[94vw] sm:max-w-[90vw] md:max-w-3xl lg:max-w-4xl max-h-[85vh] overflow-hidden overscroll-contain rounded-2xl bg-white/90 backdrop-blur-xl shadow-2xl border border-white/20 ring-1 ring-white/10 p-4 sm:p-6 md:p-8"
              style={{ WebkitOverflowScrolling: "touch" }}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={handleClose}
                className="sticky top-0 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black text-white z-50"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Header */}
              {subtitle && (
                <p className="text-sm md:text-base text-[#898989] font-clash">{subtitle}</p>
              )}
              <h3 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-semibold text-[#574BEF] font-clash">{title}</h3>

              {/* Image */}
              {imageSrc && (
                <div className="relative mt-4 w-full h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden">
                  <Image src={imageSrc} alt={title} fill className="object-cover" />
                </div>
              )}

              {/* Body (scrollable area) */}
              <div
                className="mt-4 text-base leading-relaxed text-[#000] font-neu max-h-[60vh] overflow-y-auto pr-1 overscroll-contain"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
                style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
              >
                {content}
                {randomBlocks}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
