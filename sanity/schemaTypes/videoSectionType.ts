import { VideoIcon } from '../lib/featherIcons'
import { defineField, defineType } from 'sanity'

export const videoSectionType = defineType({
  name: 'videoSection',
  title: 'Video sectie',
  type: 'object',
  icon: VideoIcon,
  fields: [
    defineField({
      name: 'stylePreset',
      title: 'Stijlvariant',
      type: 'string',
      options: {
        list: [
          { title: 'Gebalanceerd', value: 'structured' },
          { title: 'Verfrissend', value: 'fresh' },
          { title: 'Contrasterend', value: 'contrast' },
        ],
        layout: 'radio',
      },
      initialValue: 'structured',
    }),
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(120),
    }),
    defineField({
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(320),
    }),
    defineField({
      name: 'videoUrl',
      title: 'YouTube URL',
      type: 'url',
      validation: (rule) =>
        rule
          .uri({ allowRelative: false, scheme: ['http', 'https'] })
          .required(),
    }),
    defineField({
      name: 'videoTitle',
      title: 'Alternatieve titel voor video',
      type: 'string',
      description: 'Wordt gebruikt als title attribuut voor de iframe en voor schermlezers.',
      validation: (rule) => rule.max(140),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'videoUrl',
    },
  },
})