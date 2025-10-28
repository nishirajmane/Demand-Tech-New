import { groq } from 'next-sanity'

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    'slug': slug.current,
    excerpt,
    mainImage,
    publishedAt,
    author,
    categories[]->{
      title,
      'slug': slug.current
    }
  }
`

export const singlePostQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    'slug': slug.current,
    excerpt,
    mainImage,
    publishedAt,
    body,
    author,
    categories[]->{
      title,
      'slug': slug.current
    }
  }
`

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    'slug': slug.current
  }
`

export const allCaseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    title,
    'slug': slug.current,
    thumbnail,
    publishedAt,
    file{
      asset->{
        url,
        originalFilename
      }
    }
  }
`

export const allLearningResourcesQuery = groq`
  *[_type == "learningResource"] | order(publishedAt desc) {
    _id,
    title,
    'slug': slug.current,
    thumbnail,
    publishedAt,
    file{
      asset->{
        url,
        originalFilename
      }
    }
  }
`