import {PlayIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const videoBlockType = defineType({
  name: 'videoBlock',
  title: 'Video',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titel (optioneel)',
      type: 'string',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Plak hier de deel-link van bijvoorbeeld YouTube of Vimeo.',
      validation: (rule) => rule.required().uri({allowRelative: false}),
    }),
    defineField({
      name: 'caption',
      title: 'Omschrijving (optioneel)',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      videoUrl: 'videoUrl',
    },
    prepare({title, videoUrl}) {
      return {
        title: title || 'Video',
        subtitle: videoUrl,
      }
    },
  },
})
