import {defineArrayMember, defineField, defineType} from 'sanity'
import {LayersIcon} from '../lib/featherIcons'

export const footerNavigationType = defineType({
  name: 'footerNavigation',
  title: 'Footer',
  type: 'document',
  icon: LayersIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      initialValue: 'Footer Navigation',
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'intro',
      title: '👋 Intro blok',
      type: 'object',
      options: {collapsible: false},
      fields: [
        defineField({
          name: 'heading',
          title: 'Titel',
          type: 'string',
          initialValue: 'About DigiCampus',
          description: 'Korte kop boven het introductieblok in de footer.',
        }),
        defineField({
          name: 'text',
          title: 'Toelichting',
          type: 'text',
          rows: 3,
          initialValue:
            'Empowering education through digital innovation and accessible learning platforms.',
          description: 'Een bondige beschrijving van jullie missie (max. 2 regels).',
        }),
      ],
    }),
    defineField({
      name: 'linkGroups',
      title: '🧭 Link kolommen',
      type: 'array',
      description: 'Voeg maximaal drie kolommen toe met belangrijke links.',
      validation: (rule) => rule.max(3),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'linkGroup',
          fields: [
            defineField({
              name: 'title',
              title: 'Kolomtitel',
              type: 'string',
              description: 'Korte titel, bijvoorbeeld "Quick links".',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'footerLink',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Linktekst',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'href',
                      title: 'Bestemming',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      subtitle: 'href',
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              links: 'links',
            },
            prepare({title, links}) {
              return {
                title: title || 'Nieuwe kolom',
                subtitle: links?.length
                  ? `${links.length} link${links.length === 1 ? '' : 's'}`
                  : 'Nog geen links',
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: '📣 Sociale links',
      type: 'array',
      description: 'Snelle knoppen naar sociale kanalen of externe pagina’s.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Pictogram',
              type: 'string',
              options: {
                list: [
                  {title: '🌐 Website', value: 'globe'},
                  {title: '🔗 Externe link', value: 'external'},
                  {title: '💬 Twitter/X', value: 'twitter'},
                  {title: '💼 LinkedIn', value: 'linkedin'},
                  {title: '✉️ E-mail', value: 'mail'},
                ],
              },
              initialValue: 'external',
              description: 'Kies een pictogram dat bij de link past.',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer Navigation',
      }
    },
  },
})
