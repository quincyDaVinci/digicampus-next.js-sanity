import type {DocumentActionComponent, DocumentActionProps} from 'sanity'

type DocumentWithSlug = {
  slug?: {
    current?: string | null
  } | null
}

interface CustomDocumentContext {
  schemaType: string
  published?: DocumentWithSlug | null
}

const previewableTypes = new Set(['page', 'post', 'homePage'])
const previewBaseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

function resolvePreviewPath(doc: DocumentWithSlug | null | undefined, schemaType: string): string | null {
  if (!doc) return null
  const slug = doc.slug?.current
  switch (schemaType) {
    case 'homePage':
      return '/'
    case 'page':
      return slug ? `/${slug}` : null
    case 'post':
      return slug ? `/blog/${slug}` : null
    default:
      return null
  }
}

function PreviewIcon() {
  return (
    <span role="img" aria-label="Preview" style={{fontSize: '1.1em', lineHeight: 1}}>
      👀
    </span>
  )
}

export function customDocumentActions(prev: DocumentActionComponent[], context: CustomDocumentContext) {
  const {schemaType, published} = context
  const actions = [...prev]

  if (previewableTypes.has(schemaType)) {
    const previewAction: DocumentActionComponent = (props: DocumentActionProps) => {
      const doc = (props.draft as DocumentWithSlug | null) || (props.published as DocumentWithSlug | null)
      const path = resolvePreviewPath(doc, schemaType)
      return {
        label: 'Preview',
        icon: PreviewIcon,
        tone: 'primary',
        disabled: !path,
        onHandle: () => {
          if (!path) {
            props.onComplete?.()
            return
          }
          const url = new URL(path, previewBaseUrl).toString()
          if (typeof window !== 'undefined') {
            window.open(url, '_blank', 'noopener')
          }
          props.onComplete?.()
        },
      }
    }
    actions.unshift(previewAction)
  }

  if (schemaType === 'page' || schemaType === 'post' || schemaType === 'homePage') {
    return actions.map((action) => {
      if (action.action === 'publish') {
        return (props: DocumentActionProps) => {
          const originalResult = action(props)
          if (originalResult) {
            return {
              ...originalResult,
              label: published ? 'Update' : 'Publish',
            }
          }
          return originalResult
        }
      }
      return action
    })
  }

  return actions.map((action) => {
    if (action.action === 'publish') {
      return (props: DocumentActionProps) => {
        const originalResult = action(props)
        if (originalResult) {
          return {
            ...originalResult,
            label: 'Save',
          }
        }
        return originalResult
      }
    }
    return action
  })
}
