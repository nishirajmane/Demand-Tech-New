"use client";

import { motion } from "framer-motion";

type AnimatedLogoProps = {
  onComplete?: () => void;
  className?: string;
};

export default function AnimatedLogo({ onComplete, className }: AnimatedLogoProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="-6 -6 422 461"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={`mx-auto ${className ?? ''}`}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient
          id="paint0_linear_0_1"
          x1="90.5691"
          y1="355.916"
          x2="9.19644"
          y2="419.464"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0000FF" />
          <stop offset="1" stopColor="#000099" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_0_1"
          x1="204.638"
          y1="0"
          x2="204.638"
          y2="447.937"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.331731" stopColor="#1A2FFB" />
          <stop offset="1" stopColor="#0F1C95" />
        </linearGradient>
      </defs>

      {/* Bottom ellipse-like shape */}
      <motion.path
        d="M92.5083 351C92.5106 351.008 94.7926 359.013 95.9341 395.541C95.9611 396.406 95.9148 397.164 95.8062 397.822C95.8901 398.954 95.9331 400.098 95.9331 401.251C95.9329 427.111 74.4576 448.075 47.9663 448.075C21.4751 448.075 -0.000283401 427.111 -0.000488281 401.251C-0.000488281 375.993 20.4857 355.405 46.1226 354.459C51.6363 353.759 59.1131 352.854 66.2407 352.142C77.6614 351 92.5083 351 92.5083 351Z"
        stroke="url(#paint0_linear_0_1)"
        fill="url(#paint0_linear_0_1)"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeMiterlimit={10}
        shapeRendering="geometricPrecision"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, strokeWidth: 0, strokeOpacity: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, strokeWidth: 3, strokeOpacity: 1, fillOpacity: 1 }}
        transition={{
          default: { duration: 2, ease: "easeInOut" },
          strokeWidth: { duration: 0.2, ease: "easeOut", delay: 0.08 },
          strokeOpacity: { duration: 0.2, ease: "easeOut", delay: 0.08 },
          // Fill only after both strokes finish (latest finishes at 4.5s)
          fillOpacity: { duration: 1.4, delay: 2, ease: "easeInOut" },
        }}
      />

      {/* Main masked body shape */}
      <motion.path
        d="M0 127.037V272.08C8.2229 310.459 38.069 317.767 52.5352 316.621C86.3404 315.707 96.3145 285.023 97.0759 269.796V152.163C98.9032 137.544 103.928 129.326 106.212 127.044C159.89 65.3656 245.545 97.3435 276.381 127.044C329.373 174.559 320.541 242.01 309.501 269.796C284.832 337.406 222.703 356.593 190.725 357.735C133.622 359.775 139.332 401.895 145.043 420.549C158.748 465.318 238.312 445.294 276.381 429.686C325.49 412.555 373.457 354.309 387.161 323.473C426.449 249.467 404.673 161.684 388.303 127.044C333.484 18.3187 226.13 -2.77154 179.305 0.273981C59.616 4.84226 10.2786 86.6842 0 127.037Z"
        stroke="url(#paint1_linear_0_1)"
        fill="url(#paint1_linear_0_1)"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeMiterlimit={10}
        shapeRendering="geometricPrecision"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, strokeWidth: 0, strokeOpacity: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, strokeWidth: 3, strokeOpacity: 1, fillOpacity: 1 }}
        transition={{
          default: { duration: 3, ease: "easeInOut", delay: 0.5 },
          strokeWidth: { duration: 0.2, ease: "easeOut", delay: 0.58 },
          strokeOpacity: { duration: 0.2, ease: "easeOut", delay: 0.58 },
          // Fill only after both strokes finish (latest finishes per your current timings)
          fillOpacity: { duration: 1.4, delay: 2, ease: "easeInOut" },
        }}
        onAnimationComplete={() => onComplete?.()}
      />
    </svg>
  );
}
