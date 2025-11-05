import {defineField, defineType} from 'sanity'
import {ImageIcon} from '../../lib/featherIcons'

/**
 * Hero Section - Multiple variants
 * From sane-kit template
 */
export default defineType({
  name: 'heroSection',
  title: 'Hero-sectie',
  type: 'object',
  icon: ImageIcon,
  groups: [
    {name: 'content', title: 'Inhoud', default: true},
    {name: 'appearance', title: 'Weergave'},
    {name: 'media', title: 'Media'},
  ],
  fields: [
    defineField({
      name: 'variant',
      title: 'Lay-outvariant',
      type: 'string',
      group: 'appearance',
      options: {
        list: [
          {title: 'Banner met knop', value: 'buttonBanner'},
          {title: 'Banner met badge', value: 'badgeBanner'},
          {title: 'Rastergalerij', value: 'gridGallery'},
        ],
        layout: 'radio',
      },
      initialValue: 'buttonBanner',
    }),
    defineField({
      name: 'heading',
      title: 'Kop',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
      group: 'content',
    }),
    defineField({
      name: 'subheading',
      title: 'Subkop',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(250),
      group: 'content',
    }),
    defineField({
      name: 'badgeText',
      title: 'Badge-tekst',
      type: 'string',
      description: 'Small text badge (for badgeBanner variant)',
      validation: (Rule) => Rule.max(40),
      group: 'content',
    }),
    defineField({
      name: 'bannerButton',
      title: 'Bannerknop',
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
      title: 'Actieknoppen',
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
              title: 'Stijl',
              options: {
                list: [
                  {title: 'Standaard', value: 'default'},
                  {title: 'Secundair', value: 'secondary'},
                  {title: 'Omlijnd', value: 'outline'},
                  {title: 'Transparant', value: 'ghost'},
                ],
              },
              initialValue: 'default',
            },
            {
              name: 'icon',
              type: 'string',
              title: 'Pictogram',
              options: {
                list: [
                  {title: 'Geen', value: 'none'},
                  {title: 'Pijl rechts', value: 'arrowRight'},
                  {title: 'Telefoon', value: 'phone'},
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
              title: label || 'Knop',
              subtitle: url,
            }),
          },
        },
      ],
      group: 'content',
    }),
    defineField({
      name: 'media',
      title: 'Hero-media',
      type: 'object',
      group: 'media',
      fields: [
        {
          name: 'mediaType',
          title: 'Mediatype',
          type: 'string',
          options: {
            list: [
              {title: 'Afbeelding', value: 'image'},
              {title: 'Video', value: 'video'},
              {title: 'Galerij', value: 'gallery'},
            ],
          },
          initialValue: 'image',
        },
        {
          name: 'image',
          title: 'Afbeelding',
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternatieve tekst',
            },
          ],
          hidden: ({parent}) => parent?.mediaType !== 'image',
        },
        {
          name: 'videoUrl',
          title: 'Video-URL',
          type: 'url',
          hidden: ({parent}) => parent?.mediaType !== 'video',
        },
        {
          name: 'gallery',
          title: 'Galerijafbeeldingen',
          type: 'array',
          of: [
            {
              type: 'image',
              options: {hotspot: true},
              fields: [
                {
                  name: 'alt',
                  type: 'string',
                  title: 'Alternatieve tekst',
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
      title: 'Sectie-attributen',
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
      title: title || 'Hero-sectie',
      subtitle: `Variant: ${variant || 'buttonBanner'}`,
      media,
    }),
  },
})
