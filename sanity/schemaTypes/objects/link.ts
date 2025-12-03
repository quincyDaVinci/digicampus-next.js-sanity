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
  fieldsets: [
    { name: 'translations', title: 'Vertalingen', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Tekst die voor de link getoond wordt',
    }),
    defineField({
      name: 'translations',
      title: 'Vertalingen (label)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'linkLabelTranslation',
          title: 'Vertaling',
          fields: [
            defineField({ name: 'language', title: 'Taal', type: 'string', options: { list: [{ title: 'Nederlands', value: 'nl' }, { title: 'English', value: 'en' }] } }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
        },
      ],
      description: 'Kleine, optionele set vertalingen voor de linktekst.',
      fieldset: 'translations',
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
      to: [{type: 'page'}, {type: 'homePage'}, {type: 'blogPage'}, {type: 'blogPost'}],
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
      title: 'URL-parameters (optioneel)',
      type: 'string',
      placeholder: 'bijv. #sectie-id of ?utm_source=campagne',
      description: 'Hash/fragment of querystring to append to the URL (only for internal links).',
      hidden: ({parent}) => parent?.type !== 'internal',
    }),
  ],
  preview: {
    select: {
      label: 'label',
      translations: 'translations',
      type: 'type',
      internalTitle: 'internal.title',
      internalSlug: 'internal.metadata.slug.current',
      external: 'external',
      params: 'params',
    },
    prepare: ({label, translations, type, internalTitle, internalSlug, external, params}) => {
      const translatedLabel = Array.isArray(translations) && translations.length > 0 ? translations[0].label : null
      const href = type === 'internal' ? `/${(internalSlug || '').replace(/^\//, '')}${params || ''}` : external
      return {
        title: translatedLabel || label || internalTitle || 'Naamloze link',
        subtitle: href || 'Geen URL ingesteld',
      }
    },
  },
})
