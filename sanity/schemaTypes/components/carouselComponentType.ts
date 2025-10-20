import {defineArrayMember, defineField, defineType} from 'sanity'

const spacingOptions = [
  {title: 'Compact', value: 'tight'},
  {title: 'Normaal', value: 'normal'},
  {title: 'Ruim', value: 'loose'},
]

export const carouselComponentType = defineType({
  name: 'carouselComponent',
  title: 'Carousel',
  type: 'object',
  fields: [
    defineField({
      name: 'ariaLabel',
      title: 'Aria-label',
      type: 'string',
      description: 'Beschrijf kort wat er in de carousel te vinden is, bijvoorbeeld "Project hoogtepunten".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'autoPlay',
      title: 'Automatisch afspelen',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'interval',
      title: 'Autoplay interval (ms)',
      type: 'number',
      hidden: ({parent}) => !parent?.autoPlay,
      initialValue: 8000,
      validation: (rule) => rule.min(3000).max(20000),
    }),
    defineField({
      name: 'showIndicators',
      title: 'Toon paginanavigatie',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'spacing',
      title: 'Ruimte tussen items',
      type: 'string',
      options: {list: spacingOptions},
      initialValue: 'normal',
    }),
    defineField({
      name: 'items',
      title: 'Items in de carousel',
      type: 'array',
      of: [
        defineArrayMember({type: 'imageComponent', title: 'Afbeelding'}),
        defineArrayMember({type: 'richTextComponent', title: 'Tekst'}),
        defineArrayMember({type: 'videoComponent', title: 'Video'}),
        defineArrayMember({type: 'buttonComponent', title: 'Knop'}),
        defineArrayMember({type: 'blogCardComponent', title: 'Blogkaart'}),
      ],
      validation: (rule) => rule.min(1).error('Een carousel heeft minstens één item nodig.'),
    }),
  ],
  preview: {
    select: {
      count: 'items.length',
    },
    prepare({count}) {
      return {
        title: 'Carousel',
        subtitle: count ? `${count} item${count === 1 ? '' : 's'}` : 'Nog geen items',
      }
    },
  },
})
