import {defineArrayMember, defineField, defineType} from 'sanity'

export const richTextComponentType = defineType({
  name: 'richTextComponent',
  title: 'Rijke tekst',
  type: 'object',
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
            {title: 'H1 (max. één per pagina)', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
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
    defineField({
      name: 'textAlign',
      title: 'Uitlijning',
      type: 'string',
      options: {
        list: [
          {title: 'Links', value: 'left'},
          {title: 'Gecentreerd', value: 'center'},
          {title: 'Rechts', value: 'right'},
          {title: 'Uitgevuld', value: 'justify'},
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'maxWidth',
      title: 'Maximale breedte',
      type: 'string',
      options: {
        list: [
          {title: 'Smalle kolom', value: 'narrow'},
          {title: 'Standaard', value: 'default'},
          {title: 'Breed', value: 'wide'},
        ],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'ariaLabel',
      title: 'Aria label (optioneel)',
      type: 'string',
      description:
        'Handig wanneer de tekst als call-to-action of belangrijke melding fungeert. Beschrijf kort de bedoeling.',
    }),
  ],
  preview: {
    select: {
      firstBlock: 'content.0',
    },
    prepare({firstBlock}) {
      const title = firstBlock?.children?.[0]?.text || 'Rijke tekst'
      return {
        title,
        subtitle: 'Tekstblok',
      }
    },
  },
})
