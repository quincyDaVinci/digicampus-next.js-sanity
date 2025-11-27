import {defineField, defineType} from 'sanity'
import {PageTranslationInput} from '../../components/PageTranslationInput'

export default defineType({
  name: 'pageTranslation',
  title: 'Vertaling',
  type: 'object',
  components: {
    input: PageTranslationInput,
  },
  fields: [
    defineField({
      name: 'language',
      title: 'Taal',
      type: 'string',
      options: {
        list: [
          {title: 'Nederlands', value: 'nl'},
          {title: 'English', value: 'en'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Vertaalde titel',
      type: 'string',
    }),
    defineField({
      name: 'metadataDescription',
      title: 'Vertaalde metabeschrijving',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'modules',
      title: 'Vertaalde modules',
      type: 'array',
      description: 'Overschrijvingen voor modules in deze taal',
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
    }),
  ],
})
