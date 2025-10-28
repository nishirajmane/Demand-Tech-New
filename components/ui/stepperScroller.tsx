"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const steps = [
  { title: "Segmentation & Targeting", text: "We don’t believe in one-size-fits-all outreach. Our approach begins by categorizing leads based on intent, behavior, engagement level, and industry to ensure that every interaction feels personal and relevant." },
  { title: "Personalized Content Journey", text: "Every prospect is unique, and so is the path they take toward becoming a customer. We design customized content journeys that deliver tailored emails, educational resources, case studies, product guides, and relevant offers." },
  { title: "Multi-Channel Engagement", text: "Today's buyers move across multiple platforms before making a purchase decision. We ensure your brand stays visible and relevant through a strategic mix of email marketing, social media touchpoints, targeted LinkedIn outreach, and retargeting ads." },
  { title: "Behavior Tracking & Scoring", text: "Not all leads are ready to buy right away, and that’s where behavior tracking and lead scoring come in. We monitor email opens, link clicks, website visits, content downloads, webinar attendance, and social interactions to assess interest levels." },
  { title: "Consistent Follow-Ups", text: "In lead nurturing, timing is everything. We implement structured, timely follow-up sequences to keep conversations alive and momentum moving forward. Whether it’s a personalized check-in email, a reminder about a webinar, or a tailored offer, we ensure prospects never slip through the cracks and always feel valued and heard." },
];

export const Stepper = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstCircleRef = useRef<HTMLDivElement>(null);
  const lastAnchorRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // dynamic clamp so the line stops exactly at step 5
  const [maxProgress, setMaxProgress] = useState(1);

  const [lineBounds, setLineBounds] = useState<{ top: number; height: number }>({
    top: 28,
    height: 0,
  });

  useLayoutEffect(() => {
    const update = () => {
      if (!containerRef.current || !firstCircleRef.current || !lastAnchorRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const firstRect = firstCircleRef.current.getBoundingClientRect();
      const lastRect = lastAnchorRef.current.getBoundingClientRect();

      const firstCenter = firstRect.top - containerRect.top + firstRect.height / 2;
      const lastCenter = lastRect.top - containerRect.top + lastRect.height / 2;

      setLineBounds({
        top: firstCenter - 40, // Start 40px before first circle
        height: Math.max(0, lastCenter - firstCenter + 80), // Add 40px before and after
      });

      const totalScrollable = Math.max(1, containerRect.height - window.innerHeight);
      const lastOffset = Math.max(0, lastRect.top - containerRect.top);
      setMaxProgress(Math.min(1, lastOffset / totalScrollable));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // clamp progress so the vertical line stops at step 5
  const clampedProgress = useTransform(scrollYProgress, [0, maxProgress], [0, 1], {
    clamp: true,
  });

  const Title = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-sm sm:text-base font-normal bg-gradient-to-r from-[#3722D3] to-[#1C126D] bg-clip-text text-transparent font-clash">
      {children}
    </h3>
  );

  return (
    <div ref={containerRef} className="relative mx-auto max-w-4xl py-20 pb-32">
      {/* Vertical line from step 1 to step 5 */}
      <motion.div
        className="absolute w-[4px] rounded-full"
        style={{
          left: 28, // center of 56px circle
          top: lineBounds.top,
          height: lineBounds.height,
          scaleY: clampedProgress,
          transformOrigin: "top",
          background: "linear-gradient(to bottom, #3722D3 0%, #1C126D 70%, transparent 100%)",
        }}
      />

      <div className="space-y-40">
        {steps.map((step, i) => {
          const isFirst = i === 0;
          const isLast = i === steps.length - 1;

          return (
            <div key={i} className="relative flex items-start sticky top-24 z-10">
              {/* Reference for first circle */}
              {isFirst && (
                <div
                  ref={firstCircleRef}
                  aria-hidden
                  className="absolute left-0 top-0 h-14 w-14 pointer-events-none opacity-0"
                />
              )}
              
              {/* Reference for last circle */}
              {isLast && (
                <div
                  ref={lastAnchorRef}
                  aria-hidden
                  className="absolute left-0 top-0 h-14 w-14 pointer-events-none opacity-0"
                />
              )}

              {/* Static circle - all preloaded */}
              <div
                className="absolute left-0 flex h-14 w-14 items-center justify-center rounded-full shadow-lg"
                style={{ background: "linear-gradient(135deg, #3722D3, #1C126D)" }}
              >
                <span className="font-bold text-white font-clash text-base">{i + 1}</span>
              </div>

              {/* Static text - all preloaded */}
              <div className="ml-24 max-w-2xl">
                <Title>{step.title}</Title>
                <p className="mt-2 text-gray-600 font-neu text-sm sm:text-base">{step.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};