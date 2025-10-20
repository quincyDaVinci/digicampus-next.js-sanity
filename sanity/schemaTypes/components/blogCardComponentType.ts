import {defineField, defineType} from 'sanity'

const selectionOptions = [
  {title: 'Handmatig blog kiezen', value: 'manual'},
  {title: 'Automatisch selecteren', value: 'automatic'},
]

const automaticOptions = [
  {title: 'Meest recent', value: 'recent'},
  {title: 'Oudste', value: 'oldest'},
  {title: 'Populair (veld "popularity")', value: 'popular'},
  {title: 'Op auteur', value: 'author'},
  {title: 'Op datum (custom)', value: 'date'},
]

const toneOptions = [
  {title: 'Oppervlak', value: 'surface'},
  {title: 'Accent', value: 'accent'},
  {title: 'Contrast', value: 'contrast'},
]

export const blogCardComponentType = defineType({
  name: 'blogCardComponent',
  title: 'Blogkaart',
  type: 'object',
  fields: [
    defineField({
      name: 'selectionMode',
      title: 'Selectiemethode',
      type: 'string',
      options: {list: selectionOptions, layout: 'radio'},
      initialValue: 'manual',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'post',
      title: 'Blogpost',
      type: 'reference',
      to: [{type: 'post'}],
      hidden: ({parent}) => parent?.selectionMode !== 'manual',
      validation: (rule) => rule.custom((value, context) => {
        if (context.parent?.selectionMode === 'manual' && !value) {
          return 'Kies een blogpost.'
        }
        return true
      }),
    }),
    defineField({
      name: 'automaticSort',
      title: 'Automatische selectie',
      type: 'string',
      options: {list: automaticOptions},
      hidden: ({parent}) => parent?.selectionMode !== 'automatic',
      initialValue: 'recent',
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      to: [{type: 'author'}],
      hidden: ({parent}) => !(parent?.selectionMode === 'automatic' && parent?.automaticSort === 'author'),
    }),
    defineField({
      name: 'limit',
      title: 'Aantal kaarten',
      description: 'Bij automatische selectie kun je meerdere kaarten tonen.',
      type: 'number',
      initialValue: 1,
      validation: (rule) => rule.min(1).max(12),
      hidden: ({parent}) => parent?.selectionMode !== 'automatic',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA tekst',
      type: 'string',
      initialValue: 'Lees meer',
    }),
    defineField({
      name: 'tone',
      title: 'Stijl van de kaart',
      type: 'string',
      options: {list: toneOptions},
      initialValue: 'surface',
    }),
  ],
  preview: {
    select: {
      selection: 'selectionMode',
      postTitle: 'post.title',
      sort: 'automaticSort',
    },
    prepare({selection, postTitle, sort}) {
      if (selection === 'manual') {
        return {
          title: postTitle || 'Blogkaart',
          subtitle: 'Handmatig geselecteerd',
        }
      }
      return {
        title: 'Blogkaart (automatisch)',
        subtitle: sort ? `Sortering: ${sort}` : 'Automatisch',
      }
    },
  },
})
