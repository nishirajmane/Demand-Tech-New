"use client";

import React from "react";
import { GSAPTextReveal } from "./GSAPTextReveal";

// Target/Scoring icon for Lead Scoring & Predictive Insights
const LeadScoringIcon = () => (
  <svg className="h-8 w-8 text-[#000cf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth={2} />
    <circle cx="12" cy="12" r="6" strokeWidth={2} />
    <circle cx="12" cy="12" r="2" strokeWidth={2} />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4m0 12v4m10-10h-4m-12 0h4" />
  </svg>
);

// User with 360 view icon for Customer view
const CustomerViewIcon = () => (
  <svg className="h-8 w-8 text-[#000cf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {/* Outer 360° circle */}
    <circle cx="12" cy="12" r="10" strokeWidth={1.5} strokeDasharray="2 2" />
    {/* Profile head */}
    <circle cx="12" cy="9" r="3" strokeWidth={2} />
    {/* Profile body */}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 19a5 5 0 0110 0" />
  </svg>
);

// Phone icon for Dialer
const DialerIcon = () => (
  <svg className="h-8 w-8 text-[#000cf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

// Flow/Pipeline icon for Sales Pipeline
const PipelineIcon = () => (
  <svg className="h-8 w-8 text-[#000cf8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h6m6 0h6" />
  </svg>
);

type FeatureText = {
  title: string;
  description: string;
  href?: string;
  cta?: string;
};

// Static data for HariCRM features
const featureText: FeatureText[] = [
  {
    title: "Predictive Insights",
    href: "/",
    description: "AI-powered lead scoring with predictive analytics for better conversion rates.",
    cta: "Learn More",
  },
  {
    title: "360° Customer View & History",
    href: "/",
    description: "Complete customer profiles with contact history, notes, and interaction tracking.",
    cta: "Learn More",
  },
  {
    title: "All CRM Integration",
    href: "/",
    description: "Built-in dialer system for seamless calling and communication management.",
    cta: "Learn More",
  },
  {
    title: "Sales Pipeline Management",
    href: "/",
    description: "Visual pipeline management with deal tracking and sales process automation.",
    cta: "Learn More",
  },
];

// Function to get appropriate icon for each feature
const getFeatureIcon = (index: number) => {
  switch (index) {
    case 0: return <LeadScoringIcon />;     // Lead Scoring & Predictive Insights
    case 1: return <CustomerViewIcon />;    // 360° Customer View & History
    case 2: return <DialerIcon />;          // In-house Dialer Integration
    case 3: return <PipelineIcon />;        // Sales Pipeline & Deal Management
    default: return <LeadScoringIcon />;
  }
};

// Simple CSS-only animations instead of framer-motion
const FeatureCard = ({ feature, index }: { feature: FeatureText; index: number }) => (
  <div
    className="feature-card opacity-0 translate-y-4"
    style={{
      animationDelay: `${index * 100}ms`,
      animation: 'fadeInUp 0.6s ease-out forwards'
    }}
  >
    <div className="block h-full rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border border-white/30 drop-shadow-sm hover:drop-shadow-lg">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-white/80 w-fit">
            {getFeatureIcon(index)}
          </div>
          <h4 className="text-xl font-clash font-regular text-[#000cf8]">
            {feature.title}
          </h4>
          <p className="text-gray-700 leading-relaxed">{feature.description}</p>
        </div>
      </div>
    </div>
  </div>
);

const HariCRMSection = () => {
  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .section-header {
          animation: fadeIn 0.8s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="relative w-full bg-transparent pt-16 pb-24 min-h-screen rounded-3xl">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center mb-20 section-header">
            <GSAPTextReveal
              style={{
                alignItems: 'center',
                alignContent: 'center',
                fontFamily: 'Clash Display',
                fontSize: 'clamp(48px, 8vw, 64px)',
                textAlign: 'center',
                color: '#000cf8'
              }}
              stagger={0.15}
              duration={0.6}
              yOffset={100}
              start="top 75%"
            >
              CRM Solutions
            </GSAPTextReveal>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 pb-4">
            {featureText.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HariCRMSection;
