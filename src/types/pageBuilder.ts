import type {PortableTextBlock} from 'sanity'

export interface LinkField {
  label: string
  href: string
}

export interface SanityImageAsset {
  _ref?: string
  url?: string
  metadata?: {
    lqip?: string
    dimensions?: {width: number; height: number}
  }
}

export interface ImageBlock {
  _type: 'imageBlock'
  _key: string
  image?: {
    asset?: SanityImageAsset
    alt?: string
    caption?: string
  }
}

export interface TextBlock {
  _type: 'textBlock'
  _key: string
  content: PortableTextBlock[]
}

export interface VideoBlock {
  _type: 'videoBlock'
  _key: string
  title?: string
  videoUrl: string
  caption?: string
}

export interface ButtonBlock {
  _type: 'buttonBlock'
  _key: string
  label: string
  link: LinkField
}

export type PageBlock = TextBlock | ImageBlock | VideoBlock | ButtonBlock

export interface PageDocument {
  _id: string
  title: string
  slug?: {current?: string}
  description?: string
  blocks?: PageBlock[]
}
