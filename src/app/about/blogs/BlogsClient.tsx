"use client";
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button3 from '@/components/ui/Button3';
import ReadMoreButton from '@/components/ui/ReadMoreButton';
import { Calendar, User } from 'lucide-react';
import { client } from '@/lib/sanity.client';
import { allPostsQuery, allCategoriesQuery } from '@/lib/sanity.queries';
import { urlForImage } from '@/lib/sanity.image';
import AdSpace from '@/components/ui/AdSpace';

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  mainImage?: any;
  publishedAt: string;
  author?: string;
  categories?: { title: string; slug: string }[];
}

interface Category {
  _id: string;
  title: string;
  slug: string;
}

async function getPosts(): Promise<Post[]> {
  try {
    return await client.fetch(allPostsQuery);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    return await client.fetch(allCategoriesQuery);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default function BlogsClient() {
  const [searchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getPosts().then((sanityPosts) => setPosts(sanityPosts));
    getCategories().then((cats) => setCategories(cats));
  }, []);

  const categoryButtons = ['All', ...categories.map((c) => c.title)];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || (post.categories || []).some((c) => c.title === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // recentPosts removed with sidebar simplification

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-[-50px]">
          <h1
            className="mb-2"
            style={{
              fontFamily: 'Clash Display, sans-serif',
              fontSize: 'clamp(40px, 7vw, 84px)',
              color: 'blue',
              lineHeight: 1.1,
            }}
          >
            Insights & <span style={{ color: '#000000' }}>Expertise</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Stay ahead with the latest trends, strategies, and insights in B2B marketing and lead generation.
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Blog Grid */}
          <div className="lg:col-span-3">
            {/* Category Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex flex-wrap gap-3">
                {categoryButtons.map((category) => (
                  <Button3 key={category} text={category} onClick={() => setSelectedCategory(category)} />
                ))}
              </div>
            </motion.div>

            {/* Blog Posts Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory + searchTerm}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {filteredPosts.map((post) => (
                  <motion.article
                    key={post._id}
                    variants={cardVariants}
                    whileHover="hover"
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Image */}
                    {post.mainImage ? (
                      <div className="aspect-video relative">
                        <Image
                          src={urlForImage(post.mainImage).width(400).height(225).url()}
                          alt={post.mainImage.alt || post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                        <div className="text-white text-center z-10">
                          <div className="text-sm font-medium opacity-90">Blog Post</div>
                          <div className="text-lg font-bold mt-1">{(post.categories?.[0]?.title) || 'Insights'}</div>
                        </div>
                      </div>
                    )}

                    <div className="p-6">

                      {/* Title */}
                      <h2
                        className="mb-3 hover:text-blue-600 transition-colors cursor-pointer"
                        style={{
                          fontFamily: 'Clash Display, sans-serif',
                          fontSize: 'clamp(18px, 2vw, 24px)',
                          color: '#000000',
                        }}
                      >
                        <Link href={`/about/blogs/${post.slug}`}>{post.title}</Link>
                      </h2>

                      {/* Excerpt */}
                      <p className="text-gray-600 mb-4 leading-relaxed text-sm">{post.excerpt}</p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User size={14} />
                            <span>{post.author || 'DemandTech'}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Read More + Categories row */}
                      <div className="flex items-center justify-between gap-4">
                        <Link href={`/about/blogs/${post.slug}`} className="inline-block">
                          <ReadMoreButton text="Read More" />
                        </Link>
                        {(post.categories && post.categories.length > 0) && (
                          <div className="flex flex-wrap gap-2">
                            {post.categories.map((c) => (
                              <button
                                key={c.slug}
                                onClick={() => setSelectedCategory(c.title)}
                                className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200"
                                aria-label={`Filter by ${c.title}`}
                              >
                                {c.title}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No blog posts found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Ad Slots replacing search/recent/subscribe */}
              <AdSpace videoSrc="/Adspac1.mp4" />
              <AdSpace imageSrc="/Adspace2.jpg" />
              <AdSpace imageSrc="/Adspace3.jpg" />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="mb-6"
            style={{
              fontFamily: 'Clash Display, sans-serif',
              fontSize: 'clamp(32px, 6vw, 56px)',
              color: '#000000',
            }}
          >
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-gray-700 mb-8 text-lg">
            Let's discuss how our proven strategies can accelerate your business growth.
          </p>
          <Button3 text="Get Started Today" href="/contact" />
        </div>
      </motion.div>
    </div>
  );
}
