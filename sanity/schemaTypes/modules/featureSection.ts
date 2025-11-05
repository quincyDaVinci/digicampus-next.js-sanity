import {defineField, defineType} from 'sanity'
import {ZapIcon} from '../../lib/featherIcons'

/**
 * Feature Section - Multiple layout variants
 * From sane-kit template
 */
export default defineType({
  name: 'featureSection',
  title: 'Feature Section',
  type: 'object',
  icon: ZapIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'appearance', title: 'Appearance'},
    {name: 'features', title: 'Features'},
  ],
  fields: [
    defineField({
      name: 'variant',
      title: 'Layout Variant',
      type: 'string',
      group: 'appearance',
      options: {
        list: [
          {title: 'Default Grid', value: 'default'},
          {title: 'With Image', value: 'withImage'},
          {title: 'Image Left', value: 'leftImage'},
          {title: 'Image Right', value: 'rightImage'},
          {title: 'Image Cards', value: 'imageCards'},
          {title: 'Masonry Grid', value: 'masonryGrid'},
          {title: 'Big Masonry', value: 'bigMasonryGrid'},
          {title: 'Carousel', value: 'carouselFeature'},
          {title: 'Sliding Comparison', value: 'slidingComparison'},
        ],
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.max(100),
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
      name: 'image',
      title: 'Section Image',
      type: 'image',
      description: 'Used in image-based variants',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (Rule) => Rule.required(),
        },
      ],
      hidden: ({parent}) =>
        !['withImage', 'leftImage', 'rightImage', 'slidingComparison'].includes(
          parent?.variant
        ),
      group: 'content',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Feature Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {
                list: [
                  {title: 'User', value: 'user'},
                  {title: 'Settings', value: 'settings'},
                  {title: 'Lock', value: 'lock'},
                  {title: 'Star', value: 'star'},
                  {title: 'Heart', value: 'heart'},
                  {title: 'Bar Chart', value: 'barChart'},
                  {title: 'Dollar', value: 'dollar'},
                  {title: 'Calendar', value: 'calendar'},
                ],
              },
            },
            {
              name: 'image',
              title: 'Feature Image',
              type: 'image',
              description: 'For image-based variants',
              options: {hotspot: true},
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternative Text',
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image',
            },
          },
        },
      ],
      group: 'features',
      validation: (Rule) => Rule.min(1).error('Add at least one feature'),
    }),
    defineField({
      name: 'attributes',
      title: 'Section Attributes',
      type: 'module-attributes',
      group: 'appearance',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      variant: 'variant',
      count: 'features.length',
    },
    prepare: ({title, variant, count}) => ({
      title: title || 'Feature Section',
      subtitle: `${variant || 'default'} - ${count || 0} features`,
      media: ZapIcon,
    }),
  },
})
