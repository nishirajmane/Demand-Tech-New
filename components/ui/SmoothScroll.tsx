"use client";

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            autoRaf: true,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 2,
        });

        // Listen for the scroll event and log the event data
        lenis.on('scroll', (e) => {
            // You can add scroll event handlers here if needed
        });

        return () => {
            lenis.destroy();
        };
    }, []);

    return null;
}