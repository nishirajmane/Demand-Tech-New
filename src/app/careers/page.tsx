import { Metadata } from 'next'
import CareersClient from './CareersClient'

export const metadata: Metadata = {
    title: 'Careers | DemandTech',
    description: 'Join the DemandTech team - Explore career opportunities and help shape the future of demand generation.',
}

export default function CareersPage() {
    return <CareersClient />
}
