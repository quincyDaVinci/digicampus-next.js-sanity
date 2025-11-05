import {defineField, defineType} from 'sanity'

/**
 * Call-to-action button with link and styling options
 * Based on SanityPress pattern
 */
export default defineType({
  name: 'cta',
  title: 'Call-to-Action',
  type: 'object',
  fields: [
    defineField({
      name: 'link',
      type: 'link',
      description: 'Button link and label',
    }),
    defineField({
      name: 'style',
      title: 'Button Style',
      type: 'string',
      options: {
        list: [
          {title: 'Primary (Filled)', value: 'action'},
          {title: 'Primary Outline', value: 'action-outline'},
          {title: 'Ghost (Transparent)', value: 'ghost'},
          {title: 'Link (Text only)', value: 'link'},
        ],
      },
      initialValue: 'action',
    }),
  ],
  preview: {
    select: {
      label: 'link.label',
      style: 'style',
    },
    prepare: ({label, style}) => ({
      title: label || 'Button',
      subtitle: style || 'Default style',
    }),
  },
})
