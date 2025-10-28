'use client';
import React, { JSX } from "react";

// Layout: using semantic tags and utility classes instead of missing components
    
// Icons
import { ChartNoAxesCombined } from "lucide-react";
import { Coins } from "lucide-react";
import { Sheet } from "lucide-react";

type FeatureText = {
  icon: JSX.Element;
  title: string;
  description: string;
};
   
const featureText: FeatureText[] = [
  {
    icon: <ChartNoAxesCombined className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
    title: "Data-Driven Precision",
    description:
      "A successful B2B company must rely on data insights to guide decisions and strategies. At DemandTech, we use advanced data intelligence and intent signals to identify the right prospects.",
  },
  {
    icon: <Coins className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
    title: " Scalable Innovation",
    description:
      "B2B growth depends on solutions that can scale with business needs. DemandTech delivers automation-first platforms that grow with your company.",
  },
  {
    icon: <Sheet className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />,
    title: "Customer-Centric",
    description:
      "Strong B2B companies put client success at the center. At DemandTech, we design strategies tailored to your business goals.",
  },
];

const Feature = () => {
  return (
    <section className="section-spacing">
      <div className="container not-prose mx-auto px-4">
        <div className="flex flex-col gap-5 sm:gap-6 py-8 sm:py-12 px-6 sm:px-8 lg:px-10 rounded-[24px] sm:rounded-[32px] lg:rounded-[50px]"
        style={{
            background: 'rgba(252, 252, 252, 0.25)',
            backdropFilter: 'blur(25px)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',        }}>
          <h3 className="text-base sm:text-xl lg:text-3xl text-[blue] font-normal leading-tight">
          DemandTech : Your Trusted B2B Growth Partner
          </h3>
          <p className="text-xs sm:text-sm lg:text-xl font-normal opacity-70 font-neu">
          Transform your demand generation with cutting-edge technology and proven strategies. Drive qualified leads, increase conversions, and scale your business.
          </p>

          <div className="mt-6 sm:mt-8 md:mt-12 grid gap-6 md:grid-cols-3">
            {featureText.map(({ icon, title, description }, index) => (
              <div className="flex flex-col gap-3 sm:gap-4" key={index}>
                {icon}
                <h4 className="text-base sm:text-lg lg:text-xl text-primary">{title}</h4>
                <p className="text-sm sm:text-base opacity-75">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
