import { client } from '@sanity/lib/client'
import { siteSettingsQuery, navigationByLangQuery, devSettingsQuery } from '@sanity/lib/queries/site'
import { buildSrc } from 'sanity-image'
import HeaderClient from './HeaderClient'

type MenuItem = {
  label: string
  href: string
}

type SiteSettings = {
  title?: string
  logo?: Record<string, unknown>
  logoAlt?: string
  header?: {
    language?: string
    items?: Array<{
      _type: string
      label?: string
      href?: string
      items?: MenuItem[]
    }>
  }
  ctas?: Array<{
    label: string
    href: string
  }>
}

export default async function Header({ lang }: { lang: string }) {
  const hasSanityCredentials = Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET,
  )

  // Initialize menus as empty - will be populated from Sanity Studio only
  let menus: { label: string; items: MenuItem[] }[] = []
  let logo: { url: string; alt: string; width?: number; height?: number } | null = null
  let ctas: Array<{ label: string; href: string }> = []

  if (hasSanityCredentials) {
    type LogoAsset = { asset?: { metadata?: { dimensions?: { width?: number; height?: number } }, url?: string } }
    try {
      // Fetch dev settings
      const devSettings = await client.fetch<{ showIncompleteNavItems?: boolean } | null>(devSettingsQuery)
      const showIncompleteNavItems = devSettings?.showIncompleteNavItems ?? false

      // Fetch site settings for logo and CTAs
      let siteData = await client.fetch<SiteSettings | null>(siteSettingsQuery, { lang })

      // Fetch navigation directly by language
      try {
        const navData = await client.fetch(navigationByLangQuery, { lang })
        if (navData?.items && navData.items.length > 0) {
          // Transform navigation items to menu format
          menus = navData.items.map((item: any) => {
            const links = item.links || []

            // Extract href from top-level menu item (from internalPage or externalUrl)
            const topLevelHref = item.href || null

            return {
              label: item.label || '',
              href: topLevelHref, // Top-level link
              items: links
                .filter((link: any) => {
                  // If showIncompleteNavItems is true, only require label
                  // Otherwise, require both label and href
                  if (showIncompleteNavItems) {
                    return link.label
                  }
                  return link.href && link.label
                })
                .map((link: any) => {
                  // Find translated label
                  const translation = link.translations?.find((t: any) => t.language === lang)
                  return {
                    label: translation?.label || link.label,
                    href: link.href || '#'  // Ensure href is always a string
                  }
                })
            }
          })
        }
      } catch (err) {
        console.warn('Could not fetch navigation:', err)
        // Keep fallback menus
      }

      // Process logo (preserve hotspot/crop by using the full image object)
      if (siteData?.logo) {
        try {
          const targetWidth = 800
          type LogoAsset = { asset?: { metadata?: { dimensions?: { width?: number; height?: number } }, url?: string } }
          const assetDims = (siteData.logo as unknown as LogoAsset)?.asset?.metadata?.dimensions
          const targetHeight = assetDims?.width && assetDims?.height ? Math.round((assetDims.height / assetDims.width) * targetWidth) : undefined

          // Prefer plugin-generated URL
          let imgUrl: string | null = null
          try {
            const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
            const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
            const baseUrl = projectId && dataset ? `https://cdn.sanity.io/images/${projectId}/${dataset}/` : undefined
            const logoObj = siteData.logo as unknown as { asset?: { _ref?: string; _id?: string } }
            const asset = logoObj?.asset
            const assetId = asset?._ref || asset?._id || undefined
            if (assetId && baseUrl) {
              const srcObj = buildSrc({ id: assetId, baseUrl, width: targetWidth, height: targetHeight, mode: targetHeight ? 'cover' : 'contain' })
              imgUrl = srcObj?.src ?? null
            }
          } catch (err) {
            imgUrl = null
          }

          if (!imgUrl) {
            // Plugin-only: do not fallback to legacy url builder; leave logo null
            imgUrl = null
          }

          if (imgUrl) {
            logo = {
              url: imgUrl,
              alt: siteData.logoAlt || siteData.title || 'Site logo',
              width: assetDims?.width,
              height: assetDims?.height,
            }
          }
        } catch (err) {
          // fallback if image builder fails
          console.warn('Logo image builder failed', err)
          const assetUrl = (siteData.logo as unknown as LogoAsset)?.asset?.url
          if (assetUrl) {
            logo = {
              url: assetUrl,
              alt: siteData.logoAlt || siteData.title || 'Site logo'
            }
          }
        }
      }

      // Process CTAs
      if (siteData?.ctas && siteData.ctas.length > 0) {
        ctas = siteData.ctas.filter(cta => cta.href && cta.label)
      }
    } catch (error) {
      console.error('Could not fetch site settings:', error)
    }
  }

  return <HeaderClient menus={menus} logo={logo} ctas={ctas} />
}

