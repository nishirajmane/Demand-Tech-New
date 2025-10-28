import CaseStudiesClient from './CaseStudiesClient';

// Generate metadata for the case studies page
export async function generateMetadata() {
  return {
    title: 'Case Studies | DemandTech Success Stories',
    description: 'Explore real-world B2B marketing case studies and success stories. Download detailed reports on lead generation campaigns, demand generation strategies, and marketing ROI results.',
    keywords: 'B2B case studies, marketing case studies, lead generation results, demand generation success stories, B2B marketing ROI, marketing campaign results',
    openGraph: {
      title: 'Case Studies | DemandTech Success Stories',
      description: 'Explore real-world B2B marketing case studies and success stories. Download detailed reports on lead generation campaigns.',
      type: 'website',
      url: 'https://demand-tech.com/about/case-studies',
      siteName: 'DemandTech',
      images: [{
        url: 'https://demand-tech.com/og-case-study.jpg',
        width: 1200,
        height: 630,
        alt: 'DemandTech Case Studies - B2B Marketing Success Stories'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Case Studies | DemandTech Success Stories',
      description: 'Explore real-world B2B marketing case studies and success stories.',
      images: ['https://demand-tech.com/og-case-study.jpg']
    },
    alternates: {
      canonical: 'https://demand-tech.com/about/case-studies'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    }
  }
}

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
