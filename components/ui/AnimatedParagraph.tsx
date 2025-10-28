'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface AnimatedParagraphProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    stagger?: number;
    duration?: number;
    start?: string;
    byLines?: boolean; // when true, animate line-by-line instead of word-by-word
}

export const AnimatedParagraph = ({
    children,
    className = '',
    style = {},
    stagger = 0.02,
    duration = 0.1,
    start = 'top 85%',
    byLines = false,
}: AnimatedParagraphProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false);
    const [words, setWords] = useState<string[]>([]);

    useEffect(() => {
        setIsClient(true);
        // Extract text from children, handling JSX content
        const extractText = (node: React.ReactNode): string => {
            if (typeof node === 'string') return node;
            if (typeof node === 'number') return node.toString();
            if (Array.isArray(node)) return node.map(extractText).join('');
            if (node && typeof node === 'object' && 'props' in node) {
                return extractText((node as any).props.children);
            }
            return '';
        };

        const text = extractText(children);
        setWords(text.split(' ').filter(word => word.length > 0));
    }, [children]);

    useEffect(() => {
        if (!isClient || typeof window === 'undefined' || words.length === 0) return;

        gsap.registerPlugin(ScrollTrigger);

        const containerElement = containerRef.current;
        if (!containerElement) return;

        const wordElements = containerElement.querySelectorAll('.word-span');

        // Set initial state
        gsap.set(wordElements, {
            y: 30,
            opacity: 0
        });

        // Create animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerElement,
                start: start,
                toggleActions: 'play none none reverse',
            }
        });

        if (byLines) {
            // Group word spans into lines by top position
            const lines: HTMLElement[][] = [];
            let currentTop: number | null = null;
            let currentLine: HTMLElement[] = [];
            wordElements.forEach((node) => {
                const el = node as HTMLElement;
                const top = el.offsetTop; // relative to container
                if (currentTop === null) {
                    currentTop = top;
                }
                if (Math.abs(top - currentTop) <= 2) {
                    currentLine.push(el);
                } else {
                    lines.push(currentLine);
                    currentLine = [el];
                    currentTop = top;
                }
            });
            if (currentLine.length > 0) lines.push(currentLine);

            lines.forEach((line, index) => {
                tl.to(line, {
                    y: 0,
                    opacity: 1,
                    duration: duration,
                    ease: 'power2.out',
                    // slight intra-line stagger for niceness
                    stagger: 0.01,
                }, index === 0 ? 0 : '>'); // sequence line-by-line
            });
        } else {
            tl.to(wordElements, {
                y: 0,
                opacity: 1,
                duration: duration,
                ease: 'power2.out',
                stagger: stagger
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === containerElement) {
                    trigger.kill();
                }
            });
        };
    }, [isClient, words, stagger, duration, start, byLines]);

    if (!isClient) {
        return (
            <p ref={containerRef} className={className} style={style}>
                {children}
            </p>
        );
    }

    return (
        <div ref={containerRef}>
            <p className={className} style={style}>
                {words.map((word, index) => (
                    <span
                        key={index}
                        className="word-span"
                        style={{
                            display: 'inline-block',
                            marginRight: '0.25em'
                        }}
                    >
                        {word}
                    </span>
                ))}
            </p>
        </div>
    );
};