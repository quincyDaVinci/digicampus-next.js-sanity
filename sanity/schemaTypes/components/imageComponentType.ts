import {defineField, defineType} from 'sanity'

const widthOptions = [
  {title: 'Smalle kolom', value: 'narrow'},
  {title: 'Standaard', value: 'default'},
  {title: 'Breed', value: 'wide'},
  {title: 'Volledige breedte', value: 'full'},
]

const alignmentOptions = [
  {title: 'Links', value: 'left'},
  {title: 'Gecentreerd', value: 'center'},
  {title: 'Rechts', value: 'right'},
]

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
    defineField({
      name: 'displayWidth',
      title: 'Breedte',
      type: 'string',
      options: {list: widthOptions},
      initialValue: 'default',
    }),
    defineField({
      name: 'alignment',
      title: 'Uitlijning',
      type: 'string',
      options: {list: alignmentOptions, layout: 'radio'},
      initialValue: 'center',
    }),
    defineField({
      name: 'rounded',
      title: 'Afgeronde hoeken',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'link',
      title: 'Maak de afbeelding klikbaar',
      type: 'linkField',
    }),
    defineField({
      name: 'background',
      title: 'Achtergrond',
      type: 'backgroundComponent',
    }),
    defineField({
      name: 'allowZoom',
      title: 'Zoom bij klikken',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      media: 'image',
      title: 'image.alt',
      subtitle: 'displayWidth',
    },
    prepare({media, title, subtitle}) {
      return {
        media,
        title: title || 'Afbeelding',
        subtitle: subtitle ? `Breedte: ${subtitle}` : 'Standaard breedte',
      }
    },
  },
})
