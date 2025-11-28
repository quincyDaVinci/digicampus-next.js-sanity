import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogPostTranslation',
  title: 'Vertaling (blog)',
  type: 'object',
  preview: {
    select: {
      title: 'title',
      subtitle: 'excerpt',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title || 'Vertaling',
        subtitle: subtitle ? (typeof subtitle === 'string' ? subtitle.slice(0, 120) : '') : '',
      }
    },
  },
  fields: [
    defineField({
      name: 'language',
      title: 'Taal',
      type: 'string',
      options: {
        list: [
          {title: 'Nederlands', value: 'nl'},
          {title: 'English', value: 'en'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
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
})
