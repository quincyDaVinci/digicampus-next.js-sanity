import {
  type DocumentActionComponent,
  type DocumentActionComponentContext,
  type DocumentActionProps,
} from 'sanity'
import {createTranslateFromDutchAction} from './actions/translateFromDutch'
import {createApplyTranslationPreviewAction} from './actions/applyTranslationPreview'
import {isTranslationSupported} from './translation'

export function customDocumentActions(
  prev: DocumentActionComponent[],
  context: DocumentActionComponentContext
) {
  const {schemaType, published} = context

  const translateAction = createTranslateFromDutchAction(context)
  const applyPreviewAction = createApplyTranslationPreviewAction(context)

  const renamed = prev.map((action) => {
    if (action.action === 'publish') {
      return (props: DocumentActionProps) => {
        const originalResult = action(props)
        if (originalResult) {
          const isPageLike = schemaType === 'page' || schemaType === 'post' || schemaType === 'homePage'
          return {
            ...originalResult,
            label: isPageLike ? (published ? 'Update' : 'Publish') : 'Save',
          }
        }
        return originalResult
      }
    }
    return action
  })

  if (isTranslationSupported(schemaType)) {
    return [translateAction, applyPreviewAction, ...renamed]
  }

  return renamed
}
