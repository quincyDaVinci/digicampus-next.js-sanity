import {defineArrayMember, defineField, defineType} from 'sanity'
import {LayersIcon} from '../lib/featherIcons'

export const navigationType = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: LayersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      initialValue: 'Header Navigation',
      readOnly: true,
    }),
    defineField({
      name: 'menuItems',
      title: '📋 Hoofdmenu',
      type: 'array',
      description: 'Voeg hoofditems toe voor het menu in de header. Elk item kan een rij sublinks bevatten.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'menuItem',
          title: '🔹 Menu-item',
          fields: [
            defineField({
              name: 'label',
              title: 'Naam in het menu',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'items',
              title: '⬇️ Sublinks',
              type: 'array',
              description: 'Optioneel: voeg extra links toe die zichtbaar worden in het dropdownmenu.',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'subMenuItem',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Linktekst',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'href',
                      title: 'Bestemming (URL of slug)',
                      type: 'string',
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
          ],
          preview: {
            select: {
              title: 'label',
              items: 'items',
            },
            prepare({title, items}) {
              return {
                title,
                subtitle: items?.length
                  ? `${items.length} sublink${items.length === 1 ? '' : 's'}`
                  : 'Nog geen sublinks',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Header Navigation',
      }
    },
  },
})
