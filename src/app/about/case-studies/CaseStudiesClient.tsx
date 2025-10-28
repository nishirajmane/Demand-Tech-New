"use client";
import Image from 'next/image'
import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button4 from '@/components/ui/Button4'
import EmailValidationPopup from '@/components/ui/EmailValidationPopup'
import { Calendar } from 'lucide-react'
import AdSpace from '@/components/ui/AdSpace'
import { client } from '@/lib/sanity.client'
import { allCaseStudiesQuery } from '@/lib/sanity.queries'
import { urlForImage } from '@/lib/sanity.image'
import { generateCaseStudyStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo'
import Head from 'next/head'

interface FileAsset {
  asset?: {
    url?: string
    originalFilename?: string
  }
}

interface CaseStudyDoc {
  _id: string
  title: string
  slug?: string
  thumbnail?: any
  publishedAt?: string
  file?: FileAsset
}

async function getItems(): Promise<CaseStudyDoc[]> {
  try {
    return await client.fetch(allCaseStudiesQuery)
  } catch (e) {
    console.error('Error fetching case studies:', e)
    return []
  }
}

export default function CaseStudiesClient() {
  const [items, setItems] = useState<CaseStudyDoc[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [showEmailPopup, setShowEmailPopup] = useState(false)
  const [selectedFile, setSelectedFile] = useState<{ url: string; name: string } | null>(null)

  useEffect(() => {
    setIsLoaded(true)
    getItems().then(setItems)
  }, [])

  const filtered = useMemo(() => {
    const q = searchTerm.toLowerCase()
    return items.filter(i => i.title.toLowerCase().includes(q))
  }, [items, searchTerm])

  const recent = items.slice(0, 4)

  const handleDownloadClick = (fileUrl: string, fileName: string) => {
    setSelectedFile({ url: fileUrl, name: fileName })
    setShowEmailPopup(true)
  }

  const handleValidEmail = async (email: string) => {
    if (selectedFile) {
      try {
        // Save email + fileName in Supabase
        await fetch("/api/download", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            fileName: selectedFile.name,
            resourceType: 'case_study'
          }),
        });

        // Download the file
        const a = document.createElement("a");
        a.href = selectedFile.url;
        a.download = selectedFile.name;
        a.target = "_blank";
        document.body.appendChild(a);
        a.click();
        a.remove();
      } catch (e) {
        console.error("Error logging email:", e);
        window.open(selectedFile.url, "_blank");
      }
    }
  }

  // Generate structured data
  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Home', url: 'https://demand-tech.com' },
    { name: 'About', url: 'https://demand-tech.com/about' },
    { name: 'Case Studies', url: 'https://demand-tech.com/about/case-studies' }
  ]);

  const caseStudyListStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'DemandTech Case Studies',
    description: 'Real-world B2B marketing case studies and success stories',
    url: 'https://demand-tech.com/about/case-studies',
    publisher: {
      '@type': 'Organization',
      name: 'DemandTech',
      logo: {
        '@type': 'ImageObject',
        url: 'https://demand-tech.com/logo.png'
      }
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.slice(0, 10).map((caseStudy, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          headline: caseStudy.title,
          url: caseStudy.slug ? `https://demand-tech.com/about/case-studies/${caseStudy.slug}` : 'https://demand-tech.com/about/case-studies',
          datePublished: caseStudy.publishedAt,
          author: {
            '@type': 'Organization',
            name: 'DemandTech'
          }
        }
      }))
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.1 } }
  }
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    hover: { y: -5, transition: { duration: 0.2 } },
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbStructuredData)
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(caseStudyListStructuredData)
          }}
        />
      </Head>
      <div className="min-h-screen bg-transparent">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-[-50px]">
          <h1
            className="mb-2"
            style={{ fontFamily: 'Clash Display, sans-serif', fontSize: 'clamp(40px, 7vw, 84px)', color: 'blue', lineHeight: 1.1 }}
          >
            Case <span style={{ color: '#000000' }}>Studies</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Browse and download our latest case studies.
          </p>
        </div>
      </motion.div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Content */}
          <div className="lg:col-span-3">
            {/* Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={searchTerm}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {filtered.map(doc => {
                  const imageUrl = doc.thumbnail ? urlForImage(doc.thumbnail).width(400).height(225).url() : undefined
                  const fileUrl = doc.file?.asset?.url
                  const fileName = doc.file?.asset?.originalFilename || `${doc.title}.pdf`
                  return (
                    <motion.article key={doc._id} variants={cardVariants} whileHover="hover" className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                      {/* Image */}
                      {imageUrl ? (
                        <div className="aspect-video relative">
                          <Image src={imageUrl} alt={doc.title} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                          <div className="absolute inset-0 bg-black/20" />
                          <div className="text-white text-center z-10">
                            <div className="text-sm font-medium opacity-90">Case Study</div>
                          </div>
                        </div>
                      )}

                      <div className="p-6 flex flex-col flex-1">
                        {/* Title */}
                        <h2
                          className="mb-3 line-clamp-3"
                          style={{ fontFamily: 'Clash Display, sans-serif', fontSize: 'clamp(18px, 2vw, 24px)', color: '#000000' }}
                        >
                          {doc.title}
                        </h2>

                        {/* Bottom section: meta + actions pinned to bottom */}
                        <div className="mt-auto">
                          {/* Meta */}
                          {doc.publishedAt && (
                            <div className="flex items-center text-sm text-gray-500 mb-4">
                              <Calendar size={14} className="mr-1" />
                              <span>{new Date(doc.publishedAt).toLocaleDateString()}</span>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex items-center gap-3">
                            {fileUrl ? (
                              <Button4
                                label="Download"
                                onClick={() => handleDownloadClick(fileUrl, fileName)}
                              />
                            ) : (
                              <span className="text-sm text-gray-500">No file uploaded</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  )
                })}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No case studies found.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              {/* Ad Slots replacing search/recent/subscribe */}
              {/* <AdSpace videoSrc="/about-video.mp4" />
              <AdSpace imageSrc="/about2.jpeg" /> */}
              <AdSpace imageSrc="/Adspace7.jpg" />
            </div>
          </div>
        </div>
      </div>

      {/* Email Validation Popup */}
      <EmailValidationPopup
        isOpen={showEmailPopup}
        onClose={() => {
          setShowEmailPopup(false)
          setSelectedFile(null)
        }}
        onValidEmail={handleValidEmail}
        fileName={selectedFile?.name || ''}
      />
      </div>
    </>
  )
}
