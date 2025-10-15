import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface LinkField {
  href: string
  label: string
}

export interface HeroSectionData {
  heading?: string
  intro?: string
  cta?: LinkField
}

export interface VideoSectionData {
  title?: string
  description?: string
  videoUrl?: string
  videoTitle?: string
}

export interface TextImageSectionData {
  heading?: string
  body?: string
  image?: SanityImageSource & { alt?: string }
  imagePosition?: 'left' | 'right'
}

export interface CtaBannerData {
  heading?: string
  body?: string
  cta?: LinkField
  image?: SanityImageSource & { alt?: string }
}

export interface BlogSectionData {
  heading?: string
  description?: string
  maxPosts?: number
}

export interface ProjectCardData {
  title?: string
  description?: string
  link?: LinkField
  image?: SanityImageSource & { alt?: string }
}

export interface ProjectsSectionData {
  heading?: string
  description?: string
  projects?: ProjectCardData[]
}

export interface PartnerLogoData {
  name?: string
  logo?: SanityImageSource & { alt?: string }
}

export interface PartnersSectionData {
  heading?: string
  logos?: PartnerLogoData[]
}

export interface HomePageData {
  heroSection?: HeroSectionData
  videoSection?: VideoSectionData
  textWithImageSection?: TextImageSectionData
  ctaBanner?: CtaBannerData
  blogSection?: BlogSectionData
  projectsSection?: ProjectsSectionData
  partnersSection?: PartnersSectionData
}

export interface BlogPostCard {
  _id: string
  title: string
  slug: string
  publishedAt?: string
  summary?: string
  mainImage?: SanityImageSource & { alt?: string }
}