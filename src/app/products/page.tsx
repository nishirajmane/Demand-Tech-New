import { Metadata } from "next";
import { ProductsFeature } from "@/components/index";
import dynamic from "next/dynamic";
import HariCRMSection from "@/components/ui/HariCrmSection";
import { HeroScrollDemo } from "@/components/ui/ContainerScrollUse";
import { Products } from "@/components/index";
import Element1 from "@/components/preloader/Element1";
import { GSAPTextReveal } from "@/components/ui/GSAPTextReveal";
// Keep heavy ones dynamic (like in Services)
const LogoSlider = dynamic(() => import("@/components/ui/LogoSlider"), {
  ssr: true,
  loading: () => (
    <div className="h-32 bg-gray-100 animate-pulse rounded-lg" />
  ),
});

const Faq = dynamic(() => import("@/components/ui/faq"), {
  ssr: true,
  loading: () => (
    <div className="h-96 bg-gray-100 animate-pulse rounded-3xl" />
  ),
});

export const metadata: Metadata = {
  title: "Products | DemandTech",
  description:
    "Discover our offerings designed to solve your business challenges and drive growth.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#F0F1FA]">
      <div className="mt-0 sm:-mt-1 lg:-mt-40">
        <HeroScrollDemo />
      </div>




      {/* Logo Slider */}
      <div className="w-full px-2 sm:px-3 lg:px-0 mb-5 sm:mb-5 lg:mb-5 mt-0 sm:-mt-24 lg:-mt-80">
        <LogoSlider />
      </div>
      <div className="w-full px-4 sm:px-6 lg:px-18 mb-10 lg:mb-10">
        <div className="hidden md:block w-full z-[-10] mb-[-2rem] md:mb-[-3rem] md:-ml-80 lg:mb-[-10rem] lg:-ml-[42rem]">
          <Element1 />
        </div>
        <Products />
      </div>

      {/* HariCRM Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 mb-10 lg:mb-10">
        <HariCRMSection />
      </div>
      <div className="mt-0 lg:-mt-[100px]">
        <GSAPTextReveal
          style={{
            alignItems: 'center',
            alignContent: 'center',
            fontFamily: 'Clash Display',
            fontSize: 'clamp(48px, 8vw, 64px)',
            textAlign: 'center',
            color: '#000cf8',
            // margin handled by parent div responsively
          }}
          stagger={0.15}
          duration={0.6}
          yOffset={100}
          start="top 75%"
        >
          Features
        </GSAPTextReveal>
      </div>
      <div
        className="mt-8 sm:mt-10 max-w-7xl mx-auto mb-16 lg:mb-20 rounded-2xl rounded-sm:0 overflow-hidden"
        style={{
          background: 'linear-gradient(210deg, rgba(38, 0, 255, 1) 2%, rgba(0, 0, 0, 1) 46%, rgba(10, 68, 242, 1) 100%)'
        }}
      >
        <ProductsFeature />
      </div>
      {/* FAQ Section */}
      <section className="max-w-5xl mt-0 lg:-mt-[60px] mx-auto py-5 sm:py-10 px-4 sm:px-6 lg:px-12">
        <Faq
          heading="FAQ"
          titleLine1="Quick Answers to"
          titleLine2="Common Questions"
          title1FontSize="clamp(22px, 5.5vw, 56px)"
          title2FontSize="clamp(22px, 5.5vw, 52px)"
          items={[
            { question: 'Does HRMS track employee attendance?', answer: 'Yes, it includes attendance and leave management.' },
            { question: 'Can HRMS handle recruitment?', answer: 'Yes, it streamlines hiring and onboarding.' },
            { question: 'Can the dialer improve sales productivity?', answer: 'Yes, it reduces manual dialing and increases talk time.' },
            { question: 'Is the dialer cloud-based?', answer: 'Yes, you can access it from anywhere with internet.' },
            { question: 'Does the CRM support automation?', answer: 'Yes, it automates tasks like follow-ups and reminders.' },
            { question: 'Does your CRM provide reporting and analytics?', answer: 'Yes, it offers detailed dashboards and insights.' },
          ]}
        />
      </section>
    </div>
  );
}
