/* eslint-disable @typescript-eslint/no-explicit-any */
import {defineArrayMember, defineField, defineType} from 'sanity'
import {FileTextIcon} from '../lib/featherIcons'

export const pageType = defineType({
  name: 'page',
  title: 'Pagina',
  type: 'document',
  icon: FileTextIcon,
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'settings', title: 'Instellingen'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Korte omschrijving',
      type: 'text',
      rows: 2,
      group: 'content',
      description: 'Optioneel: korte intro voor navigatie of SEO.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      options: {
        source: 'title',
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, ''),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'blocks',
      title: 'Pagina blokken',
      description: 'Voeg blokken toe en sleep ze om de volgorde van de pagina te bepalen.',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({type: 'textBlock', title: 'Tekst'}),
        defineArrayMember({type: 'imageBlock', title: 'Afbeelding'}),
        defineArrayMember({type: 'videoBlock', title: 'Video'}),
        defineArrayMember({type: 'buttonBlock', title: 'Knop'}),
      ],
      validation: (rule) =>
        rule
          .min(1)
          .error('Een pagina heeft minstens één blok nodig.')
          .custom((blocks) => {
            if (!Array.isArray(blocks)) {
              return 'Voeg minimaal één blok toe.'
            }

            const totalH1 = blocks.reduce((count: number, block: any) => {
              if (block?._type !== 'textBlock') return count
              const content = Array.isArray(block.content) ? block.content : []
              const h1s = content.filter((item: any) => item?.style === 'h1').length
              return count + h1s
            }, 0)

            if (totalH1 > 1) {
              return 'Er mag maximaal één H1 op de pagina staan om aan WCAG te voldoen.'
            }

            return true
          }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({title, slug}) {
      return {
        title: title || 'Nieuwe pagina',
        subtitle: slug ? `/${slug}` : 'Nog geen slug',
      }
    },
  },
})
