/* eslint-disable @typescript-eslint/no-explicit-any */
import {FileTextIcon} from '../lib/featherIcons'
import {defineArrayMember, defineField, defineType} from 'sanity'

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
      description: 'Voeg contentblokken toe en orden ze zoals je wilt.',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({type: 'richTextComponent', title: 'Tekst'}),
        defineArrayMember({type: 'imageComponent', title: 'Afbeelding'}),
        defineArrayMember({type: 'videoComponent', title: 'Video'}),
        defineArrayMember({type: 'buttonComponent', title: 'Knop'}),
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
              if (!block || block._type !== 'richTextComponent') return count
              const portableText = Array.isArray(block.content) ? block.content : []
              return (
                count +
                portableText.filter((item: any) => item?._type === 'block' && item?.style === 'h1').length
              )
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
