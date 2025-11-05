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
      title: 'Meta Title',
      type: 'string',
      description: 'SEO title (appears in search results and browser tabs)',
      validation: (Rule) => Rule.max(60).warning('Keep under 60 characters for best SEO'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'SEO description (appears in search results)',
      validation: (Rule) => Rule.max(160).warning('Keep under 160 characters for best SEO'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'URL Slug',
      description: 'The URL path for this page',
      options: {
        source: (doc: any) => doc.title || doc.metadata?.title,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required().error('Slug is required for page URLs'),
    }),
    defineField({
      name: 'image',
      title: 'Social Sharing Image',
      type: 'image',
      description: 'Used for social media previews (Facebook, Twitter, LinkedIn)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for accessibility and SEO',
        },
      ],
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'Prevent search engines from indexing this page',
      initialValue: false,
    }),
  ],
})
