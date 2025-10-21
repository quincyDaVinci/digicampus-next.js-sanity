import { GlobeIcon, ExternalLinkIcon } from './icons/FeatherIcons'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer 
      className="bg-dc-surface-95 border-t border-dc mt-auto"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">About DigiCampus</h2>
            <p className="text-sm text-dc-text-muted">
              Empowering education through digital innovation and accessible learning platforms.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/about" 
                  className="text-dc-text-muted hover:text-dc-brand transition-colors focus-visible:ring-2 ring-dc-focus rounded inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className="text-dc-text-muted hover:text-dc-brand transition-colors focus-visible:ring-2 ring-dc-focus rounded inline-block"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/accessibility" 
                  className="text-dc-text-muted hover:text-dc-brand transition-colors focus-visible:ring-2 ring-dc-focus rounded inline-block"
                >
                  Accessibility Statement
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-dc-text-muted hover:text-dc-brand transition-colors focus-visible:ring-2 ring-dc-focus rounded inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social & Legal */}
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
            <p className="text-xs text-dc-text-muted">
              © {new Date().getFullYear()} DigiCampus. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
