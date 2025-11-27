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
      name: 'slug',
      title: 'Slug (vertaald)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Samenvatting (vertaald)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Inhoud (vertaald)',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
      description: 'Automatisch gekopieerd; pas zelf de tekst aan indien nodig.',
    }),
  ],
})
