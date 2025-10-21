import {LaunchIcon} from '@sanity/icons'
import type {DocumentActionComponent, DocumentActionProps, DocumentActionsContext} from 'sanity'
import {usePresentationNavigate} from 'sanity/presentation'
import {previewOrigin, resolvePreviewPath} from './previewConfig'

type DocumentWithSlug = {
  slug?: {current?: string} | string | null
}

const PreviewAction: DocumentActionComponent = (props) => {
  const navigate = usePresentationNavigate()
  const {draft, published, schemaType, onComplete} = props
  const latest = (draft ?? published) as DocumentWithSlug | undefined
  const path = resolvePreviewPath({_type: schemaType, slug: latest?.slug})

  return {
    label: 'Open preview',
    icon: LaunchIcon,
    tone: 'primary',
    disabled: !path,
    onHandle: () => {
      if (path) {
        navigate?.({params: {preview: path}})
        window.open(`${previewOrigin}${path}`, '_blank', 'noopener')
      }
      onComplete?.()
    },
  }
}

export function customDocumentActions(
  prev: DocumentActionComponent[],
  context: DocumentActionsContext & {schemaType: string; published?: DocumentActionProps['published']},
) {
  const {schemaType, published} = context
  
  // For pages and posts: show "Publish" for new docs, "Update" for published docs
  if (schemaType === 'page' || schemaType === 'post' || schemaType === 'homePage') {
    const nextActions = prev
      .map((action) => {
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
      .concat(PreviewAction)
    return nextActions
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
