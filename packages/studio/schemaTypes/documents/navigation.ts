import { defineField, defineType } from 'sanity'
import { LayersIcon } from '../../lib/featherIcons'

/**
 * Navigation - Menu system
 * Simplified structure with better UX for content editors
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
      description: 'Interne naam voor dit menu (bijv. "Hoofdmenu NL", "Main Menu EN")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Taal',
      type: 'string',
      options: {
        list: [
          { title: 'Nederlands', value: 'nl' },
          { title: 'English', value: 'en' },
        ],
        layout: 'radio',
      },
      description: 'Selecteer de taal voor dit menu',
      validation: (Rule) => Rule.required(),
      initialValue: 'nl',
    }),
    defineField({
      name: 'items',
      title: 'Menu-items',
      type: 'array',
      description: 'Voeg menu-items toe. Elk item kan eventueel een dropdown menu hebben.',
      of: [
        { type: 'navigationItem' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      count: 'items.length',
    },
    prepare: ({ title, language, count }) => ({
      title: title || 'Navigatiemenu',
      subtitle: `${language?.toUpperCase() || '??'} • ${count || 0} items`,
      media: LayersIcon,
    }),
  },
})
