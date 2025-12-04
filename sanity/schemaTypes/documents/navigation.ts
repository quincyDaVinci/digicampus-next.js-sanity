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
