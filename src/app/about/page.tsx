import { Metadata } from 'next'
import VideoCard from '@/components/ui/VideoCard'
import SmoothScroll from '@/components/ui/SmoothScroll'
import { GSAPTextReveal } from '@/components/ui/GSAPTextReveal'
import { Features } from '@/components/ui/Features'
import { TimelineDemo } from '@/components/ui/UseTimeline'
import { MultiStepContactForm } from '@/components/index'
import Ribbon2 from '@/components/ui/Ribbon2'


export const metadata: Metadata = {
    title: 'About | DemandTech',
    description: 'Learn about DemandTech - our mission, values, and commitment to driving business growth through innovative technology solutions.',
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-transparent">
            <SmoothScroll />

            {/* <div style={{ position: 'absolute', width: '100%', zIndex: -1, top: '-1800px' }}>
                <Ribbon2 />
            </div> */}
            {/* Hero Section with VideoCard */}
            <div>
                <div
                    className="hidden md:block text-[#000000] text-4xl sm:text-5xl md:text-8xl lg:text-[120px] transition-opacity duration-500"
                    style={{
                        fontFamily: 'Clash Display, sans-serif',
                        textAlign: 'center',
                        zIndex: '1000',
                        overflow: 'overlay',
                        position: 'absolute',
                        marginTop: '300px',
                        left: '15%',
                        transform: 'translateX(-25%)',
                    }}
                    id="know-text"
                >
                    Know
                </div>
                <div
                    className="hidden md:block text-[#000cf8] text-4xl sm:text-5xl md:text-8xl lg:text-[120px] transition-opacity duration-500"
                    style={{
                        fontFamily: 'Clash Display, sans-serif',
                        textAlign: 'center',
                        zIndex: '1000',
                        overflow: 'overlay',
                        position: 'absolute',
                        marginTop: '300px',
                        right: '15%',
                        transform: 'translateX(25%)'
                    }}
                    id="more-text"
                >
                    More
                </div>
                <div className="max-w-7xl px-4 mx-auto sm:px-6 lg:px-8 py-2 mt-[-100px] z-[-1]">
                    {/* Desktop/Tablet: Interactive expandable video */}
                    <div className="hidden md:block">
                        <VideoCard />
                    </div>
                    {/* Mobile: Static simple video without expand effect */}
                    <div className="block md:hidden" style={{ marginTop: '100px', marginBottom: '50px' }}>
                        <div className="relative w-full max-w-full mx-auto">
                            <div className="rounded-xl overflow-hidden ">
                                <video
                                    src="/about-video.mp4"
                                    poster="/video-frame.png"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    preload="auto"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="mt-3 text-center">
                                <p className="text-sm text-[#000cf8]">Since 2022</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*Description*/}
            <div className="text-[#000000] max-w-7xl mx-auto px-4 sm:px-6 lg:px-55 py-20 mt-[-100px] z-[1000]">
                <p className="text-2xl sm:text[14px]:">At DemandTech, our mission is to empower businesses with the right technology and marketing solutions to accelerate growth. We believe in combining innovation with strategy to help companies streamline operations, generate high-quality leads, and build lasting customer relationships.</p>
            </div>

            <div className='contact-title'>
                <GSAPTextReveal
                    style={{
                        marginTop: '-50px',
                        alignItems: 'center',
                        alignContent: 'center',
                        fontFamily: 'Clash Display',
                        fontSize: 'clamp(48px, 8vw, 92px)',
                        textAlign: 'center',
                        color: '#000cf8'
                    }}
                    stagger={0.15}
                    duration={1.0}
                    yOffset={80}
                    start="top 75%"
                >
                    Our Impact
                </GSAPTextReveal>
            </div>
            <div className="mt-[-50px]">
                <Features />
            </div>
            <div className='contact-title'>
                <GSAPTextReveal
                    style={{
                        marginTop: '-90px',
                        alignContent: 'center',
                        fontFamily: 'Clash Display',
                        fontSize: 'clamp(48px, 8vw, 92px)',
                        textAlign: 'center',
                        color: '#000cf8'
                    }}
                    stagger={0.15}
                    duration={1.0}
                    yOffset={80}
                    start="top 75%"
                >
                    Our Journey
                </GSAPTextReveal>
            </div>
            <div className="mt-[-50px]">
                <TimelineDemo />
            </div>
            {/* Contact Section */}
            <div className='contact-section section-spacing'>
                <div className='contact-title'>
                    <GSAPTextReveal
                        style={{
                            alignItems: 'center',
                            alignContent: 'center',
                            fontFamily: 'Clash Display',
                            fontSize: 'clamp(48px, 8vw, 92px)',
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
            </div>
        </div>
    )
}