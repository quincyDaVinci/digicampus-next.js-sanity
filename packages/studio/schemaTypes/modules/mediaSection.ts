import {defineField, defineType} from 'sanity'
import {VideoIcon} from '../../lib/featherIcons'
import ImageWithOverlayInput from '../../components/ImageWithOverlayInput'

/**
 * Media Section - Image or Video display with WCAG AA compliance
 * Supports various layout options and full accessibility features
 */
export default defineType({
  name: 'mediaSection',
  title: 'Media Section',
  type: 'object',
  icon: VideoIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'appearance', title: 'Appearance'},
    {name: 'accessibility', title: 'Accessibility'},
  ],
  fields: [
    defineField({
      name: 'variant',
      title: 'Layout Variant',
      type: 'string',
      group: 'appearance',
      options: {
        list: [
          {title: 'Full Width', value: 'fullWidth'},
          {title: 'Contained', value: 'contained'},
          {title: 'Split Screen', value: 'splitScreen'},
          {title: 'Card', value: 'card'},
        ],
        layout: 'radio',
      },
      initialValue: 'contained',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Optional heading for the media section',
      validation: (Rule) => Rule.max(100),
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Optional description or caption',
      group: 'content',
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      components: { input: ImageWithOverlayInput },
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the image for screen readers (WCAG requirement)',
          validation: (Rule) => Rule.required().error('Alt text is required for accessibility'),
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Optional visible caption below the image',
        },
      ],
      hidden: ({parent}) => parent?.mediaType !== 'image',
      validation: (Rule) =>
        Rule.custom((image, context) => {
          const parent = context.parent as {mediaType?: string}
          if (parent?.mediaType === 'image' && !image) {
            return 'Image is required when media type is set to Image'
          }
          return true
        }),
      group: 'content',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'object',
      fields: [
        {
          name: 'videoUrl',
          title: 'Video URL',
          type: 'url',
          description: 'YouTube, Vimeo, or direct video file URL',
          validation: (Rule) => Rule.required().error('Video URL is required'),
        },
        {
          name: 'posterImage',
          title: 'Poster Image',
          type: 'image',
          components: { input: ImageWithOverlayInput },
          description: 'Thumbnail shown before video plays',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
        {
          name: 'videoTitle',
          title: 'Video Title',
          type: 'string',
          description: 'Descriptive title for screen readers (recommended for accessibility)',
        },
        {
          name: 'transcript',
          title: 'Transcript',
          type: 'text',
          rows: 5,
          description: 'Full text transcript of the video (WCAG AA requirement)',
        },
        {
          name: 'captionsUrl',
          title: 'Captions File URL',
          type: 'url',
          description: 'URL to WebVTT captions file (.vtt)',
        },
        {
          name: 'autoplay',
          title: 'Autoplay',
          type: 'boolean',
          description: 'Auto-play video (muted). Not recommended for accessibility.',
          initialValue: false,
        },
        {
          name: 'loop',
          title: 'Loop',
          type: 'boolean',
          description: 'Loop video continuously',
          initialValue: false,
        },
        {
          name: 'controls',
          title: 'Show Controls',
          type: 'boolean',
          description: 'Show video player controls (required for accessibility)',
          initialValue: true,
        },
      ],
      hidden: ({parent}) => parent?.mediaType !== 'video',
      validation: (Rule) =>
        Rule.custom((video, context) => {
          const parent = context.parent as {mediaType?: string}
          if (parent?.mediaType === 'video' && !video) {
            return 'Video configuration is required when media type is set to Video'
          }
          return true
        }),
      group: 'content',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          {title: 'Original', value: 'auto'},
          {title: '16:9 (Widescreen)', value: '16/9'},
          {title: '4:3 (Standard)', value: '4/3'},
          {title: '1:1 (Square)', value: '1/1'},
          {title: '21:9 (Ultrawide)', value: '21/9'},
          {title: '9:16 (Portrait)', value: '9/16'},
        ],
      },
      initialValue: 'auto',
      group: 'appearance',
    }),
    defineField({
      name: 'maxWidth',
      title: 'Maximum Width',
      type: 'string',
      options: {
        list: [
          {title: 'Small (640px)', value: 'sm'},
          {title: 'Medium (768px)', value: 'md'},
          {title: 'Large (1024px)', value: 'lg'},
          {title: 'Extra Large (1280px)', value: 'xl'},
          {title: 'Full Width', value: 'full'},
        ],
      },
      initialValue: 'lg',
      hidden: ({parent}) => parent?.variant === 'fullWidth',
      group: 'appearance',
    }),
    defineField({
      name: 'rounded',
      title: 'Rounded Corners',
      type: 'boolean',
      description: 'Apply rounded corners to the media',
      initialValue: true,
      group: 'appearance',
    }),
    defineField({
      name: 'shadow',
      title: 'Drop Shadow',
      type: 'boolean',
      description: 'Add a subtle shadow effect',
      initialValue: false,
      group: 'appearance',
    }),
    defineField({
      name: 'ariaLabel',
      title: 'ARIA Label',
      type: 'string',
      description: 'Custom ARIA label for the media section (overrides default)',
      group: 'accessibility',
    }),
    defineField({
      name: 'ariaDescribedBy',
      title: 'ARIA Described By',
      type: 'string',
      description: 'ID of element that describes this media (for complex descriptions)',
      group: 'accessibility',
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
      mediaType: 'mediaType',
      variant: 'variant',
      image: 'image',
      posterImage: 'video.posterImage',
    },
    prepare: ({title, mediaType, variant, image, posterImage}) => ({
      title: title || 'Media Section',
      subtitle: `${mediaType || 'image'} - ${variant || 'contained'}`,
      media: image || posterImage || VideoIcon,
    }),
  },
})
