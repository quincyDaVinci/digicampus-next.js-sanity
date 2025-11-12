import {client} from '@sanity/lib/client'
import {groq} from 'next-sanity'
import HeaderClient from './HeaderClient'

type NavigationData = {
  menuItems?: Array<{
    label: string
    items: Array<{
      label: string
      href: string
    }>
  }>
}

const navigationQuery = groq`*[_type == "navigation"][0]{
  menuItems[]{
    label,
    items[]{
      label,
      href
    }
  }
}`

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

  if (hasSanityCredentials) {
    try {
      const navData = await client.fetch<NavigationData | null>(navigationQuery)
      if (navData?.menuItems && navData.menuItems.length > 0) {
        menus = navData.menuItems
      }
    } catch (error) {
      console.error('Could not fetch navigation data:', error)
    }
  }

  return <HeaderClient menus={menus} />
}

