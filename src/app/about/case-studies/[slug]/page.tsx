import { Metadata } from 'next'
// No Sanity usage here
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
// Sanity removed for case studies. Keep page, remove Sanity fetching.

interface CaseStudy {
    _id: string
    title: string
    slug: { current: string }
    industry: string
    description: string
    results: Array<{
        metric: string
        value: string
    }>
    mainImageUrl?: string
    body: unknown[]
}

async function getCaseStudy(_slug: string): Promise<CaseStudy | null> { return null }

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params
    const caseStudy = await getCaseStudy(slug)

    if (!caseStudy) {
        return {
            title: 'Case Study Not Found | DemandTech',
        }
    }

    return {
        title: `${caseStudy.title} | DemandTech Case Studies`,
        description: caseStudy.description,
    }
}

const portableTextComponents = {}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const caseStudy = await getCaseStudy(slug)

    if (!caseStudy) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="mb-8">
                    <Link
                        href="/about/case-studies"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
                    >
                        ← Back to Case Studies
                    </Link>

                    <div className="mb-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                            {caseStudy.industry}
                        </span>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {caseStudy.title}
                        </h1>
                        <p className="text-xl text-gray-600 mb-6">
                            {caseStudy.description}
                        </p>
                    </div>

                    {/* main image removed with Sanity */}

                    {caseStudy.results && caseStudy.results.length > 0 && (
                        <div className="bg-gray-50 rounded-lg p-8 mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Key Results</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {caseStudy.results.map((result, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-3xl font-bold text-blue-600 mb-2">{result.value}</div>
                                        <div className="text-sm text-gray-600">{result.metric}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="prose prose-lg max-w-none">
                    {caseStudy.body && (caseStudy.body as unknown[]).length > 0 ? (
                        <PortableText value={caseStudy.body as never} components={portableTextComponents as never} />
                    ) : (
                        <div className="bg-gray-50 rounded-lg p-8 text-center">
                            <p className="text-gray-600">This case study content is being updated. Please check back soon.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}