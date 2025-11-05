import {defineField, defineType} from 'sanity'
import {LayersIcon} from '../../lib/featherIcons'

/**
 * Navigation - Menu system
 * Based on SanityPress pattern
 */
export default defineType({
  name: 'navigation',
  title: 'Navigation Menu',
  type: 'document',
  icon: LayersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Menu Title',
      type: 'string',
      description: 'Internal name for this menu (e.g., "Main Menu", "Footer Links")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Navigation Items',
      type: 'array',
      description: 'Add links and dropdown menus',
      of: [
        {type: 'link'},
        {type: 'link.list'}, // Dropdown menus
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      count: 'items.length',
    },
    prepare: ({title, count}) => ({
      title: title || 'Navigation Menu',
      subtitle: `${count || 0} items`,
      media: LayersIcon,
    }),
  },
})
