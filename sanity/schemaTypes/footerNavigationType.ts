import {LayersIcon} from '../lib/featherIcons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const footerNavigationType = defineType({
  name: 'footerNavigation',
  title: 'Footer Navigation',
  type: 'document',
  icon: LayersIcon,
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      initialValue: 'Footer Navigation',
      readOnly: true,
    }),
    defineField({
      name: 'columns',
      title: '📚 Footer kolommen',
      type: 'array',
      description: 'Maak logische kolommen zoals “Over ons” of “Contact”. Voeg binnen elke kolom links toe.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerColumn',
          title: 'Footer kolom',
          fields: [
            defineField({
              name: 'heading',
              title: '🏷️ Kolomtitel',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'links',
              title: '🔗 Links',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'footerLink',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'href',
                      title: 'URL of pagina',
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
              validation: (rule) => rule.min(1).error('Voeg minstens één link toe'),
            }),
          ],
          preview: {
            select: {
              title: 'heading',
              links: 'links',
            },
            prepare({title, links}) {
              return {
                title: title || 'Footer kolom',
                subtitle: links?.length ? `${links.length} links` : 'Nog geen links',
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
        title: 'Footer Navigation',
      }
    },
  },
})
