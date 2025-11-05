import {defineField, defineType} from 'sanity'
import {LayersIcon} from '../../lib/featherIcons'

/**
 * Link list for dropdown menus in navigation
 * Based on SanityPress pattern
 */
export default defineType({
  name: 'link.list',
  title: 'Link met dropdown',
  type: 'object',
  icon: LayersIcon,
  fields: [
    defineField({
      name: 'link',
      title: 'Bovenliggende link',
      type: 'link',
      description: 'Hoofdnavigatie-item',
    }),
    defineField({
      name: 'links',
      title: 'Dropdown-links',
      type: 'array',
      of: [{type: 'link'}],
      description: 'Links die in het dropdownmenu worden getoond',
    }),
  ],
  preview: {
    select: {
      label: 'link.label',
      count: 'links.length',
    },
    prepare: ({label, count}) => ({
      title: label || 'Dropdownmenu',
      subtitle: `${count || 0} subitems`,
      media: LayersIcon,
    }),
  },
})
