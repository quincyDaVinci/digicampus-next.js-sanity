import { defineField, defineType } from 'sanity'
import { PackageIcon } from '../../lib/featherIcons'

/**
 * Logo Cloud - Partner/Client logo showcase
 * SchemaUI component for branding and credibility
 */
export default defineType({
    name: 'logoCloudSection',
    title: 'Logo Cloud',
    type: 'object',
    icon: PackageIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Titel',
            type: 'string',
            description: 'Optionele titel boven de logo\'s',
            validation: (Rule) => Rule.max(100),
        }),
        defineField({
            name: 'logos',
            title: 'Logo\'s',
            type: 'array',
            description: 'Upload partner- of klantlogo\'s (aanbevolen: 4-8 logo\'s)',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'image',
                            title: 'Logo-afbeelding',
                            type: 'image',
                            description: 'Upload een logo (bij voorkeur SVG of PNG met transparantie)',
                            options: { hotspot: true },
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'alt',
                            title: 'Alternatieve tekst',
                            type: 'string',
                            description: 'Naam van het bedrijf of merk (verplicht voor WCAG AA)',
                            validation: (Rule) => Rule.required(),
                        },
                        {
                            name: 'url',
                            title: 'Link (optioneel)',
                            type: 'url',
                            description: 'Optionele link naar de website van het bedrijf',
                        },
                    ],
                    preview: {
                        select: {
                            title: 'alt',
                            media: 'image',
                        },
                        prepare: ({ title, media }) => ({
                            title: title || 'Logo',
                            media,
                        }),
                    },
                },
            ],
            validation: (Rule) => Rule.min(1).max(12).warning('Aanbevolen: 4-8 logo\'s voor optimale weergave'),
        }),
        defineField({
            name: 'grayscale',
            title: 'Grijswaarden',
            type: 'boolean',
            description: 'Toon logo\'s in grijswaarden (met kleur bij hover)',
            initialValue: false,
        }),
        defineField({
            name: 'attributes',
            title: 'Sectie-attributen',
            type: 'module-attributes',
            description: 'Geavanceerde opmaak en styling opties',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            logos: 'logos',
        },
        prepare: ({ title, logos }) => ({
            title: title || 'Logo Cloud',
            subtitle: `${Array.isArray(logos) ? logos.length : 0} logo\'s`,
        }),
    },
})
