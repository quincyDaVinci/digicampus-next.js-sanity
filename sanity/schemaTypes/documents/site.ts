import {defineField, defineType} from 'sanity'
import {HomeIcon} from '../../lib/featherIcons'

/**
 * Site Settings - Global configuration
 * Based on SanityPress pattern
 */
export default defineType({
  name: 'site',
  title: 'Site Settings',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'branding', title: 'Branding', default: true},
    {name: 'navigation', title: 'Navigation'},
    {name: 'info', title: 'Site Info'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'The name of your website',
      group: 'branding',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
      group: 'branding',
    }),
    defineField({
      name: 'header',
      title: 'Header Navigation',
      type: 'reference',
      to: [{type: 'navigation'}],
      description: 'Select the navigation menu for the header',
      group: 'navigation',
    }),
    defineField({
      name: 'ctas',
      title: 'Header CTAs',
      type: 'array',
      of: [{type: 'cta'}],
      description: 'Call-to-action buttons in the header',
      group: 'navigation',
    }),
    defineField({
      name: 'footer',
      title: 'Footer Navigation',
      type: 'reference',
      to: [{type: 'navigation'}],
      description: 'Select the navigation menu for the footer',
      group: 'navigation',
    }),
    defineField({
      name: 'footerContent',
      title: 'Footer Content',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Rich text content for footer',
      group: 'info',
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Copyright notice in footer',
      group: 'info',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({title}) => ({
      title: title || 'Site Settings',
      subtitle: 'Global site configuration',
      media: HomeIcon,
    }),
  },
})
