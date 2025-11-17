import {defineField, defineType} from 'sanity'
import {BookOpenIcon} from '../../lib/featherIcons'

export default defineType({
  name: 'blogSection',
  title: 'Blog Section',
  type: 'object',
  icon: BookOpenIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'layout', title: 'Layout'},
    {name: 'display', title: 'Display'},
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'variant',
      title: 'Layout Variant',
      type: 'string',
      group: 'layout',
      options: {
        list: [
          {title: 'Default', value: 'default'},
          {title: 'Dense Grid', value: 'grid'},
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'limit',
      title: 'Number of posts',
      type: 'number',
      group: 'layout',
      initialValue: 3,
      validation: (Rule) => Rule.min(1).max(12).warning('Keep between 1 and 12 posts'),
    }),
    defineField({
      name: 'tone',
      title: 'Card tone',
      type: 'string',
      group: 'display',
      options: {
        list: [
          {title: 'Surface', value: 'surface'},
          {title: 'Accent', value: 'accent'},
          {title: 'Contrast', value: 'contrast'},
        ],
        layout: 'radio',
      },
      initialValue: 'surface',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA label',
      type: 'string',
      group: 'display',
      initialValue: 'Lees meer',
    }),
    defineField({
      name: 'viewAllLink',
      title: 'View All Link',
      type: 'object',
      group: 'display',
      description: 'Optional: add a "View All" button linking to blog overview page',
      fields: [
        {name: 'label', type: 'string', title: 'Button Label', initialValue: 'Bekijk alle blogs'},
        {name: 'url', type: 'string', title: 'URL', initialValue: '/blog'},
      ],
    }),
    defineField({
      name: 'category',
      title: 'Filter by category',
      type: 'reference',
      to: [{type: 'blogCategory'}],
      group: 'content',
      description: 'Optional: only show posts from the selected category',
    }),
    defineField({
      name: 'attributes',
      title: 'Section attributes',
      type: 'module-attributes',
      group: 'display',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      limit: 'limit',
      tone: 'tone',
    },
    prepare: ({title, limit, tone}) => ({
      title: title || 'Blog Section',
      subtitle: `${limit || 3} posts · ${tone || 'surface'}`,
      media: BookOpenIcon,
    }),
  },
})
