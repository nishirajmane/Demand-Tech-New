"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import './Ribbons.css';

interface Ribbon2Props {
    className?: string;
}

function Ribbon2({ className = '' }: Ribbon2Props) {
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    // Enhanced scroll handler with better performance and easing
    const handleScroll = useCallback(() => {
        const path = pathRef.current;
        if (!path) return;

        const scrollTop = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollable = documentHeight - windowHeight;

        if (scrollable <= 0) return;

        // Calculate raw scroll percentage
        const rawPercentage = scrollTop / scrollable;
        const clampedPercentage = Math.min(Math.max(rawPercentage, 0), 1);
        
        // Enhanced animation timing - starts later but with smoother progression
        const startThreshold = 0.15; // Start animation at 15% scroll
        const adjustedPercentage = Math.max(0, (clampedPercentage - startThreshold) / (1 - startThreshold));
        
        // Combine multiple easing functions for more natural movement
        const easeInOutCubic = adjustedPercentage < 0.5 
            ? 4 * adjustedPercentage * adjustedPercentage * adjustedPercentage 
            : 1 - Math.pow(-2 * adjustedPercentage + 2, 3) / 2;
            
        const easeOutSine = Math.sin((adjustedPercentage * Math.PI) / 2);
        
        // Blend easing functions for optimal visual effect
        const blendedEasing = easeInOutCubic * 0.6 + easeOutSine * 0.4;
        const finalPercentage = adjustedPercentage <= 0 ? 0 : blendedEasing;

        // Dynamic path length based on screen size for better performance
        const screenWidth = window.innerWidth;
        let pathLength = 8000;
        
        if (screenWidth <= 480) {
            pathLength = 6000; // Shorter for mobile
        } else if (screenWidth <= 768) {
            pathLength = 7000; // Medium for tablet
        }

        const drawLength = pathLength * finalPercentage;
        const dashOffset = pathLength - drawLength;
        
        path.style.strokeDasharray = String(pathLength);
        path.style.strokeDashoffset = String(dashOffset);
    }, []);

    // Optimized event handlers with throttling
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

    // Responsive visibility and positioning
    useEffect(() => {
        const checkResponsiveness = () => {
            const screenWidth = window.innerWidth;
            const isMobile = screenWidth <= 480;
            
            // Always show unless screen is extremely small
            setIsVisible(screenWidth > 320);
            
            // Adjust positioning based on screen size
            const svg = svgRef.current;
            if (svg) {
                const container = svg.parentElement;
                if (container) {
                    if (isMobile) {
                        container.style.top = '2500px';
                    } else if (screenWidth <= 768) {
                        container.style.top = '2800px';
                    } else {
                        container.style.top = '3000px';
                    }
                }
            }
        };

        checkResponsiveness();
        window.addEventListener('resize', checkResponsiveness, { passive: true });
        
        return () => {
            window.removeEventListener('resize', checkResponsiveness);
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
            className={`ribbon2 ${className}`}
            preserveAspectRatio="xMidYMin meet"
            style={{ 
                maxWidth: '100%',
                height: 'auto'
            }}
        >
            <g clipPath="url(#clip0_912_360)">
                <path
                    ref={pathRef}
                    d="M2004.07 186.294C1396.83 581.017 1944.5 826.873 1673.04 1164.32C1486.29 1396.45 858.233 1443.96 761.52 1138.9C664.807 833.838 979.657 677.066 1158.84 787.227C1338.03 897.388 1439.31 1130.42 1322.45 1596.48C1202.42 2075.17 1800.22 1859.15 1759.8 2327.74C1673.04 3333.66 349.123 2443.96 949.495 2107.34C1656.37 1711 2044.29 3534.98 -381.722 3416.01"
                    stroke="url(#paint0_linear_912_360)"
                    strokeWidth="30"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                />
            </g>
            <defs>
                <linearGradient 
                    id="paint0_linear_912_360" 
                    x1="811.174" 
                    y1="186.294" 
                    x2="811.174" 
                    y2="3421.6" 
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#00E0F4" />
                    <stop offset="0.5" stopColor="#7DD8E8" />
                    <stop offset="1" stopColor="#DAD5FF" />
                </linearGradient>
                <clipPath id="clip0_912_360">
                    <rect width="1962" height="3689" fill="white" transform="matrix(-1 0 0 1 1956 0)" />
                </clipPath>
            </defs>
        </svg>
    );
}

export default Ribbon2;