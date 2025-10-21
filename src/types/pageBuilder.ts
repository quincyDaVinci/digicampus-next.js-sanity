import type {PortableTextBlock} from 'sanity'

export interface LinkField {
  label: string
  href: string
}

export interface ImageComponent {
  _type: 'imageComponent'
  _key: string
  image?: {
    asset?: {
      _ref?: string
      url?: string
      metadata?: {
        lqip?: string
        dimensions?: {width: number; height: number}
      }
    }
    alt?: string
  }
  caption?: string
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
  poster?: {
    asset?: {
      url?: string
      metadata?: {
        lqip?: string
        dimensions?: {width: number; height: number}
      }
    }
    alt?: string
  }
  transcript?: string
}

export interface ButtonComponent {
  _type: 'buttonComponent'
  _key: string
  label: string
  link: LinkField
}

export type PageComponent =
  | ImageComponent
  | RichTextComponent
  | VideoComponent
  | ButtonComponent
  | (Record<string, unknown> & {_type: string; _key: string})

export interface PageDocument {
  _id: string
  title: string
  slug?: {current?: string}
  description?: string
  blocks: PageComponent[]
}
