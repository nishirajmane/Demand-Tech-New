"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Element3() {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imgRef.current) {
      // Base infinite slow rotation
      const baseRotation = gsap.to(imgRef.current, {
        rotation: 360,
        duration: 20, // 20 seconds for one full rotation
        ease: "power2.out",
        repeat: -1,
        transformOrigin: "50% 50%",
      });

      // Scroll-triggered speed increase
      gsap.to(baseRotation, {
        timeScale: 5, // Speed multiplier on scroll
        scrollTrigger: {
          trigger: imgRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onLeave: () => baseRotation.timeScale(1), // Reset to normal speed
          onEnterBack: () => baseRotation.timeScale(1), // Reset to normal speed
        },
      });
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[150px] min-w-[150px]">
      <Image
        ref={imgRef}
        src="Elements/element4.svg" // ✅ Place your image in the public folder
        alt="Rotating Image"
        width={150}
        height={150}
        className="opacity-95"
      />
    </div>
  );
}
