import { ImagesIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const textImageSectionType = defineType({
  name: 'textWithImageSection',
  title: 'Tekst met afbeelding',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(120),
    }),
    defineField({
      name: 'body',
      title: 'Tekst',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required().max(500),
    }),
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternatieve tekst',
          type: 'string',
          validation: (rule) => rule.required().max(160),
        }),
      ],
    }),
    defineField({
      name: 'imagePosition',
      title: 'Positie van de tekst',
      type: 'string',
      initialValue: 'right',
      options: {
        list: [
          { title: 'Links', value: 'left' },
          { title: 'Rechts', value: 'right' },
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'image',
    },
  },
})