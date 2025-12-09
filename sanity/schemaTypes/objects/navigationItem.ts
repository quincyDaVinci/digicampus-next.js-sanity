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
            name: 'linkType',
            title: 'Link Type',
            type: 'string',
            description: 'Kies of dit menu-item linkt naar een interne pagina of een aangepaste URL',
            options: {
                list: [
                    { title: 'Interne pagina', value: 'internal' },
                    { title: 'Aangepaste URL', value: 'external' },
                    { title: 'Geen (alleen dropdown)', value: 'none' },
                ],
                layout: 'radio',
            },
            initialValue: 'none',
        }),
        defineField({
            name: 'internalPage',
            title: 'Selecteer Pagina',
            type: 'reference',
            description: 'Selecteer een bestaande pagina',
            to: [
                { type: 'page' },
                { type: 'homePage' },
                { type: 'blogPage' },
                { type: 'blogPost' },
            ],
            hidden: ({ parent }) => parent?.linkType !== 'internal',
        }),
        defineField({
            name: 'externalUrl',
            title: 'Aangepaste URL',
            type: 'string',
            description: 'Voer een aangepaste URL in (bijv. /nl/contact of https://external.com)',
            placeholder: '/nl/over-ons',
            hidden: ({ parent }) => parent?.linkType !== 'external',
            validation: (Rule) =>
                Rule.custom((value, context) => {
                    const parent = context.parent as any
                    if (parent?.linkType === 'external' && !value) {
                        return 'Vul een URL in of kies een ander link type'
                    }
                    return true
                }),
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
