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
          {title: 'English', value: 'en'},
          {title: 'Nederlands', value: 'nl'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Titel (vertaald)',
      type: 'string',
    }),
    defineField({
      name: 'ctas',
      title: 'CTA’s (vertaald)',
      type: 'array',
      of: [{type: 'cta'}],
      description: 'Gekopieerde CTA’s uit de basistaal.',
    }),
    defineField({
      name: 'footerContent',
      title: 'Footer-inhoud (vertaald)',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
      description: 'Wordt gespiegeld vanuit de basistaal.',
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright (vertaald)',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
    }),
  ],
})
