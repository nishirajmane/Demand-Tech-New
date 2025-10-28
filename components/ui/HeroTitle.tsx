'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const HeroTitle = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Register ScrollTrigger

        gsap.registerPlugin(ScrollTrigger);

        const container = containerRef.current;
        if (!container) return;

        // Animate hero lines
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
            }
        });

        tl.to('.hero-line-1', {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out'
        })
            .to('.hero-line-2', {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power2.out'
            }, '-=0.8');

        // Parallax effect only on tablet/desktop. Automatically removed on viewport change.
        ScrollTrigger.matchMedia({
            '(min-width: 768px)': function () {
                gsap.to('.hero-line-1', {
                    x: -120,
                    scrollTrigger: {
                        trigger: container,
                        start: 'top center',
                        end: 'bottom top',
                        scrub: 0.2
                    }
                });

                gsap.to('.hero-line-2', {
                    x: 120,
                    scrollTrigger: {
                        trigger: container,
                        start: 'top center',
                        end: 'bottom top',
                        scrub: 0.2
                    }
                });
            }
        });

        return () => {
            // Kill only triggers associated with this container
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === container) trigger.kill();
            });
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="title"
            style={{
                textAlign: 'center',
                lineHeight: '1.5',
                width: '100%',
                overflow: 'visible',
                position: 'relative',
                marginTop: '60px'
            }}
        >
            <div style={{ overflow: 'visible' }}>
                <div
                    className="hero-line-1"
                    style={{
                        transform: 'translateY(100px)',
                        opacity: 0,
                        fontSize: 'inherit',
                        fontWeight: 'inherit',
                        lineHeight: 'inherit',
                        fontFamily: 'Clash Display',
                        margin: 0,
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        overflowWrap: 'anywhere'
                    }}
                >
                    Intelligence that
                </div>
            </div>
            <div style={{ overflow: 'visible', marginTop: '0' }}>
                <div
                    className="hero-line-2"
                    style={{
                        transform: 'translateY(100px)',
                        opacity: 0,
                        fontSize: 'inherit',
                        fontWeight: 'inherit',
                        lineHeight: 'inherit',
                        fontFamily: 'Clash Display',
                        margin: 0,
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        overflowWrap: 'anywhere'
                    }}
                >
                    Drives <span className="accent">Growth</span>
                </div>
            </div>
        </div>
    );
};