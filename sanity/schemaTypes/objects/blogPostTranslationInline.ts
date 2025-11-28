import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogPostTranslationInline',
  title: 'Vertaling (inline, blog)',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Vertaalde titel',
      type: 'string',
    }),
    defineField({
      name: 'excerpt',
      title: 'Vertaalde samenvatting',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Vertaalde inhoud',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'excerpt'},
    prepare(selection) {
      const {title, subtitle} = selection
      return {title: title || 'Vertaling (EN)', subtitle: subtitle ? (typeof subtitle === 'string' ? subtitle.slice(0, 120) : '') : ''}
    },
  },
})
