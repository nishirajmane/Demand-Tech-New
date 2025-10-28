'use client';

import React, { useState, useEffect, useCallback } from 'react';
import AnimatedLogo from './Logo';

interface PreloaderProps {
  isLoading?: boolean;
  onComplete?: () => void;
  duration?: number;
  showBrand?: boolean;
  brandName?: string;
  brandSubtitle?: string;
  exitDelay?: number; // ms to wait during exit transition
}

export const NoomoPreloader: React.FC<PreloaderProps> = ({
  isLoading = true,
  onComplete,
  duration = 3000,
  showBrand = true,
  brandName = "DEMAND TECH",
  brandSubtitle = "DIGITAL EXPERIENCES",
  exitDelay = 500,
}) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<'loading' | 'complete' | 'exit'>('loading');
  const [showContent, setShowContent] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);
  const [logoDone, setLogoDone] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    setShowContent(true);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (!isLoading) return;

    let progressInterval: ReturnType<typeof setInterval>;
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setLoadingDone(true);
          setCurrentPhase('complete');
          return 100;
        }

        const increment = prev < 50 ? Math.random() * 8 + 2 : Math.random() * 3 + 0.5;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => {
      clearInterval(progressInterval);
    };
  }, [isLoading]);

  // When both loading and logo animations are done, exit the preloader then complete
  useEffect(() => {
    if (loadingDone && logoDone) {
      setCurrentPhase('exit');
      const t = setTimeout(handleAnimationComplete, exitDelay);
      return () => clearTimeout(t);
    }
  }, [loadingDone, logoDone, handleAnimationComplete, exitDelay]);

  if (!isLoading && showContent) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-[9999] bg-white transition-all duration-800 ${currentPhase === 'exit' ? 'translate-y-full' : 'translate-y-0'}`}>
      <div className="absolute inset-0 bg-white" />

      {/* Centered responsive logo */}
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div className="w-26 h-30 sm:w-48 sm:h-52 md:w-56 md:h-64 lg:w-46 lg:h-50">
          <AnimatedLogo onComplete={() => setLogoDone(true)} className="w-full h-full" />
        </div>
      </div>

      {/* Bottom-left progress percent */}
      <div className="absolute bottom-4 left-4 text-[#000cf8] font-clash text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
        {Math.round(progress)}%
      </div>
    </div>
  );
};

export default NoomoPreloader;

