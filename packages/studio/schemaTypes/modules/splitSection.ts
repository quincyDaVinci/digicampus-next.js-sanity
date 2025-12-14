import { defineField, defineType } from 'sanity'
import { LayersIcon } from '../../lib/featherIcons'
import ImageWithOverlayInput from '../../components/ImageWithOverlayInput'

/**
 * Split Section - Text + Image layouts
 * SchemaUI component for two-column content
 */
export default defineType({
    name: 'splitSection',
    title: 'Split-sectie',
    type: 'object',
    icon: LayersIcon,
    groups: [
        { name: 'content', title: 'Inhoud', default: true },
        { name: 'media', title: 'Media' },
        { name: 'appearance', title: 'Weergave' },
    ],
    fields: [
        defineField({
            name: 'layout',
            title: 'Lay-out',
            type: 'string',
            description: 'Kies de positie van de afbeelding ten opzichte van de tekst',
            group: 'appearance',
            options: {
                list: [
                    { title: '📐 Afbeelding Links', value: 'imageLeft' },
                    { title: '📐 Afbeelding Rechts', value: 'imageRight' },
                    { title: '⬆️ Afbeelding Boven', value: 'imageTop' },
                    { title: '⬇️ Afbeelding Onder', value: 'imageBottom' },
                ],
                layout: 'radio',
            },
            initialValue: 'imageLeft',
        }),
        defineField({
            name: 'tagline',
            title: 'Tagline',
            type: 'string',
            description: 'Optionele tagline boven de titel',
            validation: (Rule) => Rule.max(50),
            group: 'content',
        }),
        defineField({
            name: 'heading',
            title: 'Titel',
            type: 'string',
            description: 'Hoofdtitel van de sectie',
            validation: (Rule) => Rule.required().max(100),
            group: 'content',
        }),
        defineField({
            name: 'body',
            title: 'Tekst',
            type: 'text',
            description: 'Beschrijvende tekst (ondersteunt meerdere paragrafen)',
            rows: 5,
            validation: (Rule) => Rule.max(500),
            group: 'content',
        }),
        defineField({
            name: 'infoList',
            title: 'Info-lijst',
            type: 'array',
            description: 'Optionele lijst met punten of kenmerken',
            of: [{ type: 'string' }],
            validation: (Rule) => Rule.max(6),
            group: 'content',
        }),
        defineField({
            name: 'cta',
            title: 'Call-to-Action',
            type: 'object',
            description: 'Optionele actieknop',
            group: 'content',
            fields: [
                {
                    name: 'label',
                    title: 'Label',
                    type: 'string',
                    validation: (Rule) => Rule.max(25),
                },
                {
                    name: 'url',
                    title: 'URL',
                    type: 'string',
                },
                {
                    name: 'variant',
                    title: 'Stijl',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Standaard', value: 'default' },
                            { title: 'Omlijnd', value: 'outline' },
                        ],
                    },
                    initialValue: 'default',
                },
            ],
        }),
        defineField({
            name: 'image',
            title: 'Afbeelding',
            type: 'image',
            description: 'Aanbevolen: minimaal 1200x800px',
            components: { input: ImageWithOverlayInput },
            options: { hotspot: true },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternatieve tekst',
                    description: 'Beschrijf de afbeelding voor toegankelijkheid (verplicht)',
                    validation: (Rule) => Rule.required().warning('Alt-tekst is verplicht voor WCAG AA'),
                },
                {
                    name: 'caption',
                    type: 'string',
                    title: 'Bijschrift',
                    description: 'Optioneel zichtbaar bijschrift onder de afbeelding',
                },
                {
                    name: 'objectFit',
                    type: 'string',
                    title: 'Afbeelding formaat',
                    description: 'Hoe de afbeelding wordt weergegeven',
                    options: {
                        list: [
                            { title: 'Cover (vult ruimte, kan bijsnijden)', value: 'cover' },
                            { title: 'Contain (volledige afbeelding zichtbaar)', value: 'contain' },
                        ],
                        layout: 'radio',
                    },
                    initialValue: 'cover',
                },
                {
                    name: 'aspectRatio',
                    type: 'string',
                    title: 'Aspect ratio',
                    description: 'Beeldverhouding van de afbeeldingscontainer',
                    options: {
                        list: [
                            { title: 'Auto (originele verhouding)', value: 'auto' },
                            { title: '16:9 (widescreen)', value: '16/9' },
                            { title: '4:3 (standaard)', value: '4/3' },
                            { title: '1:1 (vierkant)', value: '1/1' },
                            { title: '3:2 (foto)', value: '3/2' },
                        ],
                    },
                    initialValue: 'auto',
                },
                {
                    name: 'displaySize',
                    type: 'number',
                    title: 'Weergave grootte (%)',
                    description: 'Percentage van de beschikbare breedte (1-100%). Alleen voor Contain mode.',
                    validation: (Rule) => Rule.min(1).max(100).integer(),
                    initialValue: 100,
                    hidden: ({ parent }) => parent?.objectFit !== 'contain',
                },
            ],
            validation: (Rule) => Rule.required(),
            group: 'media',
        }),
        defineField({
            name: 'attributes',
            title: 'Sectie-attributen',
            type: 'module-attributes',
            description: 'Geavanceerde opmaak en styling opties',
            group: 'appearance',
        }),
    ],
    preview: {
        select: {
            title: 'heading',
            layout: 'layout',
            media: 'image',
        },
        prepare: ({ title, layout, media }) => ({
            title: title || 'Split-sectie',
            subtitle: `Layout: ${layout || 'imageLeft'}`,
            media,
        }),
    },
})
