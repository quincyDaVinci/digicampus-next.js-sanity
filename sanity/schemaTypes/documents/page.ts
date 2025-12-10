import { defineField, defineType } from 'sanity'
import { FileTextIcon } from '../../lib/featherIcons'

/**
 * Page Document - Regular pages with modular sections
 * Combines SanityPress structure with sane-kit modules
 */
export default defineType({
  name: 'page',
  title: 'Pagina',
  type: 'document',
  icon: FileTextIcon,
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
      description: 'De hoofd­titel van de pagina',
      group: 'content',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'modules',
      title: 'Paginasecties',
      type: 'array',
      description: 'Stel de pagina samen door secties toe te voegen',
      of: [
        { type: 'heroSection' },
        { type: 'featureSection' },
        { type: 'blogSection' },
        { type: 'testimonialsSection' },
        { type: 'pricingSection' },
        { type: 'teamSection' },
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
      validation: (Rule) => Rule.min(1).error('Voeg minimaal één sectie toe aan de pagina'),
    }),
    defineField({
      name: 'translations',
      title: 'Vertalingen',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      description:
        'Alle vertaalde tekst staat hier. Laat velden leeg om automatisch terug te vallen op de Nederlandse versie.',
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
      slug: 'metadata.localizedSlugs',
      noIndex: 'metadata.noIndex',
    },
    prepare: (selection: any) => {
      const { title, slug, noIndex } = selection || {}
      // `slug` here is the `localizedSlugs` object (may be undefined).
      let displayed = 'Geen slug ingesteld'
      try {
        const s: any = slug
        if (s) {
          const nl = (s?.nl as any)?.current
          const en = (s?.en as any)?.current
          const any = nl || en || ((Object.values(s || {}) as any[])?.[0]?.current)
          if (any) displayed = `/${any}`
        }
      } catch (err) {
        // ignore and fall back
      }
      return {
        title: title || 'Naamloze pagina',
        subtitle: displayed,
        media: noIndex ? '🔒' : FileTextIcon,
      }
    },
  },
})
