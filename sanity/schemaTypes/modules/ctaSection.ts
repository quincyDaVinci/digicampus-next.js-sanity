import {defineField, defineType} from 'sanity'

/**
 * CTA Section
 * Extended to support multiple buttons with accessibility/PDF metadata.
 */
export default defineType({
  name: 'ctaSection',
  title: 'CTA Sectie',
  type: 'object',
  groups: [
    {name: 'content', title: 'Inhoud', default: true},
    {name: 'appearance', title: 'Weergave'},
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Kop',
      type: 'string',
      group: 'content',
      validation: Rule => Rule.max(120),
    }),
    defineField({
      name: 'subheading',
      title: 'Subkop',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: Rule => Rule.max(300),
    }),
    defineField({
      name: 'badgeText',
      title: 'Badge-tekst',
      type: 'string',
      group: 'content',
      validation: Rule => Rule.max(40),
    }),
    defineField({
      name: 'buttons',
      title: 'Actieknoppen',
      type: 'array',
      group: 'content',
      of: [
        defineField({
          name: 'button',
          type: 'object',
          title: 'Knop',
          fields: [
            {name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required().max(60)},
            {name: 'url', title: 'URL', type: 'string', validation: Rule => Rule.required()},
            {
              name: 'variant',
              title: 'Stijl',
              type: 'string',
              options: {
                list: [
                  {title: 'Gevuld', value: 'filled'},
                  {title: 'Omlijnd', value: 'outline'},
                  {title: 'Transparant', value: 'ghost'},
                  {title: 'CTA', value: 'cta'},
                ],
              },
              initialValue: 'filled',
            },
            {
              name: 'icon',
              title: 'Pictogram',
              type: 'string',
              options: {
                list: [
                  {title: 'Geen', value: 'none'},
                  {title: 'Pijl rechts', value: 'arrow-right'},
                  {title: 'Download', value: 'download'},
                  {title: 'Extern', value: 'external'},
                  {title: 'Video', value: 'video'},
                ],
              },
              initialValue: 'none',
            },
            {
              name: 'isPdf',
              title: 'Is dit een PDF-link?',
              type: 'boolean',
              description: 'Markeer dit wanneer de URL naar een PDF-bestand verwijst.',
            },
            {
              name: 'accessibleVersionUrl',
              title: 'Toegankelijke versie (URL)',
              type: 'url',
              description: 'Alternatieve of toegankelijke versie van het document.',
            },
            {
              name: 'accessibilityNote',
              title: 'Toegankelijkheidsopmerking',
              type: 'string',
              description: 'Extra schermlezertekst, bv. bij niet-toegankelijke PDF.',
            },
          ],
          preview: {
            select: {label: 'label', url: 'url', variant: 'variant'},
            prepare: ({label, url, variant}) => ({
              title: label || 'Knop',
              subtitle: `${variant || 'filled'} – ${url}`,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'attributes',
      title: 'Sectie-attributen',
      type: 'module-attributes',
      group: 'appearance',
    }),
  ],
  preview: {
    select: {heading: 'heading', buttons: 'buttons'},
    prepare: ({heading, buttons}) => ({
      title: heading || 'CTA Sectie',
      subtitle: buttons ? `${buttons.length} knop(pen)` : 'Geen knoppen',
    }),
  },
})
