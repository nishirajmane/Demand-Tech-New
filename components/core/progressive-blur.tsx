import React from 'react';

interface ProgressiveBlurProps {
  className?: string;
  blurIntensity?: number;
}

export function ProgressiveBlur({ 
  className = '', 
  blurIntensity = 6 
}: ProgressiveBlurProps) {
  return (
    <div
      className={className}
      style={{
        background: `transparent`,
        backdropFilter: `blur(${blurIntensity}px)`,
        WebkitBackdropFilter: `blur(${blurIntensity}px)`,
      }}
    />
  );
}
