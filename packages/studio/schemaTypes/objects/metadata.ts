import {defineField, defineType} from 'sanity'
import SeoGenerator from '../../components/SeoGenerator'

/**
 * Metadata object for SEO and page metadata
 * Based on SanityPress pattern
 */
export default defineType({
  name: 'metadata',
  title: 'Metadata',
  type: 'object',
  components: { input: SeoGenerator },
  fields: [
    defineField({
      name: 'language',
      title: 'Taal',
      type: 'string',
      description: 'Welke taal is de canonieke versie van deze pagina?',
      options: {
        list: [
          {title: 'Nederlands', value: 'nl'},
          {title: 'English', value: 'en'},
        ],
        layout: 'radio',
      },
      initialValue: 'nl',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Metatitel',
      type: 'string',
      description: 'SEO-titel (verschijnt in zoekresultaten en browsertabs)',
      validation: (Rule) => Rule.max(60).warning('Houd het onder 60 tekens voor beste SEO'),
    }),
    defineField({
      name: 'description',
      title: 'Metabeschrijving',
      type: 'text',
      rows: 3,
      description: 'SEO-beschrijving (verschijnt in zoekresultaten)',
      validation: (Rule) => Rule.max(160).warning('Houd het onder 160 tekens voor beste SEO'),
    }),
    defineField({
      name: 'localizedSlugs',
      title: 'Taal-specifieke slugs',
      type: 'object',
      description: 'Gebruik verschillende URL-segmenten per taal. Als leeg, wordt de standaard slug gebruikt.',
      options: {columns: 2},
      fields: [
        defineField({
          name: 'nl',
          type: 'slug',
          title: 'Slug (NL)',
          options: {
            source: (doc: any) => doc.title || doc.metadata?.title,
            maxLength: 96,
          },
        }),
        defineField({
          name: 'en',
          type: 'slug',
          title: 'Slug (EN)',
          options: {
            source: (doc: any) => doc.title || doc.metadata?.title,
            maxLength: 96,
          },
        }),
      ],
    }),
    // Note: `slug` (single URL slug) intentionally removed in favour of `localizedSlugs`.
    // Localized slugs allow editors to set language-specific URL segments and avoid
    // having to keep a separate, global `slug` field. Use `localizedSlugs.nl` or
    // `localizedSlugs.en` where appropriate.
    defineField({
      name: 'image',
      title: 'Sociale deelafbeelding',
      type: 'image',
      description: 'Gebruikt voor social previews (Facebook, X, LinkedIn)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternatieve tekst',
          description: 'Belangrijk voor toegankelijkheid en SEO',
        },
      ],
    }),
    defineField({
      name: 'noIndex',
      title: 'Verbergen voor zoekmachines',
      type: 'boolean',
      description: 'Voorkom dat zoekmachines deze pagina indexeren',
      initialValue: false,
    }),
  ],
})
