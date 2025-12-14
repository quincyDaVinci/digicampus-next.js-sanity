import type {PortableTextBlock} from 'sanity'

export type DesignTokenValue =
  | 'surface'
  | 'bg-soft'
  | 'bg'
  | 'brand'
  | 'primary'
  | 'navy'
  | 'text'

export interface BackgroundComponent {
  _type: 'backgroundComponent'
  mode?: 'color' | 'gradient' | 'image' | 'texture'
  colorToken?: DesignTokenValue
  secondaryColorToken?: DesignTokenValue
  customColor?: string | null
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
    caption?: string
  }
  imageTint?: DesignTokenValue
  imageTintOpacity?: number | null
  texture?: 'none' | 'dots' | 'grid' | 'diagonal'
  overlay?: DesignTokenValue
  overlayOpacity?: number | null
  ariaLabel?: string
}

export interface LinkField {
  label: string
  href: string
}

export interface ImageComponent {
  _type: 'imageComponent'
  _key: string
  image?: BackgroundComponent['image']
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
  poster?: BackgroundComponent['image']
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
  isPdf?: boolean
  accessibleVersionUrl?: string
  accessibilityNote?: string
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
  body?: unknown
  estimatedReadTime?: number
  mainImage?: BackgroundComponent['image']
  author?: {
    name?: string
    role?: string
    company?: string
    image?: BackgroundComponent['image']
  }
  categories?: { title?: string; slug?: string }[]
}

export interface BlogCardComponent {
  _type: 'blogCardComponent'
  _key: string
  selectionMode?: 'manual' | 'automatic'
  automaticSort?: 'recent' | 'oldest' | 'popular' | 'author' | 'date'
  limit?: number
  ctaLabel?: string
  tone?: 'surface' | 'accent' | 'contrast'
  gridMode?: 'default' | 'single' | 'list' // 'default' = 3 columns, 'single' = 1 column, 'list' = stacked list layout
  showAuthor?: boolean // Whether to show author info
  borderRadius?: 'default' | 'small' // 'default' = rounded-3xl, 'small' = rounded-xl
  compact?: boolean // compact variant for smaller card sizing (e.g., sidebar highlights)
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
  horizontalAlignment?: 'flex-start' | 'center' | 'flex-end' | 'stretch'
  verticalAlignment?: 'flex-start' | 'center' | 'flex-end'
  componentSpacing?: 'tight' | 'normal' | 'relaxed'
  placement?: 'top' | 'bottom' | 'left' | 'right'
  components: PageComponent[]
}

export interface SectionLayout {
  contentWidth?: 'narrow' | 'default' | 'wide' | 'full'
  paddingY?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  paddingX?: 'none' | 'sm' | 'md' | 'lg'
  componentSpacing?: 'tight' | 'normal' | 'relaxed'
  horizontalAlignment?: 'left' | 'center' | 'right'
  verticalAlignment?: 'top' | 'center' | 'bottom'
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

