import {LayersIcon} from '../lib/featherIcons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const footerNavigationType = defineType({
  name: 'footerNavigation',
  title: 'Footer navigatie',
  type: 'document',
  icon: LayersIcon,
  hidden: true,
  fields: [
    defineField({
      name: 'title',
      title: 'Documentnaam',
      type: 'string',
      initialValue: 'Footer navigatie',
      readOnly: true,
    }),
    defineField({
      name: 'intro',
      title: '✨ Intro blok',
      description: '💡 Tekst voor de eerste kolom. Houd het kort en warm.',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Titel',
          type: 'string',
          initialValue: 'About DigiCampus',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Beschrijving',
          type: 'text',
          rows: 3,
          initialValue:
            'Empowering education through digital innovation and accessible learning platforms.',
        }),
      ],
    }),
    defineField({
      name: 'menuColumns',
      title: '🧭 Navigatie kolommen',
      description: '📚 Maak tot drie blokken met links voor snelle navigatie.',
      type: 'array',
      validation: (rule) => rule.max(3),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'menuColumn',
          title: 'Navigatiekolom',
          fields: [
            defineField({
              name: 'title',
              title: 'Kolomtitel',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [defineArrayMember({type: 'linkField'})],
              validation: (rule) =>
                rule
                  .min(1)
                  .error('Voeg minstens één link toe aan de kolom.'),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              links: 'links',
            },
            prepare({title, links}) {
              const count = links?.length ?? 0
              return {
                title: title || 'Navigatiekolom',
                subtitle: count
                  ? `${count} link${count === 1 ? '' : 's'}`
                  : 'Nog geen links',
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: '🔗 Sociale & contactlinks',
      description: '🌐 Toon iconische links naar socials of belangrijke contactpunten.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          title: 'Link',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'icon',
              title: 'Icoon',
              type: 'string',
              options: {
                layout: 'radio',
                list: [
                  {title: '🌐 Globe', value: 'globe'},
                  {title: '🔗 Externe link', value: 'external'},
                  {title: '✉️ Bericht', value: 'mail'},
                ],
              },
              initialValue: 'external',
            }),
            defineField({
              name: 'opensInNewTab',
              title: 'Open in nieuw tabblad',
              type: 'boolean',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
              icon: 'icon',
            },
            prepare({title, subtitle, icon}) {
              const iconPrefix =
                icon === 'globe' ? '🌐' : icon === 'mail' ? '✉️' : '🔗'
              return {
                title: `${iconPrefix} ${title || 'Link'}`,
                subtitle,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'legalText',
      title: '⚖️ Onderschrift',
      description: '© Tekst onderaan. Gebruik {year} om automatisch het huidige jaar te tonen.',
      type: 'string',
      initialValue: '© {year} DigiCampus. All rights reserved.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer navigatie',
        subtitle: 'Beheer de links en tekst van de footer',
      }
    },
  },
})
