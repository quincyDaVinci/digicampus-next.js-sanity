import {type DocumentActionComponent, type DocumentActionProps} from 'sanity'
import {TranslateFromDutchAction} from './translateFromDutchAction'

type ActionContext = {
  schemaType: string
  published?: boolean
}

export function customDocumentActions(prev: DocumentActionComponent[], context: ActionContext) {
  const {schemaType, published} = context

  const supportedForTranslation = ['page', 'blogPost', 'site', 'siteSettings']
  const withTranslationAction = supportedForTranslation.includes(schemaType)
    ? [TranslateFromDutchAction, ...prev]
    : prev

  // For pages and posts: show "Publish" for new docs, "Update" for published docs
  if (schemaType === 'page' || schemaType === 'post' || schemaType === 'homePage') {
    return withTranslationAction.map((action) => {
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
  }

  // For all other document types: rename to "Save"
  return withTranslationAction.map((action) => {
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
