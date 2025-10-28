'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const ScrollAnimations = () => {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // Set initial states for all animated elements
        gsap.set([
            '.navigation-container',
            '.card-col',
            '.desc-col',
            '.actions',
            '.logo-slider-container',
            '.service-item',
            '.testimonials-container'
        ], {
            y: 60,
            opacity: 0
        });

        // Navigation Animation (immediate on load)
        gsap.to('.navigation-container', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            delay: 0.2
        });

        // Hero Card Animation - synchronized with paragraph
        gsap.to('.card-col', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.desc-col',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        // Hero Description Container Animation
        gsap.to('.desc-col', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.desc-col',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        // Hero Actions Animation
        gsap.to('.actions', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.5,
            scrollTrigger: {
                trigger: '.desc-col',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        // Logo Slider Animation
        gsap.to('.logo-slider-container', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.logo-slider-container',
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });

        // Service Items Stagger Animation
        gsap.to('.service-item', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.15,
            scrollTrigger: {
                trigger: '.servicescards',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        // Testimonials Container Animation
        gsap.to('.testimonials-container', {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.testimonials-section',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return null; // This component only handles animations
};

// Individual animation components for more granular control
export const FadeInUp = ({
    children,
    className = '',
    delay = 0,
    duration = 0.8,
    yOffset = 60,
    trigger = 'self',
    start = 'top 85%'
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    yOffset?: number;
    trigger?: string;
    start?: string;
}) => {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);

        const element = document.querySelector(`.${className}`);
        if (!element) return;

        gsap.set(element, { y: yOffset, opacity: 0 });

        gsap.to(element, {
            y: 0,
            opacity: 1,
            duration,
            ease: 'power2.out',
            delay,
            scrollTrigger: {
                trigger: trigger === 'self' ? element : trigger,
                start,
                toggleActions: 'play none none reverse'
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === element) {
                    trigger.kill();
                }
            });
        };
    }, [className, delay, duration, yOffset, trigger, start]);

    return <div className={className}>{children}</div>;
};