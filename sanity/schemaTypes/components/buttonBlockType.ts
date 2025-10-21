import {LaunchIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const buttonBlockType = defineType({
  name: 'buttonBlock',
  title: 'Knop',
  type: 'object',
  icon: LaunchIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Knoptekst',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'linkField',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'link.href',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Knop',
        subtitle: subtitle || 'Linkblok',
      }
    },
  },
})
