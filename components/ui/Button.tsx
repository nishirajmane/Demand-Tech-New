"use client";

import styles from "./Button.module.scss";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ButtonProps {
    label?: string;
    href?: string;
}

const Button = ({ label = "About Us", href }: ButtonProps) => {
    const [isHover, setIsHover] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleInteraction = (isActive: boolean) => {
        if (!isMobile) {
            setIsHover(isActive);
        }
    };

    const content = (
        <div className="font-inter">
            <motion.div
                className={styles.buttonContainer}
                onMouseEnter={() => handleInteraction(true)}
                onMouseLeave={() => handleInteraction(false)}
                onTouchStart={() => isMobile && setIsHover(true)}
                onTouchEnd={() => isMobile && setIsHover(false)}
                animate={{
                    backgroundColor: isHover ? "#0a00c1" : "#ffffff",
                }}
                transition={{ ease: "easeIn", duration: 0.2 }}
            >
                {/* Circle - visible before hover */}
                <motion.div
                    className={styles.circle}
                    animate={{
                        scale: isHover ? 1.45 : 1,
                        backgroundColor: isHover ? "#0a00c1" : "#000000",
                    }}
                    transition={{ ease: "easeIn", duration: 0.2 }}
                />

                {/* Title */}
                <motion.div
                    className={styles.title}
                    animate={{
                        x: isHover ? -8 : 8,
                        color: isHover ? "#FFFFFF" : "#000000",
                    }}
                >
                    <p>{label}</p>
                </motion.div>

                {/* Icon */}
                <motion.div
                    className={styles.iconContainer}
                    animate={{
                        x: isHover ? 0 : 24,
                        color: isHover ? "#FFFFFF" : "#000000",
                        opacity: isHover ? 1 : 0,
                    }}
                >
                    <ArrowRightIcon
                        className={styles.icon}
                        style={{ color: isHover ? "#FFFFFF" : "#000000" }}
                    />
                </motion.div>
            </motion.div>
        </div>
    );
    
    if (href) {
        return (
            <Link href={href} className="inline-block">
                {content}
            </Link>
        );
    }

    return content;
};

export default Button;
