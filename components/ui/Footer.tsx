"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";


import { FaLinkedin, FaTwitter, FaInstagram, FaArrowRight } from "react-icons/fa";
import Button2 from "./Button2";
import Button3 from "./Button3";

const linkSections = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Products", href: "/products" },
      { label: "Pricing", href: "/pricing" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blogs", href: "/about/blogs" },
      { label: "Case Studies", href: "/about/case-studies" },
      { label: "Clients", href: "/about/clients" },
      { label: "Resources", href: "/about/resources" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "GDPR", href: "/gdpr" },
      { label: "CCPA", href: "/ccpa" },
      // { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

export default function Footer() {
  return (



    <footer className="w-full relative bg-[#F0F1FA] text-gray-800 py-10 overflow-hidden">
      <div className="max-w-full mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-20">
          {/* Logo + Newsletter */}
          <div className="space-y-6 col-span-1 md:col-span-2 lg:col-span-1 text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="text-blue-600"></span>
            </h1>
            <div className="flex justify-center md:justify-start">
              <Image
                src="/demandtech_logo.svg"
                alt="DemandTech"
                width={940}
                height={452}
                className="w-full h-auto max-w-[480px] md:max-w-[560px] lg:max-w-[680px]"
                priority
              />
          
          </div>
          <div className="text-gray-500">
            Stay ahead of the curve. Get the latest marketing insights and trends delivered to your inbox.
            </div>
          </div>

          {/* Navigation Links */}
          {linkSections.map((section) => (
            <div key={section.title} className="space-y-4 md:space-y-6 text-center md:text-left">
              <h3 className="hidden md:block text-lg font-semibold text-gray-900">{section.title}</h3>
              <ul className="grid gap-2 md:gap-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <motion.div whileHover={{ x: 4 }} className="relative group">
                      <Link href={link.href} className="text-gray-600 hover:text-blue-600 transition-colors">
                        {link.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-12" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-500 text-center md:text-left">
          <p>© {new Date().getFullYear()} DemandTech. All rights reserved.</p>

          {/* Socials */}
          <div className="flex gap-5">
            <motion.a whileHover={{ scale: 1.2, color: '#2563EB' }} href="https://www.linkedin.com/company/demandify-media/mycompany/" className="text-gray-500">
              <FaLinkedin className="w-5 h-5" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2, color: '#2563EB' }} href="https://x.com/Demandifymedia" className="text-gray-500">
              <FaTwitter className="w-5 h-5" />
            </motion.a>
            <motion.a whileHover={{ scale: 1.2, color: '#2563EB' }} href="https://www.instagram.com/demandify_media/" className="text-gray-500">
              <FaInstagram className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
