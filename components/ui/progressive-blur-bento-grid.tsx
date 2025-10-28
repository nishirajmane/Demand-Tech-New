"use client";
import React, { useState } from 'react';
import { cn } from "../../lib/utils";
import { ProgressiveBlur } from "../core/progressive-blur";
import DemandGenerationPopup from "./DemandGenerationPopup";

interface ProgressiveBentoItemProps {
  title: string;
  imageSrc: string;
  className?: string;
}

export function ProgressiveBentoItem({
  title,
  imageSrc,
  className,
}: ProgressiveBentoItemProps) {
  return (
    <div
      className={cn(
        // 🔧 CARD STYLING - Customize these values:
        // rounded-3xl = border radius (rounded-lg, rounded-2xl, rounded-full, etc.)
        // transition-all duration-300 = animation speed (duration-200, duration-500, etc.)
        // hover:scale-[1.02] = hover zoom effect (hover:scale-105, hover:scale-110, etc.)
        // sm:hover:scale-[1.02] = responsive hover (only on small screens and up)
        "group relative h-full overflow-hidden rounded-3xl transition-all duration-300 sm:hover:scale-[1.02]",
        className
      )}
    >
      {/* Background Image with Progressive Blur */}
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 sm:group-hover:scale-110"
        />

        {/* 🔧 DARKNESS OVERLAY - Removed for clear image visibility */}
        <div className="absolute inset-0 bg-transparent" />

        {/* 🔧 BACKGROUND BLUR - Minimal blur for clear image visibility */}
        <ProgressiveBlur
          className="absolute inset-0"
          blurIntensity={0}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col justify-end p-3 sm:p-4 lg:p-5">
        {/* 🔧 TITLE STYLING - Customize these values:
            text-base = font size (text-sm, text-lg, text-xl, etc.)
            font-bold = font weight (font-medium, font-semibold, etc.)
            text-white = text color (text-gray-100, text-blue-50, etc.)
            drop-shadow-lg = shadow intensity (drop-shadow-sm, drop-shadow-xl, etc.)
            mb-0 = bottom margin (mb-1, mb-3, mb-4, etc.) */}
        <h4 className="text-sm sm:text-base lg:text-lg font-normal text-white drop-shadow-md font-neue-montreal">
          {title}
        </h4>
      </div>
    </div>
  );
}

export function ProgressiveBlurBentoGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 sm:gap-6 w-full auto-rows-[200px] sm:auto-rows-[240px] lg:auto-rows-[280px]">
      {/* 🔧 RESPONSIVE GRID LAYOUT - Customize these values:
          grid-cols-1 = 1 column on mobile (default)
          sm:grid-cols-2 = 2 columns on small screens (640px+)
          lg:grid-cols-3 = 3 columns on large screens (1024px+)
          xl:grid-cols-4 = 4 columns on extra large screens (1280px+)
          2xl:grid-cols-6 = 6 columns on 2xl screens (1536px+)
          
          gap-4 = 16px gap on mobile
          sm:gap-6 = 24px gap on small screens and up
          
          auto-rows-[200px] = 200px height on mobile
          sm:auto-rows-[240px] = 240px height on small screens
          lg:auto-rows-[280px] = 280px height on large screens */}
      {/* Brand Awareness - Large */}
      <ProgressiveBentoItem
        title="Brand Awareness & Display Campaigns"
        imageSrc="/image1.jpeg"
        className="sm:col-span-2 lg:col-span-2 xl:col-span-3 2xl:col-span-4"
      />

      {/* Lead Nurture - Medium */}
      <ProgressiveBentoItem
        title="Lead Nurture Programs"
        imageSrc="/image2.jpeg"
        className="sm:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1"
      />

      {/* Callback Consent - Medium */}
      <ProgressiveBentoItem
        title="Callback Consent"
        imageSrc="/testimonial2.jpg"
        className="sm:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1"
      />

      {/* Intent Qualified Leads - Large */}
      <ProgressiveBentoItem
        title="Intent Qualified Lead Generation"
        imageSrc="/image3.jpeg"
        className="sm:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2"
      />

      {/* Content Syndication - Large */}
      <ProgressiveBentoItem
        title="Content Syndication & Distribution"
        imageSrc="/testimonial1.png"
        className="sm:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2"
      />

      {/* Performance Analytics - Medium */}
      <ProgressiveBentoItem
        title="Performance Analytics & Optimization"
        imageSrc="/testimonial3.png"
        className="sm:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2"
      />
    </div>
  );
}

export function ProgressiveBlurBentoGridV2() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ title: string; imageSrc: string; content?: string }>({ title: "", imageSrc: "" });

  const contentCreationHTML = `
    <div class="space-y-6">
      <div class="text-start mb-8">
        <p class="text-3xl text-[#0000ff] font-medium font-clash">Fuel Your Brand with High-Impact Content</p>
      </div>
      
      <div class="space-y-4">
        <p class="text-gray-700 leading-relaxed">
          At DemandTech, we believe content is the backbone of every successful marketing strategy. Our content creation services are designed to help your brand stand out, engage your audience, and drive measurable results. From SEO-optimized blogs and articles to thought-leadership whitepapers, infographics, videos, and social media campaigns, we craft content that connects with your ideal customers at every stage of their journey.
        </p>
        
        <p class="text-gray-700 leading-relaxed">
          We combine data-driven insights with creative storytelling to ensure your content not only ranks on search engines but also resonates with decision-makers. Whether you're looking to build brand authority, generate high-quality leads, or improve customer engagement, our team ensures your content speaks directly to your audience's needs.
        </p>
      </div>

      <div class="mt-8">
        <h4 class="text-md font-medium text-[#0000ff] mb-6">Our Content Creation Expertise:</h4>
        <div class="space-y-3">
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <span class="font-semibold text-[#0000ff]">SEO-Optimized Blogs & Articles</span>
              <span class="text-gray-600"> – Boost your online visibility and authority.</span>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <span class="font-semibold text-[#0000ff]">Whitepapers & Case Studies</span>
              <span class="text-gray-600"> – Establish thought leadership and trust.</span>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <span class="font-semibold text-[#0000ff]">Social Media Content</span>
              <span class="text-gray-600"> – Create scroll-stopping posts tailored to each platform.</span>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <span class="font-semibold text-[#0000ff]">Infographics & Visual Content</span>
              <span class="text-gray-600"> – Simplify complex ideas with engaging visuals.</span>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <span class="font-semibold text-[#0000ff]">Video Marketing</span>
              <span class="text-gray-600"> – From explainer videos to brand storytelling.</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
        <p class="text-gray-700 leading-relaxed font-medium">
          With DemandTech's content marketing services, you don't just get words—you get a strategic growth engine that fuels brand awareness, lead generation, and long-term customer loyalty.
        </p>
      </div>
    </div>
  `;

  const paidMarketingHTML = `
    <div class="space-y-6">
      <div class="text-start mb-8">
        <p class="text-3xl text-[#0000ff] font-medium font-clash">Maximize ROI with Precision-Driven Campaigns</p>
      </div>
      
      <div class="space-y-4">
        <p class="text-gray-700 leading-relaxed">
          In today's competitive digital landscape, Paid Marketing is the fastest way to amplify visibility, capture qualified leads, and accelerate revenue growth. At DemandTech, we design and manage data-driven paid campaigns across multiple channels to ensure your brand reaches the right audience at the right time.
        </p>
        
        <p class="text-gray-700 leading-relaxed">
          Our paid marketing strategies are built to deliver maximum ROI, whether you want to increase website traffic, generate B2B leads, or boost conversions. By leveraging platforms like Google Ads, LinkedIn Ads, Facebook Ads, Instagram Ads, and programmatic advertising, we create highly targeted campaigns that align with your business goals.
        </p>
      </div>

      <div class="mt-8">
        <h4 class="text-md font-medium text-[#0000ff] mb-6">Our Paid Marketing Expertise:</h4>
        <div class="space-y-3">
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <span class="font-semibold text-[#0000ff]">Search Engine Marketing (SEM / PPC)</span>
              <span class="text-gray-600"> – Drive instant traffic and leads with Google Ads.</span>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <span class="font-semibold text-[#0000ff]">Display & Programmatic Ads</span>
              <span class="text-gray-600"> – Reach your audience with high-visibility ad placements.</span>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <span class="font-semibold text-[#0000ff]">Social Media Ads</span>
              <span class="text-gray-600"> – Leverage LinkedIn, Facebook, Instagram, and Twitter for B2B & B2C growth.</span>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <span class="font-semibold text-[#0000ff]">Retargeting Campaigns</span>
              <span class="text-gray-600"> – Re-engage prospects and improve conversion rates.</span>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <span class="font-semibold text-[#0000ff]">Performance Tracking & Optimization</span>
              <span class="text-gray-600"> – Monitor, analyze, and optimize campaigns for maximum impact.</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
        <p class="text-gray-700 leading-relaxed font-medium">
          With DemandTech's Paid Marketing services, you don't just get clicks—you get conversions that matter. Our approach ensures every dollar you invest works harder to deliver measurable business results.
        </p>
      </div>
    </div>
  `;

  const ppcHTML = `
    <div class="space-y-6">
      <div class="text-start mb-4">
        <h2 class="text-3xl text-[#0000ff] font-medium font-clash">Boost Conversions with Data-Driven PPC Campaigns</h2>
      </div>
      <p class="text-gray-700 leading-relaxed">
        At DemandTech, we create high-performance PPC campaigns designed to deliver measurable results. Our pay-per-click strategies connect your brand with the right audience, driving quality traffic and maximizing ROI. Every click is optimized to help you achieve business growth faster.
      </p>
      <div class="space-y-3">
        <h4 class="text-md font-medium text-[blue]">Why Choose DemandTech for PPC?</h4>
        <ul class="space-y-2">
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Targeted Reach</span><span class="text-gray-600"> – Precise keyword research and audience targeting to reach customers ready to convert.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Cost-Optimized Campaigns</span><span class="text-gray-600"> – Every dollar spent drives maximum value with minimal wasted budget.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Full Transparency</span><span class="text-gray-600"> – Real-time reporting and clear analytics keep you informed.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Multi-Channel Expertise</span><span class="text-gray-600"> – Google Ads, Bing, LinkedIn, and social platforms.</span></span></li>
        </ul>
      </div>
      <div class="space-y-3">
        <h4 class="text-md font-medium text-[blue]">Our PPC Process</h4>
        <ul class="space-y-2">
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Discovery & Research</span><span class="text-gray-600"> – Understand goals, study competitors, and identify opportunities.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Campaign Strategy</span><span class="text-gray-600"> – Compelling ad copy, visuals, and conversion-focused landing pages.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Ongoing Optimization</span><span class="text-gray-600"> – Monitor performance, adjust bids, and test strategies.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Detailed Insights</span><span class="text-gray-600"> – Clear reports on ROI, conversions, and growth potential.</span></span></li>
        </ul>
      </div>

      <div class="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
        <p class="text-gray-700 leading-relaxed font-medium">
          With DemandTech's PPC services, you don't just get clicks—you get conversions that drive real business growth and maximize your advertising investment.
        </p>
      </div>
    </div>
  `;

  const seoHTML = `
    <div class="space-y-6">
      <div class="text-start mb-4">
        <h2 class="text-3xl text-[blue] font-medium font-clash">Rank Higher, Drive Organic Growth</h2>
      </div>
      <p class="text-gray-700 leading-relaxed">
        At DemandTech, we help businesses achieve long-term success with powerful SEO strategies. Our approach ensures your website ranks higher on search engines, attracts the right audience, and converts visitors into loyal customers. With proven techniques, we maximize visibility and deliver sustainable growth.
      </p>
      <div class="space-y-3">
        <h4 class="text-md font-medium text-[blue]">Why Choose DemandTech for SEO?</h4>
        <ul class="space-y-2">
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Tailored Strategies</span><span class="text-gray-600"> – Customized SEO plans aligned with your goals.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">On-Page & Off-Page Excellence</span><span class="text-gray-600"> – From technical optimization to high-quality link building.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Data-Driven Insights</span><span class="text-gray-600"> – Performance tracking and strategy adaptation.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Content That Converts</span><span class="text-gray-600"> – SEO-friendly content that engages and ranks.</span></span></li>
        </ul>
      </div>
      <div class="space-y-3">
        <h4 class="text-md font-medium text-[blue]">Our SEO Process</h4>
        <ul class="space-y-2">
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Comprehensive Audit</span><span class="text-gray-600"> – Analyze structure, content, and performance.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Keyword Research</span><span class="text-gray-600"> – Identify high-value search terms.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">On-Page Optimization</span><span class="text-gray-600"> – Enhance speed, structure, and content.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Link Building & Outreach</span><span class="text-gray-600"> – Strengthen domain authority.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Performance Tracking</span><span class="text-gray-600"> – Clear reports on progress and rankings.</span></span></li>
        </ul>
      </div>

      <div class="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
        <p class="text-gray-700 leading-relaxed font-medium">
          With DemandTech's SEO services, you don't just get rankings—you get sustainable organic growth that builds long-term visibility and credibility.
        </p>
      </div>
    </div>
  `;

  const socialMediaHTML = `
    <div class="space-y-6">
      <div class="text-start mb-4">
        <h2 class="text-3xl text-[#0000ff] font-medium font-clash">Engage, Influence, and Grow Your Brand Online</h2>
      </div>
      <p class="text-gray-700 leading-relaxed">
        At DemandTech, we create powerful social media marketing strategies that connect your brand with your audience. From awareness to conversion, we leverage social platforms to boost engagement, build trust, and drive measurable results.
      </p>
      <div class="space-y-3">
        <h4 class="text-md font-medium text-[blue]">Why Choose DemandTech for Social Media Marketing?</h4>
        <ul class="space-y-2">
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Platform Expertise</span><span class="text-gray-600"> – Facebook, Instagram, LinkedIn, Twitter, TikTok.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Targeted Campaigns</span><span class="text-gray-600"> – Reach your ideal audience with precision.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Content That Converts</span><span class="text-gray-600"> – Compelling visuals, copy, and videos.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Data-Driven Strategy</span><span class="text-gray-600"> – Continuous monitoring and analytics.</span></span></li>
        </ul>
      </div>
      <div class="space-y-3">
        <h4 class="text-md font-medium text-[blue]">Our Social Media Marketing Process</h4>
        <ul class="space-y-2">
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Strategy & Planning</span><span class="text-gray-600"> – Understand brand, audience, and goals.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Content Creation</span><span class="text-gray-600"> – Posts, videos, and graphics for each platform.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Campaign Management</span><span class="text-gray-600"> – Paid and organic initiatives.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Performance Tracking</span><span class="text-gray-600"> – Detailed reporting on growth and conversions.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Optimization</span><span class="text-gray-600"> – Continuous improvements to reduce wasted spend.</span></span></li>
        </ul>
      </div>
      <div class="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
        <p class="text-gray-700 leading-relaxed font-medium">
          With DemandTech's social media marketing services, you don't just get posts—you get a strategic social presence that builds community, drives engagement, and converts followers into customers.
        </p>
      </div>
    </div>
  `;

  const emailMarketingHTML = `
    <div class="space-y-6">
      <div class="text-start mb-4">
        <h2 class="text-3xl text-[#0000ff] font-medium font-clash">Connect, Nurture, and Convert Your Audience</h2>
      </div>
      <p class="text-gray-700 leading-relaxed">
        At DemandTech, we design email marketing campaigns that engage your audience and drive results. From lead nurturing to customer retention, our strategies help you deliver the right message at the right time. Every email is crafted to boost conversions and strengthen your brand.
      </p>
      <div class="space-y-3">
        <h4 class="text-md font-medium text-[blue]">Why Choose DemandTech for Email Marketing?</h4>
        <ul class="space-y-2">
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Personalized Campaigns</span><span class="text-gray-600"> – Targeted emails based on behavior and preferences.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">High-Impact Design</span><span class="text-gray-600"> – Visually appealing, conversion-focused templates.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Automation & Segmentation</span><span class="text-gray-600"> – Efficient workflows for the right message at the right time.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Analytics-Driven</span><span class="text-gray-600"> – Track opens, clicks, and conversions to optimize performance.</span></span></li>
        </ul>
      </div>
      <div class="space-y-3">
        <h4 class="text-md font-medium text-[blue]">Our Email Marketing Process</h4>
        <ul class="space-y-2">
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Audience Analysis</span><span class="text-gray-600"> – Understand and segment subscribers.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Campaign Strategy</span><span class="text-gray-600"> – Plan content, offers, and frequency.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Design & Copywriting</span><span class="text-gray-600"> – Compelling subject lines, visuals, and messages.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Automation & Delivery</span><span class="text-gray-600"> – Drip campaigns, triggers, and personalization.</span></span></li>
          <li class="flex items-start space-x-3"><span class="w-2 h-2 bg-blue-600 rounded-full mt-2"></span><span><span class="font-semibold text-[#0000ff]">Performance Tracking</span><span class="text-gray-600"> – Analyze results and refine for better ROI.</span></span></li>
        </ul>
      </div>
      <div class="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
        <p class="text-gray-700 leading-relaxed font-medium">
          With DemandTech's email marketing services, you don't just get newsletters—you get personalized communication strategies that nurture relationships and drive consistent conversions.
        </p>
      </div>
    </div>
  `;

  const openPopup = (title: string, imageSrc: string, content?: string) => {
    setSelectedItem({ title, imageSrc, content });
    setIsPopupOpen(true);
  };

  const closePopup = () => setIsPopupOpen(false);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl mx-auto
    auto-rows-[400px] sm:auto-rows-[450px] lg:auto-rows-[500px]">

      {/* LEFT COLUMN */}
      <div className="grid grid-rows-2 gap-6">
        {/* Large card on top */}
        <div role="button" tabIndex={0} className="cursor-pointer" onClick={() => openPopup("Content Creation", "/content creation.jpg", contentCreationHTML)}>
          <ProgressiveBentoItem
            title="Content Creation"
            imageSrc="/content creation.jpg"
            className="row-span-1"
          />
        </div>

        {/* Two small cards below */}
        <div className="grid grid-cols-2 gap-6">
          <div role="button" tabIndex={0} className="cursor-pointer" onClick={() => openPopup("Paid Marketing", "/Paid Marketing.jpg", paidMarketingHTML)}>
            <ProgressiveBentoItem
              title="Paid Marketing"
              imageSrc="/Paid Marketing.jpg"
            />
          </div>
          <div role="button" tabIndex={0} className="cursor-pointer" onClick={() => openPopup("PPC", "/PPC.jpg", ppcHTML)}>
            <ProgressiveBentoItem
              title="PPC"
              imageSrc="/PPC.jpg"
            />
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="grid grid-rows-2 gap-6">
        {/* Two small cards on top */}
        <div className="grid grid-cols-2 gap-6">
          <div role="button" tabIndex={0} className="cursor-pointer" onClick={() => openPopup("SEO", "/SEO.jpg", seoHTML)}>
            <ProgressiveBentoItem
              title="SEO"
              imageSrc="/SEO.jpg"
            />
          </div>
          <div role="button" tabIndex={0} className="cursor-pointer" onClick={() => openPopup("Social Media Marketing", "/Social Media Marketing.jpg", socialMediaHTML)}>
            <ProgressiveBentoItem
              title="Social Media Marketing"
              imageSrc="/Social Media Marketing.jpg"
            />
          </div>
        </div>

        {/* Large card on bottom */}
        <div role="button" tabIndex={0} className="cursor-pointer" onClick={() => openPopup("Email Marketing", "/email_marketing.webp", emailMarketingHTML)}>
          <ProgressiveBentoItem
            title="Email Marketing"
            imageSrc="/email_marketing.webp"
            className="row-span-1"
          />
        </div>
      </div>
      <DemandGenerationPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        title={selectedItem.title}
        imageSrc={selectedItem.imageSrc}
        content={selectedItem.content}
      />
    </div>

  );
}