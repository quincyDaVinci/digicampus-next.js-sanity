import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'documentAsset',
  title: 'Document (PDF)',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titel', type: 'string'}),
    defineField({name: 'summary', title: 'Samenvatting', type: 'text', rows: 4}),
    defineField({
      name: 'documentFile',
      title: 'Documentbestand',
      type: 'file',
      description: 'PDF- of documentbestand (geüpload naar Sanity)'
    }),
    defineField({
      name: 'htmlAlternativePortableText',
      title: 'HTML alternatief (Portable Text)',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Toegankelijke HTML- of tekstversie die getoond kan worden als alternatief voor het PDF-bestand.'
    }),
    defineField({name: 'wcagStatus', title: 'WCAG-toegankelijk', type: 'boolean'}),
    defineField({name: 'language', title: 'Taal', type: 'string'}),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'summary',
      media: 'documentFile'
    },
    prepare: ({title, subtitle}) => ({title: title || 'Document', subtitle})
  }
})
