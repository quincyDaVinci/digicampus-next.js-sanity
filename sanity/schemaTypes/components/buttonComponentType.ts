import {defineField, defineType} from 'sanity'

export const buttonComponentType = defineType({
  name: 'buttonComponent',
  title: 'Knop',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Knoptekst',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(60),
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
    },
    prepare({title}) {
      return {
        title: title || 'Knop',
      }
    },
  },
})
