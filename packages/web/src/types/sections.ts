/**
 * Section prop types for all modular sections
 * These match the Sanity schema definitions
 */

export interface BaseSection {
  _type: string
  _key: string
  [key: string]: unknown
}

export interface HeroSectionProps extends BaseSection {
  _type: 'heroSection'
  variant?: 'centered' | 'split' | 'minimal' | 'buttonBanner' | 'badgeBanner' | 'gridGallery' // old values for backward compat
  heading?: string
  subheading?: string
  badgeText?: string
  textColor?: 'auto' | 'light' | 'dark'
  buttons?: Array<{
    _key: string
    label?: string
    url?: string
    variant?: string
    icon?: string
    isPdf?: boolean
    accessibleVersionUrl?: string
    accessibilityNote?: string
  }>
  media?: {
    mediaType?: 'image' | 'video' | 'gallery'
    image?: import('@sanity/image-url').SanityImageSource & {
      overlay?: {
        enabled?: boolean
        direction?: 'up' | 'down' | 'left' | 'right'
        opacity?: number
      }
    }
    videoUrl?: string
    gallery?: import('@sanity/image-url').SanityImageSource[]
  }
}

export interface FeatureSectionProps extends BaseSection {
  _type: 'featureSection'
  variant?: string
  badgeText?: string
  heading?: string
  subheading?: string
  features?: Array<{
    _key: string
    title?: string
    description?: string
    icon?: string
  }>
  image?: unknown
}

export interface BlogSectionProps extends BaseSection {
  _type: 'blogSection'
  heading?: string
  subheading?: string
  variant?: 'default' | 'grid'
  tone?: 'surface' | 'accent' | 'contrast'
  limit?: number
  ctaLabel?: string
  viewAllLink?: {
    label?: string
    url?: string
  } | null
  category?: {
    _type?: string
    _ref?: string
  } | null
  // Added filters from studio
  sortBy?: 'newest' | 'oldest' | 'viewCount' | 'readTime'
  tags?: Array<{ _ref?: string }>
  author?: { _ref?: string } | null
  minReadTime?: number | null
  maxReadTime?: number | null
  // Context-aware toggles (set in studio)
  useContextTags?: boolean
  useContextAuthor?: boolean
}

export interface TestimonialsSectionProps extends BaseSection {
  _type: 'testimonialsSection'
  heading?: string
  subheading?: string
  testimonials?: Array<{
    _key: string
    quote?: string
    name?: string
    title?: string
  }>
}

export interface PricingSectionProps extends BaseSection {
  _type: 'pricingSection'
  heading?: string
  subheading?: string
  plans?: Array<{
    _key: string
    title?: string
    price?: string
    description?: string
  }>
}

export interface CTASectionProps extends BaseSection {
  _type: 'ctaSection'
  heading?: string
  subheading?: string
  badgeText?: string
  buttons?: Array<{
    _key: string
    label?: string
    url?: string
    variant?: string
    icon?: string
    isPdf?: boolean
    accessibleVersionUrl?: string
    accessibilityNote?: string
  }>
  bannerBackground?: boolean
  backgroundColor?: 'soft' | 'accent' | 'none'
  layout?: 'noImage' | 'imageLeft' | 'imageRight' | 'imageTop' | 'imageBottom'
  image?: import('@sanity/image-url').SanityImageSource & {
    alt?: string
    caption?: string
    objectFit?: 'cover' | 'contain'
    aspectRatio?: 'auto' | '16/9' | '4/3' | '1/1' | '3/2'
    displaySize?: number
  }
}

export interface FAQSectionProps extends BaseSection {
  _type: 'faqSection'
  heading?: string
  subheading?: string
  badgeText?: string
  faqItems?: Array<{
    _key: string
    question?: string
    answer?: string
  }>
}

export interface ContactSectionProps extends BaseSection {
  _type: 'contactSection'
  heading?: string
  description?: string
  badgeText?: string
}

export interface NewsletterSectionProps extends BaseSection {
  _type: 'newsletterSection'
  heading?: string
  subheading?: string
  badgeText?: string
  inputPlaceholder?: string
  buttonText?: string
}

export interface MediaSectionProps extends BaseSection {
  _type: 'mediaSection'
  variant?: 'fullWidth' | 'contained' | 'splitScreen' | 'card'
  heading?: string
  description?: string
  mediaType?: 'image' | 'video'
  image?: {
    asset?: import('@sanity/image-url').SanityImageSource
    alt?: string
    caption?: string
    overlay?: {
      enabled?: boolean
      direction?: 'up' | 'down' | 'left' | 'right'
      opacity?: number
    }
  }
  video?: {
    videoUrl?: string
    posterImage?: {
      asset?: import('@sanity/image-url').SanityImageSource
      alt?: string
      overlay?: {
        enabled?: boolean
        direction?: 'up' | 'down' | 'left' | 'right'
        opacity?: number
      }
    }
    videoTitle?: string
    transcript?: string
    captionsUrl?: string
    autoplay?: boolean
    loop?: boolean
    controls?: boolean
  }
  aspectRatio?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  rounded?: boolean
  shadow?: boolean
  ariaLabel?: string
  ariaDescribedBy?: string
}

export interface DocumentAssetProps extends BaseSection {
  _type: 'documentAsset'
  title?: string
  summary?: string
  documentFile?: {
    asset?: {
      _ref?: string
      url?: string
    }
  }
  htmlAlternativeFile?: {
    asset?: {
      _ref?: string
      url?: string
    }
  }
  htmlAlternativePortableText?: Array<{
    _key: string
    _type: string
    children?: Array<{ _key: string; _type: string; text?: string }>
  }>
  wcagStatus?: boolean
  language?: string
}

export interface TeamSectionProps extends BaseSection {
  _type: 'teamSection'
  heading?: string
  subheading?: string
  autoIncludeAll?: boolean
  // When autoIncludeAll is true, `allTeamMembers` will contain the resolved list of all teamMember docs
  allTeamMembers?: Array<{
    _id?: string
    _type?: string
    name?: string
    position?: string
    // category may be a referenced document after Studio change
    category?: { _id?: string; title?: string; slug?: { current?: string } } | string
    image?: { asset?: import('@sanity/image-url').SanityImageSource; alt?: string }
    includeInTeam?: boolean
    email?: string
    linkedin?: string
  }>
  teamSettings?: {
    categoriesOrder?: Array<{ _id?: string; title?: string; slug?: { current?: string } }>
    defaultCategoryTitle?: string
  }
  // When autoIncludeAll is false the section will not show any members (manual selection removed)
}

export interface SplitSectionProps extends BaseSection {
  _type: 'splitSection'
  layout?: 'imageLeft' | 'imageRight' | 'imageTop' | 'imageBottom'
  tagline?: string
  heading?: string
  body?: string
  infoList?: string[]
  cta?: {
    label?: string
    url?: string
    variant?: 'default' | 'outline'
  }
  image?: import('@sanity/image-url').SanityImageSource & {
    alt?: string
    caption?: string
    objectFit?: 'cover' | 'contain'
    aspectRatio?: 'auto' | '16/9' | '4/3' | '1/1' | '3/2'
    displaySize?: number
  }
}

export interface SectionHeaderProps extends BaseSection {
  _type: 'sectionHeader'
  tagline?: string
  title?: string
  body?: string
  alignment?: 'left' | 'center'
}

export interface LogoCloudSectionProps extends BaseSection {
  _type: 'logoCloudSection'
  title?: string
  logos?: Array<{
    _key: string
    image?: import('@sanity/image-url').SanityImageSource
    alt?: string
    url?: string
  }>
  grayscale?: boolean
}

export type SectionProps =
  | HeroSectionProps
  | FeatureSectionProps
  | BlogSectionProps
  | TestimonialsSectionProps
  | PricingSectionProps
  | CTASectionProps
  | FAQSectionProps
  | ContactSectionProps
  | NewsletterSectionProps
  | MediaSectionProps
  | DocumentAssetProps
  | TeamSectionProps
  | SplitSectionProps
  | SectionHeaderProps
  | LogoCloudSectionProps

