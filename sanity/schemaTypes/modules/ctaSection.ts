import { defineField, defineType } from 'sanity'

/**
 * CTA Section
 * Extended to support multiple buttons with accessibility/PDF metadata.
 */
export default defineType({
  name: 'ctaSection',
  title: 'CTA Sectie',
  type: 'object',
  groups: [
    { name: 'content', title: 'Inhoud', default: true },
    { name: 'appearance', title: 'Weergave' },
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Kop',
      type: 'string',
      group: 'content',
      validation: Rule => Rule.max(120),
    }),
    defineField({
      name: 'subheading',
      title: 'Subkop',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: Rule => Rule.max(300),
    }),
    defineField({
      name: 'badgeText',
      title: 'Badge-tekst',
      type: 'string',
      group: 'content',
      validation: Rule => Rule.max(40),
    }),
    defineField({
      name: 'buttons',
      title: 'Actieknoppen',
      type: 'array',
      group: 'content',
      of: [
        defineField({
          name: 'button',
          type: 'object',
          title: 'Knop',
          fields: [
            { name: 'label', title: 'Label', type: 'string', validation: Rule => Rule.required().max(60) },
            { name: 'url', title: 'URL', type: 'string', validation: Rule => Rule.required() },
            {
              name: 'variant',
              title: 'Stijl',
              type: 'string',
              options: {
                list: [
                  { title: 'Gevuld', value: 'filled' },
                  { title: 'Omlijnd', value: 'outline' },
                  { title: 'Transparant', value: 'ghost' },
                  { title: 'CTA', value: 'cta' },
                ],
              },
              initialValue: 'filled',
            },
            {
              name: 'icon',
              title: 'Pictogram',
              type: 'string',
              options: {
                list: [
                  { title: 'Geen', value: 'none' },
                  { title: 'Pijl rechts', value: 'arrow-right' },
                  { title: 'Download', value: 'download' },
                  { title: 'Extern', value: 'external' },
                  { title: 'Video', value: 'video' },
                ],
              },
              initialValue: 'none',
            },
            {
              name: 'isPdf',
              title: 'Is dit een PDF-link?',
              type: 'boolean',
              description: 'Markeer dit wanneer de URL naar een PDF-bestand verwijst.',
            },
            {
              name: 'accessibleVersionUrl',
              title: 'Toegankelijke versie (URL)',
              type: 'url',
              description: 'Alternatieve of toegankelijke versie van het document.',
            },
            {
              name: 'accessibilityNote',
              title: 'Toegankelijkheidsopmerking',
              type: 'string',
              description: 'Extra schermlezertekst, bv. bij niet-toegankelijke PDF.',
            },
          ],
          preview: {
            select: { label: 'label', url: 'url', variant: 'variant' },
            prepare: ({ label, url, variant }) => ({
              title: label || 'Knop',
              subtitle: `${variant || 'filled'} – ${url}`,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'bannerBackground',
      title: 'Banner achtergrond',
      type: 'boolean',
      group: 'appearance',
      description: 'Toon een achtergrond die de volledige breedte van de pagina beslaat',
      initialValue: false,
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Achtergrondkleur',
      type: 'string',
      group: 'appearance',
      description: 'Kies de achtergrondkleur voor de banner',
      options: {
        list: [
          { title: 'Soft (Lichtgrijs)', value: 'soft' },
          { title: 'Accent (Primaire kleur)', value: 'accent' },
          { title: 'Geen (Transparant)', value: 'none' },
        ],
        layout: 'radio',
      },
      initialValue: 'soft',
      hidden: ({ parent }) => !parent?.bannerBackground,
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      group: 'appearance',
      options: {
        list: [
          { title: 'Geen afbeelding', value: 'noImage' },
          { title: 'Afbeelding links', value: 'imageLeft' },
          { title: 'Afbeelding rechts', value: 'imageRight' },
          { title: 'Afbeelding boven', value: 'imageTop' },
          { title: 'Afbeelding onder', value: 'imageBottom' },
        ],
      },
      initialValue: 'noImage',
    }),
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      group: 'content',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternatieve tekst',
          type: 'string',
          validation: Rule => Rule.required(),
        },
        {
          name: 'caption',
          title: 'Bijschrift',
          type: 'string',
        },
        {
          name: 'objectFit',
          title: 'Weergavemodus',
          type: 'string',
          options: {
            list: [
              { title: 'Bedekken (Cover)', value: 'cover' },
              { title: 'Bevatten (Contain)', value: 'contain' },
            ],
          },
          initialValue: 'cover',
        },
        {
          name: 'aspectRatio',
          title: 'Beeldverhouding',
          type: 'string',
          options: {
            list: [
              { title: 'Automatisch', value: 'auto' },
              { title: '16:9 (Widescreen)', value: '16/9' },
              { title: '4:3 (Standaard)', value: '4/3' },
              { title: '1:1 (Vierkant)', value: '1/1' },
              { title: '3:2 (Klassiek)', value: '3/2' },
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
      hidden: ({ parent }) => parent?.layout === 'noImage',
    }),
    defineField({
      name: 'attributes',
      title: 'Sectie-attributen',
      type: 'module-attributes',
      group: 'appearance',
    }),
  ],
  preview: {
    select: { heading: 'heading', buttons: 'buttons', layout: 'layout' },
    prepare: ({ heading, buttons, layout }) => ({
      title: heading || 'CTA Sectie',
      subtitle: `${buttons?.length || 0} knop(pen)${layout && layout !== 'noImage' ? ` - ${layout}` : ''}`,
    }),
  },
})
