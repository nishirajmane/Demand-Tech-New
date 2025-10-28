"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Growth", "Revenue", "Leads", "Conversions", "Business"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full bg-[#F0F1FA]">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16 lg:py-24">
          {/* Left: Copy */}
          <div className="order-2 lg:order-1">
            <div className="text-[clamp(40px,6.5vw,80px)] leading-[0.95] font-regular text-left">
              <span className="font-clash">Intelligence that Drives</span>
              <span className="relative inline-flex overflow-hidden align-baseline md:pb-3 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-clash text-[#000cf8]"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </div>
            <div className="mt-6">
              <p className="text-base md:text-lg leading-relaxed max-w-2xl text-left">
                Managing a small business today is already tough. Avoid further complications by ditching tedious trade methods. Our goal is to streamline SMB trade, making it easier and faster than ever.
              </p>
            </div>
            <div className="flex flex-row gap-3 mt-8">
              <Button label="About Us" href="/about" />
              <Button label="Get Started" href="/contact" />
            </div>
          </div>

          {/* Right: Video */}
          <div className="order-1 lg:order-2">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-neutral-200 bg-white shadow-sm">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src="/herovide.mp4"
                poster="/herovide.png"
                preload="metadata"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
