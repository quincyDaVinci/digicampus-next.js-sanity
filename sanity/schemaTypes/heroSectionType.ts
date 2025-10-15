import { MdCampaign } from 'react-icons/md'
import { defineField, defineType } from 'sanity'

export const heroSectionType = defineType({
  name: 'heroSection',
  title: 'Hero sectie',
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
      name: 'intro',
      title: 'Introductietekst',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: 'cta',
      title: 'Call to action',
      type: 'linkField',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'intro',
    },
  },
})