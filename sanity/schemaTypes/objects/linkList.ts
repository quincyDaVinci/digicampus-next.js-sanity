import {defineField, defineType} from 'sanity'
import {LayersIcon} from '../../lib/featherIcons'

/**
 * Link list for dropdown menus in navigation
 * Based on SanityPress pattern
 */
export default defineType({
  name: 'link.list',
  title: 'Link with Dropdown',
  type: 'object',
  icon: LayersIcon,
  fields: [
    defineField({
      name: 'link',
      title: 'Parent Link',
      type: 'link',
      description: 'Main navigation item',
    }),
    defineField({
      name: 'links',
      title: 'Dropdown Links',
      type: 'array',
      of: [{type: 'link'}],
      description: 'Links shown in dropdown menu',
    }),
  ],
  preview: {
    select: {
      label: 'link.label',
      count: 'links.length',
    },
    prepare: ({label, count}) => ({
      title: label || 'Dropdown menu',
      subtitle: `${count || 0} sub-items`,
      media: LayersIcon,
    }),
  },
})
