import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'
import { getInstance } from '@/instance'

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  const instance = getInstance()
  const defaultOpenGraph: Metadata['openGraph'] = {
    type: 'website',
    description: instance.tagline,
    images: [
      {
        url: `${getServerSideURL()}/website-template-OG.webp`,
      },
    ],
    siteName: instance.siteName,
    title: instance.siteName,
  }

  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
