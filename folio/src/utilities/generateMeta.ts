import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'
import { getInstance } from '@/instance'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args
  const instance = getInstance()

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title || instance.siteName
  const description = doc?.meta?.description || instance.tagline
  const slug = doc?.slug
  const canonicalPath =
    !slug || slug === 'home' ? '/' : `/${Array.isArray(slug) ? slug.join('/') : slug}`

  return {
    alternates: {
      canonical: canonicalPath,
    },
    description,
    openGraph: mergeOpenGraph({
      description,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: canonicalPath,
    }),
    title,
    twitter: {
      card: 'summary_large_image',
      description,
      title,
      ...(instance.twitterCreator ? { creator: instance.twitterCreator } : {}),
    },
  }
}
