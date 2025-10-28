"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { useRef, RefObject } from "react";
import { useOutsideClick } from "../../hooks/use-outside-click";

interface MobileNavbarProps {
  open: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function MobileNavbar({ open, onClose }: MobileNavbarProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useOutsideClick(panelRef as unknown as RefObject<HTMLDivElement>, () => open && onClose());

  // Animation variants for the drawer and its children for staggered reveal
  const containerVariants: Variants = {
    open: {
      transition: { staggerChildren: 0.06, delayChildren: 0.08 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const itemVariants: Variants = {
    open: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 380, damping: 28 } },
    closed: { opacity: 0, x: 20 },
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[10000] bg-black/10 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            ref={panelRef as unknown as RefObject<HTMLDivElement>}
            className="fixed top-0 right-0 h-full min-h-screen w-4/5 max-w-xs bg-white dark:bg-neutral-900 z-[10001] shadow-xl flex flex-col"            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            <div className="px-4 py-4 bg-[#F0F1FA] border-white flex items-center justify-between">
              <div className="text-[24px] font-clash text-base ">Menu</div>
              <div
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <motion.nav
              className="p-6 bg-[#F0F1FA] flex-1 overflow-y-auto"
              initial="closed"
              animate="open"
              exit="closed"
              variants={containerVariants}
            >
              <motion.ul className="space-y-3" variants={containerVariants}>
                {navLinks.map((link) => (
                  <motion.li key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      className="block px-3 py-2 rounded-md text-[24px] font-clash text-[#000cf8] hover:bg-white hover:shadow-sm transition-colors"
                      onClick={onClose}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.nav>

            <div className="mt-auto p-4 bg-[#F0F1FA] mb-0">
              <Link
                href="/contact"
                className="block w-full text-center px-4 py-3 rounded-3xl bg-white text-[#000cf8] font-clash border border-white/70 shadow-sm hover:shadow-md transition-shadow"
                onClick={onClose}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
