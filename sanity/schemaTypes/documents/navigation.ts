import {defineField, defineType} from 'sanity'
import {LayersIcon} from '../../lib/featherIcons'

/**
 * Navigation - Menu system
 * Stores canonical menu structure; translations are provided in the `translations` array.
 */
export default defineType({
  name: 'navigation',
  title: 'Navigatiemenu',
  type: 'document',
  icon: LayersIcon,
  fieldsets: [
    { name: 'translations', title: 'Vertalingen', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Menutitel',
      type: 'string',
      description: 'Interne naam voor dit menu (bijv. “Hoofdmenu”, “Footer-links”)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Navigatie-items',
      type: 'array',
      description: 'Voeg links en dropdownmenu’s toe',
      of: [
        {type: 'link'},
        {type: 'link.list'}, // Dropdownmenu’s
      ],
    }),
    defineField({
      name: 'translations',
      title: 'Vertalingen',
      type: 'array',
      fieldset: 'translations',
      of: [
        {
          type: 'object',
          name: 'navigationTranslation',
          title: 'Vertaling',
          fields: [
            defineField({
              name: 'language',
              title: 'Taal',
              type: 'string',
              options: { list: [ { title: 'Nederlands', value: 'nl' }, { title: 'English', value: 'en' } ] },
              validation: (Rule) => Rule.required(),
            }),
            // Removed translated menu title — translations are per-item now.
            defineField({
              name: 'items',
              title: 'Vertaalde items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'navigationItemTranslation',
                  title: 'Item',
                  fields: [
                    defineField({ name: 'itemType', title: 'Type', type: 'string' }),
                    defineField({ name: 'label', title: 'Label', type: 'string' }),
                    defineField({
                      name: 'link',
                      title: 'Hoofdlijink (voor dropdowns)',
                      type: 'object',
                      fields: [defineField({ name: 'label', title: 'Label', type: 'string' })],
                    }),
                    defineField({
                      name: 'links',
                      title: 'Sub-links',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          name: 'subLinkTranslation',
                          title: 'Sub-link',
                          fields: [defineField({ name: 'label', title: 'Label', type: 'string' })],
                        },
                      ],
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
      description: 'Per-taal vertalingen voor de menu-item labels. Open indien nodig om items te bewerken.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      count: 'items.length',
    },
    prepare: ({title, count}) => ({
      title: title || 'Navigatiemenu',
      subtitle: `${count || 0} items`,
      media: LayersIcon,
    }),
  },
})
