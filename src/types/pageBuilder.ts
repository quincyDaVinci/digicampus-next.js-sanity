import type {PortableTextBlock} from 'sanity'

export type DesignTokenValue =
  | 'surface'
  | 'bg-soft'
  | 'bg'
  | 'brand'
  | 'primary'
  | 'navy'
  | 'text'

export type BackgroundTone = 'surface' | 'soft' | 'brand' | 'contrast'
export type BackgroundTexture = 'none' | 'dots' | 'grid'

export interface SanityImageValue {
  asset?: {
    _ref?: string
    url?: string
    metadata?: {
      lqip?: string
      dimensions?: {width: number; height: number}
    }
  }
  alt?: string
  caption?: string
}

export interface BackgroundComponent {
  _type: 'backgroundComponent'
  tone?: BackgroundTone
  texture?: BackgroundTexture
  showDivider?: boolean
  ariaLabel?: string
}

export interface LinkField {
  label: string
  href: string
}

export interface ImageComponent {
  _type: 'imageComponent'
  _key: string
  image?: SanityImageValue
  displayWidth?: 'narrow' | 'default' | 'wide' | 'full'
  alignment?: 'left' | 'center' | 'right'
  rounded?: boolean
  link?: LinkField | null
  background?: BackgroundComponent | null
  allowZoom?: boolean
}

export interface RichTextComponent {
  _type: 'richTextComponent'
  _key: string
  content: PortableTextBlock[]
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  maxWidth?: 'narrow' | 'default' | 'wide'
  ariaLabel?: string
}

export interface VideoComponent {
  _type: 'videoComponent'
  _key: string
  sourceType?: 'external' | 'file'
  videoUrl?: string
  videoFile?: {
    asset?: {
      url?: string
    }
  }
  poster?: SanityImageValue
  title: string
  transcript?: string
  captionsFile?: {
    asset?: {
      url?: string
    }
  }
  showControls?: boolean
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
}

export interface ButtonComponent {
  _type: 'buttonComponent'
  _key: string
  label: string
  ariaLabel?: string
  link: LinkField
  variant?: 'cta' | 'filled' | 'outline' | 'ghost' | 'custom'
  customColorToken?: DesignTokenValue
  customTextColorToken?: DesignTokenValue
  icon?: 'none' | 'arrow-right' | 'download' | 'external' | 'video'
  iconPosition?: 'leading' | 'trailing'
  fullWidth?: boolean
}

export interface BlogCardResolvedPost {
  _id: string
  title: string
  slug?: string
  publishedAt?: string
  summary?: string
  mainImage?: SanityImageValue
  author?: {
    name?: string
  }
}

export interface BlogCardComponent {
  _type: 'blogCardComponent'
  _key: string
  selectionMode?: 'manual' | 'automatic'
  automaticSort?: 'recent' | 'oldest' | 'popular' | 'author' | 'date'
  limit?: number
  ctaLabel?: string
  tone?: 'surface' | 'accent' | 'contrast'
  resolvedPost?: BlogCardResolvedPost | BlogCardResolvedPost[] | null
}

export interface CarouselComponent {
  _type: 'carouselComponent'
  _key: string
  ariaLabel: string
  autoPlay?: boolean
  interval?: number
  showIndicators?: boolean
  spacing?: 'tight' | 'normal' | 'loose'
  items: PageComponent[]
}

export type PageComponent =
  | ImageComponent
  | RichTextComponent
  | VideoComponent
  | ButtonComponent
  | BlogCardComponent
  | CarouselComponent
  | (Record<string, unknown> & {_type: string; _key: string})

export interface PageColumn {
  _key: string
  width: '1/1' | '1/2' | '1/3' | '2/3'
  align?: 'start' | 'center' | 'end'
  spacing?: 'tight' | 'normal' | 'relaxed'
  components: PageComponent[]
}

export interface SectionLayout {
  contentWidth?: 'narrow' | 'default' | 'wide' | 'full'
  verticalSpacing?: 'cozy' | 'roomy' | 'airy'
  alignment?: 'left' | 'center'
}

export interface PageSection {
  _key: string
  title?: string
  layout?: SectionLayout
  background?: BackgroundComponent | null
  columns: PageColumn[]
}

export interface PageDocument {
  _id: string
  title: string
  slug?: {current?: string}
  description?: string
  sections: PageSection[]
}
