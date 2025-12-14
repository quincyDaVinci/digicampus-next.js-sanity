import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'teamCategory',
  title: 'Team category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    // ordering is managed in `teamSettings.categoriesOrder` instead
  ],
  preview: {
    select: { title: 'title' },
  },
})
