import {client} from '@sanity/lib/client'
import {siteSettingsQuery} from '@sanity/lib/queries/site'
import HeaderClient from './HeaderClient'

type MenuItem = {
  label: string
  href: string
}

type SiteSettings = {
  title?: string
  logo?: {
    url: string
    metadata?: {
      dimensions?: {
        width: number
        height: number
      }
    }
  }
  logoAlt?: string
  header?: {
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

export default async function Header() {
  const hasSanityCredentials = Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      process.env.NEXT_PUBLIC_SANITY_DATASET,
  )

  let menus = fallbackMenus
  let logo: { url: string; alt: string; width?: number; height?: number } | null = null
  let ctas: Array<{ label: string; href: string }> = []

  if (hasSanityCredentials) {
    try {
      const siteData = await client.fetch<SiteSettings | null>(siteSettingsQuery)
      
      // Process navigation items
      if (siteData?.header?.items && siteData.header.items.length > 0) {
        menus = siteData.header.items
          .filter(item => item._type === 'link.list' && item.items)
          .map(item => ({
            label: item.label || '',
            items: (item.items || []).filter(subItem => subItem.href && subItem.label)
          }))
          .filter(menu => menu.items.length > 0)
      }

      // Process logo
      if (siteData?.logo?.url) {
        logo = {
          url: siteData.logo.url,
          alt: siteData.logoAlt || siteData.title || 'Site logo',
          width: siteData.logo.metadata?.dimensions?.width,
          height: siteData.logo.metadata?.dimensions?.height
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

