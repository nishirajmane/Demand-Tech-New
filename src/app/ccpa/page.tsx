import { Metadata } from 'next'
import SmoothScroll from '@/components/ui/SmoothScroll'
import { GSAPTextReveal } from '@/components/ui/GSAPTextReveal'

export const metadata: Metadata = {
    title: 'CCPA Compliance | DemandTech',
    description: 'CCPA compliance information for DemandTech - Your rights under the California Consumer Privacy Act.',
}

export default function CCPAPage() {
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
                        CCPA Compliance
                    </GSAPTextReveal>
                    
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-600 mb-6">Effective Date: January 1, 2020</p>
                        
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Additional Notice for California Residents</h2>
                            <p className="text-gray-700 mb-4">
                            The California Consumer Privacy Act (CCPA) enhances privacy rights and consumer protection for individuals who reside in California. Demandifymedia is committed to full CCPA compliance. Please refer to our Privacy Policy for general information about what kind of personal data we collect, and how we collect, use and store your personal data. Please see below for additional information relevant to the CCPA.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">What categories of personal information do you collect about me?</h2>
                            <p className="text-gray-700 mb-4">
                            We may collect personal identifiers, such as your name, personal and/or business contact details, including your phone number(s), email address, mailing address, job title and any other information required to validate your identity; credit card or bank account information necessary for billing purposes; commercial information, such as records of products or services purchased or other purchasing or use histories or tendencies; activity information relating to internet or other electronic networks such as browsing or searching history, or interaction with a website, ad or app; information related to employment or other professional standings; information related to education.

We do not knowingly collect any information about anyone under the age of 16.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Do you share, disclose or sell my personal information?</h2>
                            <ul className="text-gray-700 mb-4 space-y-3 list-disc pl-6">
                                <li>We may share your personal information, relating to the categories listed above, with our other group companies and service providers for internal reasons if it is necessary for business and operational purposes.</li>
                                <li>Where required we share your personal information, relating to the categories listed above, with service providers or third parties to comply with a legal obligation; when we believe in good faith that an applicable law requires it; at the request of governmental authorities conducting an investigation; to verify or enforce our terms of use or other applicable policies; to detect and protect against fraud, or any technical or security vulnerabilities; to respond to an emergency; or otherwise to protect the rights, property, safety, or security of third parties, visitors to our website, our business or the public.</li>
                                <li>As we continue to develop our business, we may sell or purchase assets. If another entity acquires us or merges with us your personal information, relating to the categories above, may be disclosed or sold to such entity. Also, if any bankruptcy or reorganisation proceeding is brought by or against us, all such information will be considered an asset of ours and as such it is possible they will be sold or transferred to third parties.</li>
                                <li>We may sell your personal information, relating to the categories listed above, to our customers, after you have expressed an interest in their goods or services. This interest may be expressed in numerous ways, including submitting your information to us in order to download a digital asset (such as a white-paper or ebook), by engaging with any of our email marketing or clicking on a digital advert hosted by us. Please ensure that you read and agree to our customers' privacy policies before expressing any interest in their product as outlined above.</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">What are my rights under the CCPA?</h2>
                            <p className="text-gray-700 mb-4">If you are a resident of California, the CCPA grants you the following rights:</p>
                            <ul className="text-gray-700 mb-4 space-y-3 list-disc pl-6">
                                <li>The right to request disclosure of our data collection and sales practices in connection with your personal information, including the categories of personal information we have collected, the source of the information, our use of the information and, if the information was disclosed or sold to third parties, the categories of personal information disclosed or sold to third parties and the categories of third parties to whom such information was disclosed or sold;</li>
                                <li>The right to request a copy of the specific personal information collected about you during the 12 months before your request (together with right #1, a "personal information request")</li>
                                <li>The right to have such information deleted (excepting where such information is required to: i.provide you with goods or services you requested; ii. detect or resolve issues security or functionality-related issues; iii. comply with the law; iv. conduct research in the public interest; v. safeguard the right to free speech; and vi. carry out any actions for internal purposes that you might reasonably expect).</li>
                                <li>The right to request that your personal information not be sold to third parties, if applicable.</li>
                                <li>The right not to be discriminated against because you exercised any of the new rights.</li>
                            </ul>
                            <p className="text-gray-700 mb-4">You are entitled to make two information requests within a 12-month period. If you make an information request, we will need to collect certain information from you in order to verify your identity. You will receive a response to your request within 45 days.</p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">How can I submit a personal information request?</h2>
                            <p className="text-gray-700 mb-4">
                            There are several ways for you to submit a personal information request.You may: marketing@demandifymedia.com There are several ways for you to submit a personal information request. 
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">For how long do you store my information?</h2>
                            <p className="text-gray-700 mb-4">
                            We will not keep your personal data that we process for longer than is necessary for the purpose(s) the data is collected.

Send a request by mail to: 66 W Flagler Street STE 900 Miami, FL 33130 United State
 Send a request via email to marketing@demandifymedia.com
Only you, or a person registered with the California Secretary of State that you authorize to act on your behalf, may make a verifiable request related to your personal information. For all requests, you must provide your full legal name, your home address, your cell phone number, your email address, which consumer right you are calling about, and what your request is. You may be asked for additional proof of identity, as well. request. 
                            </p>
                        </section>

                        
                    </div>
                </div>
            </div>
        </div>
    )
}
