import {urlFor} from '@sanity/lib/image'

export type MenuItem = { label: string; href: string }
export type Menu = { label: string; items: MenuItem[] }
export type CTA = { label: string; href: string }

export type SiteSettings = {
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
  { label: 'Missies', items: [{ label: 'Overzicht', href: '/missies' }, { label: 'Publieke waarde', href: '/missies/waarde' }] },
  { label: 'Wat we doen', items: [{ label: 'Projecten', href: '/projecten' }, { label: 'Kennis', href: '/kennis' }] },
  { label: 'Hoe werken wij?', items: [{ label: 'Aanpak', href: '/aanpak' }, { label: 'Samenwerken', href: '/samenwerken' }] },
  { label: 'Wie we zijn', items: [{ label: 'Team', href: '/team' }, { label: 'Partners', href: '/partners' }] },
]

export const buildFallbackMenus = (lang: string): Menu[] =>
  fallbackMenus.map(menu => ({
    ...menu,
    items: menu.items.map(item => ({...item, href: `/${lang}${item.href}`})),
  }))

export const extractMenusFromSiteSettings = (siteData: SiteSettings | null, lang: string): Menu[] => {
  if (!siteData?.header?.items || siteData.header.items.length === 0) return []
  if (siteData.header.language && siteData.header.language !== lang) return []

  return siteData.header.items
    .filter(item => item._type === 'link.list' && item.items)
    .map(item => ({
      label: item.label || '',
      items: (item.items || []).filter(subItem => Boolean(subItem.href && subItem.label)) as MenuItem[],
    }))
    .filter(menu => menu.items.length > 0)
}

type LogoAsset = { asset?: { metadata?: { dimensions?: { width?: number; height?: number } }; url?: string } }

export const extractLogoFromSiteSettings = (
  siteData: SiteSettings | null,
): { url: string; alt: string; width?: number; height?: number } | null => {
  if (!siteData?.logo) return null

  try {
    const targetWidth = 800
    const assetDims = (siteData.logo as unknown as LogoAsset)?.asset?.metadata?.dimensions
    const targetHeight = assetDims?.width && assetDims?.height ? Math.round((assetDims.height / assetDims.width) * targetWidth) : undefined
    const builder = urlFor(siteData.logo).width(targetWidth)
    const imgUrl = targetHeight ? builder.height(targetHeight).fit('crop').auto('format').url() : builder.auto('format').url()
    return {
      url: imgUrl,
      alt: siteData.logoAlt || siteData.title || 'Site logo',
      width: assetDims?.width,
      height: assetDims?.height,
    }
  } catch (err) {
    console.warn('Logo image builder failed', err)
    if ((siteData.logo as unknown as LogoAsset)?.asset?.url) {
      return {
        url: (siteData.logo as unknown as LogoAsset).asset!.url || '',
        alt: siteData.logoAlt || siteData.title || 'Site logo',
      }
    }
    return null
  }
}

export const extractCtasFromSiteSettings = (siteData: SiteSettings | null): CTA[] =>
  siteData?.ctas?.filter(cta => Boolean(cta.href && cta.label)) || []


