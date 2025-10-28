import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage,
    ogType = 'website',
    publishedTime,
    modifiedTime,
    author,
    section,
    tags = []
  } = config

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : [{ name: 'DemandTech' }],
    openGraph: {
      title,
      description,
      type: ogType,
      locale: 'en_US',
      siteName: 'DemandTech',
      ...(ogImage && { images: [{ url: ogImage, alt: title }] }),
      ...(canonical && { url: canonical }),
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags })
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@demandtech',
      ...(ogImage && { images: [ogImage] })
    },
    ...(canonical && { alternates: { canonical } }),
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

  return metadata
}

export function generateBlogMetadata(post: {
  title: string
  excerpt: string
  slug: { current: string }
  publishedAt: string
  author?: string
  category?: string
  mainImage?: any
}): Metadata {
  const canonical = `https://demand-tech.com/about/blogs/${post.slug.current}`
  const ogImage = post.mainImage ? `https://demand-tech.com${post.mainImage}` : 'https://demand-tech.com/og-blog.jpg'
  
  return generateMetadata({
    title: `${post.title} | DemandTech Blog`,
    description: post.excerpt || `Read ${post.title} on DemandTech blog. Insights on B2B marketing, lead generation, and growth strategies.`,
    keywords: [
      'B2B marketing',
      'lead generation',
      'demand generation',
      'marketing strategy',
      'growth hacking',
      ...(post.category ? [post.category.toLowerCase()] : [])
    ],
    canonical,
    ogImage,
    ogType: 'article',
    publishedTime: post.publishedAt,
    author: post.author || 'DemandTech',
    section: post.category || 'Marketing',
    tags: post.category ? [post.category] : []
  })
}

export function generateCaseStudyMetadata(caseStudy: {
  title: string
  slug?: string
  publishedAt?: string
  thumbnail?: any
}): Metadata {
  const canonical = caseStudy.slug ? `https://demand-tech.com/about/case-studies/${caseStudy.slug}` : 'https://demand-tech.com/about/case-studies'
  const ogImage = caseStudy.thumbnail ? `https://demand-tech.com${caseStudy.thumbnail}` : 'https://demand-tech.com/og-case-study.jpg'
  
  return generateMetadata({
    title: `${caseStudy.title} | DemandTech Case Studies`,
    description: `Download and explore ${caseStudy.title} case study. Real-world examples of successful B2B marketing campaigns and strategies.`,
    keywords: [
      'case study',
      'B2B marketing',
      'success stories',
      'marketing results',
      'lead generation results',
      'demand generation'
    ],
    canonical,
    ogImage,
    ogType: 'article',
    publishedTime: caseStudy.publishedAt,
    section: 'Case Studies'
  })
}

export function generateResourceMetadata(resource: {
  title: string
  slug?: string
  publishedAt?: string
  thumbnail?: any
}): Metadata {
  const canonical = resource.slug ? `https://demand-tech.com/about/resources/${resource.slug}` : 'https://demand-tech.com/about/resources'
  const ogImage = resource.thumbnail ? `https://demand-tech.com${resource.thumbnail}` : 'https://demand-tech.com/og-resource.jpg'
  
  return generateMetadata({
    title: `${resource.title} | DemandTech Learning Resources`,
    description: `Download ${resource.title} and level up your marketing knowledge. Free resources for B2B marketers and growth professionals.`,
    keywords: [
      'marketing resources',
      'B2B marketing guide',
      'lead generation resources',
      'marketing templates',
      'growth resources',
      'demand generation'
    ],
    canonical,
    ogImage,
    ogType: 'article',
    publishedTime: resource.publishedAt,
    section: 'Learning Resources'
  })
}

// Structured Data (JSON-LD) generators
export function generateBlogStructuredData(post: {
  title: string
  excerpt: string
  slug: { current: string }
  publishedAt: string
  author?: string
  category?: string
  mainImage?: any
}) {
  const canonical = `https://demand-tech.com/about/blogs/${post.slug.current}`
  const ogImage = post.mainImage ? `https://demand-tech.com${post.mainImage}` : 'https://demand-tech.com/og-blog.jpg'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: ogImage,
    author: {
      '@type': 'Organization',
      name: post.author || 'DemandTech',
      url: 'https://demand-tech.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'DemandTech',
      logo: {
        '@type': 'ImageObject',
        url: 'https://demand-tech.com/logo.png'
      }
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical
    },
    url: canonical,
    ...(post.category && {
      articleSection: post.category,
      about: {
        '@type': 'Thing',
        name: post.category
      }
    })
  }
}

export function generateCaseStudyStructuredData(caseStudy: {
  title: string
  slug?: string
  publishedAt?: string
  thumbnail?: any
}) {
  const canonical = caseStudy.slug ? `https://demand-tech.com/about/case-studies/${caseStudy.slug}` : 'https://demand-tech.com/about/case-studies'
  const ogImage = caseStudy.thumbnail ? `https://demand-tech.com${caseStudy.thumbnail}` : 'https://demand-tech.com/og-case-study.jpg'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.title,
    description: `Case study: ${caseStudy.title}`,
    image: ogImage,
    author: {
      '@type': 'Organization',
      name: 'DemandTech',
      url: 'https://demand-tech.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'DemandTech',
      logo: {
        '@type': 'ImageObject',
        url: 'https://demand-tech.com/logo.png'
      }
    },
    datePublished: caseStudy.publishedAt,
    dateModified: caseStudy.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical
    },
    url: canonical,
    articleSection: 'Case Studies',
    about: {
      '@type': 'Thing',
      name: 'B2B Marketing Case Study'
    }
  }
}

export function generateResourceStructuredData(resource: {
  title: string
  slug?: string
  publishedAt?: string
  thumbnail?: any
}) {
  const canonical = resource.slug ? `https://demand-tech.com/about/resources/${resource.slug}` : 'https://demand-tech.com/about/resources'
  const ogImage = resource.thumbnail ? `https://demand-tech.com${resource.thumbnail}` : 'https://demand-tech.com/og-resource.jpg'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: resource.title,
    description: `Learning resource: ${resource.title}`,
    image: ogImage,
    author: {
      '@type': 'Organization',
      name: 'DemandTech',
      url: 'https://demand-tech.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'DemandTech',
      logo: {
        '@type': 'ImageObject',
        url: 'https://demand-tech.com/logo.png'
      }
    },
    datePublished: resource.publishedAt,
    dateModified: resource.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical
    },
    url: canonical,
    articleSection: 'Learning Resources',
    about: {
      '@type': 'Thing',
      name: 'Marketing Learning Resource'
    }
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}
