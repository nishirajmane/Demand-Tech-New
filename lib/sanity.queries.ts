import { groq } from 'next-sanity'

export const allPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    author,
    keywords,
    // categories referenced from category.ts
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
    slug,
    excerpt,
    mainImage,
    publishedAt,
    body,
    author,
    keywords,
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