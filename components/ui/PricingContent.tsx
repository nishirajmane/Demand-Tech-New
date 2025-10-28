"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {Button5, Button6} from "@/components/ui/Button5";

gsap.registerPlugin(ScrollTrigger);

function PricingContent() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-card",
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  const plans = [
    {
      title: "Starter",
      desc: "Brand Awareness & Intent-Qualified Leads",
      price: "$15",
      sub: "CPL",
      features: [
        "Showcase your banner on DemandTech’s Tech Bulletin and partner Social Media channels",
        "Amplify your reach with LinkedIn Ads & Announcements",
        "Drive engagement through EDM campaigns that promote content directly from your website",
      ],
      button: "Get Started",
    },
    {
      title: "Professional",
      desc: "Hybrid Content Syndication",
      price: "$50 ",
      sub: "CPL",
      features: [
        "Distribute your content via form fills on a gated landing page",
        "Deliver a personalized intro and thank-you email that promotes your shared content",
        "Use a multi-touch approach with digital and tele-verification for higher lead quality",
        "Option to pre-qualify prospects using tailored profiling questions",
      ],
      button: "Get Started",
    },
    {
      title: "Enterprise",
      desc: "Lead Nurture Program",
      price: "$120",
      sub: "CPL",
      features: [
        "Act as an extended arm of your sales team",
        "Run a strategic sequence of emails and calls to nurture and convert leads",
        "Profile prospects using BANT qualification (Budget, Authority, Need, Timeline)",
        "Share comparative analytics to position your brand strongly against competitors",
      ],
      button: "Get Started",
    },
  ];

  // ✅ FIX: wrap JSX inside return
  return (
    <div ref={sectionRef} className="pricing-section py-16 bg-white-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {plans.map((plan, index) => {
          const isMiddle = index === 1; // second card (Professional)
          return (
            <motion.div
              key={plan.title}
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`pricing-card relative w-full rounded-3xl p-8 flex flex-col shadow-xl hover:shadow-2xl transition-all duration-100 border 
                ${isMiddle ? "bg-indigo-900 border-indigo-800 text-white" : "bg-white border-indigo-800 text-black"}`}
            >
              {/* Title + description */}
              <div>
                <h2
                  className={`text-2xl font-bold mb-2 ${isMiddle ? "text-white" : "text-gray-900"
                    }`}
                >
                  {plan.title}
                </h2>
                <p
                  className={`${isMiddle ? "text-indigo-200" : "text-gray-600"
                    } mb-4`}
                >
                  {plan.desc}
                </p>

                <p
                  className={`text-4xl font-extrabold mb-6 ${isMiddle ? "text-white" : "text-gray-900"
                    }`}
                >
                  {plan.price}
                  <span
                    className={`text-lg font-normal ml-1 ${isMiddle ? "text-indigo-300" : "text-gray-500"
                      }`}
                  >
                    {plan.sub}
                  </span>
                </p>

                {/* Feature List */}
                <ul
                  className={`space-y-3 mb-8 text-left ${isMiddle ? "text-indigo-200" : "text-gray-700"
                    }`}
                >
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg
                        className={`mt-0.5 h-5 w-5 flex-none ${isMiddle ? "text-indigo-400" : "text-green-500"
                          }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button pinned at bottom */}
              <div className="mt-auto">
  {isMiddle ? (
    <Button6
      className="w-full hover:bg-gray-800 text-white"
      text={plan.button}
    />
  ) : (
    <Button5
      className="w-full hover:bg-gray-800"
      text={plan.button}
    />
  )}
</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default PricingContent;
