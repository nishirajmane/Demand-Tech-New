import { Metadata } from 'next'
import Card2 from '@/components/ui/Card2'
import { ProgressiveBlurBentoGridV2 } from '@/components/ui/progressive-blur-bento-grid'
import Faq from '@/components/ui/faq';
import '../../Homepage.css';

export const metadata: Metadata = {
  title: 'Marketing Solutions | DemandTech',
  description: 'Comprehensive marketing strategies that build brand awareness and drive customer engagement.',
}

export default function MarketingPage() {
  return (
    <div className="min-h-screen bg-[#F0F1FA]">
      {/* Hero Section */}
      <div className="bg-[#F0F1FA] py-12 sm:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 px-4 sm:px-6 lg:px-12">
          {/* Media: Video */}
          <div className="flex justify-center md:justify-start">
            <div className="relative w-full max-w-[640px] aspect-[4/3] rounded-3xl overflow-hidden ring-1 ring-neutral-200 bg-white shadow-sm">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src="/marketing.mp4"
                poster="/marketing.png"
                preload="metadata"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>

          {/* Text */}
          <div className="text-center md:text-center">
            <div
              className="mt-4 leading-tight tracking-tight text-gray-900 font-clash
              text-[32px] sm:text-[42px] md:text-[66px] lg:text-[66px] xl:text-[66px] 2xl:text-[66px]"
            >
              <span className="block">Your B2B</span>
              <span className="text-[#5B5BFF]">Creative Edge</span>
            </div>

            <p
              className="text-gray-600 leading-relaxed mt-6 font-neu
              text-sm sm:text-base md:text-lg lg:text-lg xl:text-md
              max-w-2xl mx-auto md:mx-0"
            >
              In a world where attention spans are short and digital channels are
              overflowing with noise, standing out isn’t optional—it’s essential.
              At DemandTech, we create scroll-stopping, conversion-driven content
              that captures attention, sparks engagement, and positions your brand
              as the one to watch. 
            </p>
          </div>
        </div>
      </div>

      {/* Section Title */}
      <div className="flex flex-col justify-center items-center text-center px-4">
        <div>
          <span
            className="text-black font-clash 
            text-[28px] sm:text-[36px] md:text-[48px] lg:text-[58px] xl:text-[58px]"
          >
            Your one-stop-shop for
          </span>
        </div>
        <div>
          <span
            className="text-[#2717E8] font-clash 
            text-[28px] sm:text-[34px] md:text-[46px] lg:text-[54px] xl:text-[54px]"
          >
            {" "}B2B content
          </span>
        </div>
      </div>

      {/* ✅ Bento Grid Section */}
      <div className="bento-grid-container px-4 sm:px-8 md:px-12 lg:px-24 py-16 sm:py-20">
        <ProgressiveBlurBentoGridV2 />
      </div>

      {/* ✅ Prospect Attention Section */}
      <div className="bg-[#F0F1FA] py-16 sm:py-20 md:py-24 lg:py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 px-4 sm:px-6 lg:px-12">

          {/* Left Text Section */}
          <div className="text-left md:text-left">
            <h2 className="text-5xl sm:text-5xl lg:text-5xl font-clash font-semibold text-gray-900 leading-tight">
              We know how to grab your{" "}
              <span className="text-[#5B5BFF]">prospect’s attention</span>
            </h2>
            <p className="mt-6 text-gray-600 text-lg sm:text-lg lg:text-lg font-neu leading-relaxed max-w-xl">
              Attention spans are shrinking, and social media is more crowded than ever.
              Now’s the time for content and creative that truly stands out.
              We’ll make your prospects stop scrolling.
            </p>
          </div>

          {/* Right Image Section */}
          <div className="flex justify-center md:justify-end">
            <Card2 imageSrc="/Prospects Attention.jpg" alt="Prospects Attention" />
          </div>
        </div>
      </div>



      {/* FAQ Section */}
<div className="max-w-5xl mx-auto  px-4 sm:px-6 lg:px-12">
        <Faq
          heading="Marketing FAQ"
          titleLine1="Questions About"
          titleLine2="Marketing Solutions"
          title1FontSize="clamp(22px, 5.5vw, 56px)"
          title2FontSize="clamp(22px, 5.5vw, 52px)"
          items={[
            { question: 'Do you manage both B2B and B2C marketing?', answer: 'Yes, our services are designed for both B2B and B2C companies.' },
            { question: 'How do I know which marketing service is right for me?', answer: 'We analyze your goals and recommend the best mix.' },
            { question: 'Can marketing services increase brand awareness?', answer: 'Yes, we create campaigns to boost visibility and recognition.' },
            { question: 'Do you run paid ads as part of marketing services?', answer: 'Yes, we manage PPC across Google, LinkedIn, and social media.' },
            { question: 'Do you provide reporting on marketing campaigns?', answer: 'Yes, we offer clear and detailed performance reports.' },
            { question: 'Can I combine multiple marketing services?', answer: 'Yes, we create integrated strategies for maximum impact.' },
            { question: 'Do you work with small businesses?', answer: 'Yes, our services are scalable for businesses of any size.' },
          ]}
        />
      </div>
    </div>
  )
}
