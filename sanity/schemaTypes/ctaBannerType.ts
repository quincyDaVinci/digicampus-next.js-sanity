import { MdCampaign } from 'react-icons/md'
import { defineField, defineType } from 'sanity'

export const ctaBannerType = defineType({
  name: 'ctaBanner',
  title: 'CTA banner',
  type: 'object',
  icon: MdCampaign,
  fields: [
    defineField({
      name: 'heading',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(120),
    }),
    defineField({
      name: 'body',
      title: 'Beschrijving',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(320),
    }),
    defineField({
      name: 'cta',
      title: 'Call to action',
      type: 'linkField',
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
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'image',
    },
  },
})