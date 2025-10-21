import type {PortableTextBlock} from 'sanity'

export interface ImageMetadata {
  dimensions?: {width: number; height: number}
  lqip?: string
}

export interface ImageAsset {
  _ref?: string
  url?: string
  metadata?: ImageMetadata
}

export interface ImageField {
  asset?: ImageAsset
  alt?: string
  caption?: string
}

export interface ImageComponent {
  _type: 'imageComponent'
  _key: string
  image?: ImageField
}

export interface RichTextComponent {
  _type: 'richTextComponent'
  _key: string
  content: PortableTextBlock[]
}

export interface VideoComponent {
  _type: 'videoComponent'
  _key: string
  title: string
  videoUrl: string
  transcript?: string
}

export interface ButtonComponent {
  _type: 'buttonComponent'
  _key: string
  label: string
  href: string
  openInNewTab?: boolean
}

export type PageComponent = ImageComponent | RichTextComponent | VideoComponent | ButtonComponent

export interface PageDocument {
  _id: string
  title: string
  slug?: {current?: string}
  description?: string
  blocks: PageComponent[]
}
