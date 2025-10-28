"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Element2() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".circle",
      { scale: 0.3, opacity: 0, transformOrigin: "center center" },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".circle-container",
          start: "top 80%",
          end: "bottom 30%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <div className="circle-container flex justify-center items-center py-20 "  >
      <svg
        width="150"
        height="60"
        viewBox="0 0 2232 558"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-6xl"
      >
        <circle
          className="circle"
          cx="279"
          cy="279"
          r="279"
          fill="url(#paint0_linear_2008_438)"
        />
        <circle
          className="circle"
          cx="837"
          cy="279"
          r="279"
          fill="url(#paint1_linear_2008_438)"
        />
        <circle
          className="circle"
          cx="1395"
          cy="279"
          r="279"
          fill="url(#paint2_linear_2008_438)"
        />
        <circle
          className="circle"
          cx="1953"
          cy="279"
          r="279"
          fill="url(#paint3_linear_2008_438)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2008_438"
            x1="0"
            y1="279"
            x2="558"
            y2="279"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1A2FFB" />
            <stop offset="1" stopColor="#6B79FF" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_2008_438"
            x1="558"
            y1="279"
            x2="1116"
            y2="279"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1A2FFB" />
            <stop offset="1" stopColor="#6B79FF" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_2008_438"
            x1="1116"
            y1="279"
            x2="1674"
            y2="279"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1A2FFB" />
            <stop offset="1" stopColor="#6B79FF" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_2008_438"
            x1="1674"
            y1="279"
            x2="2232"
            y2="279"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1A2FFB" />
            <stop offset="1" stopColor="#6B79FF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
