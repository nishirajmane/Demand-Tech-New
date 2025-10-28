import { Metadata } from 'next'
import SmoothScroll from '@/components/ui/SmoothScroll'
import { GSAPTextReveal } from '@/components/ui/GSAPTextReveal'
import { MultiStepContactForm } from '@/components/index'


export const metadata: Metadata = {
    title: 'Contact | DemandTech',
    description: 'Contact DemandTech for inquiries, support, or to learn more about our services.',
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-transparent">
            <SmoothScroll />
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
                            color: '#000000',
                            marginTop: '100px',
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
