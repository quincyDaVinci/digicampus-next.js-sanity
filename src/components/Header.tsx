import {client} from '@sanity/lib/client'
import {siteSettingsQuery} from '@sanity/lib/queries/site'
import {urlFor} from '@sanity/lib/image'
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

const fallbackMenus = [
  { label: "Missies", items: [{ label: "Overzicht", href: "/missies" }, { label: "Publieke waarde", href: "/missies/waarde" }] },
  { label: "Wat we doen", items: [{ label: "Projecten", href: "/projecten" }, { label: "Kennis", href: "/kennis" }] },
  { label: "Hoe werken wij?", items: [{ label: "Aanpak", href: "/aanpak" }, { label: "Samenwerken", href: "/samenwerken" }] },
  { label: "Wie we zijn", items: [{ label: "Team", href: "/team" }, { label: "Partners", href: "/partners" }] },
]

export default async function Header({ lang }: { lang: string }) {
  const hasSanityCredentials = Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      process.env.NEXT_PUBLIC_SANITY_DATASET,
  )

  let menus = fallbackMenus.map(menu => ({
    ...menu,
    items: menu.items.map(item => ({ ...item, href: `/${lang}${item.href}` })),
  }))
  let logo: { url: string; alt: string; width?: number; height?: number } | null = null
  let ctas: Array<{ label: string; href: string }> = []

  if (hasSanityCredentials) {
    type LogoAsset = { asset?: { metadata?: { dimensions?: { width?: number; height?: number } }, url?: string } }
    try {
      const siteData = await client.fetch<SiteSettings | null>(siteSettingsQuery, { lang })
      
      // Process navigation items
      if (siteData?.header?.items && siteData.header.items.length > 0 && (!siteData.header.language || siteData.header.language === lang)) {
        menus = siteData.header.items
          .filter(item => item._type === 'link.list' && item.items)
          .map(item => ({
            label: item.label || '',
            items: (item.items || []).filter(subItem => subItem.href && subItem.label)
          }))
          .filter(menu => menu.items.length > 0)
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
            const asset = (siteData.logo as any)?.asset
            const assetId = asset?._ref || asset?._id || (typeof asset === 'string' ? asset : undefined)
            if (assetId && baseUrl) {
              const srcObj = buildSrc({ id: assetId, baseUrl, width: targetWidth, height: targetHeight, mode: targetHeight ? 'cover' : 'contain' })
              imgUrl = srcObj?.src ?? null
            }
          } catch (err) {
            imgUrl = null
          }

          if (!imgUrl) {
            const builder = urlFor(siteData.logo).width(targetWidth)
            imgUrl = targetHeight ? builder.height(targetHeight).fit('crop').auto('format').url() : builder.auto('format').url()
          }

          logo = {
            url: imgUrl,
            alt: siteData.logoAlt || siteData.title || 'Site logo',
            width: assetDims?.width,
            height: assetDims?.height,
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

