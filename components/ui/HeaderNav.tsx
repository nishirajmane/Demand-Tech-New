"use client";

import { SlideTabsExample } from "./SliderTabs";
import Button from "./Button";
import { motion, cubicBezier } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const containerVariants = {
    initial: { opacity: 0, y: -12 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.35,
            ease: cubicBezier(0.22, 1, 0.36, 1),
            when: "beforeChildren",
            staggerChildren: 0.06,
        },
    },
};

const itemVariants = {
    initial: { opacity: 0, y: -8 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: cubicBezier(0.22, 1, 0.36, 1) },
    },
};

export default function HeaderNav() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Don't render on mobile_
    if (isMobile) {
        return null;
    }

    return (
        <motion.div
            className="bg-transparent max-w-full mx-auto px-4 sm:px-6 lg:px-8 pt-2 relative z-[9999] flex items-center justify-center"
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >
            <motion.div className="absolute left-5 sm:left-6 lg:left-8 flex items-center z-20 pointer-events-auto" variants={itemVariants}>
                <Link href="/" aria-label="Home">
                    <Image
                        src="/Gradient_Logo.svg"
                        alt="DemandTech logo"
                        width={50}
                        height={10}
                        priority
                    />
                </Link>
            </motion.div>
            <motion.div className="flex justify-center z-10 pointer-events-none" variants={itemVariants}>
                <div className="pointer-events-auto">
                    <SlideTabsExample />
                </div>
            </motion.div>
            <motion.div className="absolute right-4 sm:right-6 lg:right-8 z-20 pointer-events-auto" variants={itemVariants}>
                <Button label="Contact Us" href="/contact" />
            </motion.div>
        </motion.div>
    );
}