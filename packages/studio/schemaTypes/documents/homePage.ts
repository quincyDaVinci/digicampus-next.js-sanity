import { defineField, defineType } from 'sanity'
import { HomeIcon } from '../../lib/featherIcons'

/**
 * Homepage - Singleton document
 * Same structure as page but only one instance
 */
export default defineType({
  name: 'homePage',
  title: 'Startpagina',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'content', title: 'Inhoud', default: true },
    { name: 'translations', title: 'Vertalingen' },
    { name: 'metadata', title: 'SEO & metadata' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Paginatitel',
      type: 'string',
      description: 'De hoofd­titel van de startpagina',
      group: 'content',
      validation: (Rule) => Rule.required().max(100),
      initialValue: 'Startpagina',
    }),
    defineField({
      name: 'modules',
      title: 'Paginasecties',
      type: 'array',
      description: 'Stel de startpagina samen door secties toe te voegen',
      of: [
        { type: 'heroSection' },
        { type: 'featureSection' },
        { type: 'blogSection' },
        { type: 'testimonialsSection' },
        { type: 'pricingSection' },
        { type: 'ctaSection' },
        { type: 'faqSection' },
        { type: 'contactSection' },
        { type: 'newsletterSection' },
        { type: 'mediaSection' },
        { type: 'documentAsset' },
        // SchemaUI sections
        { type: 'splitSection' },
        { type: 'sectionHeader' },
        { type: 'logoCloudSection' },
      ],
      group: 'content',
      validation: (Rule) => Rule.min(1).error('Voeg minimaal één sectie toe aan de startpagina'),
    }),
    defineField({
      name: 'translations',
      title: 'Vertalingen',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      description:
        'Groep alle vertaalde tekst op één plek. Laat leeg als je de Nederlandse canonieke tekst wilt gebruiken.',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'object',
          options: { columns: 1 },
          fields: [
            defineField({ name: 'title', title: 'Titel (EN)', type: 'string' }),
            defineField({ name: 'metadataTitle', title: 'Metatitel (EN)', type: 'string' }),
            defineField({
              name: 'metadataDescription',
              title: 'Metabeschrijving (EN)',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'modules',
              title: 'Module-tekst overschrijvingen',
              type: 'array',
              of: [{ type: 'moduleTextOverride' }],
              description:
                'Alleen tekst. Gebruik de module _key en veldnaam (bijv. heading of buttons.0.label) om copy te vertalen.',
            }),
          ],
        }),
      ],
      group: 'translations',
    }),
    defineField({
      name: 'metadata',
      type: 'metadata',
      description: 'SEO-instellingen en URL-configuratie',
      group: 'metadata',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }) => ({
      title: title || 'Startpagina',
      subtitle: 'Startpagina (singleton)',
      media: HomeIcon,
    }),
  },
})
