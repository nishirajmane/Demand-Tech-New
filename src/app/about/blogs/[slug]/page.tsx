import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/lib/sanity.client'
import { singlePostQuery } from '@/lib/sanity.queries'
import { urlForImage } from '@/lib/sanity.image'

interface Post {
    _id: string
    title: string
    slug: { current: string }
    excerpt: string
    mainImage?: any
    publishedAt: string
    body: any[]
    author?: string
}

async function getPost(slug: string): Promise<Post | null> {
    try {
        return await client.fetch(singlePostQuery, { slug })
    } catch (error) {
        console.error('Error fetching post:', error)
        return null
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        return {
            title: 'Post Not Found | DemandTech',
        }
    }

    return {
        title: `${post.title} | DemandTech Blog`,
        description: post.excerpt,
    }
}

const portableTextComponents = {
    types: {
        image: ({ value }: any) => (
            <div className="my-8">
                <Image
                    src={urlForImage(value).width(800).height(450).url()}
                    alt={value.alt || ''}
                    width={800}
                    height={450}
                    className="rounded-lg"
                />
            </div>
        ),
    },
    block: {
        h1: ({ children }: any) => <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>,
        h2: ({ children }: any) => <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">{children}</h3>,
        normal: ({ children }: any) => <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>,
        blockquote: ({ children }: any) => (
            <blockquote className="border-l-4 border-blue-500 pl-6 my-6 italic text-gray-600">
                {children}
            </blockquote>
        ),
    },
    marks: {
        link: ({ children, value }: any) => (
            <a href={value.href} className="text-blue-600 hover:text-blue-800 underline">
                {children}
            </a>
        ),
    },
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getPost(slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-transparent">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="mb-8">
                    <Link
                        href="/about/blogs"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
                    >
                        ← Back to Blog
                    </Link>

                    <div className="mb-6">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            {post.title}
                        </h1>
                        <p className="text-xl text-gray-600 mb-6">
                            {post.excerpt}
                        </p>

                        <div className="flex items-center text-gray-500">
                            <div>
                                <div className="font-medium text-gray-900">{post.author || 'DemandTech'}</div>
                                <time dateTime={post.publishedAt} className="text-sm">
                                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </time>
                            </div>
                        </div>
                    </div>

                    {post.mainImage && (
                        <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
                            <Image
                                src={urlForImage(post.mainImage).width(800).height(450).url()}
                                alt={post.mainImage.alt || post.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>

                <div className="prose prose-lg max-w-none">
                    {post.body && post.body.length > 0 ? (
                        <PortableText value={post.body} components={portableTextComponents} />
                    ) : (
                        <div className="bg-gray-50 rounded-lg p-8 text-center">
                            <p className="text-gray-600">This post content is being updated. Please check back soon.</p>
                        </div>
                    )}
                </div>

                {/* Removed author bio section as author schema is removed */}
            </div>
        </div>
    )
}