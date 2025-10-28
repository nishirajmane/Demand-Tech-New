"use client";

import styles from "./Button4.module.scss";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Button4Props {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    variant?: "primary" | "secondary";
}

const Button4 = ({ label, onClick, disabled = false, variant = "primary" }: Button4Props) => {
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
        if (!isMobile && !disabled) {
            setIsHover(isActive);
        }
    };

    const handleClick = () => {
        if (!disabled && onClick) {
            onClick();
        }
    };

    const content = (
        <div className="font-inter">
            <motion.div
                className={`${styles.buttonContainer} ${disabled ? styles.disabled : ''} ${variant === "secondary" ? styles.secondary : ''}`}
                onMouseEnter={() => handleInteraction(true)}
                onMouseLeave={() => handleInteraction(false)}
                onTouchStart={() => isMobile && !disabled && setIsHover(true)}
                onTouchEnd={() => isMobile && !disabled && setIsHover(false)}
                onClick={handleClick}
                animate={{
                    backgroundColor: disabled 
                        ? "#f3f4f6" 
                        : isHover 
                            ? "#0a00c1"
                            : "#ffffff",
                }}
                transition={{ ease: "easeIn", duration: 0.2 }}
                style={{ cursor: disabled ? "not-allowed" : "pointer" }}
            >
                                 {/* Circle - visible before hover */}
                 <motion.div
                     className={styles.circle}
                     animate={{
                         scale: isHover && !disabled ? 1.45 : 1,
                         opacity: isHover && !disabled ? 0 : 1,
                         backgroundColor: disabled 
                             ? "#d1d5db" 
                             : isHover 
                                 ? (variant === "primary" ? "#0a00c1" : "#000000")
                                 : (variant === "primary" ? "#000000" : "#000000"),
                     }}
                     transition={{ ease: "easeIn", duration: 0.2 }}
                 />

                {/* Title */}
                <motion.div
                    className={styles.title}
                                    animate={{
                    x: isHover && !disabled ? -8 : 8,
                    color: disabled 
                        ? "#9ca3af" 
                        : isHover 
                            ? "#FFFFFF"
                            : "#000000",
                }}
                >
                    <p>{label}</p>
                </motion.div>

                                 {/* Icon */}
                 <motion.div
                     className={styles.iconContainer}
                                         animate={{
                        x: isHover && !disabled ? 0 : (variant === "secondary" ? -24 : 24),
                        color: disabled 
                            ? "#9ca3af" 
                            : isHover 
                                ? "#FFFFFF"
                                : "#000000",
                        opacity: isHover && !disabled ? 1 : 0,
                    }}
                 >
                     <svg
                         className={styles.icon}
                         fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor"
                     >
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={variant === "secondary" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
                     </svg>
                 </motion.div>
            </motion.div>
        </div>
    );

    return content;
};

export default Button4;
