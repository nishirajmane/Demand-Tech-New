import { Metadata } from 'next'
import VideoCard from '@/components/ui/VideoCard'
import SmoothScroll from '@/components/ui/SmoothScroll'
import { GSAPTextReveal } from '@/components/ui/GSAPTextReveal'
import { Features } from '@/components/ui/Features'
import { TimelineDemo } from '@/components/ui/UseTimeline'
import { MultiStepContactForm } from '@/components/index'


export const metadata: Metadata = {
    title: 'Overview | DemandTech',
    description: 'Learn about DemandTech - our mission, values, and commitment to driving business growth through innovative technology solutions.',
}

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-transparent">
            <SmoothScroll />
            {/* Hero Section with VideoCard */}
            <div>
                <div
                    className="text-[#000000] text-4xl sm:text-5xl md:text-8xl lg:text-[120px] transition-opacity duration-500"
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
                    className="text-[#000cf8] text-4xl sm:text-5xl md:text-8xl lg:text-[120px] transition-opacity duration-500"
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
                    <VideoCard />
                </div>
            </div>
            {/*Description*/}
            <div className="text-[#000000] max-w-7xl mx-auto px-4 sm:px-6 lg:px-55 py-20 mt-[-100px] z-[1000]">
                <p className="text-2xl">Our mission is to help businesses grow by providing innovative technology solutions that drive results. We are committed to delivering exceptional service and support to our clients, and we are dedicated to helping them achieve their goals.</p>
            </div>

            <div className='contact-title'>
                <GSAPTextReveal
                    style={{
                        marginTop: '50px',
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
                        marginTop: '30px',
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