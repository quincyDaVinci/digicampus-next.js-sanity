import {defineField, defineType} from 'sanity'
import {FileTextIcon} from '../../lib/featherIcons'

/**
 * Link object for internal/external links
 * Based on SanityPress pattern
 */
export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: FileTextIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Text displayed for the link',
    }),
    defineField({
      name: 'type',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          {title: 'Internal Page', value: 'internal'},
          {title: 'External URL', value: 'external'},
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'internal',
      title: 'Internal Page',
      type: 'reference',
      to: [{type: 'page'}, {type: 'homePage'}, {type: 'blogPost'}],
      hidden: ({parent}) => parent?.type !== 'internal',
    }),
    defineField({
      name: 'external',
      title: 'External URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
          allowRelative: true,
        }),
      hidden: ({parent}) => parent?.type !== 'external',
    }),
    defineField({
      name: 'params',
      title: 'URL Parameters',
      type: 'string',
      placeholder: 'e.g. #section-id or ?utm_source=campaign',
      description: 'Add hash links or query parameters',
      hidden: ({parent}) => parent?.type !== 'internal',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      type: 'type',
      internalTitle: 'internal.title',
      internalSlug: 'internal.metadata.slug.current',
      external: 'external',
      params: 'params',
    },
    prepare: ({label, type, internalTitle, internalSlug, external, params}) => {
      const href =
        type === 'internal'
          ? `/${internalSlug || ''}${params || ''}`
          : external
      return {
        title: label || internalTitle || 'Untitled link',
        subtitle: href || 'No URL set',
      }
    },
  },
})
