"use client";

import React from "react";
import { GSAPTextReveal } from "@/components/ui/GSAPTextReveal";
import GlobeFeatureSection from "./GlobeFeatureSection";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function HomeExtendedSections() {
  // Register GSAP ScrollTrigger once on client
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
  }, []);

  const chipsRef = React.useRef<HTMLUListElement | null>(null);

  // Animate chips on scroll into view
  React.useEffect(() => {
    if (!chipsRef.current) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".info-chip");
      gsap.from(items, {
        opacity: 0,
        y: 24,
        scale: 0.98,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: chipsRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, chipsRef);
    return () => ctx.revert();
  }, []);
  return (
    <div className="w-full">
      {/* About Section */}
      <section className="section-spacing mt-[100px] mb-[80px]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <GSAPTextReveal
              style={{
                alignItems: "center",
                alignContent: "center",
                fontFamily: "Clash Display",
                fontSize: "clamp(40px, 7vw, 64px)",
                textAlign: "center",
                color: "#000000",
              }}
              stagger={0.12}
              duration={0.8}
              yOffset={80}
              start="top 80%"
            >
              Global data. <span style={{ color: '#000cf8' }}>Local impact.</span>
            </GSAPTextReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-left">
            <div className="space-y-10 text-center">
              <p className="text-gray-700 leading-relaxed font-neu">
              We connect ideas, brands, and opportunities across the world—turning distance into possibility. With strategies built to scale beyond borders and speak every business language, we help you amplify your presence, spark engagement, and create impact that travels further than ever before.
              </p>
              <motion.ul
                ref={chipsRef}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 "
              >
                {[
                  { title: "North America", desc: "Reach accounts already in-market" },
                  { title: "Europe", desc: "Activate buyers across regions" },
                  { title: "Asia-Pacific", desc: "Human + digital verification" },
                  { title: "Middle East", desc: "From awareness to SQLs" },
                ].map((it) => (
                  <motion.li
                    key={it.title}
                    className="info-chip p-3 rounded-full border border-indigo-800 bg-white/70 backdrop-blur-md flex items-center justify-center"
                    // whileHover={{ y: -4, scale: 1.02 }}
                    // whileTap={{ scale: 0.98 }}
                    // transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <h5 className="text-center font-clash text-[20px] sm:text-[20px] md:text-[20px] text-[blue] font-medium">
                      {it.title}
                    </h5>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <div>
              <Image
                src="/about2.jpeg"
                alt="Global reach"
                width={1200}
                height={900}
                className="w-full h-auto rounded-4xl object-cover shadow-xl "
                priority={false}
              />
            </div>
          </div>
        </div>
      </section>
      <GlobeFeatureSection/>
    </div>
  );
}
