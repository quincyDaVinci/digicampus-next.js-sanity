import {defineField, defineType} from 'sanity'
import {FileTextIcon} from '../../lib/featherIcons'

/**
 * Page Document - Regular pages with modular sections
 * Combines SanityPress structure with sane-kit modules
 */
export default defineType({
  name: 'page',
  title: 'Pagina',
  type: 'document',
  icon: FileTextIcon,
  groups: [
    {name: 'content', title: 'Inhoud', default: true},
    {name: 'translations', title: 'Vertalingen'},
    {name: 'metadata', title: 'SEO & metadata'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Paginatitel',
      type: 'string',
      description: 'De hoofd­titel van de pagina',
      group: 'content',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'modules',
      title: 'Paginasecties',
      type: 'array',
      description: 'Stel de pagina samen door secties toe te voegen',
      of: [
        {type: 'heroSection'},
        {type: 'featureSection'},
        {type: 'blogSection'},
        {type: 'testimonialsSection'},
        {type: 'pricingSection'},
        {type: 'ctaSection'},
        {type: 'faqSection'},
        {type: 'contactSection'},
        {type: 'newsletterSection'},
        {type: 'mediaSection'},
        {type: 'documentAsset'},
      ],
      group: 'content',
      validation: (Rule) => Rule.min(1).error('Voeg minimaal één sectie toe aan de pagina'),
    }),
    defineField({
      name: 'translations',
      title: 'Vertalingen',
      type: 'array',
      of: [{type: 'pageTranslation'}],
      group: 'translations',
      description:
        'Vul vertaalde titels, metabeschrijvingen en eventuele module-overschrijvingen per taal in.',
    }),
    defineField({
      name: 'metadata',
      type: 'metadata',
      description: 'SEO-instellingen en URL-configuratie',
      group: 'metadata',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'metadata.slug.current',
      noIndex: 'metadata.noIndex',
    },
    prepare: ({title, slug, noIndex}) => ({
      title: title || 'Naamloze pagina',
      subtitle: slug ? `/${slug}` : 'Geen slug ingesteld',
      media: noIndex ? '🔒' : FileTextIcon,
    }),
  },
})
