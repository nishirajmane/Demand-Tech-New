import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface Button5Props {
  text?: string;
  href?: string;
  className?: string;
}

export const Button5 = ({ text = "Learn More", href }: Button5Props) => {
  const [isHover, setIsHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleInteraction = (isActive: boolean) => {
    if (!isMobile) {
      setIsHover(isActive);
    }
  };

  const content = (
    <div className="font-inter">
      <motion.div
        className="relative flex items-center justify-between w-68 px-6 py-4 rounded-full cursor-pointer select-none"
        // ⬆️ w-72 = wider, px-8 = more side padding, py-5 = taller button, rounded-full = pill shape
        onMouseEnter={() => handleInteraction(true)}
        onMouseLeave={() => handleInteraction(false)}
        onTouchStart={() => isMobile && setIsHover(true)}
        onTouchEnd={() => isMobile && setIsHover(false)}
        animate={{
          background: isHover
            ? "rgba(115,147,179,0.25)"
            : "rgba(213,215,239,0.15)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: isHover
            ? "0 8px 32px rgba(31, 38, 135, 0.37)"
            : "0 4px 16px rgba(31, 38, 135, 0.2)",
        }}
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
      >
        {/* Circle (left) */}
        <motion.div
          className="w-4 h-4 rounded-full bg-black"
          // ⬆️ bigger circle
          animate={{
            opacity: isHover ? 0 : 0.7,
            scale: isHover ? 0.5 : 0.7,
          }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        />

        {/* Text (center) */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <p className="text-black font-normal text-lg">{text}</p>
          {/* ⬆️ bigger text */}
        </div>

        {/* Arrow (right) */}
        <motion.div
          animate={{
            opacity: isHover ? 1 : 0,
            x: isHover ? 0 : 10,
          }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        >
          <ArrowRightIcon className="w-6 h-6 text-black" />
          {/* ⬆️ bigger arrow */}
        </motion.div>
      </motion.div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-block"
        onClick={() => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("show-preloader"));
          }
        }}
      >
        {content}
      </Link>
    );
  }

  return content;
};


interface Button6Props {
  text?: string;
  href?: string;
  className?: string;
}

export const Button6 = ({ text = "Learn More", href }: Button6Props) => {
  const [isHover, setIsHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleInteraction = (isActive: boolean) => {
    if (!isMobile) setIsHover(isActive);
  };

  const content = (
    <div className="font-inter">
      <motion.div
       className="relative flex items-center justify-between w-64 px-3 py-3 rounded-full cursor-pointer select-none"
        onMouseEnter={() => handleInteraction(true)}
        onMouseLeave={() => handleInteraction(false)}
        onTouchStart={() => isMobile && setIsHover(true)}
        onTouchEnd={() => isMobile && setIsHover(false)}
        animate={{
          background: isHover
            ? "rgba(115,147,179,0.25)"
            : "rgba(213,215,239,0.15)",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: isHover
            ? "0 8px 32px rgba(31, 38, 135, 0.37)"
            : "0 4px 16px rgba(31, 38, 135, 0.2)",
        }}
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
      >
        {/* Circle (left) */}
        <motion.div
          className="w-4 h-4 rounded-full bg-white"
          animate={{
            opacity: isHover ? 0 : 0.7,
            scale: isHover ? 0.5 : 0.7,
          }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        />

        {/* Text (centered with flex) */}
        <p className="text-white font-normal text-lg">{text}</p>

        {/* Arrow (right) */}
        <motion.div
          animate={{
            opacity: isHover ? 1 : 0,
            x: isHover ? 0 : 10,
          }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        >
          <ArrowRightIcon className="w-6 h-6 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-block"
        onClick={() => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("show-preloader"));
          }
        }}
      >
        {content}
      </Link>
    );
  }

  return content;
};
