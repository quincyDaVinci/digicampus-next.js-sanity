import {client} from '@sanity/lib/client'
import {siteSettingsQuery} from '@sanity/lib/queries/site'
import HeaderClient from './HeaderClient'
import {
  buildFallbackMenus,
  extractCtasFromSiteSettings,
  extractLogoFromSiteSettings,
  extractMenusFromSiteSettings,
  type CTA,
  type Menu,
  type SiteSettings,
} from './headerData'

export default async function Header({ lang }: { lang: string }) {
  const hasSanityCredentials = Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      process.env.NEXT_PUBLIC_SANITY_DATASET,
  )

  let menus: Menu[] = buildFallbackMenus(lang)
  let logo: { url: string; alt: string; width?: number; height?: number } | null = null
  let ctas: CTA[] = []

  if (hasSanityCredentials) {
    try {
      const siteData = await client.fetch<SiteSettings | null>(siteSettingsQuery, { lang })

      const sanityMenus = extractMenusFromSiteSettings(siteData, lang)
      if (sanityMenus.length > 0) menus = sanityMenus

      logo = extractLogoFromSiteSettings(siteData)

      ctas = extractCtasFromSiteSettings(siteData)
    } catch (error) {
      console.error('Could not fetch site settings:', error)
    }
  }

  return <HeaderClient menus={menus} logo={logo} ctas={ctas} />
}
