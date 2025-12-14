import {defineField, defineType} from 'sanity'

/**
 * Module attributes for section customization
 * Based on SanityPress pattern - allows anchor links and visibility control
 */
export default defineType({
  name: 'module-attributes',
  title: 'Module-attributen',
  type: 'object',
  fields: [
    defineField({
      name: 'uid',
      title: 'Unieke identificatie',
      type: 'string',
      description: 'Gebruikt voor anker-/jumplinks (HTML id-attribuut)',
      placeholder: 'bijv. contact-sectie',
      validation: (Rule) =>
        Rule.regex(/^[a-zA-Z0-9-]+$/).error('Alleen letters, cijfers en koppeltekens toegestaan'),
    }),
    defineField({
      name: 'hidden',
      title: 'Sectie verbergen',
      type: 'boolean',
      description: 'Verberg deze sectie tijdelijk op de pagina',
      initialValue: false,
    }),
  ],
})
