"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import './Ribbons.css';

interface Ribbon3Props {
    className?: string;
}

function Ribbon3({ className = '' }: Ribbon3Props) {
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    const handleScroll = useCallback(() => {
        const svg = svgRef.current;
        const path = pathRef.current;

        if (!svg || !path) return;

        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        const scrollableDistance = documentHeight - windowHeight;
        const scrollPercentage = scrollableDistance > 0 ? Math.min(1, Math.max(0, scrollY / scrollableDistance)) : 0;

        const easeOutCubic = 1 - Math.pow(1 - scrollPercentage, 3);

        try {
            const pathLength = path.getTotalLength();
            const totalOffset = pathLength;
            const drawLength = totalOffset * easeOutCubic;
            const dashOffset = totalOffset - drawLength;

            path.style.strokeDasharray = `${pathLength}`;
            path.style.strokeDashoffset = `${dashOffset}`;
        } catch (e) {
            const fallbackLength = 10000;
            const totalOffset = fallbackLength + 500;
            const drawLength = totalOffset * easeOutCubic;
            const dashOffset = totalOffset - drawLength;

            path.style.strokeDasharray = `${fallbackLength}`;
            path.style.strokeDashoffset = `${dashOffset}`;
        }
    }, []);

    useEffect(() => {
        let ticking = false;

        const throttledScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        handleScroll();

        window.addEventListener('scroll', throttledScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', throttledScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [handleScroll]);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            const isMobile = screenWidth <= 480;

            setIsVisible(screenWidth > 768);

            const svg = svgRef.current;
            if (svg) {
                if (isMobile) {
                    svg.style.position = 'fixed';
                    svg.style.top = '0';
                    svg.style.left = '0';
                    svg.style.width = '100vw';
                    svg.style.height = '100vh';
                    svg.style.zIndex = '-1';
                } else {
                    svg.style.position = 'absolute';
                    svg.style.top = '0';
                    svg.style.left = '0';
                    svg.style.width = '100%';
                    svg.style.height = 'auto';
                    svg.style.zIndex = '10';
                }
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <svg
            ref={svgRef}
            width="1920"
            height="3689"
            viewBox="0 0 1920 3689"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`ribbon1 ${className}`}
            preserveAspectRatio="xMidYMin slice"
            style={{
                maxWidth: '100vw',
                height: 'auto',
                overflow: 'hidden'
            }}
        >
            <g clipPath="url(#clip0_879_174)">
                <path
                    ref={pathRef}
                    d="M-54.0703 186.294C553.169 581.017 5.50149 826.873 276.964 1164.32C463.709 1396.45 1091.77 1443.96 1188.48 1138.9C1285.19 833.837 970.343 677.066 791.155 787.227C611.966 897.388 510.685 1130.42 627.546 1596.48C747.575 2075.17 149.78 1859.15 190.199 2327.74C276.962 3333.66 1600.88 2443.96 1000.5 2107.34C293.629 1711 -94.2913 3534.98 2331.72 3416.01"
                    stroke="url(#paint0_linear_879_174)"
                    strokeWidth="25"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                />
            </g>
            <defs>
                <linearGradient
                    id="paint0_linear_879_174"
                    x1="1138.83"
                    y1="186.294"
                    x2="1138.83"
                    y2="3421.6"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#4D5CFF" />       {/* Dark Blue (Brand Primary) */}
                    <stop offset="0.5" stopColor="#000CF8" /> {/* Medium Blue */}
                    <stop offset="1" stopColor="#0008C0" />   {/* Light Blue Accent */}
                </linearGradient>
                <clipPath id="clip0_879_174">
                    <rect width="1962" height="3689" fill="white" transform="translate(-6)" />
                </clipPath>
            </defs>
        </svg>
    );
}

export default Ribbon3;
