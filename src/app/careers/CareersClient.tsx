"use client";

import { useState } from 'react';
import SmoothScroll from '@/components/ui/SmoothScroll'
import { GSAPTextReveal } from '@/components/ui/GSAPTextReveal'
import Button4 from '@/components/ui/Button4'
import CVUploadPopup from '@/components/ui/CVUploadPopup'

export default function CareersClient() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    return (
        <div className="min-h-screen bg-transparent">
            <SmoothScroll />
            <div className='section-spacing'>
                <div className='max-w-6xl mx-auto px-6 mt-15'>
                    <GSAPTextReveal
                        style={{
                            fontFamily: 'Clash Display',
                            fontSize: 'clamp(48px, 8vw, 72px)',
                            textAlign: 'center',
                            color: 'blue',
                            marginBottom: '60px'
                        }}
                        stagger={0.15}
                        duration={1.0}
                        yOffset={80}
                        start="top 75%"
                    >
                        Join Our Team
                    </GSAPTextReveal>

                    <div className="mb-12">
                        <p className="text-xl text-gray-700 text-center max-w-3xl mx-auto">
                            At DemandTech, we're building the future of demand generation. Join our passionate team
                            of innovators, strategists, and technologists who are transforming how businesses connect
                            with their customers.
                        </p>
                    </div>

                    <section className="mb-25 mt-25">
                        <div className="text-5xl font-normal mb-8 text-center font-clash">Why Work With Us?</div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <h4 className="text-lg font-normal mb-4">Innovation First</h4>
                                <p className="text-gray-700">
                                    Work with cutting-edge technologies and methodologies that are shaping
                                    the future of marketing and demand generation.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <h4 className="text-lg font-normal mb-4">Growth Opportunities</h4>
                                <p className="text-gray-700">
                                    Accelerate your career with continuous learning, mentorship programs,
                                    and opportunities to lead high-impact projects.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl shadow-lg">
                                <h4 className="text-lg font-normal mb-4">Work-Life Balance</h4>
                                <p className="text-gray-700">
                                    Enjoy flexible working arrangements, comprehensive benefits, and a
                                    culture that values your well-being and personal growth.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Send CV Section */}
                    <section className="text-center">
                        <h2 className="text-4xl font-normal mb-4 mt-30">Don't See Your Role?</h2>
                        <p className="text-gray-700 mb-6">
                            We're always looking for talented individuals to join our team. Send us your resume
                            and let us know how you'd like to contribute to DemandTech's mission.
                        </p>
                        <div style={{ display: 'inline-block' }}>
                            <Button4 label="Send your CV" onClick={openPopup} />
                        </div>
                    </section>
                </div>
            </div>

            {/* CV Upload Popup */}
            <CVUploadPopup isOpen={isPopupOpen} onClose={closePopup} />
        </div>
    )
}
