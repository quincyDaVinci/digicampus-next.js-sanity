import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogPostTranslation',
  title: 'Vertaling (blog)',
  type: 'object',
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
