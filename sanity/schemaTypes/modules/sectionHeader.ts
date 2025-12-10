import { defineField, defineType } from 'sanity'
import { FileTextIcon } from '../../lib/featherIcons'

/**
 * Section Header - Intro block for sections
 * SchemaUI component for section introductions
 */
export default defineType({
    name: 'sectionHeader',
    title: 'Sectiekop',
    type: 'object',
    icon: FileTextIcon,
    fields: [
        defineField({
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
            description: 'Kleine tekst boven de titel (optioneel)',
            validation: (Rule) => Rule.max(50),
        }),
        defineField({
            name: 'title',
            title: 'Titel',
            type: 'string',
            description: 'Hoofdtitel van de sectie',
            validation: (Rule) => Rule.required().max(100),
        }),
        defineField({
            name: 'body',
            title: 'Tekst',
            type: 'text',
            description: 'Beschrijvende tekst onder de titel',
            rows: 4,
            validation: (Rule) => Rule.max(300),
        }),
        defineField({
            name: 'alignment',
            title: 'Uitlijning',
            type: 'string',
            description: 'Tekstuitlijning',
            options: {
                list: [
                    { title: 'Links', value: 'left' },
                    { title: 'Midden', value: 'center' },
                ],
                layout: 'radio',
            },
            initialValue: 'center',
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
            tagline: 'tagline',
        },
        prepare: ({ title, tagline }) => ({
            title: title || 'Sectiekop',
            subtitle: tagline || 'Intro blok',
        }),
    },
})
