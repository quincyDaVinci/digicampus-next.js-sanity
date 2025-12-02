declare module '@sanity/types' {
  // Augment Sanity image types used across the project to include
  // runtime-added helper properties like `blurDataURL` and nested metadata.
  interface SanityImageSource {
    blurDataURL?: string
    asset?: {
      _ref?: string
      url?: string
      metadata?: {
        lqip?: string
        dimensions?: {
          width?: number
          height?: number
        }
      }
    }
    alt?: string
    caption?: string
  }
}

// Also augment the global namespace for loose image shapes used in code
declare global {
  interface SanityImageObject {
    asset?: {
      _ref?: string
      url?: string
      metadata?: {
        lqip?: string
        dimensions?: { width?: number; height?: number }
      }
    }
    alt?: string
    caption?: string
    blurDataURL?: string
  }
}

export {}
