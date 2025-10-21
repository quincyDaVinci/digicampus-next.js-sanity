import Link from 'next/link'
import type {ComponentType} from 'react'
import {client} from '@sanity/lib/client'
import {groq} from 'next-sanity'
import {ExternalLinkIcon, GlobeIcon} from './icons/FeatherIcons'

const footerQuery = groq`*[_type == "footerNavigation"][0]{
  intro{heading, text},
  linkGroups[]{
    title,
    links[]{label, href}
  },
  socialLinks[]{label, href, icon}
}`

type FooterLink = {label: string; href: string}
type FooterGroup = {title?: string; links?: FooterLink[]}
type FooterData = {
  intro?: {heading?: string; text?: string}
  linkGroups?: FooterGroup[]
  socialLinks?: Array<{label?: string; href?: string; icon?: string}>
}

type IconKey = 'globe' | 'external' | 'twitter' | 'linkedin' | 'mail'

type IconComponent = ComponentType<{className?: string; 'aria-hidden'?: boolean}>

const iconMap: Record<IconKey, IconComponent> = {
  globe: GlobeIcon,
  external: ExternalLinkIcon,
  twitter: ExternalLinkIcon,
  linkedin: ExternalLinkIcon,
  mail: ExternalLinkIcon,
}

const fallbackData: FooterData = {
  intro: {
    heading: 'About DigiCampus',
    text: 'Empowering education through digital innovation and accessible learning platforms.',
  },
  linkGroups: [
    {
      title: 'Quick Links',
      links: [
        {label: 'About Us', href: '/about'},
        {label: 'Privacy Policy', href: '/privacy'},
        {label: 'Accessibility Statement', href: '/accessibility'},
        {label: 'Contact', href: '/contact'},
      ],
    },
  ],
  socialLinks: [
    {label: 'Follow us on Twitter', href: 'https://twitter.com/digicampus', icon: 'external'},
    {label: 'Connect on LinkedIn', href: 'https://linkedin.com/company/digicampus', icon: 'globe'},
  ],
}

function resolveFooterData(data: FooterData | null): FooterData {
  if (!data) return fallbackData

  const groups = data.linkGroups?.length ? data.linkGroups : fallbackData.linkGroups
  const socials = data.socialLinks?.length ? data.socialLinks : fallbackData.socialLinks

  return {
    intro: data.intro ?? fallbackData.intro,
    linkGroups: groups,
    socialLinks: socials,
  }
}

export default async function Footer() {
  const hasSanityCredentials = Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET,
  )

  let footerData: FooterData = fallbackData

  if (hasSanityCredentials) {
    try {
      const data = await client.fetch<FooterData | null>(footerQuery)
      footerData = resolveFooterData(data)
    } catch (error) {
      console.error('Could not fetch footer navigation data:', error)
    }
  }

  const {intro, linkGroups, socialLinks} = footerData

  return (
    <footer className="bg-dc-surface-95 border-t border-dc mt-auto" role="contentinfo">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            {intro?.heading ? (
              <h2 className="text-lg font-semibold mb-4">{intro.heading}</h2>
            ) : null}
            {intro?.text ? <p className="text-sm text-dc-text-muted">{intro.text}</p> : null}
          </div>

          {linkGroups?.map((group, index) => (
            <nav key={group.title ?? `links-${index}`} aria-label={group.title ?? 'Footer links'}>
              {group.title ? <h2 className="text-lg font-semibold mb-4">{group.title}</h2> : null}
              <ul className="space-y-2 text-sm">
                {group.links?.map((link) => {
                  const isExternal = /^https?:/i.test(link.href)
                  const key = `${link.label}-${link.href}`
                  return (
                    <li key={key}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-dc-text-muted hover:text-dc-brand transition-colors focus-visible:ring-2 ring-dc-focus rounded inline-block"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-dc-text-muted hover:text-dc-brand transition-colors focus-visible:ring-2 ring-dc-focus rounded inline-block"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-lg font-semibold mb-4">Connect</h2>
            <div className="flex gap-4 mb-4">
              {socialLinks?.map((item, index) => {
                if (!item?.href) return null
                const key = (item.icon as IconKey) ?? 'external'
                const Icon = iconMap[key] ?? ExternalLinkIcon
                return (
                  <a
                    key={`${item.href}-${index}`}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-dc-surface-90 rounded transition-colors focus-visible:ring-2 ring-dc-focus"
                    aria-label={`${item.label ?? 'External link'} (opens in new window)`}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
            <p className="text-xs text-dc-text-muted">
              © {new Date().getFullYear()} DigiCampus. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
