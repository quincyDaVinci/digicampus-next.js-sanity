import {defineField, defineType} from 'sanity'
import {HomeIcon} from '../../lib/featherIcons'

/**
 * Homepage - Singleton document
 * Same structure as page but only one instance
 */
export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'metadata', title: 'SEO & Metadata'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'The main title of the homepage',
      group: 'content',
      validation: (Rule) => Rule.required().max(100),
      initialValue: 'Home',
    }),
    defineField({
      name: 'modules',
      title: 'Page Sections',
      type: 'array',
      description: 'Build your homepage by adding sections',
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
      validation: (Rule) => Rule.min(1).error('Add at least one section to the homepage'),
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
    },
    prepare: ({title}) => ({
      title: title || 'Home Page',
      subtitle: 'Homepage (Singleton)',
      media: HomeIcon,
    }),
  },
})
