'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import NoomoPreloader from '@/components/preloader/NoomoPreloader';
import { SmoothScroll } from '../../components';
import HeaderNav from '@/components/ui/HeaderNav';
import Footer from '@/components/ui/Footer';
import MobileHeader from '@/components/ui/MobileHeader';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isInitialLoading, setIsInitialLoading] = React.useState(true);
  const [showPreloader, setShowPreloader] = React.useState(true);
  const [hideHeader, setHideHeader] = React.useState(false);
  const pathname = usePathname();
  const hasInitialized = React.useRef(false);
  const lastScrollY = React.useRef(0);
  const isStudioRoute = pathname?.startsWith('/studio');

  // Determine if preloader has already been shown this session
  React.useEffect(() => {
    try {
      const hasSeenPreloader = typeof window !== 'undefined' && window.sessionStorage.getItem('hasSeenPreloader');
      if (hasSeenPreloader) {
        setShowPreloader(false);
        setIsInitialLoading(false);
        hasInitialized.current = true;
      }
    } catch (_) {
      // Ignore sessionStorage errors (e.g., privacy mode)
    }
  }, []);

  React.useEffect(() => {
    if (showPreloader) {
      document.body.classList.add('preloader-active');
    } else {
      document.body.classList.remove('preloader-active');
    }
    return () => {
      document.body.classList.remove('preloader-active');
    };
  }, [showPreloader]);

  const handlePreloaderComplete = () => {
    setIsInitialLoading(false);
    setShowPreloader(false);
    hasInitialized.current = true;
    try {
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('hasSeenPreloader', 'true');
      }
    } catch (_) {
      // Ignore if sessionStorage is unavailable
    }
  };

  // Only show preloader on initial load, not on route changes
  React.useEffect(() => {
    if (hasInitialized.current) {
      return; // Don't show preloader after initial load
    }
  }, [pathname]);

  // Hide header on scroll down, show on scroll up
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const onScroll = () => {
      const currentY = window.scrollY || 0;
      const delta = currentY - lastScrollY.current;

      // Show when near top
      if (currentY < 20) {
        setHideHeader(false);
      } else {
        // Hide when scrolling down, show when scrolling up
        if (delta > 4) {
          setHideHeader(true);
        } else if (delta < -4) {
          setHideHeader(false);
        }
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll as any);
  }, []);

  return (
    <div className={showPreloader ? '' : 'animate-fadeIn'}>
      <SmoothScroll />
      {!isStudioRoute && (
        <div
          className="sticky top-0 z-[9999] w-full overflow-visible"
          style={{
            transform: hideHeader ? 'translateY(-100%)' : 'translateY(0)',
            transition: 'transform 300ms ease',
            willChange: 'transform'
          }}
        >
          {/* Mobile header (visible on small screens only) */}
          <MobileHeader />
          <HeaderNav />
        </div>
      )}
      
      <main>{children}</main>
      
      {!isStudioRoute && (
        <div className="footer-container" style={{ padding: '0px', marginTop: '0px' }}>
          <Footer />
        </div>
      )}
      
      {/* Only show preloader on initial page load */}
      {showPreloader && !hasInitialized.current && (
        <NoomoPreloader
          isLoading={isInitialLoading}
          onComplete={handlePreloaderComplete}
          duration={3000}
          brandName="DEMAND TECH"
          brandSubtitle="DIGITAL EXPERIENCES"
        />
      )}
    </div>
  );
}