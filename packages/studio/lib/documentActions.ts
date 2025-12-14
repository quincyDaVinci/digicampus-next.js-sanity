import {
  type DocumentActionComponent,
  type DocumentActionProps,
} from 'sanity'

export function customDocumentActions(
  prev: DocumentActionComponent[],
  context: any
) {
  const {schemaType, published} = context

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

  return renamed
}
