import {defineType, defineField} from 'sanity'

// Temporary legacy schema to surface the stray `siteSettings` document in Studio
// so it can be inspected or deleted safely. You can remove this file after cleanup.
export default defineType({
  name: 'siteSettings',
  title: 'Legacy Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
  ],
})
