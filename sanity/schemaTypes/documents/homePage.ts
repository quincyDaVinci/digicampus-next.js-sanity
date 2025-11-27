import {defineField, defineType} from 'sanity'
import {HomeIcon} from '../../lib/featherIcons'

/**
 * Homepage - Singleton document
 * Same structure as page but only one instance
 */
export default defineType({
  name: 'homePage',
  title: 'Startpagina',
  type: 'document',
  icon: HomeIcon,
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
      description: 'De hoofd­titel van de startpagina',
      group: 'content',
      validation: (Rule) => Rule.required().max(100),
      initialValue: 'Startpagina',
    }),
    defineField({
      name: 'modules',
      title: 'Paginasecties',
      type: 'array',
      description: 'Stel de startpagina samen door secties toe te voegen',
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
      validation: (Rule) => Rule.min(1).error('Voeg minimaal één sectie toe aan de startpagina'),
    }),
    defineField({
      name: 'translations',
      title: 'Vertalingen',
      type: 'array',
      of: [{type: 'pageTranslation'}],
      group: 'translations',
      description:
        'Vertaalde titels, metabeschrijving en module-overschrijvingen voor deze startpagina.',
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
    },
    prepare: ({title}) => ({
      title: title || 'Startpagina',
      subtitle: 'Startpagina (singleton)',
      media: HomeIcon,
    }),
  },
})
