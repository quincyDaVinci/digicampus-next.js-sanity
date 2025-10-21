import {client} from '@sanity/lib/client'
import {groq} from 'next-sanity'
import Link from 'next/link'
import {ExternalLinkIcon} from './icons/FeatherIcons'

type FooterLink = {
  label: string
  href: string
}

type FooterGroup = {
  heading: string
  links: FooterLink[]
}

type FooterData = {
  aboutHeading?: string
  aboutBody?: string
  navigationGroups?: FooterGroup[]
  socialLinks?: FooterLink[]
  legalText?: string
}

const footerQuery = groq`*[_type == "footerNavigation"][0]{
  aboutHeading,
  aboutBody,
  navigationGroups[]{
    heading,
    links[]{label, href}
  },
  socialLinks[]{label, href},
  legalText
}`

const fallbackFooter: Required<FooterData> = {
  aboutHeading: 'About DigiCampus',
  aboutBody:
    'Empowering education through digital innovation and accessible learning platforms.',
  navigationGroups: [
    {
      heading: 'Quick Links',
      links: [
        {label: 'About Us', href: '/about'},
        {label: 'Privacy Policy', href: '/privacy'},
        {label: 'Accessibility Statement', href: '/accessibility'},
        {label: 'Contact', href: '/contact'},
      ],
    },
  ],
  socialLinks: [
    {label: 'Twitter', href: 'https://twitter.com/digicampus'},
    {label: 'LinkedIn', href: 'https://linkedin.com/company/digicampus'},
  ],
  legalText: '© {year} DigiCampus. All rights reserved.',
}

function resolveFooterData(data: FooterData | null): Required<FooterData> {
  if (!data) {
    return fallbackFooter
  }

  return {
    aboutHeading: data.aboutHeading || fallbackFooter.aboutHeading,
    aboutBody: data.aboutBody || fallbackFooter.aboutBody,
    navigationGroups:
      data.navigationGroups && data.navigationGroups.length > 0
        ? data.navigationGroups.map((group) => ({
            heading: group.heading || 'Links',
            links:
              group.links && group.links.length > 0
                ? group.links
                : fallbackFooter.navigationGroups[0].links,
          }))
        : fallbackFooter.navigationGroups,
    socialLinks:
      data.socialLinks && data.socialLinks.length > 0
        ? data.socialLinks
        : fallbackFooter.socialLinks,
    legalText: data.legalText || fallbackFooter.legalText,
  }
}

function formatLegalText(template: string) {
  const year = new Date().getFullYear().toString()
  return template.replace('{year}', year)
}

export default async function Footer() {
  const hasSanityCredentials = Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      process.env.NEXT_PUBLIC_SANITY_DATASET,
  )

  let resolved = fallbackFooter

  if (hasSanityCredentials) {
    try {
      const data = await client.fetch<FooterData | null>(footerQuery)
      resolved = resolveFooterData(data)
    } catch (error) {
      console.error('Could not fetch footer navigation data:', error)
    }
  }

  const legalText = formatLegalText(resolved.legalText)

  return (
    <footer className="bg-dc-surface-95 border-t border-dc mt-auto" role="contentinfo">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">{resolved.aboutHeading}</h2>
            <p className="text-sm text-dc-text-muted">{resolved.aboutBody}</p>
          </div>

          {resolved.navigationGroups.map((group) => (
            <nav aria-label={`${group.heading} links`} key={group.heading}>
              <h2 className="text-lg font-semibold mb-4">{group.heading}</h2>
              <ul className="space-y-2 text-sm">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-dc-text-muted hover:text-dc-brand transition-colors focus-visible:ring-2 ring-dc-focus rounded inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-lg font-semibold mb-4">Connect</h2>
            <div className="flex gap-4 mb-4">
              {resolved.socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-dc-surface-90 rounded transition-colors focus-visible:ring-2 ring-dc-focus"
                  aria-label={`${link.label} (opens in new window)`}
                >
                  <ExternalLinkIcon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
            <p className="text-xs text-dc-text-muted">{legalText}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
