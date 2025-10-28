"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
    title: string;
    content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // initialize height
        setHeight(el.getBoundingClientRect().height);

        // observe size changes for responsiveness
        const ro = new ResizeObserver(() => {
            setHeight(el.getBoundingClientRect().height);
        });
        ro.observe(el);

        return () => ro.disconnect();
    }, [ref, data?.length]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div
            className="w-full bg-transparent dark:bg-transparent font-sans px-4 sm:px-6 md:px-10"
            ref={containerRef}
        >


            <div ref={ref} className="relative max-w-7xl mx-auto pb-12 sm:pb-16 md:pb-20">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-start gap-4 pt-8 sm:pt-12 md:pt-20 md:gap-10"
                    >
                        <div className="sticky flex flex-col md:flex-row z-40 items-center top-24 md:top-40 self-start max-w-[10rem] sm:max-w-xs lg:max-w-sm md:w-full">
                            <div className="h-8 w-8 md:h-10 md:w-10 absolute left-2 sm:left-3 md:left-3 rounded-full bg-white dark:bg-[#000cf8] flex items-center justify-center">
                                <div className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-neutral-200 dark:bg-[#000cf8] border border-neutral-300 dark:border-[#000cf8] p-2" />
                            </div>
                            <h2 className="hidden md:block text-4xl lg:text-5xl md:pl-16 lg:pl-20 font-bold text-neutral-500 dark:text-[#000000] ">
                                {item.title}
                            </h2>
                        </div>

                        <div className="relative pl-12 sm:pl-16 pr-2 sm:pr-4 md:pl-4 w-full">
                            <h2 className="md:hidden block text-3xl sm:text-4xl mb-3 sm:mb-4 text-left font-bold text-[#000000] dark:text-[#000000]">
                                {item.title}
                            </h2>
                            {item.content}{" "}
                        </div>
                    </div>
                ))}
                <div
                    style={{
                        height: height + "px",
                    }}
                    className="absolute left-6 sm:left-7 md:left-8 top-0 overflow-hidden w-px md:w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-[#000cf8] to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0 w-px md:w-[2px] bg-gradient-to-t from-[#000cf8] via-[#000cf8] to-transparent from-[0%] via-[10%] rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};
