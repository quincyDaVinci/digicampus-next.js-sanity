import {defineField, defineType} from 'sanity'

export const videoComponentType = defineType({
  name: 'videoComponent',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      description: 'Geef de video een korte beschrijving voor schermlezers.',
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Plak een YouTube-, Vimeo- of andere embed-URL.',
      validation: (rule) => rule.required(),
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
      url: 'videoUrl',
    },
    prepare({title, url}) {
      return {
        title: title || 'Video',
        subtitle: url,
      }
    },
  },
})
