import { defineField, defineType } from 'sanity'
import { ImageIcon } from '../../lib/featherIcons'

/**
 * Hero Section - Multiple variants
 * Enhanced with better editor experience
 */
export default defineType({
  name: 'heroSection',
  title: 'Hero-sectie',
  type: 'object',
  icon: ImageIcon,
  groups: [
    { name: 'content', title: 'Inhoud', default: true },
    { name: 'cta', title: 'Call-to-Action' },
    { name: 'appearance', title: 'Weergave' },
    { name: 'media', title: 'Media' },
  ],
  fields: [
    defineField({
      name: 'variant',
      title: 'Lay-outvariant',
      type: 'string',
      description: 'Kies de visuele stijl van je hero-sectie',
      group: 'appearance',
      options: {
        list: [
          { title: '🎯 Centered (Classic)', value: 'centered' },
          { title: '📐 Split (Two-Column)', value: 'split' },
          { title: '✨ Minimal (Typography)', value: 'minimal' },
        ],
        layout: 'radio',
      },
      initialValue: 'centered',
    }),
    defineField({
      name: 'heading',
      title: 'Kop',
      type: 'string',
      description: 'Hoofdtitel van je hero-sectie (max 100 karakters voor optimale leesbaarheid)',
      validation: (Rule) => Rule.required().max(100).warning('Probeer de kop onder de 60 karakters te houden voor betere impact'),
      group: 'content',
    }),
    defineField({
      name: 'subheading',
      title: 'Subkop',
      type: 'text',
      description: 'Ondersteunende tekst die je boodschap verduidelijkt (150-250 karakters aanbevolen)',
      rows: 3,
      validation: (Rule) => Rule.max(250).warning('Ideaal tussen 150-250 karakters'),
      group: 'content',
    }),
    defineField({
      name: 'badgeText',
      title: 'Badge-tekst',
      type: 'string',
      description: 'Korte badge-tekst boven de kop',
      validation: (Rule) => Rule.max(40),
      group: 'content',
    }),
    defineField({
      name: 'textColor',
      title: 'Tekstkleur',
      type: 'string',
      description: 'Kies donkere of lichte tekst op basis van je achtergrondafbeelding',
      group: 'appearance',
      options: {
        list: [
          { title: 'Automatisch (aanbevolen)', value: 'auto' },
          { title: 'Licht (voor donkere achtergronden)', value: 'light' },
          { title: 'Donker (voor lichte achtergronden)', value: 'dark' },
        ],
        layout: 'radio',
      },
      initialValue: 'auto',
    }),
    defineField({
      name: 'bannerButton',
      title: 'Bannerknop (legacy)',
      type: 'object',
      description: 'Verouderd - gebruik nu de Actieknoppen veld hieronder',
      hidden: true,
      group: 'cta',
      fields: [
        {
          name: 'label',
          title: 'Label',
          type: 'string',
          validation: (Rule) => Rule.max(25).warning('Houd labels kort voor mobiele weergave'),
        },
        {
          name: 'url',
          title: 'URL',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'buttons',
      title: 'Actieknoppen',
      type: 'array',
      description: 'Call-to-action knoppen (max 2-3 aanbevolen voor beste resultaat)',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Label',
              validation: (Rule) => Rule.required().max(25).warning('Houd labels kort voor mobiele weergave'),
            },
            {
              name: 'url',
              type: 'string',
              title: 'URL',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'variant',
              type: 'string',
              title: 'Stijl',
              description: 'Visuele stijl van de knop',
              options: {
                list: [
                  { title: '🎨 Standaard (gevuld)', value: 'default' },
                  { title: '⚪ Secundair', value: 'secondary' },
                  { title: '⭕ Omlijnd', value: 'outline' },
                  { title: '👻 Transparant', value: 'ghost' },
                ],
              },
              initialValue: 'default',
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Pictogram',
              options: {
                list: [
                  { title: 'Geen', value: 'none' },
                  { title: '→ Pijl rechts', value: 'arrowRight' },
                  { title: '📞 Telefoon', value: 'phone' },
                ],
              },
            },
            {
              name: 'isPdf',
              type: 'boolean',
              title: 'Is dit een PDF-link?',
              description: 'Markeer dit wanneer de knop naar een PDF verwijst voor toegankelijkheid',
            },
            {
              name: 'accessibleVersionUrl',
              type: 'url',
              title: 'Toegankelijke versie (URL)',
              description: 'Optioneel: toegankelijke PDF-versie',
              hidden: ({ parent }) => !parent?.isPdf,
            },
            {
              name: 'accessibilityNote',
              type: 'string',
              title: 'Toegankelijkheidsopmerking',
              description: 'Extra schermlezertekst',
              hidden: ({ parent }) => !parent?.isPdf,
            },
          ],
          preview: {
            select: {
              label: 'label',
              url: 'url',
              variant: 'variant',
            },
            prepare: ({ label, url, variant }) => ({
              title: label || 'Knop',
              subtitle: `${variant || 'default'} • ${url || 'geen URL'}`,
            }),
          },
        },
      ],
      validation: (Rule) => Rule.max(3).warning('Meer dan 3 knoppen kan overweldigend zijn'),
      group: 'cta',
    }),
    defineField({
      name: 'media',
      title: 'Hero-media',
      type: 'object',
      description: 'Achtergrondafbeelding, video of galerij',
      group: 'media',
      fields: [
        {
          name: 'mediaType',
          title: 'Mediatype',
          type: 'string',
          options: {
            list: [
              { title: '🖼️ Afbeelding', value: 'image' },
              { title: '🎥 Video', value: 'video' },
              { title: '🎨 Galerij', value: 'gallery' },
            ],
          },
          initialValue: 'image',
        },
        {
          name: 'image',
          title: 'Afbeelding',
          type: 'image',
          description: 'Aanbevolen: minimaal 2400x1200px voor beste kwaliteit',
          components: { input: require('../../components/ImageWithOverlayInput').default },
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternatieve tekst',
              description: 'Beschrijf wat er in de afbeelding te zien is voor toegankelijkheid',
              validation: (Rule) => Rule.required().warning('Alternatieve tekst is belangrijk voor toegankelijkheid'),
            },
          ],
          hidden: ({ parent }) => parent?.mediaType !== 'image',
        },
        {
          name: 'videoUrl',
          title: 'Video-URL',
          type: 'url',
          description: 'YouTube, Vimeo, of directe video-URL',
          hidden: ({ parent }) => parent?.mediaType !== 'video',
        },
        {
          name: 'gallery',
          title: 'Galerijafbeeldingen',
          type: 'array',
          description: 'Upload maximaal 6 afbeeldingen voor een mooie galerij',
          of: [
            {
              type: 'image',
              options: { hotspot: true },
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternatieve tekst',
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
          validation: (Rule) => Rule.max(6),
          hidden: ({ parent }) => parent?.mediaType !== 'gallery',
        },
      ],
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
      variant: 'variant',
      media: 'media.image',
      buttonCount: 'buttons',
    },
    prepare: ({ title, variant, media, buttonCount }) => ({
      title: title || 'Hero-sectie',
      subtitle: `${variant || 'buttonBanner'} • ${Array.isArray(buttonCount) ? buttonCount.length : 0} knop(pen)`,
      media,
    }),
  },
})
