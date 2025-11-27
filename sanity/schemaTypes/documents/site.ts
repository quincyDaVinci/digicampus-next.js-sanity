import {defineField, defineType} from 'sanity'
import {HomeIcon} from '../../lib/featherIcons'

/**
 * Site Settings - Global configuration
 * Based on SanityPress pattern
 */
export default defineType({
  name: 'site',
  title: 'Website-instellingen',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'branding', title: 'Huisstijl', default: true},
    {name: 'navigation', title: 'Navigatie'},
    {name: 'info', title: 'Site-informatie'},
    {name: 'translations', title: 'Vertalingen'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Sitetitel',
      type: 'string',
      description: 'De naam van de website',
      group: 'branding',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Site-logo',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternatieve tekst',
        },
      ],
      group: 'branding',
    }),
    defineField({
      name: 'header',
      title: 'Navigatie (header)',
      type: 'reference',
      to: [{type: 'navigation'}],
      description: 'Selecteer het menu voor de header',
      group: 'navigation',
    }),
    defineField({
      name: 'ctas',
      title: 'CTA’s in de header',
      type: 'array',
      of: [{type: 'cta'}],
      description: 'Call-to-action knoppen in de header',
      group: 'navigation',
    }),
    defineField({
      name: 'footer',
      title: 'Navigatie (footer)',
      type: 'reference',
      to: [{type: 'navigation'}],
      description: 'Selecteer het menu voor de footer',
      group: 'navigation',
    }),
    defineField({
      name: 'footerContent',
      title: 'Footer-inhoud',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternatieve tekst',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'size',
              type: 'string',
              title: 'Afbeeldingsgrootte',
              options: {
                list: [
                  {title: 'Klein', value: 'small'},
                  {title: 'Gemiddeld', value: 'medium'},
                  {title: 'Groot', value: 'large'},
                ],
                layout: 'radio',
              },
              initialValue: 'medium',
            },
          ],
        },
      ],
      description: 'Rijke-tekstinhoud voor de footer',
      group: 'info',
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright-tekst',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternatieve tekst',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'size',
              type: 'string',
              title: 'Afbeeldingsgrootte',
              options: {
                list: [
                  {title: 'Klein', value: 'small'},
                  {title: 'Gemiddeld', value: 'medium'},
                  {title: 'Groot', value: 'large'},
                ],
                layout: 'radio',
              },
              initialValue: 'small',
            },
          ],
        },
      ],
      description: 'Copyrightvermelding in de footer',
      group: 'info',
    }),
    defineField({
      name: 'translations',
      title: 'Vertalingen',
      type: 'array',
      of: [{type: 'siteTranslation'}],
      description: 'Synchroon gekopieerde Engelse varianten van sitevelden.',
      group: 'translations',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({title}) => ({
      title: title || 'Website-instellingen',
      subtitle: 'Globale siteconfiguratie',
      media: HomeIcon,
    }),
  },
})
