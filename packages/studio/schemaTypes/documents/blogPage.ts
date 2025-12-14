import {defineField, defineType} from 'sanity'
import {BookOpenIcon} from '../../lib/featherIcons'

/**
 * BlogPage - Singleton document for blog listing page configuration
 * Controls how the dedicated blog page displays and highlights posts
 */
export default defineType({
  name: 'blogPage',
  title: 'Blogpagina',
  type: 'document',
  icon: BookOpenIcon,
  groups: [
    {name: 'content', title: 'Inhoud', default: true},
    {name: 'display', title: 'Weergave'},
    {name: 'metadata', title: 'SEO & metadata'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Paginatitel',
      type: 'string',
      description: 'De hoofdtitel van de blogpagina',
      group: 'content',
      validation: (Rule) => Rule.required().max(100),
      initialValue: 'Blog',
    }),
    defineField({
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
      rows: 3,
      description: 'Korte beschrijving die onder de titel wordt weergegeven',
      group: 'content',
    }),
    defineField({
      name: 'highlightCriteria',
      title: 'Uitlicht criteria',
      type: 'string',
      description: 'Hoe moeten de 3 uitgelichte berichten in de zijbalk worden geselecteerd?',
      group: 'display',
      options: {
        list: [
          {title: 'Meest bekeken (populariteit)', value: 'viewCount'},
          {title: 'Uitgelichte berichten', value: 'featured'},
          {title: 'Nieuwste berichten', value: 'newest'},
          {title: 'Kortste leestijd', value: 'readTime'},
        ],
        layout: 'radio',
      },
      initialValue: 'viewCount',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'highlightCount',
      title: 'Aantal uitgelichte berichten',
      type: 'number',
      description: 'Hoeveel berichten worden weergegeven in de zijbalk',
      group: 'display',
      initialValue: 3,
      validation: (Rule) => Rule.required().min(1).max(6).integer(),
    }),
    defineField({
      name: 'postsPerPage',
      title: 'Berichten per pagina',
      type: 'number',
      description: 'Hoeveel berichten worden per pagina weergegeven',
      group: 'display',
      initialValue: 12,
      validation: (Rule) => Rule.required().min(6).max(24).integer(),
    }),
    defineField({
      name: 'metadata',
      type: 'metadata',
      description: 'SEO-instellingen (de blogpagina is altijd toegankelijk via /blog)',
      group: 'metadata',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      highlightCriteria: 'highlightCriteria',
    },
    prepare: ({title, highlightCriteria}) => {
      const criteriaLabels: Record<string, string> = {
        viewCount: 'Populariteit',
        featured: 'Uitgelicht',
        newest: 'Nieuwste',
        readTime: 'Leestijd',
      }
      return {
        title: title || 'Blogpagina',
        subtitle: `Uitlicht: ${criteriaLabels[highlightCriteria] || highlightCriteria}`,
        media: BookOpenIcon,
      }
    },
  },
})
