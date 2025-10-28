import BlogsClient from './BlogsClient';

// Generate metadata for the blogs page
export async function generateMetadata() {
    return {
        title: 'Insights & Expertise | DemandTech Blog',
        description: 'Stay ahead with the latest trends, strategies, and insights in B2B marketing and lead generation. Expert articles on demand generation, marketing automation, and growth strategies.',
        keywords: 'B2B marketing blog, lead generation insights, demand generation strategies, marketing automation, growth hacking, industry insights, marketing trends',
        openGraph: {
            title: 'Insights & Expertise | DemandTech Blog',
            description: 'Stay ahead with the latest trends, strategies, and insights in B2B marketing and lead generation.',
            type: 'website',
            url: 'https://demand-tech.com/about/blogs',
            siteName: 'DemandTech',
            images: [{
                url: 'https://demand-tech.com/og-blog.jpg',
                width: 1200,
                height: 630,
                alt: 'DemandTech Blog - B2B Marketing Insights'
            }]
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Insights & Expertise | DemandTech Blog',
            description: 'Stay ahead with the latest trends, strategies, and insights in B2B marketing and lead generation.',
            images: ['https://demand-tech.com/og-blog.jpg']
        },
        alternates: {
            canonical: 'https://demand-tech.com/about/blogs'
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

export default function BlogsPage() {
    return <BlogsClient />;
}