"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

type Testimonial = {
    quote: string;
    name: string;
    designation: string;
    src: string;
};

export const AnimatedTestimonials = ({
    testimonials,
    autoplay = false,
}: {
    testimonials: Testimonial[];
    autoplay?: boolean;
}) => {
    const [active, setActive] = useState(0);

    const handleNext = () => {
        setActive((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const isActive = (index: number) => {
        return index === active;
    };

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 5000);
            return () => clearInterval(interval);
        }
    }, [autoplay]);

    // Generate consistent rotation values based on index to avoid hydration issues
    const getRotationForIndex = (index: number) => {
        const rotations = [6, -4, 8, -3, 5, -7, 4, -2, 9, -5];
        return rotations[index % rotations.length];
    };

    return (
        <div className="mx-auto max-w-6xl px-4 py-10 font-sans antialiased">
            <div className="relative grid grid-cols-1 gap-12 md:grid-cols-2">
                <div>
                    <div className="relative h-64 w-full md:h-80">
                        <AnimatePresence>
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.src}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                        z: -100,
                                        rotate: getRotationForIndex(index),
                                    }}
                                    animate={{
                                        opacity: isActive(index) ? 1 : 0.7,
                                        scale: isActive(index) ? 1 : 0.95,
                                        z: isActive(index) ? 0 : -100,
                                        rotate: isActive(index) ? 0 : getRotationForIndex(index),
                                        zIndex: isActive(index)
                                            ? 40
                                            : testimonials.length + 2 - index,
                                        y: isActive(index) ? [0, -80, 0] : 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                        z: 100,
                                        rotate: getRotationForIndex(index + 1),
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute inset-0 origin-bottom"
                                >
                                    <img
                                        src={testimonial.src}
                                        alt={testimonial.name}
                                        width={500}
                                        height={500}
                                        draggable={false}
                                        className="h-full w-full rounded-3xl object-cover object-center"
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="flex flex-col justify-between py-4">
                    <motion.div
                        key={active}
                        initial={{
                            y: 20,
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                        }}
                        exit={{
                            y: -20,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                        }}
                    >
                        <h3 className="text-3xl font-medium" style={{ fontFamily: 'Clash Display', color: '#535bf2' }}>
                            {testimonials[active].name}
                        </h3>
                        <p className="text-xl" style={{ color: '#213547' }}>
                            {testimonials[active].designation}
                        </p>
                        <motion.p className="mt-6 text-base leading-relaxed" style={{ fontFamily: 'Neue Montreal', color: '#213547' }}>
                            {testimonials[active].quote.split(" ").map((word, index) => (
                                <motion.span
                                    key={index}
                                    initial={{
                                        filter: "blur(10px)",
                                        opacity: 0,
                                        y: 5,
                                    }}
                                    animate={{
                                        filter: "blur(0px)",
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        ease: "easeInOut",
                                        delay: 0.02 * index,
                                    }}
                                    className="inline-block"
                                >
                                    {word}&nbsp;
                                </motion.span>
                            ))}
                        </motion.p>
                    </motion.div>
                    <div className="flex gap-4 pt-8 md:pt-6">
                        <button
                            onClick={handlePrev}
                            className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:bg-gray-100"
                            style={{
                                backgroundColor: '#f5f5f5',
                                border: '1px solid #ddd',
                                color: '#000',
                                fontSize: '18px',
                                fontWeight: 'bold'
                            }}
                        >
                            ←
                        </button>
                        <button
                            onClick={handleNext}
                            className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:bg-gray-100"
                            style={{
                                backgroundColor: '#f5f5f5',
                                border: '1px solid #ddd',
                                color: '#000',
                                fontSize: '18px',
                                fontWeight: 'bold'
                            }}
                        >
                            →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};