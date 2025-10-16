import { LayersIcon } from '../lib/featherIcons'
import { defineField, defineType } from 'sanity'

export const heroSectionType = defineType({
  name: 'heroSection',
  title: 'Hero sectie',
  type: 'object',
  icon: LayersIcon,
  fields: [
    defineField({
      name: 'stylePreset',
      title: 'Stijlvariant',
      type: 'string',
      options: {
        list: [
          { title: 'Verfrissend', value: 'fresh' },
          { title: 'Gebalanceerd', value: 'structured' },
          { title: 'Contrasterend', value: 'contrast' },
        ],
        layout: 'radio',
      },
      initialValue: 'fresh',
    }),
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