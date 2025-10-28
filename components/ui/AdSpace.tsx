"use client";
import React from "react";
import { motion } from "framer-motion";

interface AdSpaceProps {
  title?: string;
  description?: string;
  imageSrc?: string; // If provided, show image
  videoSrc?: string; // If provided, show video
  ctaText?: string;
  onCtaClick?: () => void;
}

/**
 * Reusable sidebar AdSpace block.
 * - If videoSrc is provided, renders a muted looping video.
 * - Else if imageSrc is provided, renders an image.
 * - Else shows a visual placeholder frame that the team can replace later.
 */
export default function AdSpace({
  title,
  description,
  imageSrc,
  videoSrc,
  ctaText,
  onCtaClick,
}: AdSpaceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
    >
      {title ? (
        <h3
          className="text-lg font-semibold mb-3"
          style={{ fontFamily: "Clash Display, sans-serif" }}
        >
          {title}
        </h3>
      ) : null}

      {/* Media slot */}
      {videoSrc ? (
        <video
          src={videoSrc}
          className="w-full h-auto block"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageSrc} alt="Ad" className="w-full h-auto object-cover block" />
      ) : (
        <div className="aspect-video flex items-center justify-center text-gray-400">
          <span className="text-sm">Ad placeholder (image/video)</span>
        </div>
      )}

      {description && (
        <p className="text-sm text-gray-600 mt-3">{description}</p>
      )}

      {ctaText && (
        <button
          onClick={onCtaClick}
          className="mt-4 w-full inline-flex items-center justify-center rounded-md bg-blue-600 text-white text-sm font-medium px-4 py-2 hover:bg-blue-700 transition-colors"
        >
          {ctaText}
        </button>
      )}
    </motion.div>
  );
}
