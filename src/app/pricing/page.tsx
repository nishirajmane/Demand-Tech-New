import { Metadata } from 'next'
import PricingContent from "@/components/ui/PricingContent"
import Faq from '@/components/ui/faq';

export const metadata: Metadata = {
    title: 'B2B Lead Generation Pricing | DemandTech',
    description: 'Explore DemandTech’s B2B lead generation pricing plans. Choose the best AI-powered solution to grow your business efficiently.',
}

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-[#F0F1FA]">
            <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="text-center font-clash">
                    <div className="text-[#574BEF] text-4xl sm:text-4xl md:text-4xl lg:text-[64px] leading-tight">
                    Choose What Fits, Achieve What’s Next
                    </div>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                    Lead generation campaigns crafted to meet your business ambitions
                    </p>
                </div>

                <div>
  <PricingContent />
</div>

<div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-12">
        <Faq
          heading="Pricing FAQ"
          titleLine1="Questions About"
          titleLine2="Our Pricing"
          items={[
            { question: 'Do you offer custom pricing?', answer: 'Yes. We tailor pricing to your scope, regions, ICP, and volume commitments.' },
            { question: 'Is there a minimum commitment?', answer: 'We support pilots as well as ongoing retainers. Minimums depend on channel and region.' },
            { question: 'What payment terms do you support?', answer: 'Standard NET terms are available. Prepaid discounts can be arranged for longer commitments.' },
            { question: 'Are there setup fees?', answer: 'Setup fees apply for complex integrations or custom data workflows. Most standard programs have no setup fee.' },
            { question: 'How do I get a detailed quote?', answer: 'Contact us with your goals and ICP. We will share a scoped proposal within 2–3 business days.' },
          ]}
        />
      </div>

                </div>
            </div>
        
    )
}