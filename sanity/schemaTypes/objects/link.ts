import {defineField, defineType} from 'sanity'
import {FileTextIcon} from '../../lib/featherIcons'

/**
 * Link object for internal/external links
 * Based on SanityPress pattern
 */
export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: FileTextIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Tekst die voor de link getoond wordt',
    }),
    defineField({
      name: 'type',
      title: 'Linktype',
      type: 'string',
      options: {
        list: [
          {title: 'Interne pagina', value: 'internal'},
          {title: 'Externe URL', value: 'external'},
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'internal',
      title: 'Interne pagina',
      type: 'reference',
      to: [{type: 'page'}, {type: 'homePage'}, {type: 'blogPost'}],
      hidden: ({parent}) => parent?.type !== 'internal',
    }),
    defineField({
      name: 'external',
      title: 'Externe URL',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
          allowRelative: true,
        }),
      hidden: ({parent}) => parent?.type !== 'external',
    }),
    defineField({
      name: 'params',
      title: 'URL-parameters',
      type: 'string',
      placeholder: 'bijv. #sectie-id of ?utm_source=campagne',
      description: 'Voeg hash-links of queryparameters toe',
      hidden: ({parent}) => parent?.type !== 'internal',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      type: 'type',
      internalTitle: 'internal.title',
      internalSlug: 'internal.metadata.slug.current',
      external: 'external',
      params: 'params',
    },
    prepare: ({label, type, internalTitle, internalSlug, external, params}) => {
      const href =
        type === 'internal'
          ? `/${internalSlug || ''}${params || ''}`
          : external
      return {
        title: label || internalTitle || 'Naamloze link',
        subtitle: href || 'Geen URL ingesteld',
      }
    },
  },
})
