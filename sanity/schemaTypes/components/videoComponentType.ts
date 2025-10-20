import {defineField, defineType} from 'sanity'

export const videoComponentType = defineType({
  name: 'videoComponent',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'sourceType',
      title: 'Bron',
      type: 'string',
      options: {
        list: [
          {title: 'Externe embed (YouTube, Vimeo)', value: 'external'},
          {title: 'Geüploade video', value: 'file'},
        ],
        layout: 'radio',
      },
      initialValue: 'external',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      hidden: ({parent}) => parent?.sourceType !== 'external',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.parent?.sourceType === 'external' && !value) {
            return 'Voer een video URL in.'
          }
          return true
        }),
    }),
    defineField({
      name: 'videoFile',
      title: 'Videobestand',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      hidden: ({parent}) => parent?.sourceType !== 'file',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.parent?.sourceType === 'file' && !value?.asset) {
            return 'Upload een videobestand.'
          }
          return true
        }),
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
      name: 'title',
      title: 'Videotitel (voor aria-label)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'transcript',
      title: 'Transcript (plain text of markdown)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'captionsFile',
      title: 'Ondertiteling (VTT of SRT)',
      type: 'file',
      options: {
        accept: '.vtt,.srt,text/vtt,application/x-subrip',
      },
    }),
    defineField({
      name: 'showControls',
      title: 'Toon video controls',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'autoPlay',
      title: 'Autoplay (alleen met geluid uit)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'muted',
      title: 'Video standaard gedempt',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'loop',
      title: 'Video in lus afspelen',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      if (!value) return true
      if (!value.captionsFile && !value.transcript) {
        return 'Voeg een transcript of ondertiteling toe om aan WCAG te voldoen.'
      }
      if (value.autoPlay && !value.muted) {
        return 'Autoplay is alleen toegestaan wanneer het geluid standaard gedempt is.'
      }
      return true
    }),
  preview: {
    select: {
      title: 'title',
      sourceType: 'sourceType',
    },
    prepare({title, sourceType}) {
      return {
        title: title || 'Video',
        subtitle: sourceType === 'file' ? 'Geüploade video' : 'Externe embed',
      }
    },
  },
})
