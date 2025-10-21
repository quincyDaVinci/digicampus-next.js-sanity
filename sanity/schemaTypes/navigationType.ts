import {LayersIcon} from '../lib/featherIcons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const navigationType = defineType({
  name: 'navigation',
  title: 'Header menu',
  type: 'document',
  icon: LayersIcon,
  hidden: true,
  fields: [
    defineField({
      name: 'title',
      title: '📌 Interne naam',
      type: 'string',
      initialValue: 'Header Navigation',
      readOnly: true,
      description: 'Alleen voor intern gebruik zodat duidelijk is welk menu dit is.',
    }),
    defineField({
      name: 'menuItems',
      title: '🧭 Hoofdmenu',
      description:
        'Voeg hoofditems toe voor de bovenste navigatie. Gebruik sub-items om dropdowns te maken.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'menuItem',
          title: 'Menu Item',
          fields: [
            defineField({
              name: 'label',
              title: '🏷️ Titel',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'Tekst die in het menu zichtbaar is.',
            }),
            defineField({
              name: 'items',
              title: '🔽 Dropdown links (optioneel)',
              description: 'Voeg sublinks toe wanneer dit menu-item een dropdown moet tonen.',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'subMenuItem',
                  fields: [
                    defineField({
                      name: 'label',
                      title: '🏷️ Titel',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                      description: 'Tekst van de submenu-link.',
                    }),
                    defineField({
                      name: 'href',
                      title: '🔗 Link',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                      description: 'Relatieve URL, bijvoorbeeld /over-ons.',
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
                subtitle: items ? `${items.length} sub-items` : 'No sub-items',
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
