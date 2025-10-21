import { LayersIcon } from '../lib/featherIcons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const navigationType = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: LayersIcon,
  hidden: true,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Header Navigation',
      readOnly: true,
    }),
    defineField({
      name: 'menuItems',
      title: '📁 Menu blokken',
      description: '🧭 Groepeer links per onderwerp. Submenu\'s houden navigatie overzichtelijk.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'menuItem',
          title: 'Navigatie-item',
          fields: [
            defineField({
              name: 'label',
              title: 'Titel',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'items',
              title: '🔗 Submenu links',
              description: '➕ Voeg links toe die onder deze categorie vallen.',
              type: 'array',
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
                      title: 'URL',
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
                title: title || 'Navigatie-item',
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
