import ResourcesClient from './ResourcesClient';

// Generate metadata for the learning resources page
export async function generateMetadata() {
  return {
    title: 'Learning Resources | DemandTech Marketing Guides',
    description: 'Download free B2B marketing resources, guides, templates, and tools. Level up your marketing knowledge with expert insights on lead generation, demand generation, and growth strategies.',
    keywords: 'B2B marketing resources, marketing guides, lead generation templates, demand generation resources, marketing tools, B2B marketing guides, free marketing resources',
    openGraph: {
      title: 'Learning Resources | DemandTech Marketing Guides',
      description: 'Download free B2B marketing resources, guides, templates, and tools. Level up your marketing knowledge with expert insights.',
      type: 'website',
      url: 'https://demand-tech.com/about/resources',
      siteName: 'DemandTech',
      images: [{
        url: 'https://demand-tech.com/og-resource.jpg',
        width: 1200,
        height: 630,
        alt: 'DemandTech Learning Resources - Free Marketing Guides'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Learning Resources | DemandTech Marketing Guides',
      description: 'Download free B2B marketing resources, guides, templates, and tools.',
      images: ['https://demand-tech.com/og-resource.jpg']
    },
    alternates: {
      canonical: 'https://demand-tech.com/about/resources'
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

export default function LearningResourcesPage() {
  return <ResourcesClient />;
}
