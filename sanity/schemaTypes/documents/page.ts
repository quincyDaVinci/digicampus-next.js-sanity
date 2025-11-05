import {defineField, defineType} from 'sanity'
import {FileTextIcon} from '../../lib/featherIcons'

/**
 * Page Document - Regular pages with modular sections
 * Combines SanityPress structure with sane-kit modules
 */
export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: FileTextIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'metadata', title: 'SEO & Metadata'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'The main title of the page',
      group: 'content',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'modules',
      title: 'Page Sections',
      type: 'array',
      description: 'Build your page by adding sections',
      of: [
        {type: 'heroSection'},
        {type: 'featureSection'},
        {type: 'blogSection'},
        {type: 'statsSection'},
        {type: 'testimonialsSection'},
        {type: 'pricingSection'},
        {type: 'casesSection'},
        {type: 'ctaSection'},
        {type: 'faqSection'},
        {type: 'contactSection'},
        {type: 'newsletterSection'},
        {type: 'compareFeaturesSection'},
      ],
      group: 'content',
      validation: (Rule) => Rule.min(1).error('Add at least one section to the page'),
    }),
    defineField({
      name: 'metadata',
      type: 'metadata',
      description: 'SEO settings and URL configuration',
      group: 'metadata',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'metadata.slug.current',
      noIndex: 'metadata.noIndex',
    },
    prepare: ({title, slug, noIndex}) => ({
      title: title || 'Untitled Page',
      subtitle: slug ? `/${slug}` : 'No slug set',
      media: noIndex ? '🔒' : FileTextIcon,
    }),
  },
})
