import {defineField, defineType} from 'sanity'

export const videoComponentType = defineType({
  name: 'videoComponent',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel (zichtbaar voor schermlezers)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Plak een YouTube- of Vimeo-link, of een directe videourl.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'poster',
      title: 'Poster afbeelding',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternatieve tekst',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'transcript',
      title: 'Transcript (optioneel)',
      type: 'text',
      rows: 4,
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
