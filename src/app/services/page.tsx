import { Metadata } from 'next'
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Button3 from '@/components/ui/Button3'
import LogoSlider from '@/components/ui/LogoSlider'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import { Stepper } from '@/components/ui/stepperScroller'
import { GSAPTextReveal } from '@/components/ui/GSAPTextReveal'
import { MultiStepContactForm } from '@/components/index'
import Faq from '@/components/ui/faq'
import Element3 from '@/components/preloader/Element3';
import Card2 from '@/components/ui/Card2';

export const metadata: Metadata = {
  title: 'Services | DemandTech',
  description:
    'Explore our comprehensive range of services designed to accelerate your business growth.',
}

const cards = [
  {
    src: "/Intent Data Platform 1.jpg",
    title: "Intent Data Platform",
    category: "",
    content: (
      <div className="space-y-4">
        <p>
          <span className="font-normal">Stop guessing and start knowing.</span> Our Intent Data Platform empowers businesses to discover prospects who are already showing buying interest in solutions like yours.
        </p>
        <p>
          By monitoring online research patterns, content consumption habits, and digital buying signals, we help you prioritize high-value accounts that are most likely to convert. This results in smarter targeting, stronger engagement, and higher ROI.
        </p>

        <div className="pt-2">
          <h4 className="font-clash text-xl text-[#574BEF]">With DemandTech’s Intent Data:</h4>
          <ul className="mt-3 grid gap-2 md:gap-3">
            <li className="flex gap-3">
              <span className="select-none">•</span>
              <span>Uncover hidden opportunities by identifying buyers at different stages of their journey.</span>
            </li>
            <li className="flex gap-3">
              <span className="select-none">•</span>
              <span>Personalize campaigns with actionable insights into prospect needs and pain points.</span>
            </li>
            <li className="flex gap-3">
              <span className="select-none">•</span>
              <span>Shorten the sales cycle by focusing efforts on prospects ready to make decisions.</span>
            </li>
            <li className="flex gap-3">
              <span className="select-none">•</span>
              <span>Reduce wasted spend by eliminating low-intent accounts from your pipeline.</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    src: "/AutomatedContentSyndication2.jpg",
    title: "Automated Content Syndication",
    category: "",
    content: (
      <div className="space-y-4">
        <p>
          <span className="font-normal">Your content deserves the right audience.</span> With Automated Content Syndication, DemandTech amplifies your brand message across trusted digital platforms where decision-makers are most active.
        </p>
        <p>
          We don’t just distribute content—we ensure it drives qualified engagement. Whether it’s whitepapers, eBooks, case studies, or thought leadership assets, we place them directly in front of the right people, at the right time.
        </p>

        <div className="pt-2">
          <h4 className="font-clash text-xl text-[#574BEF]">Key benefits of Content Syndication:</h4>
          <ul className="mt-3 grid gap-2 md:gap-3">
            <li className="flex gap-3">
              <span className="select-none">•</span>
              <span>Targeted reach across multiple industries, regions, and job roles.</span>
            </li>
            <li className="flex gap-3">
              <span className="select-none">•</span>
              <span>Intent-qualified leads verified through strict validation processes.</span>
            </li>
            <li className="flex gap-3">
              <span className="select-none">•</span>
              <span>Scalable demand generation that drives consistent pipeline growth.</span>
            </li>
            <li className="flex gap-3">
              <span className="select-none">•</span>
              <span>Brand positioning by aligning your expertise with buyer needs.</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    src: "/Automated Appointment Generation.jpg",
    title: "Automated Appointment Generation",
    category: "",
    content: (
      <div className="space-y-4">
        <p>
          <span className="font-normal">Sales teams need conversations, not cold leads.</span> Our Automated Appointment Generation service ensures your pipeline is filled with qualified prospects ready to engage.
        </p>
        <p>
          Through a blend of AI-driven outreach, personalized email sequencing, tele-verification, and multi-channel engagement, we connect your team with decision-makers who matter most.
        </p>

        <div className="pt-2">
          <h4 className="font-clash text-xl text-[#574BEF]">How DemandTech powers your sales pipeline:</h4>
          <ul className="mt-3 grid gap-2 md:gap-3">
            <li className="flex gap-3">
              <span className="select-none">•</span>
              <span>Accelerate conversations by booking meetings with high-potential prospects.</span>
            </li>
            <li className="flex gap-3">
              <span className="select-none">•</span>
              <span>Save time & resources by removing the burden of cold outreach from sales reps.</span>
            </li>
            <li className="flex gap-3">
              <span className="select-none">•</span>
              <span>Enhance productivity by ensuring reps focus only on conversion-ready opportunities.</span>
            </li>
            <li className="flex gap-3">
              <span className="select-none">•</span>
              <span>Boost ROI by aligning sales efforts with pre-qualified appointments.</span>
            </li>
          </ul>
        </div>
      </div>
    ),
  },
];

const items = cards.map((card, index) => (
  <Card key={index} card={card} index={index} layout />
));
export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#F0F1FA] overflow-hidden">
      {/* Top navigation bar with slider tabs and CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1 relative flex items-center justify-center"></div>

      {/* Hero section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Text Content */}
          <div>
            <p
              className="text-xl sm:text-2xl text-gray-900"
              style={{ fontFamily: 'Clash Display, sans-serif' }}
            >
              <span className="font-regular">Stop Guessing. </span>{' '}
              <span className="text-[#5B5BFF] font-regular">Start Closing</span>
            </p>

            <div
              className="mt-4 leading-tight tracking-tight text-gray-900"
              style={{
                fontFamily: 'Clash Display, sans-serif',
                fontSize: 'clamp(36px, 6vw, 72px)',
                lineHeight: '1.1',
              }}
            >
              <span className="block">Turn Buyer Intent</span>
              <span className="block">
                into <span className="text-[#5B5BFF]">Sales-Ready</span>
              </span>
              <span className="block">Opportunity</span>
            </div>

            <p className="mt-6 max-w-xl text-sm sm:text-base text-gray-700">
              At Demand Tech, we deliver Intent Qualified Leads powered by
              real-time intent data, helping you connect with buyers actively
              searching for your solution.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button3 text="Demand Generation" href="/services/demand-generation" />
              <Button3 text="Marketing" href="/services/marketing" />
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center md:justify-end">
            {/* Use a taller aspect ratio on larger screens to align with CTA block */}
            <Card2
              imageSrc="/Opportunity.jpg"
              alt="/Opportunity"
              aspectClass="aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3]"
            />
          </div>
        </div>
      </div>

      {/* Logo Slider Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 mb-28">
        <LogoSlider />
      </div>

      {/* Lead Nurture Program Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-14">
        <BackgroundGradientAnimation>
          <div className="w-full max-w-5xl mx-auto px-5 py-6 md:px-12 md:py-14 lg:px-16 lg:py-20 text-white">
            {/* Title */}
            <p className="text-lg uppercase tracking-wide opacity-90 font-light font-clash text-center md:text-left">
              Lead Nurture Program
            </p>

            <h2 className="mt-3 mb-5 font-clash leading-tight tracking-tight text-center md:text-left text-[32px] sm:text-[40px] md:text-[56px] lg:text-[60px] transition-colors duration-300 hover:text-[#C7D0FF]">
              Turning Prospects into Loyal Customers, One Step at a Time.
            </h2>

            {/* Description */}
            <div className="mt-6 max-w-4xl mx-auto md:mx-0 space-y-4 text-white/85 text-sm sm:text-base text-center md:text-left">
              <p>
                At DemandTech, our Lead Nurture Program is designed to build
                meaningful connections with prospects and guide them seamlessly
                through every stage of the buyer’s journey.
              </p>
              <p>
                Our data-driven strategy uses advanced analytics and behavioral
                insights to tailor every interaction, ensuring it’s timely,
                relevant, and personalized.
              </p>
              <p>
                From welcome sequences and targeted email campaigns to thought
                leadership content, our nurturing flows are built to anticipate
                prospect needs and create a natural path toward conversion.
              </p>
            </div>


            {/* Features grid with straight separators */}
            <div className="mt-10 md:mt-12">
              <div className="relative pt-6 md:pt-6">
                {/* Vertical separators (straight lines) */}
                <div
                  className="hidden md:block absolute inset-0 pointer-events-none"
                  aria-hidden="true"
                >
                  <span className="absolute top-0 left-[25%] h-full w-[2px] bg-white/40"></span>
                  <span className="absolute top-0 left-[50%] h-full w-[2px] bg-white/40"></span>
                  <span className="absolute top-0 left-[75%] h-full w-[2px] bg-white/40"></span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 text-center">
                  <div className="px-2">
                    <p className="font-clash text-base md:text-lg leading-snug">
                      Segmentation & Targeting
                    </p>
                  </div>
                  <div className="px-4">
                    <p className="font-clash text-base md:text-lg leading-snug">
                      Personalized Content Journey
                    </p>
                  </div>
                  <div className="px-4">
                    <p className="font-clash text-base md:text-lg leading-snug">
                      Multi-Channel Engagement
                    </p>
                  </div>
                  <div className="px-4">
                    <p className="font-clash text-base md:text-lg leading-snug">
                      Behaviour Tracking
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BackgroundGradientAnimation>
      </div>
      <section>
        <div className="mt-[15px] z-[999] ml-[-1200px] align-center">
          <Element3 />
        </div>
        <div className="mt-[-150px] z-[999] mr-[-1200px] align-center z-[100]">
          <Element3 />
        </div>
      </section>

      <GSAPTextReveal
        style={{
          fontFamily: 'Clash Display',
          fontSize: 'clamp(22px, 5.5vw, 56px)',
          textAlign: 'center',
          color: 'blue',
          marginBottom: '-150px',
          marginTop: '-120px'
        }}

      >
        How It Works
      </GSAPTextReveal>
      <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:px-5 pb-10 pt-14'>
        <Stepper />
      </div>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pb-20 pt-2 text-center">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pb-20 pt-2 text-center">

        </div>
      </div>


      {/* Trust / Marketing ROI section */}
      <section className="mt-[-180px] bg-[#F0F1FA] py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-8 md:gap-12 lg:gap-16">
            <div className="md:col-span-7 text-left md:pr-6 lg:pr-12">
              <h3
                className="text-gray-900"
                style={{
                  fontFamily: "Clash Display, sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(26px, 3.8vw, 44px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                }}
              >
                50+ B2B software companies trust us to improve their{" "}
                <span className="text-[#5B5BFF] font-medium">Marketing ROI</span>
              </h3>

              <p
                className="text-gray-700 max-w-2xl font-neu"
                style={{
                  fontSize: "clamp(14px, 1.1vw, 16px)",
                  lineHeight: 1.6,
                  letterSpacing: "-0.01em",
                }}
              >
                In a world where attention spans are short and digital channels are
                overflowing with noise, standing out isn’t optional—it’s essential. At
                DemandTech, we create scroll-stopping, conversion-driven content that
                captures attention, sparks engagement, and positions your brand as the one
                to watch. We don’t just make prospects pause—we make them take action.
              </p>

              {/* CTA */}
              <div className="mt-4">
                <Button3 text="Contact Us" href="/contact" />
              </div>
            </div>

            {/* Right: Image */}
            <div className="md:col-span-5 flex md:justify-end">
              <div className="w-full max-w-[560px] self-start md:mt-2">
                <Card2 
                  imageSrc="/Creative Edge.png"
                  alt="Marketing team reviewing analytics on screen"
                  aspectClass="aspect-[16/9]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Carousel Section */}
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <GSAPTextReveal
          className="font-regular text-gray-900 mb-8 text-center leading-tight font-clash"
          style={{
            fontSize: 'clamp(22px, 5.5vw, 56px)',
          }}
          stagger={0.15}
          duration={.65}
          yOffset={80}
          start="top 75%"
        >
          Exclusive  <span className="text-[#574BEF]">Solutions</span>
        </GSAPTextReveal>
        <Carousel items={items} />
      </div>
      {/* Services FAQ (above contact) */}
      <div className="max-w-5xl mx-auto sm:px-4 lg:px-4 mt-[-100px]"
     
     >
        <Faq
          heading="FAQ"
          titleLine1="Quick Answers to"
          titleLine2="Common Questions"
          title1FontSize="clamp(22px, 5.5vw, 56px)"
          title2FontSize="clamp(22px, 5.5vw, 52px)"
          items={[
            { question: 'What services does DemandTech provide?', answer: 'We offer demand generation, automated content syndication, appointment generation, and marketing solutions tailored to B2B growth.' },
            { question: 'How do you ensure lead quality?', answer: 'We use intent data, multi-step validation, and enrichment to deliver high-quality, sales-ready leads.' },
            { question: 'Can services be customized?', answer: 'Yes. We scope programs to your ICP, regions, channels, and KPIs. Engagements are fully modular.' },
            { question: 'How quickly can we launch?', answer: 'Typical kickoff to launch is 1–2 weeks after alignment on scope, assets, and targeting.' },
            { question: 'What KPIs do you track?', answer: 'Conversion rates, pipeline contribution, cost per opportunity, and revenue impact based on your goals.' },
          ]}
        />
      </div>

      {/* Contact Section */}
      <div className='mt-15 contact-section section-spacing'>
        <div className='contact-title'>
          <GSAPTextReveal
            style={{
              alignItems: 'center',
              alignContent: 'center',
              fontFamily: 'Clash Display',
              fontSize: 'clamp(48px, 8vw, 64px)',
              textAlign: 'center',
              color: '#000000'
            }}
            stagger={0.15}
            duration={.5}
            yOffset={80}
            start="top 75%"
          >
            Contact Us
          </GSAPTextReveal>
        </div>
        <div className="bg-[#F0F1FA] min-h-screen px-0 py-2 mt-10">
          <MultiStepContactForm />
        </div>

        {/* Ensure scrollable space after content */}
        <div style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  )
}
