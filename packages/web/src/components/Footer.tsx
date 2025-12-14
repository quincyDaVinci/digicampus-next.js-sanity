import { GlobeIcon, ExternalLinkIcon } from './icons/FeatherIcons'
import Link from 'next/link'
import { client } from '@sanity/lib/client'
import { siteSettingsQuery } from '@sanity/lib/queries/site'
import { PortableText, type PortableTextBlock } from 'next-sanity'

type FooterLink = {
  label: string
  href: string
}

type FooterGroup = {
  label: string
  items: FooterLink[]
}

type SiteSettings = {
  footer?: {
    language?: string
    items?: Array<{
      _type: string
      label?: string
      href?: string
      items?: FooterLink[]
    }>
  }
  footerContent?: PortableTextBlock[]
  copyright?: PortableTextBlock[]
}

const fallbackLinks = [
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Accessibility Statement", href: "/accessibility" },
  { label: "Contact", href: "/contact" },
]

export default async function Footer({ lang }: { lang: string }) {
  const hasSanityCredentials = Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
      process.env.NEXT_PUBLIC_SANITY_DATASET,
  )

  let footerGroups: FooterGroup[] = []
  let footerContent: PortableTextBlock[] | null = null
  let copyright: PortableTextBlock[] | null = null

  if (hasSanityCredentials) {
    try {
      const siteData = await client.fetch<SiteSettings | null>(siteSettingsQuery, { lang })
      
      // Process footer navigation
      if (siteData?.footer?.items && siteData.footer.items.length > 0 && (!siteData.footer.language || siteData.footer.language === lang)) {
        footerGroups = siteData.footer.items
          .map(item => {
            if (item._type === 'link.list' && item.items) {
              const validItems = item.items.filter(link => link.href && link.label)
              if (validItems.length > 0) {
                return {
                  label: item.label || '',
                  items: validItems
                }
              }
            } else if (item._type === 'link' && item.label && item.href) {
              return {
                label: 'Links',
                items: [{ label: item.label, href: item.href }]
              }
            }
            return null
          })
          .filter((group): group is FooterGroup => group !== null)
      }

      // Get footer content and copyright
      footerContent = siteData?.footerContent || null
      copyright = siteData?.copyright || null
    } catch (error) {
      console.error('Could not fetch footer settings:', error)
    }
  }

  return (
    <footer 
      className="bg-dc-surface-95 border-t border-dc mt-auto"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section / Footer Content */}
          <div>
            {footerContent && footerContent.length > 0 ? (
              <div className="prose prose-sm max-w-none">
                <PortableText value={footerContent} />
              </div>
            ) : (
              <>
                <h2 className="text-lg font-semibold mb-4">About DigiCampus</h2>
                <p className="text-sm text-dc-text-muted">
                  Empowering education through digital innovation and accessible learning platforms.
                </p>
              </>
            )}
          </div>

          {/* Footer Navigation */}
          {footerGroups.length > 0 ? (
            footerGroups.slice(0, 2).map((group, idx) => (
              <nav key={idx} aria-label={`${group.label} navigation`}>
                <h2 className="text-lg font-semibold mb-4">{group.label}</h2>
                <ul className="space-y-2 text-sm">
                  {group.items.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={`/${lang}${link.href}`}
                        className="text-dc-text-muted hover:text-dc-brand transition-colors focus-visible:ring-2 ring-dc-focus rounded inline-block"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))
          ) : (
            <>
              {/* Quick Links Fallback */}
              <nav aria-label="Footer navigation">
                <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                <ul className="space-y-2 text-sm">
                  {fallbackLinks.map((link, idx) => (
                    <li key={idx}>
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

              {/* Social & Legal Fallback */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Connect</h2>
                <div className="flex gap-4 mb-4">
                  <a
                    href="https://twitter.com/digicampus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-dc-surface-90 rounded transition-colors focus-visible:ring-2 ring-dc-focus"
                    aria-label="Follow us on Twitter (opens in new window)"
                  >
                    <ExternalLinkIcon className="w-5 h-5" aria-hidden="true" />
                  </a>
                  <a
                    href="https://linkedin.com/company/digicampus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-dc-surface-90 rounded transition-colors focus-visible:ring-2 ring-dc-focus"
                    aria-label="Connect on LinkedIn (opens in new window)"
                  >
                    <GlobeIcon className="w-5 h-5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-4 border-t border-dc">
          {copyright && copyright.length > 0 ? (
            <div className="text-xs text-dc-text-muted prose prose-sm max-w-none">
              <PortableText value={copyright} />
            </div>
          ) : (
            <p className="text-xs text-dc-text-muted">
              © {new Date().getFullYear()} DigiCampus. All rights reserved.
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}

