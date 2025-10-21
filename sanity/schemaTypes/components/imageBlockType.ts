import {ImageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const imageBlockType = defineType({
  name: 'imageBlock',
  title: 'Afbeelding',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternatieve tekst',
          type: 'string',
          description: 'Beschrijf de afbeelding kort en bondig.',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'caption',
          title: 'Onderschrift',
          type: 'string',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      media: 'image',
      title: 'image.alt',
      subtitle: 'image.caption',
    },
    prepare({media, title, subtitle}) {
      return {
        media,
        title: title || 'Afbeelding',
        subtitle: subtitle || 'Visueel blok',
      }
    },
  },
})
