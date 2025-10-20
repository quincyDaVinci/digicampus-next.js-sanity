import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface LinkField {
  href: string
  label: string
  ariaLabel?: string
}

export interface HeroSectionData {
  heading?: string
  intro?: string
  cta?: LinkField
  stylePreset?: 'fresh' | 'structured' | 'contrast'
}

export interface VideoSectionData {
  title?: string
  description?: string
  videoUrl?: string
  videoTitle?: string
  stylePreset?: 'fresh' | 'structured' | 'contrast'
}

export interface TextImageSectionData {
  heading?: string
  body?: string
  image?: SanityImageSource & { alt?: string }
  imagePosition?: 'left' | 'right'
  stylePreset?: 'fresh' | 'structured' | 'contrast'
  cardTone?: 'surface' | 'accent' | 'contrast'
}

export interface CtaBannerData {
  heading?: string
  body?: string
  cta?: LinkField
  image?: SanityImageSource & { alt?: string }
  stylePreset?: 'fresh' | 'structured' | 'contrast'
}

export interface BlogSectionData {
  heading?: string
  description?: string
  maxPosts?: number
  stylePreset?: 'fresh' | 'structured' | 'contrast'
  cardTone?: 'surface' | 'accent' | 'contrast'
}

export interface ProjectCardData {
  title?: string
  description?: string
  link?: LinkField
  image?: SanityImageSource & { alt?: string }
  tone?: 'surface' | 'accent' | 'contrast'
}

export interface ProjectsSectionData {
  heading?: string
  description?: string
  projects?: ProjectCardData[]
  stylePreset?: 'fresh' | 'structured' | 'contrast'
}

export interface PartnerLogoData {
  name?: string
  logo?: SanityImageSource & { alt?: string }
}

export interface PartnersSectionData {
  heading?: string
  logos?: PartnerLogoData[]
  stylePreset?: 'fresh' | 'structured' | 'contrast'
}

export type HybridComponentVariant = 'feature' | 'callout'
export type HybridComponentTone = 'surface' | 'accent' | 'contrast'
export type HybridIconKey =
  | 'flag'
  | 'layers'
  | 'zap'
  | 'shield'
  | 'users'
  | 'book-open'

export interface HybridComponentData {
  _key: string
  _type: 'hybridComponent'
  variant?: HybridComponentVariant
  tone?: HybridComponentTone
  eyebrow?: string
  title?: string
  body?: string
  icon?: HybridIconKey
  cta?: LinkField
  stylePreset?: 'fresh' | 'structured' | 'contrast'
}

export interface HomePageData {
  heroSection?: HeroSectionData
  videoSection?: VideoSectionData
  textWithImageSection?: TextImageSectionData
  ctaBanner?: CtaBannerData
  blogSection?: BlogSectionData
  projectsSection?: ProjectsSectionData
  partnersSection?: PartnersSectionData
  hybridComponents?: HybridComponentData[]
}

export interface BlogPostCard {
  _id: string
  title: string
  slug: string
  publishedAt?: string
  summary?: string
  mainImage?: SanityImageSource & { alt?: string }
}