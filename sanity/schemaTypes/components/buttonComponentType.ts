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
      name: 'href',
      title: 'Link URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in nieuw venster',
      type: 'boolean',
      initialValue: false,
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
