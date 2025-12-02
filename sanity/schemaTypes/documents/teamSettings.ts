import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'teamSettings',
  title: 'Team instellingen',
  type: 'document',
  fields: [
    defineField({
      name: 'categoriesOrder',
      title: 'Categories order',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'teamCategory'}]}],
      description: 'Drag to reorder categories. This defines the display order used by the Team section.',
      options: {
        sortable: true
      }
    }),
    defineField({
      name: 'defaultCategoryTitle',
      title: 'Default category title',
      type: 'string',
      description: 'Title to use for uncategorized members.',
      initialValue: 'Other'
    })
  ],
  preview: {
    select: { title: 'title' },
    prepare() { return {title: 'Team instellingen'} }
  }
})
