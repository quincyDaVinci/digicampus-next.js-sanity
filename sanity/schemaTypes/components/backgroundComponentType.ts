import {defineField, defineType} from 'sanity'

const designTokenOptions = [
  {title: '⬜ Surface – licht', value: 'surface'},
  {title: '🟦 Soft background', value: 'bg-soft'},
  {title: '⬛ Page background', value: 'bg'},
  {title: '🟠 Brand', value: 'brand'},
  {title: '🟡 Primary', value: 'primary'},
  {title: '🔵 Navy', value: 'navy'},
  {title: '⚫ Tekstkleur', value: 'text'},
]

const textureOptions = [
  {title: '🚫 Geen patroon', value: 'none'},
  {title: '🔵 Zachte stippen', value: 'dots'},
  {title: '📐 Rasterlijnen', value: 'grid'},
  {title: '🎚️ Diagonaal', value: 'diagonal'},
]

export const backgroundComponentType = defineType({
  name: 'backgroundComponent',
  title: 'Achtergrond',
  type: 'object',
  fields: [
    defineField({
      name: 'mode',
      title: '🎨 Type achtergrond',
      description: 'Kies direct een achtergrondstijl. De pictogrammen tonen hoe de optie aanvoelt.',
      type: 'string',
      initialValue: 'color',
      options: {
        list: [
          {title: '🎯 Effen kleur', value: 'color'},
          {title: '🌈 Kleurverloop', value: 'gradient'},
          {title: '🖼️ Afbeelding', value: 'image'},
          {title: '🎛️ Textuur', value: 'texture'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'colorToken',
      title: '🌈 Primaire kleur (design token)',
      description: 'Kies een vooraf ingestelde merk kleur. Deze opties respecteren het huisstijlpalet.',
      type: 'string',
      options: {list: designTokenOptions},
      hidden: ({parent}) => !parent || !['color', 'gradient', 'texture'].includes(parent.mode ?? ''),
    }),
    defineField({
      name: 'secondaryColorToken',
      title: '🌤️ Secundaire kleur (voor gradient)',
      description: 'Alleen zichtbaar bij een verloop. Kies een tweede kleur om naar toe te blenden.',
      type: 'string',
      options: {list: designTokenOptions},
      hidden: ({parent}) => parent?.mode !== 'gradient',
    }),
    defineField({
      name: 'customColor',
      title: '🎯 Eigen hex kleur',
      description:
        'Gebruik dit alleen als geen design token voldoet. Let op voldoende contrast volgens WCAG (minimaal 4.5:1 voor tekst).',
      type: 'string',
      validation: (rule) =>
        rule
          .regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {
            name: 'hex kleur',
            invert: false,
          })
          .warning('Voer een geldige hexkleur in, bijvoorbeeld #005f5b.'),
      hidden: ({parent}) => !parent || !['color', 'gradient'].includes(parent.mode ?? ''),
    }),
    defineField({
      name: 'image',
      title: '🖼️ Achtergrondafbeelding',
      description: 'Kies een afbeelding die groot genoeg is om schermvullend te tonen.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: '🔊 Alternatieve tekst',
          type: 'string',
          description:
            'Beschrijf de afbeelding als deze betekenis toevoegt. Laat leeg wanneer de afbeelding puur decoratief is.',
        }),
      ],
      hidden: ({parent}) => parent?.mode !== 'image',
      validation: (rule) => rule.custom((value, context) => {
        if (context.parent?.mode === 'image' && !value?.asset) {
          return 'Kies een afbeelding voor de achtergrond.'
        }
        return true
      }),
    }),
    defineField({
      name: 'imageTint',
      title: '🪄 Kleurwaas over afbeelding',
      type: 'string',
      options: {list: designTokenOptions},
      hidden: ({parent}) => parent?.mode !== 'image',
    }),
    defineField({
      name: 'imageTintOpacity',
      title: '✨ Dekking van de kleurwaas',
      type: 'number',
      description: 'Waarde tussen 0 en 1. Bijvoorbeeld 0.45 voor 45% dekking.',
      hidden: ({parent}) => parent?.mode !== 'image' || !parent?.imageTint,
      validation: (rule) => rule.min(0).max(1),
    }),
    defineField({
      name: 'texture',
      title: '🧶 Textuur patroon',
      type: 'string',
      options: {list: textureOptions},
      hidden: ({parent}) => parent?.mode !== 'texture',
    }),
    defineField({
      name: 'overlay',
      title: '☂️ Extra overlay kleur',
      type: 'string',
      options: {list: designTokenOptions},
    }),
    defineField({
      name: 'overlayOpacity',
      title: '☁️ Overlay dekking',
      type: 'number',
      hidden: ({parent}) => !parent?.overlay,
      validation: (rule) => rule.min(0).max(1),
    }),
    defineField({
      name: 'ariaLabel',
      title: '🗣️ Omschrijving voor schermlezers (optioneel)',
      type: 'string',
      description:
        'Alleen invullen wanneer de achtergrond inhoudelijk iets toevoegt, bijvoorbeeld bij een betekenisvolle foto.',
    }),
  ],
  preview: {
    select: {
      mode: 'mode',
      color: 'colorToken',
    },
    prepare({mode, color}) {
      return {
        title: 'Achtergrond',
        subtitle: mode ? `${mode}${color ? ` · ${color}` : ''}` : 'Nog geen type gekozen',
      }
    },
  },
})
