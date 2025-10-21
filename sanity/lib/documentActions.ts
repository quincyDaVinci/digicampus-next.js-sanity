import {type DocumentActionComponent} from 'sanity'

export function customDocumentActions(prev: DocumentActionComponent[], context: any) {
  const {schemaType, published} = context
  
  // For pages and posts: show "Publish" for new docs, "Update" for published docs
  if (schemaType === 'page' || schemaType === 'post' || schemaType === 'homePage') {
    return prev.map((action) => {
      // Rename the publish action based on document state
      if (action.action === 'publish') {
        return (props: any) => {
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
  return prev.map((action) => {
    if (action.action === 'publish') {
      return (props: any) => {
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
