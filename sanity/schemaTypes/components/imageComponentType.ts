import {defineField, defineType} from 'sanity'

export const imageComponentType = defineType({
  name: 'imageComponent',
  title: 'Afbeelding',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternatieve tekst',
          type: 'string',
          description:
            'Beschrijf de afbeelding kort en bondig. Laat leeg wanneer de afbeelding puur decoratief is.',
          validation: (rule) =>
            rule.custom((value, context) => {
              if (!context?.parent?.asset) {
                return 'Kies een afbeelding.'
              }
              if (context.parent.asset && !value) {
                return 'Alternatieve tekst is verplicht om aan WCAG te voldoen.'
              }
              return true
            }),
        }),
        defineField({
          name: 'caption',
          title: 'Onderschrift',
          type: 'string',
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      media: 'image',
      title: 'image.alt',
    },
    prepare({media, title}) {
      return {
        media,
        title: title || 'Afbeelding',
      }
    },
  },
})
