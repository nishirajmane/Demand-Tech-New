import { Metadata } from 'next'
import SmoothScroll from '@/components/ui/SmoothScroll'
import { GSAPTextReveal } from '@/components/ui/GSAPTextReveal'

export const metadata: Metadata = {
    title: 'Privacy Policy | DemandTech',
    description: 'Privacy Policy for DemandTech - Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
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
                            marginBottom: '60px'
                        }}
                        stagger={0.15}
                        duration={1.0}
                        yOffset={80}
                        start="top 75%"
                    >
                        Privacy Policy
                    </GSAPTextReveal>
                    
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-600 mb-6">Last revised: May 8, 2022</p>
                        
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Who is DemandTech Pvt.Ltd.?</h2>
                            <p className="text-gray-700 mb-4">
                                We have an extensive experience of 16 years in the B2B space and an array of marketing strategies to help you connect with Tech Buyers across the board. We assist Marketing and Sales teams achieve ROI from their marketing campaigns and go a step ahead of their competition. Our triple layer Intent strategy helps us verify the prospects' interest by gauging the Intent specialities searched, duration of their activity and the various signals they have shared thanks to their online activities.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">What information about me do you collect?</h2>
                            <p className="text-gray-700 mb-4">
                                DemandTech collects limited personal information, such as your name, personal and/or business contact details, including your phone number(s), email address, mailing address, job title and any other information required to validate your identity. When you engage with the content via electronic mail or through a website, we may also collect location information (such as general location information inferred from an IP address) or user agent details as part of our validation process. To the extent that we use location or user agent data, we delete that data upon validation. We also collect your billing and other account information, and we collect information about our services that you use, have used or request information about.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">How do you collect information about me?</h2>
                            <p className="text-gray-700 mb-4">
                                The information we collect is primarily provided by you, such as when you are asked to provide us with personal and/or billing information. We automatically collect information through the use of third party "cookies," such as SharpSpring and Google Analytics. Cookies are text files placed on your computer to collect standard Internet log information and visitor behavior information. Occasionally we may obtain personal information about you from third-party sources (including third-party websites, data brokers or credit reference agencies), but only where we have confirmed that these third parties either have your consent or are otherwise legally permitted or required to disclose your personal information to us.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">What methods do you use to contact me?</h2>
                            <p className="text-gray-700 mb-4">
                                We may contact you by phone, email or social media. Should you have any preferences on the manner in which we contact you, please let us know using the details below.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">For how long do you store my information?</h2>
                            <p className="text-gray-700 mb-4">
                                We will not keep your personal data that we process for longer than is necessary for the purpose(s) the data is collected. Notwithstanding the other provisions of this section, we may retain your personal data where such retention is necessary for compliance with a legal obligation to which we are subject, or to protect your vital interests or the vital interests of another natural person, or for as long as reasonably necessary for audit or internal purposes.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Is my personal data secure?</h2>
                            <p className="text-gray-700 mb-4">
                                Only authorized personnel are allowed access to your personal information. We take the appropriate standard of care in the storage of your information and comply with all relevant laws.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">With whom do you share my personal information?</h2>
                            <p className="text-gray-700 mb-4">
                                We share your personal information with our other group companies for internal reasons, primarily for business and operational purposes. As we continue to develop our business, we may sell or purchase assets. If another entity acquires us or merges with us your personal information will be disclosed to such entity. Also, if any bankruptcy or reorganization proceeding is brought by or against us, all such information will be considered an asset of ours and as such it is possible they will be sold or transferred to third parties.
                            </p>
                            <p className="text-gray-700 mb-4">
                                We may share your personal information with our customers if you have expressed an interest in their goods or services. This interest may be expressed in numerous ways, including submitting your information to us in order to download a digital asset (such as a whitepaper or ebook), by engaging with any of our email marketing or clicking on a digital advert hosted by us. Please ensure that you read and agree to our customers' privacy policies before expressing any interest in their product as outlined above. Please also note that you have the right to object to any processing by our customer, and any further processing by us.
                            </p>
                            <p className="text-gray-700 mb-4">
                                Where required we share your personal information with third parties to comply with a legal obligation; when we believe in good faith that an applicable law requires it; at the request of governmental authorities conducting an investigation; to verify or enforce our terms of use or other applicable policies; to detect and protect against fraud, or any technical or security vulnerabilities; to respond to an emergency; or otherwise to protect the rights, property, safety, or security of third parties, visitors to our website, our business or the public.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">What happens if I do not want to provide you with my personal information, or if I choose to opt out of your processing my personal information for marketing purposes?</h2>
                            <p className="text-gray-700 mb-4">
                                We require our customers to provide certain data in order to receive our products and/ or services. Should you choose not to provide your personal details to us as a customer, we would be unable to provide you with our products and/or services.
                            </p>
                            <p className="text-gray-700 mb-4">
                                Should you choose not to allow us to continue processing your information for marketing purposes, you will no longer receive useful and relevant offers and/or educational content from us.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Additional Notice for California Residents</h2>
                            <p className="text-gray-700 mb-4">
                                See our CCPA compliance page for detailed information about your rights under the California Consumer Privacy Act.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Additional Notice for EU and EEA Residents</h2>
                            <p className="text-gray-700 mb-4">
                                See our GDPR compliance page for detailed information about your rights under the General Data Protection Regulation.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">How can I contact you?</h2>
                            <p className="text-gray-700 mb-4">
                                If you have any questions about this privacy policy or the data we hold on you, or if you would like to opt out of receiving communications from us, you may contact us at:
                            </p>
                            <div className="text-gray-700 mb-4">
                                <p>66 W Flagler Street STE 900</p>
                                <p>Miami, FL 33130</p>
                                <p>United States</p>
                                <p>legal@demandtech.com</p>
                            </div>
                        </section>

                        <section className="mb-8">
                            <p className="text-gray-600 text-sm">
                                This policy may be updated or revised from time to time. It is the responsibility of the user to periodically review the policy statement to determine if there are any substantive changes.
                            </p>
                            <p className="text-gray-600 text-sm mt-4">
                                66 W Flagler Street STE 900 Miami, FL 33130, United States
                            </p>
                            <p className="text-gray-600 text-sm">
                                © 2022 DemandTech pvt.ltd
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
