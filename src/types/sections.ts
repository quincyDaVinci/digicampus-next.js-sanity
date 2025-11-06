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
  variant?: string
  heading?: string
  subheading?: string
  badgeText?: string
  buttons?: Array<{
    _key: string
    label?: string
    url?: string
    variant?: string
    icon?: string
  }>
  media?: {
    mediaType?: 'image' | 'video' | 'gallery'
    image?: import('@sanity/image-url/lib/types/types').SanityImageSource
    videoUrl?: string
    gallery?: import('@sanity/image-url/lib/types/types').SanityImageSource[]
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
  variant?: string
}

export interface StatsSectionProps extends BaseSection {
  _type: 'statsSection'
  heading?: string
  subheading?: string
  stats?: Array<{
    _key: string
    value?: string
    label?: string
  }>
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

export interface CasesSectionProps extends BaseSection {
  _type: 'casesSection'
  heading?: string
  subheading?: string
  cases?: Array<{
    _key: string
    name?: string
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
  }>
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

export interface CompareFeaturesSectionProps extends BaseSection {
  _type: 'compareFeaturesSection'
  heading?: string
  subheading?: string
  badgeText?: string
}

export interface MediaSectionProps extends BaseSection {
  _type: 'mediaSection'
  variant?: 'fullWidth' | 'contained' | 'splitScreen' | 'card'
  heading?: string
  description?: string
  mediaType?: 'image' | 'video'
  image?: {
    asset?: import('@sanity/image-url/lib/types/types').SanityImageSource
    alt?: string
    caption?: string
  }
  video?: {
    videoUrl?: string
    posterImage?: {
      asset?: import('@sanity/image-url/lib/types/types').SanityImageSource
      alt?: string
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

export type SectionProps =
  | HeroSectionProps
  | FeatureSectionProps
  | BlogSectionProps
  | StatsSectionProps
  | TestimonialsSectionProps
  | PricingSectionProps
  | CasesSectionProps
  | CTASectionProps
  | FAQSectionProps
  | ContactSectionProps
  | NewsletterSectionProps
  | CompareFeaturesSectionProps
  | MediaSectionProps
