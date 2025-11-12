import { forwardRef } from 'react'
import type { SVGProps } from 'react'

/**
 * Props shared by all Feather icons in this file.
 *
 * Accessibility contract:
 * - Provide a `title` when the icon conveys meaning (it will render <title> and set role="img").
 * - Omit `title` for purely decorative icons; the component will set `aria-hidden="true"` and role="presentation".
 * - You can explicitly control hiding with `ariaHidden` if needed.
 */
type FeatherIconProps = Omit<SVGProps<SVGSVGElement>, 'ref'> & {
  /** Optional accessible title; when present, role becomes `img` and `aria-hidden` is unset. */
  title?: string
  /** Override for computed aria-hidden. When omitted, it is derived from `title`. */
  ariaHidden?: boolean
}
export type FeatherIconComponent = ReturnType<typeof createIcon>

const baseStrokeProps: Pick<SVGProps<SVGSVGElement>, 'fill' | 'stroke' | 'strokeWidth' | 'strokeLinecap' | 'strokeLinejoin'> = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function createIcon(children: React.ReactNode) {
  return forwardRef<SVGSVGElement, FeatherIconProps>(function FeatherIcon({ title, role, ariaHidden, ...props }, ref) {
    const computedRole = role ?? (title ? 'img' : 'presentation')
    const computedAriaHidden = ariaHidden ?? (title ? undefined : true)

    if (process.env.NODE_ENV !== 'production') {
      // Warn if conflicting props that harm accessibility
      if (title && computedAriaHidden) {
        // eslint-disable-next-line no-console
        console.warn('[FeatherIcon] Received `title` along with `ariaHidden=true`. This hides the icon from assistive tech despite having a title. Prefer omitting `ariaHidden` or removing `title`.')
      }
      if (!title && computedRole === 'img') {
        // eslint-disable-next-line no-console
        console.warn('[FeatherIcon] Role set to `img` without a `title`. Provide a `title` or omit role to allow the component to set `presentation` + `aria-hidden`.')
      }
    }

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        aria-hidden={computedAriaHidden}
        role={computedRole}
        focusable="false"
        {...baseStrokeProps}
        {...props}
      >
        {title ? <title>{title}</title> : null}
        {children}
      </svg>
    )
  })
}

// Light theme icon (sun with circle)
export const LightIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
  </>
)

// Dark theme icon (half-filled circle representing dark/light split)
export const DarkIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v18" />
    <path d="M12 3a9 9 0 0 1 0 18" fill="currentColor" />
  </>
)

// Keep original exports for backward compatibility
export const SunIcon = LightIcon
export const MoonIcon = DarkIcon

export const SearchIcon = createIcon(
  <>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </>
)

export const MenuIcon = createIcon(
  <>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </>
)

export const CloseIcon = createIcon(
  <>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </>
)

export const ChevronDownIcon = createIcon(
  <polyline points="6 9 12 15 18 9" />
)

export const ArrowRightIcon = createIcon(
  <>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </>
)

export const UsersIcon = createIcon(
  <>
    <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M7 21v-2a4 4 0 0 1 3-3.87" />
    <circle cx="12" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-2-3.4" />
    <path d="M2 21v-2a4 4 0 0 1 2-3.4" />
  </>
)

export const FileTextIcon = createIcon(
  <>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </>
)

export const HomeIcon = createIcon(
  <>
    <path d="M3 9L12 2l9 7" />
    <path d="M5 10v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" />
    <path d="M9 22V12h6v10" />
  </>
)

export const TagIcon = createIcon(
  <>
    <path d="M20.59 13.41 11 3H3v8l9.59 9.59a2 2 0 0 0 2.82 0l5.18-5.18a2 2 0 0 0 0-2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </>
)

export const VideoIcon = createIcon(
  <>
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </>
)

export const ImageIcon = createIcon(
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </>
)

export const UserIcon = createIcon(
  <>
    <circle cx="12" cy="7" r="4" />
    <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
  </>
)

export const LayersIcon = createIcon(
  <>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 12 12 17 22 12" />
    <polyline points="2 17 12 22 22 17" />
  </>
)

export const ZapIcon = createIcon(
  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
)

export const FlagIcon = createIcon(
  <>
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </>
)

export const ShieldIcon = createIcon(
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
)

export const BookOpenIcon = createIcon(
  <>
    <path d="M2 3h6a4 4 0 0 1 4 4v14" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14" />
    <line x1="2" y1="9" x2="10" y2="9" />
    <line x1="22" y1="9" x2="14" y2="9" />
  </>
)

export const CalendarIcon = createIcon(
  <>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </>
)

export const PlayIcon = createIcon(
  <polygon points="5 3 19 12 5 21 5 3" />
)

export const GlobeIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 0 20" />
    <path d="M12 2a15.3 15.3 0 0 0 0 20" />
  </>
)

export const DownloadIcon = createIcon(
  <>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </>
)

export const ExternalLinkIcon = createIcon(
  <>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </>
)

export const SettingsIcon = createIcon(
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6M5.6 5.6l4.2 4.2m4.4 4.4l4.2 4.2M1 12h6m6 0h6M5.6 18.4l4.2-4.2m4.4-4.4l4.2-4.2" />
  </>
)

export const PackageIcon = createIcon(
  <>
    <path d="M16.5 9.4l-9-5.19" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </>
)

export type FeatherSymbol =
  | 'sun'
  | 'moon'
  | 'search'
  | 'menu'
  | 'close'
  | 'chevron-down'
  | 'arrow-right'
  | 'users'
  | 'file-text'
  | 'home'
  | 'tag'
  | 'video'
  | 'image'
  | 'user'
  | 'layers'
  | 'zap'
  | 'flag'
  | 'shield'
  | 'book-open'
  | 'calendar'
  | 'play'
  | 'globe'
  | 'download'
  | 'external'
  | 'settings'
  | 'package'

export const featherIconMap: Record<FeatherSymbol, FeatherIconComponent> = {
  sun: SunIcon,
  moon: MoonIcon,
  search: SearchIcon,
  menu: MenuIcon,
  close: CloseIcon,
  'chevron-down': ChevronDownIcon,
  'arrow-right': ArrowRightIcon,
  users: UsersIcon,
  'file-text': FileTextIcon,
  home: HomeIcon,
  tag: TagIcon,
  video: VideoIcon,
  image: ImageIcon,
  user: UserIcon,
  layers: LayersIcon,
  zap: ZapIcon,
  flag: FlagIcon,
  shield: ShieldIcon,
  'book-open': BookOpenIcon,
  calendar: CalendarIcon,
  play: PlayIcon,
  globe: GlobeIcon,
  download: DownloadIcon,
  external: ExternalLinkIcon,
  settings: SettingsIcon,
  package: PackageIcon,
}

export function getFeatherIcon(symbol?: FeatherSymbol) {
  return symbol ? featherIconMap[symbol] : undefined
}

