import {defineType, defineField} from 'sanity'

// Temporary legacy schema to surface the stray `siteSettings` document in Studio
// so it can be inspected or deleted safely. You can remove this file after cleanup.
export default defineType({
  name: 'siteSettings',
  title: 'Legacy Site Settings',
  type: 'document',
  groups: [
    {name: 'content', title: 'Basisgegevens', default: true},
    {name: 'translations', title: 'Vertalingen'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'translations',
      title: 'Vertalingen',
      type: 'array',
      of: [{type: 'siteSettingsTranslation'}],
      description: 'Kopie van de Nederlandse velden om een Engelse variant bij te houden.',
      group: 'translations',
    }),
  ],
})
