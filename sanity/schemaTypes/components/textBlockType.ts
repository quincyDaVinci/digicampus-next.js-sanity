import {TextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const textBlockType = defineType({
  name: 'textBlock',
  title: 'Tekst',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Inhoud',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Paragraaf', value: 'normal'},
            {title: 'H1 (maximaal één per pagina)', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Citaat', value: 'blockquote'},
          ],
          lists: [
            {title: 'Opsomming', value: 'bullet'},
            {title: 'Genummerd', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Vet', value: 'strong'},
              {title: 'Cursief', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (rule) => rule.uri({allowRelative: true}),
                  }),
                  defineField({
                    name: 'isExternal',
                    title: 'Open in nieuw venster',
                    type: 'boolean',
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternatieve tekst',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.required().min(1).error('Voeg tekst toe.'),
    }),
  ],
  preview: {
    select: {
      firstBlock: 'content.0',
    },
    prepare({firstBlock}) {
      const title = firstBlock?.children?.[0]?.text || 'Tekstblok'
      return {
        title,
        subtitle: 'Tekst',
      }
    },
  },
})
