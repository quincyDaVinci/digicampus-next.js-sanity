import {defineField, defineType} from 'sanity'
import {ImageIcon} from '../../lib/featherIcons'

/**
 * Hero Section - Multiple variants
 * From sane-kit template
 */
export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  icon: ImageIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'appearance', title: 'Appearance'},
    {name: 'media', title: 'Media'},
  ],
  fields: [
    defineField({
      name: 'variant',
      title: 'Layout Variant',
      type: 'string',
      group: 'appearance',
      options: {
        list: [
          {title: 'Button Banner', value: 'buttonBanner'},
          {title: 'Badge Banner', value: 'badgeBanner'},
          {title: 'Grid Gallery', value: 'gridGallery'},
        ],
        layout: 'radio',
      },
      initialValue: 'buttonBanner',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
      group: 'content',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(250),
      group: 'content',
    }),
    defineField({
      name: 'badgeText',
      title: 'Badge Text',
      type: 'string',
      description: 'Small text badge (for badgeBanner variant)',
      validation: (Rule) => Rule.max(40),
      group: 'content',
    }),
    defineField({
      name: 'bannerButton',
      title: 'Banner Button',
      type: 'object',
      description: 'Special button displayed in banner (buttonBanner variant)',
      hidden: ({parent}) => parent?.variant !== 'buttonBanner',
      group: 'content',
      fields: [
        {
          name: 'label',
          title: 'Label',
          type: 'string',
        },
        {
          name: 'url',
          title: 'URL',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'buttons',
      title: 'Action Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'url', type: 'string', title: 'URL'},
            {
              name: 'variant',
              type: 'string',
              title: 'Style',
              options: {
                list: [
                  {title: 'Default', value: 'default'},
                  {title: 'Secondary', value: 'secondary'},
                  {title: 'Outline', value: 'outline'},
                  {title: 'Ghost', value: 'ghost'},
                ],
              },
              initialValue: 'default',
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Icon',
              options: {
                list: [
                  {title: 'None', value: 'none'},
                  {title: 'Arrow Right', value: 'arrowRight'},
                  {title: 'Phone', value: 'phone'},
                ],
              },
            },
          ],
          preview: {
            select: {
              label: 'label',
              url: 'url',
            },
            prepare: ({label, url}) => ({
              title: label || 'Button',
              subtitle: url,
            }),
          },
        },
      ],
      group: 'content',
    }),
    defineField({
      name: 'media',
      title: 'Hero Media',
      type: 'object',
      group: 'media',
      fields: [
        {
          name: 'mediaType',
          title: 'Media Type',
          type: 'string',
          options: {
            list: [
              {title: 'Image', value: 'image'},
              {title: 'Video', value: 'video'},
              {title: 'Gallery', value: 'gallery'},
            ],
          },
          initialValue: 'image',
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            },
          ],
          hidden: ({parent}) => parent?.mediaType !== 'image',
        },
        {
          name: 'videoUrl',
          title: 'Video URL',
          type: 'url',
          hidden: ({parent}) => parent?.mediaType !== 'video',
        },
        {
          name: 'gallery',
          title: 'Gallery Images',
          type: 'array',
          of: [
            {
              type: 'image',
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
          hidden: ({parent}) => parent?.mediaType !== 'gallery',
        },
      ],
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
      media: 'media.image',
    },
    prepare: ({title, variant, media}) => ({
      title: title || 'Hero Section',
      subtitle: `Variant: ${variant || 'buttonBanner'}`,
      media,
    }),
  },
})
