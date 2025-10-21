import {FileTextIcon} from '../lib/featherIcons'
import {defineArrayMember, defineField, defineType} from 'sanity'

type PortableTextBlock = {style?: string}
type RichTextComponent = {_type: 'richTextComponent'; content?: PortableTextBlock[]}
type CarouselComponent = {_type: 'carouselComponent'; items?: PageBuilderComponent[]}
type PageBuilderComponent =
  | RichTextComponent
  | CarouselComponent
  | (Record<string, unknown> & {_type?: string})
type PageBuilderColumn = {components?: PageBuilderComponent[]}
type PageBuilderSection = {columns?: PageBuilderColumn[]}

function isRichTextComponent(component: PageBuilderComponent): component is RichTextComponent {
  return component?._type === 'richTextComponent'
}

function isCarouselComponent(component: PageBuilderComponent): component is CarouselComponent {
  return component?._type === 'carouselComponent'
}

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
      description: '📝 De naam van de pagina zoals die ook in het overzicht verschijnt.',
    }),
    defineField({
      name: 'description',
      title: 'Korte omschrijving',
      type: 'text',
      rows: 2,
      group: 'content',
      description: '💬 Korte intro voor navigatie of SEO. Laat leeg als je deze niet nodig hebt.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'settings',
      description: '🔗 Bepaalt de URL (bijvoorbeeld /over-ons). Wordt automatisch ingevuld op basis van de titel.',
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
      title: '🧩 Pagina-opbouw',
      description:
        'Voeg secties toe en sleep ze om de opbouw van de pagina te bepalen. Elke sectie heeft heldere instellingen met icoontjes.',
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

            const countH1 = (component?: PageBuilderComponent): number => {
              if (!component) return 0
              if (isRichTextComponent(component)) {
                const blocks = Array.isArray(component.content) ? component.content : []
                return blocks.filter((block) => block?.style === 'h1').length
              }
              if (isCarouselComponent(component)) {
                return (component.items ?? []).reduce((sum, item) => sum + countH1(item), 0)
              }
              return 0
            }

            const totalH1 = (sections as PageBuilderSection[]).reduce((sectionCount, section) => {
              const columns = Array.isArray(section?.columns) ? section.columns : []
              const columnCount = columns.reduce((columnSum, column) => {
                const components = Array.isArray(column?.components) ? column.components : []
                return columnSum + components.reduce((componentSum, component) => componentSum + countH1(component), 0)
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
