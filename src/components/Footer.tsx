import Link from 'next/link'
import {client} from '@sanity/lib/client'
import {groq} from 'next-sanity'
import {ExternalLinkIcon, GlobeIcon, FeatherIconComponent} from './icons/FeatherIcons'

const footerNavigationQuery = groq`*[_type == "footerNavigation"][0]{
  intro,
  menuColumns[]{
    title,
    links[]{
      label,
      href
    }
  },
  socialLinks[]{
    label,
    href,
    icon,
    opensInNewTab
  },
  legalText
}`

type FooterLink = {
  label?: string | null
  href?: string | null
}

type FooterMenuColumn = {
  title?: string | null
  links?: FooterLink[] | null
}

type FooterSocialLink = {
  label?: string | null
  href?: string | null
  icon?: string | null
  opensInNewTab?: boolean | null
}

type FooterNavigationData = {
  intro?: {
    heading?: string | null
    description?: string | null
  } | null
  menuColumns?: FooterMenuColumn[] | null
  socialLinks?: FooterSocialLink[] | null
  legalText?: string | null
}

const fallbackFooter: FooterNavigationData = {
  intro: {
    heading: 'About DigiCampus',
    description:
      'Empowering education through digital innovation and accessible learning platforms.',
  },
  menuColumns: [
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
    {
      label: 'Twitter',
      href: 'https://twitter.com/digicampus',
      icon: 'external',
      opensInNewTab: true,
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/company/digicampus',
      icon: 'globe',
      opensInNewTab: true,
    },
  ],
  legalText: '© {year} DigiCampus. All rights reserved.',
}

function resolveLegalText(text?: string | null) {
  const template = text || fallbackFooter.legalText || ''
  return template.replace('{year}', String(new Date().getFullYear()))
}

function isExternalHref(href?: string | null) {
  if (!href) return false
  return /^(https?:)?\/\//i.test(href) || href.startsWith('mailto:')
}

function getSocialIcon(icon?: string | null): FeatherIconComponent {
  switch (icon) {
    case 'globe':
      return GlobeIcon
    case 'external':
      return ExternalLinkIcon
    default:
      return ExternalLinkIcon
  }
}

async function fetchFooterNavigation(): Promise<FooterNavigationData | null> {
  const hasSanityCredentials = Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET,
  )

  if (!hasSanityCredentials) {
    return null
  }

  try {
    return await client.fetch<FooterNavigationData | null>(footerNavigationQuery)
  } catch (error) {
    console.error('Could not fetch footer navigation data:', error)
    return null
  }
}

export default async function Footer() {
  const data = await fetchFooterNavigation()

  const intro = data?.intro ?? fallbackFooter.intro
  const menuColumns = data?.menuColumns?.length
    ? data.menuColumns
    : fallbackFooter.menuColumns ?? []
  const socialLinks = data?.socialLinks?.length
    ? data.socialLinks
    : fallbackFooter.socialLinks ?? []
  const legalText = resolveLegalText(data?.legalText)

  return (
    <footer className="bg-dc-surface-95 border-t border-dc mt-auto" role="contentinfo">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h2 className="mb-4 text-lg font-semibold">{intro?.heading ?? 'Footer'}</h2>
            <p className="text-sm text-dc-text-muted">
              {intro?.description ?? 'Beheer deze tekst vanuit de Sanity Studio.'}
            </p>
          </div>

          <nav aria-label="Footer navigation" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {menuColumns.map((column, index) => (
              <div key={column?.title ?? `column-${index}`}>
                <h2 className="mb-4 text-lg font-semibold">{column?.title ?? `Links ${index + 1}`}</h2>
                <ul className="space-y-2 text-sm">
                  {(column?.links ?? []).map((link) => {
                    if (!link?.label || !link?.href) return null
                    const external = isExternalHref(link.href)
                    const className =
                      'inline-block rounded text-dc-text-muted transition-colors hover:text-dc-brand focus-visible:ring-2 ring-dc-focus'

                    return (
                      <li key={`${link.label}-${link.href}`}>
                        {external ? (
                          <a
                            href={link.href}
                            className={className}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link href={link.href} className={className}>
                            {link.label}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <div>
            <h2 className="mb-4 text-lg font-semibold">Connect</h2>
            <div className="mb-4 flex gap-4">
              {socialLinks.map((item) => {
                if (!item?.href) return null
                const Icon = getSocialIcon(item.icon)
                const external = isExternalHref(item.href) || item.opensInNewTab
                return (
                  <a
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="rounded p-2 transition-colors hover:bg-dc-surface-90 focus-visible:ring-2 ring-dc-focus"
                    aria-label={`${item.label ?? 'Link'}${external ? ' (opens in new window)' : ''}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
            <p className="text-xs text-dc-text-muted">{legalText}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
