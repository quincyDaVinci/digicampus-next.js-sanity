import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteTranslation',
  title: 'Vertaling (site)',
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
      title: 'Vertaalde sitetitel',
      type: 'string',
    }),
    defineField({
      name: 'footerContent',
      title: 'Vertaalde footer-inhoud',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
    }),
    defineField({
      name: 'copyright',
      title: 'Vertaalde copyright',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
    }),
  ],
})
