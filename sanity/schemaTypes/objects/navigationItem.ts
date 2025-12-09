import { defineField, defineType } from 'sanity'
import { LayersIcon } from '../../lib/featherIcons'

/**
 * Navigation Item - A menu item that can have child links (dropdown)
 * Simplified structure for better UX
 */
export default defineType({
    name: 'navigationItem',
    title: 'Menu-item',
    type: 'object',
    icon: LayersIcon,
    fields: [
        defineField({
            name: 'label',
            title: 'Label (Nederlands)',
            type: 'string',
            description: 'De tekst die getoond wordt in het menu (Nederlands)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'labelEn',
            title: 'Label (English)',
            type: 'string',
            description: 'The text shown in the menu (English)',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'links',
            title: 'Dropdown-links',
            type: 'array',
            of: [{ type: 'link' }],
            description: 'Sub-items voor een dropdown menu. Laat leeg voor een enkel menu-item zonder dropdown.',
        }),
    ],
    preview: {
        select: {
            labelNl: 'label',
            labelEn: 'labelEn',
            count: 'links.length',
        },
        prepare: ({ labelNl, labelEn, count }) => ({
            title: labelNl || labelEn || 'Menu-item',
            subtitle: count > 0 ? `${count} dropdown items` : 'Geen dropdown',
            media: LayersIcon,
        }),
    },
})
