import {defineField, defineType} from 'sanity'

/**
 * Metadata object for SEO and page metadata
 * Based on SanityPress pattern
 */
export default defineType({
  name: 'metadata',
  title: 'Metadata',
  type: 'object',
  fields: [
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
      name: 'slug',
      type: 'slug',
      title: 'URL-slug',
      description: 'Het URL-pad voor deze pagina',
      options: {
        source: (doc: any) => doc.title || doc.metadata?.title,
        maxLength: 96,
      },
      validation: (Rule) => Rule.custom((slug, context) => {
        // Homepage doesn't need a slug (always renders at /)
        if (context.document?._type === 'homePage') {
          return true
        }
        // For regular pages, slug is required
        if (!slug?.current) {
          return "Slug is vereist voor pagina-URL's"
        }
        return true
      }),
    }),
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
