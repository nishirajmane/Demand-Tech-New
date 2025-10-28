import { Metadata } from 'next'
import {
  Ribbon1,
  LogoSlider,

} from '../../components';
import './Homepage.css';
import Card2 from '../../components/ui/Card2';
import Button2 from '../../components/ui/Button2';
import { AnimatedTestimonials } from '../../components/ui/animated-testimonials';
import { GSAPTextReveal } from '../../components/ui/GSAPTextReveal';
import MultiStepContactForm from "@/components/ui/MultiStepContactForm";
import RightScrollExpandVideo from '../../components/ui/VideoRight';
import { Hero } from '@/components/ui/HeroSection';
import Feature from '@/components/ui/FeatureHomepage';
import RuixenStats from '@/components/ui/Statistics';
import Element1 from '@/components/preloader/Element1';
import HomeExtendedSections from '@/components/ui/HomeExtendedSections';
export const metadata: Metadata = {
  title: 'DemandTech | Accelerate Your Business Growth',
  description: 'Transform your demand generation with cutting-edge technology and proven strategies. Drive qualified leads, increase conversions, and scale your business.',
  keywords: ["demand generation", "marketing automation", "lead generation", "B2B marketing", "growth marketing"],
  icons: {
    icon: '/favicon.ico',
  },
}

export default function HomePage() {


  const testimonials = [
    {
      quote: "Partnering with Demandify Media for Niveus's demand generation has been a pleasure. Their expertise and support have been crucial in generating leads.",
      name: "Abhishek Hegde",
      designation: "Marketing Director, Niveus",
      src: "/niveus 1.png"
    },
    {
      quote: "Working with Demandify has been a smooth and efficient experience. Their team is responsive, and the lead delivery process is well-structured. We saw consistent quality in the leads generated, helping us drive awareness and engagement in our target accounts",
      name: "Nishanth S",
      designation: "Senior Demand Generation Manager, ThoughtSpot",
      src: "/thoughtspot 1.png"
    },
    // {
    //   quote: "Working with DemandTech has been a game-changer for our business. Their cutting-edge technology combined with expert insights accelerated our path to revenue like never before.",
  ];

  return (
    <>
      <div style={{ overflow: 'hidden', backgroundColor: '#F0F1FA', minHeight: '100vh' }}>
        {/* <ScrollAnimations /> */}
        <div style={{ position: 'absolute', width: '100%', zIndex: 0 }}>
          <Ribbon1 />
        </div>



        {/* Hero Section with background video */}
        <section className="hero-with-funnel bg-transparent mt-[-20px]">
          <Hero />
          <div className="mt-[-90px] z-[-1] mr-[-1300px] align-right mb-[100px]">
            <Element1 />
          </div>

        </section>




        <Feature />

        {/* Right-side scroll expand video */}
        <div className="mt-[75px]" />

        <RightScrollExpandVideo
          videoSrc="/herovid.mp4"
          posterSrc="/heroimg.png"
        />

        <div className="w-full px-4 sm:px-6 lg:px-8 mb-28">
          <LogoSlider />
        </div>


        {/* <VideoHero /> */}
        {/* Logo Slider */}
        {/* <div className="logo-slider-container section-spacing mt-[75px] sm:mt-[0px]">
          <LogoSlider />
        </div> */}

        {/* SVG Animation */}




        {/* Testimonials Section */}
        <div className='testimonials-section section-spacing'>
          <div className='testimonials-title'>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'Clash Display',
              textAlign: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '-75px'
            }}>
              <GSAPTextReveal
                style={{
                  alignItems: 'center',
                  alignContent: 'center',
                  fontFamily: 'Clash Display',
                  fontSize: 'clamp(48px, 8vw, 64px)',
                  textAlign: 'center',
                  color: '#000cf8'
                }}
                stagger={0.12}
                duration={0.9}
                yOffset={70}
                start="top 80%"
              >
                Success
              </GSAPTextReveal>
              <span style={{ color: '#000000' }}>
                <GSAPTextReveal
                  style={{
                    alignItems: 'center',
                    alignContent: 'center',
                    fontFamily: 'Clash Display',
                    fontSize: 'clamp(48px, 8vw, 64px)',
                    textAlign: 'center',
                    color: '#000000'
                  }}
                  stagger={0.12}
                  duration={0.9}
                  yOffset={70}
                  start="top 80%"
                >
                  Through Their Lens
                </GSAPTextReveal>
              </span>
            </div>
          </div>
          <div className="testimonials-container">
            <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
          </div>
        </div>

        {/* Features Section */}
        <div className='features-section section-spacing mt-[125px] mb-[125px]'>
          <div className='features-title'>
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
              duration={1.0}
              yOffset={80}
              start="top 75%"
            >
              Features
            </GSAPTextReveal>
          </div>
          <div className='servicescards'>
            <div className='service-item'>
              <Card2 imageSrc="/image2.jpeg" alt="Service 1" />
              <Button2 text="Intent-Qualified Lead" href="/services/demand-generation" />
            </div>
            <div className='service-item'>
              <Card2 imageSrc="/image3.jpeg" alt="Service 2" />
              <Button2 text="Brand Awareness" href="/services/demand-generation" />
            </div>
            <div className='service-item'>
              <Card2 imageSrc="/image1.jpeg" alt="Service 3" />
              <Button2 text="Lead Nurture Program" href="/services/demand-generation" />
            </div>
          </div>
        </div>



        {/* Map  */}
        <RuixenStats />

        {/* Extended content sections (custom, code-based) */}
        <div className="mb-[110px]">  
        <HomeExtendedSections />
        </div>


        {/* Contact Section */}
        <div className='contact-section section-spacing mt-[225px]'>
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
              duration={1.0}
              yOffset={80}
              start="top 75%"
            >
              Contact Us
            </GSAPTextReveal>
          </div>
          <div className="bg-[#F0F1FA] min-h-screen px-0 py-2">
            <MultiStepContactForm />
          </div>

          {/* Ensure scrollable space after content */}
          <div style={{ height: '100%', width: '100%' }} />
        </div>

        {/* Floating AI Chatbot Widget */}
        {/* <ChatWidget /> */}
      </div>
    </>

  );
}