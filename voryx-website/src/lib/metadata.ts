import { Metadata } from 'next'

interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  image?: string
  canonical?: string
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  canonical
}: PageMetadata): Metadata {
  const siteName = 'VORYX - Beyond Reach'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://voryx.com'
  
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`
  const imageUrl = image ? `${siteUrl}${image}` : `${siteUrl}/images/og-image.jpg`
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : undefined

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    canonical: canonicalUrl,
    openGraph: {
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export const defaultMetadata = generateMetadata({
  title: 'VORYX - Beyond Reach',
  description: 'Elite expeditions to the world\'s most remote destinations. VORYX creates transformative journeys that push the boundaries of exploration while contributing to scientific understanding.',
  keywords: [
    'luxury travel',
    'expeditions',
    'exploration',
    'adventure',
    'remote destinations',
    'scientific research',
    'extreme environments',
    'Antarctica',
    'Sahara',
    'cultural immersion'
  ]
})
