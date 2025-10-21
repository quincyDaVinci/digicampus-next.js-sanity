import {EyeOpenIcon} from '@sanity/icons'
import type {
  DocumentActionComponent,
  DocumentActionDescription,
  DocumentActionProps,
  SanityDocument,
} from 'sanity'

const openPreviewAction: DocumentActionComponent = (props: DocumentActionProps) => {
  const doc = props.draft || props.published
  if (!doc) return null

  const docType = doc._type
  if (docType !== 'page' && docType !== 'homePage') {
    return null
  }

  const slug = docType === 'homePage' ? '/' : doc.slug?.current || doc.slug
  if (!slug) {
    return {
      disabled: true,
      icon: EyeOpenIcon,
      label: 'Open preview',
      title: 'Voeg eerst een slug toe om de preview te bekijken.',
      onHandle: props.onComplete,
    }
  }

  const href = slug.startsWith('/') ? slug : `/${slug}`

  const action: DocumentActionDescription = {
    icon: EyeOpenIcon,
    label: 'Open preview',
    onHandle: () => {
      const origin = typeof window !== 'undefined' ? window.location.origin : ''
      const previewUrl = `${origin}${href}`
      if (typeof window !== 'undefined') {
        window.open(previewUrl, '_blank', 'noopener,noreferrer')
      }
      props.onComplete?.()
    },
  }
  return action
}

type ActionContext = {
  schemaType: string
  published?: SanityDocument | null
}

export function customDocumentActions(prev: DocumentActionComponent[], context: ActionContext) {
  const {schemaType, published} = context

  // For pages and posts: show "Publish" for new docs, "Update" for published docs
  if (schemaType === 'page' || schemaType === 'post' || schemaType === 'homePage') {
    const renamed = prev.map((action) => {
      // Rename the publish action based on document state
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

    return [openPreviewAction, ...renamed]
  }

  // For all other document types: rename to "Save"
  return prev.map((action) => {
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
