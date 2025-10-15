import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const blogSectionType = defineType({
  name: 'blogSection',
  title: 'Blog sectie',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(120),
    }),
    defineField({
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(320),
    }),
    defineField({
      name: 'maxPosts',
      title: 'Aantal posts',
      type: 'number',
      initialValue: 3,
      validation: (rule) => rule.min(1).max(6),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'description',
    },
  },
})