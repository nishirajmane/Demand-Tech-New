"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Element1() {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const el = imgRef.current;
    let rotationAccum = 0; // total rotation applied (degrees)
    let lastProgress = 0;  // previous progress from 0..1

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        // Only rotate when scrolling UP (direction === -1)
        if (self.direction === -1) {
          const delta = lastProgress - self.progress; // positive when going up
          if (delta > 0) {
            rotationAccum += delta * 720; // scale to desired spin amount
            gsap.set(el, { rotation: rotationAccum, transformOrigin: "50% 50%" });
          }
        }
        // Always update lastProgress so deltas are correct when direction changes
        lastProgress = self.progress;
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-[150px] min-w-[150px]">
      <Image
        ref={imgRef}
        src="Elements/element2.svg" // ✅ Place your image in the public folder
        alt="Rotating Image"
        width={150}
        height={150}
        className="opacity-95"
      />
    </div>
  );
}
