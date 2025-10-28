'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { GSAPTextReveal } from '../../components/ui/GSAPTextReveal';
import Button from '../../components/ui/Button';

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Floating animation for background elements
    const elements = floatingElementsRef.current;
    
    elements.forEach((el, index) => {
      if (el) {
        gsap.set(el, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          rotation: Math.random() * 360,
          opacity: 0.1
        });

        gsap.to(el, {
          x: `+=${Math.random() * 200 - 100}`,
          y: `+=${Math.random() * 200 - 100}`,
          rotation: `+=${Math.random() * 180 - 90}`,
          duration: 8 + Math.random() * 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5
        });
      }
    });

    // Container fade in
    if (containerRef.current) {
      gsap.fromTo(containerRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !floatingElementsRef.current.includes(el)) {
      floatingElementsRef.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F1FA] relative overflow-hidden flex items-center justify-center mt-10">
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            ref={addToRefs}
            className="absolute w-16 h-16 border-2 border-[#000cf8] rounded-full"
            style={{ opacity: 0.1 }}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <div
            key={`square-${i}`}
            ref={addToRefs}
            className="absolute w-12 h-12 bg-[#000cf8] rotate-45"
            style={{ opacity: 0.05 }}
          />
        ))}
      </div>

      {/* Main content */}
      <div ref={containerRef} className="text-center px-6 max-w-4xl mx-auto z-10">
        {/* 404 Number */}
        <div className="mb-8">
          <GSAPTextReveal
            style={{
              fontFamily: 'Clash Display',
              fontSize: 'clamp(120px, 20vw, 280px)',
              fontWeight: '700',
              color: '#000cf8',
              lineHeight: '0.9',
              letterSpacing: '-0.02em'
            }}
            stagger={0.2}
            duration={0.3}
            yOffset={100}
            start="top 90%"
          >
            404
          </GSAPTextReveal>
        </div>

        {/* Main heading */}
        <div className="mb-6">
          <GSAPTextReveal
            style={{
              fontFamily: 'Clash Display',
              fontSize: 'clamp(32px, 6vw, 64px)',
              fontWeight: '600',
              color: '#000000',
              lineHeight: '1.1'
            }}
            stagger={0.1}
            duration={0.3}
            yOffset={60}
            start="top 85%"
          >
            Page Not Found
          </GSAPTextReveal>
        </div>

        {/* Description */}
        <div className="mb-12 max-w-2xl mx-auto">
          <div
            style={{
              fontFamily: 'Neue Montreal',
              fontSize: 'clamp(16px, 2.5vw, 20px)',
              color: '#666666',
              lineHeight: '1.6',
              fontWeight: '400'
            }}
          >
            The page you're looking for seems to have wandered off into the digital void. 
            Don't worry though – our demand generation expertise is still very much here and ready to accelerate your business growth.
          </div>
        </div>

        {/* Action buttons */}
        

        {/* Helpful links */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4 font-neu">
            Or explore these popular pages:
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              { label: 'Services', href: '/services' },
              { label: 'About', href: '/about' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Resources', href: '/about/resources' }
            ].map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#000cf8] hover:text-[#0008c1] transition-colors duration-200 font-neu"
                style={{
                  opacity: 0,
                  animation: `fadeInUp 0.4s ease-out ${1.6 + index * 0.1}s forwards`
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
