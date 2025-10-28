"use client";

import Button from "@/components/ui/Button";
import { GSAPTextReveal } from "@/components/ui/GSAPTextReveal";
import GSAPParagraphReveal from "@/components/ui/GSAPParagraphReveal";

export default function GlobeFeatureSection() {
  return (
    <section className="relative w-full mx-auto px-3 sm:px-6 lg:px-8 mt-10 sm:mt-20">
      <div
        className="relative mx-auto w-full max-w-7xl rounded-3xl overflow-hidden px-4 pt-6 pb-4 sm:px-8 md:px-12 lg:px-16 md:pt-14 md:pb-0"
      >
        {/* Background video */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/globe.mp4"
          poster="/globe.png"
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-14">
          {/* Left: Text */}
          <div className="z-10 w-full max-w-2xl text-center lg:text-left">
            <div className="mb-4">
              <GSAPTextReveal
                className="font-clash"
                style={{
                  fontSize: "clamp(28px, 6vw, 48px)",
                  color: '#ffffff',
                  lineHeight: 1.1,
                }}
                stagger={0.12}
                duration={0.8}
                yOffset={70}
                start="top 85%"
              >
                DemandTech delivers results without <span style={{ color: '#ffffff' }}>Borders.</span>
              </GSAPTextReveal>
            </div>
            <GSAPParagraphReveal
              className="text-white/80 leading-relaxed font-neu text-lg"
              style={{ lineHeight: 1.6 }}
              duration={0.6}
              yOffset={24}
              start="top 85%"
            >
              With a presence across the Globe, we empower businesses worldwide with content creation, paid marketing, lead generation, and demand acceleration services.
            </GSAPParagraphReveal>
            <div className="mt-6 flex justify-center lg:justify-start">

            </div>
          </div>
          {/* Right: (removed globe) keep spacing structure if needed */}
          <div className="relative w-full max-w-xl" />
        </div>
      </div>
    </section>
  );
}

