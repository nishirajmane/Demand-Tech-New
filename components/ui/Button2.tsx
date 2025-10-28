"use client";

import styles from "./Button2.module.scss";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Button2Props {
    text?: string;
    href?: string;
}

const Button2 = ({ text = "About Us", href = "/services/demand-generation" }: Button2Props) => {
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

    return (
        <div className="font-inter">
            <Link href={href} className="inline-block">
                <motion.div
                    className={styles.buttonContainer}
                    onMouseEnter={() => handleInteraction(true)}
                    onMouseLeave={() => handleInteraction(false)}
                    onTouchStart={() => isMobile && setIsHover(true)}
                    onTouchEnd={() => isMobile && setIsHover(false)}
                    animate={{
                        backgroundColor: isHover ? "transparent" : "transparent",
                    }}
                    transition={{ ease: "easeIn", duration: 0.2 }}
                >
                    {/* Title */}
                    <motion.div
                        className={styles.title}
                        animate={{
                            x: isHover ? -12 : 0,
                            color: isHover ? "#000000" : "#000000",
                        }}
                    >
                        <p>{text}</p>
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                        className={styles.iconContainer}
                        animate={{
                            x: isHover ? 0 : 32,
                            color: isHover ? "#00000" : "#000000",
                            opacity: isHover ? 1 : 0,
                        }}
                    >
                        <ArrowRightIcon
                            className={styles.icon}
                            style={{ color: isHover ? "#00000" : "#000000" }}
                        />
                    </motion.div>
                </motion.div>
            </Link>
        </div>
    );
};

export default Button2;
