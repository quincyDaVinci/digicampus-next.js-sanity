import { BookOpenIcon } from '../lib/featherIcons'
import { defineField, defineType } from 'sanity'

export const blogSectionType = defineType({
  name: 'blogSection',
  title: 'Blog sectie',
  type: 'object',
  icon: BookOpenIcon,
  fields: [
    defineField({
      name: 'stylePreset',
      title: 'Stijlvariant',
      type: 'string',
      options: {
        list: [
          { title: 'Gebalanceerd', value: 'structured' },
          { title: 'Verfrissend', value: 'fresh' },
          { title: 'Contrasterend', value: 'contrast' },
        ],
        layout: 'radio',
      },
      initialValue: 'structured',
    }),
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
    defineField({
      name: 'cardTone',
      title: 'Kaartstijl',
      type: 'string',
      options: {
        list: [
          { title: 'Neutraal', value: 'surface' },
          { title: 'Accent', value: 'accent' },
          { title: 'Contrasterend', value: 'contrast' },
        ],
        layout: 'radio',
      },
      initialValue: 'surface',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'description',
    },
  },
})