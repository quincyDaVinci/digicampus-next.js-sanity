import {LayersIcon} from '../lib/featherIcons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const footerNavigationType = defineType({
  name: 'footerNavigation',
  title: 'Footer',
  type: 'document',
  icon: LayersIcon,
  hidden: true,
  fields: [
    defineField({
      name: 'title',
      title: '📌 Interne naam',
      type: 'string',
      initialValue: 'Footer Navigation',
      readOnly: true,
      description: 'Zichtbaar in Studio, maar niet op de website.',
    }),
    defineField({
      name: 'aboutHeading',
      title: 'ℹ️ Koptekst over DigiCampus',
      type: 'string',
      initialValue: 'About DigiCampus',
      description: 'Wordt gebruikt voor het introductieblok links in de footer.',
    }),
    defineField({
      name: 'aboutBody',
      title: '📝 Korte beschrijving',
      type: 'text',
      rows: 3,
      description: 'Beschrijf in één of twee zinnen wat bezoekers over DigiCampus moeten weten.',
    }),
    defineField({
      name: 'navigationGroups',
      title: '🧭 Navigatiekolommen',
      description: 'Kolommen met links zoals “Snelle links”. Voeg maximaal drie kolommen toe voor overzicht.',
      type: 'array',
      validation: (Rule) => Rule.max(3).warning('Houd het aantal kolommen overzichtelijk (maximaal 3).'),
      of: [
        defineArrayMember({
          name: 'group',
          type: 'object',
          title: 'Kolom',
          fields: [
            defineField({
              name: 'heading',
              title: '🏷️ Titel',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Titel van de kolom, bijvoorbeeld “Snelle links”.',
            }),
            defineField({
              name: 'links',
              title: '🔗 Links',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'link',
                  type: 'object',
                  title: 'Link',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Tekst',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                      description: 'Tekst die bezoekers zien.',
                    }),
                    defineField({
                      name: 'href',
                      title: 'URL',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                      description: 'Relatieve link, bijvoorbeeld /privacy.',
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
              title: 'heading',
              links: 'links',
            },
            prepare({title, links}) {
              return {
                title: title || 'Nieuwe kolom',
                subtitle: links?.length ? `${links.length} link(s)` : 'Nog geen links',
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: '🌐 Sociale links',
      type: 'array',
      description: 'De knoppen onder “Connect”. Ideaal voor social media of externe platforms.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          title: 'Social link',
          fields: [
            defineField({
              name: 'label',
              title: 'Naam',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
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
    defineField({
      name: 'legalText',
      title: '⚖️ Juridische tekst',
      type: 'string',
      initialValue: '© {year} DigiCampus. All rights reserved.',
      description: 'Tekst onderaan de footer. Gebruik {year} om automatisch het huidige jaar te tonen.',
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
