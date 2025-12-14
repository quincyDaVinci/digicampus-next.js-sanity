import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'moduleTextOverride',
  title: 'Tekstoverschrijving',
  type: 'object',
  fields: [
    defineField({
      name: 'moduleKey',
      title: 'Module _key',
      type: 'string',
      description: 'Kopieer de _key van de module waarvoor je deze tekst wilt overschrijven.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fieldPath',
      title: 'Veldnaam of pad',
      type: 'string',
      description:
        'Alleen tekstvelden. Gebruik een veldnaam zoals "heading" of een pad zoals "bannerButton.label" voor geneste tekst.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Vertaalde tekst',
      type: 'text',
      rows: 3,
      description: 'Platte tekst of korte copy. Afbeeldingen en niet-tekstuele inhoud blijven uit het canonieke document komen.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'fieldPath',
      subtitle: 'moduleKey',
      description: 'text',
    },
    prepare: ({title, subtitle, description}) => ({
      title: title || 'Tekstoverschrijving',
      subtitle: subtitle ? `Module: ${subtitle}` : 'Geen module gekozen',
      description: description?.slice(0, 80),
    }),
  },
})
