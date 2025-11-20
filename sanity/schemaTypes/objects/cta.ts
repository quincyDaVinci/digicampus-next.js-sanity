import {defineField, defineType} from 'sanity'

/**
 * Call-to-action button with link and styling options
 * Based on SanityPress pattern
 */
export default defineType({
  name: 'cta',
  title: 'Call-to-action',
  type: 'object',
  fields: [
    defineField({
      name: 'link',
      type: 'link',
      description: 'Knoplink en label',
    }),
    defineField({
      name: 'style',
      title: 'Knopstijl',
      type: 'string',
      options: {
        list: [
          {title: 'Primair (gevuld)', value: 'action'},
          {title: 'Primair omlijnd', value: 'action-outline'},
          {title: 'Transparant', value: 'ghost'},
          {title: 'Tekstlink', value: 'link'},
        ],
      },
      initialValue: 'action',
    }),
    defineField({
      name: 'isPdf',
      title: 'Is dit een PDF-link?',
      type: 'boolean',
      description: 'Gebruik dit om PDF-doelen te markeren wanneer dat niet automatisch gedetecteerd wordt.',
    }),
    defineField({
      name: 'accessibleVersionUrl',
      title: 'Toegankelijke versie (URL)',
      type: 'url',
      description: 'Optioneel: link naar een toegankelijke versie van het document (bijv. niet-PDF of toegankelijk PDF).',
    }),
    defineField({
      name: 'accessibilityNote',
      title: 'Toegankelijkheidsopmerking',
      type: 'string',
      description: 'Extra schermlezer-notitie, bv. wanneer geen toegankelijke PDF beschikbaar is.',
    }),
  ],
  preview: {
    select: {
      label: 'link.label',
      style: 'style',
    },
    prepare: ({label, style}) => ({
      title: label || 'Knop',
      subtitle: style || 'Standaardstijl',
    }),
  },
})
