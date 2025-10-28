"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, cubicBezier } from "framer-motion";
import MobileNavbar from "./MobileNavbar";

export default function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top mobile bar */}
      <motion.div
        className="md:hidden w-full bg-[#F0F1FA] mb-8"
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { duration: 0.35, ease: cubicBezier(0.22, 1, 0.36, 1) } }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" aria-label="DemandTech Home" className="flex items-center gap-2">
             <Image src="/Gradient_Logo.svg" alt="DemandTech Logo" width={28} height={28} priority />
          </Link>

          <div
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="p-2 rounded-md"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Drawer */}
      <MobileNavbar open={open} onClose={() => setOpen(false)} />
    </>
  );
}
