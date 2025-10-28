"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import './Ribbons.css';

interface Ribbon1Props {
    className?: string;
}

function Ribbon1({ className = '' }: Ribbon1Props) {
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    // Enhanced scroll handler with better performance and easing
    const handleScroll = useCallback(() => {
        const svg = svgRef.current;
        const path = pathRef.current;
        
        if (!svg || !path) return;

        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Calculate scroll percentage
        const scrollableDistance = documentHeight - windowHeight;
        const scrollPercentage = scrollableDistance > 0 ? Math.min(1, Math.max(0, scrollY / scrollableDistance)) : 0;
        
        // Apply easing function for smoother animation - starts from completely off-screen
        const easeOutCubic = 1 - Math.pow(1 - scrollPercentage, 3);
        
        try {
            const pathLength = path.getTotalLength();
            
            // Start completely off-screen (add extra offset)
            const totalOffset = pathLength; // Extra 1000px to ensure it starts off-screen
            const drawLength = totalOffset * easeOutCubic;
            const dashOffset = totalOffset - drawLength;
            
            path.style.strokeDasharray = `${pathLength}`;
            path.style.strokeDashoffset = `${dashOffset}`;
        } catch (e) {
            // Fallback for browsers that don't support getTotalLength
            const fallbackLength = 8000;
            const totalOffset = fallbackLength + 1000;
            const drawLength = totalOffset * easeOutCubic;
            const dashOffset = totalOffset - drawLength;
            
            path.style.strokeDasharray = `${fallbackLength}`;
            path.style.strokeDashoffset = `${dashOffset}`;
        }
    }, []);

    // Throttled scroll event handler
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

        // Initial call
        handleScroll();
        
        window.addEventListener('scroll', throttledScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', throttledScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [handleScroll]);

    // Responsive visibility and positioning handler
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const isMobile = screenWidth <= 480 ;
            const isTablet = screenWidth > 480 && screenWidth <= 768;
            
            // Always show unless screen is extremely small
            setIsVisible(screenWidth > 768); // Hide on mobile and small tablets

            
            // Adjust SVG container positioning to prevent gaps
            const svg = svgRef.current;
            if (svg) {
                if (isMobile) {
                    svg.style.position = 'fixed';
                    svg.style.top = '0';
                    svg.style.left = '0';
                    svg.style.width = '100vw';
                    svg.style.height = '100vh';
                    svg.style.zIndex = '-1';
                } else if (isTablet) {
                    svg.style.position = 'absolute';
                    svg.style.top = '0';
                    svg.style.left = '0';
                    svg.style.width = '100%';
                    svg.style.height = 'auto';
                    svg.style.zIndex = '10';
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

    if (!isVisible) {
        return null;
    }

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
                    <stop stopColor="#1D00F8" />
                    <stop offset="0.5" stopColor="#6B46FF" />
                    <stop offset="1" stopColor="#9B8DFF" />
                </linearGradient>
                <clipPath id="clip0_879_174">
                    <rect width="1962" height="3689" fill="white" transform="translate(-6)" />
                </clipPath>
            </defs>
        </svg>
    );
}

export default Ribbon1;