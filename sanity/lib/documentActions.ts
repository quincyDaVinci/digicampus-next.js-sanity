import {
  type DocumentActionComponent,
  type DocumentActionComponentContext,
  type DocumentActionProps,
  type DocumentAction,
} from 'sanity'
import {buildPreviewUrl} from './previewLinks'

function createPreviewAction({
  schemaType,
  slug,
}: {
  schemaType: string
  slug?: string | null
}): DocumentActionComponent | null {
  if (schemaType !== 'page' && schemaType !== 'homePage') {
    return null
  }

  const previewSlug = schemaType === 'homePage' ? '' : slug
  const disabled = schemaType === 'page' && !previewSlug

  return () => ({
    label: 'Open preview',
    disabled,
    onHandle: () => {
      const url = buildPreviewUrl(previewSlug || '')
      window.open(url, '_blank', 'noopener,noreferrer')
    },
  })
}

export function customDocumentActions(
  prev: DocumentActionComponent[],
  context: DocumentActionComponentContext,
) {
  const {schemaType, published, draft} = context

  // For pages and posts: show "Publish" for new docs, "Update" for published docs
  if (schemaType === 'page' || schemaType === 'post' || schemaType === 'homePage') {
    const previewAction = createPreviewAction({
      schemaType,
      slug: draft?.slug?.current ?? published?.slug?.current,
    })

    const mapped = prev.map((action) => {
      // Rename the publish action based on document state
      if (action.action === 'publish') {
        return (props: DocumentActionProps) => {
          const originalResult = action(props) as DocumentAction | undefined
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

    return previewAction ? [...mapped, previewAction] : mapped
  }
  
  // For all other document types: rename to "Save"
  return prev.map((action) => {
    if (action.action === 'publish') {
      return (props: DocumentActionProps) => {
        const originalResult = action(props) as DocumentAction | undefined
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
