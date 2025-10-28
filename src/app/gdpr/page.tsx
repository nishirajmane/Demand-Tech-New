import { Metadata } from 'next'
import SmoothScroll from '@/components/ui/SmoothScroll'
import { GSAPTextReveal } from '@/components/ui/GSAPTextReveal'

export const metadata: Metadata = {
    title: 'GDPR Compliance & Data Protection | DemandTech',
    description: 'GDPR compliance information for DemandTech - Your rights under the General Data Protection Regulation.',
}

export default function GDPRPage() {
    return (
        <div className="min-h-screen bg-transparent">
            <SmoothScroll />
            <div className='section-spacing mt-15'>
                <div className='max-w-6xl mx-auto px-6'>
                    <GSAPTextReveal
                        style={{
                            fontFamily: 'Clash Display',
                            fontSize: 'clamp(48px, 8vw, 72px)',
                            textAlign: 'center',
                            color: 'blue',
                            marginBottom: '40px'
                        }}
                        stagger={0.15}
                        duration={1.0}
                        yOffset={80}
                        start="top 75%"
                    >
                        GDPR Compliance
                    </GSAPTextReveal>
                    
                    <div className="text-center mb-8">
                        <a
                            href="/gdpr-policy.pdf"
                            download="DemandTech-GDPR-Policy.pdf"
                            className="inline-flex items-center px-6 py-3 bg-white text-blue font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                             GDPR Policy
                        </a>
                    </div>
                    
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-600 mb-6">Effective Date: May 25, 2018</p>
                        
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Your Rights Under GDPR</h2>
                            <p className="text-gray-700 mb-4">
                                Under the General Data Protection Regulation (GDPR), you have several rights regarding 
                                your personal data. These include the right to access, rectify, erase, restrict processing, 
                                data portability, and object to processing of your personal data.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Legal Basis for Processing</h2>
                            <p className="text-gray-700 mb-4">
                                We process your personal data based on various legal grounds including your consent, 
                                contractual necessity, legal obligations, vital interests, public tasks, and legitimate interests. 
                                We will always inform you of the specific legal basis for each processing activity.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
                            <p className="text-gray-700 mb-4">
                                We retain your personal data only for as long as necessary to fulfill the purposes for which 
                                it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. 
                                Specific retention periods vary depending on the type of data and purpose of processing.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">International Transfers</h2>
                            <p className="text-gray-700 mb-4">
                                When we transfer your personal data outside the European Economic Area (EEA), we ensure 
                                appropriate safeguards are in place, such as adequacy decisions, standard contractual clauses, 
                                or binding corporate rules.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Exercise Your Rights</h2>
                            <p className="text-gray-700 mb-4">
                                To exercise any of your GDPR rights, please contact our Data Protection Officer at 
                                dpo@demandtech.com. We will respond to your request within one month and may require 
                                verification of your identity.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Supervisory Authority</h2>
                            <p className="text-gray-700">
                                You have the right to lodge a complaint with your local supervisory authority if you 
                                believe we have not handled your personal data in accordance with GDPR requirements.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
