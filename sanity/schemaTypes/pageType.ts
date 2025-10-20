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
      name: 'sections',
      title: 'Page builder',
      description: 'Voeg secties toe en sleep ze om de opbouw van de pagina te bepalen.',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'pageSection'})],
      validation: (rule) =>
        rule
          .min(1)
          .error('Een pagina heeft minstens één sectie nodig.')
          .custom((sections) => {
            if (!Array.isArray(sections)) {
              return 'Voeg minimaal één sectie toe.'
            }

            const countH1 = (item: any): number => {
              if (!item) return 0
              if (item._type === 'richTextComponent') {
                const blocks = Array.isArray(item.content) ? item.content : []
                return blocks.filter((block: any) => block?.style === 'h1').length
              }
              if (item._type === 'carouselComponent') {
                return (item.items ?? []).reduce((sum: number, sub: any) => sum + countH1(sub), 0)
              }
              return 0
            }

            const totalH1 = sections.reduce((sectionCount: number, section: any) => {
              const columns = Array.isArray(section?.columns) ? section.columns : []
              const columnCount = columns.reduce((columnSum: number, column: any) => {
                const components = Array.isArray(column?.components) ? column.components : []
                return columnSum + components.reduce((componentSum: number, component: any) => componentSum + countH1(component), 0)
              }, 0)
              return sectionCount + columnCount
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
