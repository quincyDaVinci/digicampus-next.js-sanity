import {defineField, defineType} from 'sanity'
import {ColorTokenInput} from '../../components/ColorTokenInput'

const designTokenOptions = [
  {title: '🪟 Surface (var(--dc-surface))', value: 'surface'},
  {title: '🌤️ Soft background (var(--dc-bg-soft))', value: 'bg-soft'},
  {title: '🌥️ Page background (var(--dc-bg))', value: 'bg'},
  {title: '✨ Brand (var(--dc-brand))', value: 'brand'},
  {title: '💡 Primary (var(--dc-primary))', value: 'primary'},
  {title: '🌌 Navy (var(--dc-navy))', value: 'navy'},
  {title: '🖋️ Text (var(--dc-text))', value: 'text'},
]

const textureOptions = [
  {title: '🚫 Geen patroon', value: 'none'},
  {title: '🟢 Zachte stippen', value: 'dots'},
  {title: '#️⃣ Rasterlijnen', value: 'grid'},
  {title: '🎚️ Diagonaal', value: 'diagonal'},
]

export const backgroundComponentType = defineType({
  name: 'backgroundComponent',
  title: 'Achtergrond',
  type: 'object',
  fieldsets: [
    {
      name: 'advanced',
      title: 'Extra opties',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    defineField({
      name: 'mode',
      title: '🎨 Type achtergrond',
      type: 'string',
      initialValue: 'color',
      options: {
        list: [
          {title: '🎯 Effen kleur', value: 'color'},
          {title: '🌈 Kleurverloop', value: 'gradient'},
          {title: '🖼️ Afbeelding', value: 'image'},
          {title: '🧩 Textuur', value: 'texture'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
      description: 'Kies een basisopmaak voor de achtergrond van deze sectie.',
    }),
    defineField({
      name: 'colorToken',
      title: '🌈 Primaire kleur (design token)',
      type: 'string',
      options: {list: designTokenOptions},
      components: {input: ColorTokenInput},
      hidden: ({parent}) => !parent || !['color', 'gradient', 'texture'].includes(parent.mode ?? ''),
      description: 'Kies een vooraf gedefinieerde kleur met voorbeeldweergave.',
    }),
    defineField({
      name: 'secondaryColorToken',
      title: '🔀 Secundaire kleur (voor gradient)',
      type: 'string',
      options: {list: designTokenOptions},
      components: {input: ColorTokenInput},
      hidden: ({parent}) => parent?.mode !== 'gradient',
      description: 'Tweede kleur voor het kleurverloop.',
    }),
    defineField({
      name: 'customColor',
      title: '🎨 Alternatieve hex kleur',
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
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: '🗣️ Alternatieve tekst',
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
      description: 'Selecteer een afbeelding als decoratieve achtergrond.',
    }),
    defineField({
      name: 'imageTint',
      title: '🌫️ Kleurwaas over afbeelding',
      type: 'string',
      options: {list: designTokenOptions},
      components: {input: ColorTokenInput},
      hidden: ({parent}) => parent?.mode !== 'image',
      description: 'Leg een lichte kleurlaag over de afbeelding voor beter contrast.',
    }),
    defineField({
      name: 'imageTintOpacity',
      title: '🌫️ Dekking van de kleurwaas',
      type: 'number',
      description: 'Waarde tussen 0 en 1. Bijvoorbeeld 0.45 voor 45% dekking.',
      hidden: ({parent}) => parent?.mode !== 'image' || !parent?.imageTint,
      validation: (rule) => rule.min(0).max(1),
    }),
    defineField({
      name: 'texture',
      title: '🧵 Textuur patroon',
      type: 'string',
      options: {list: textureOptions},
      hidden: ({parent}) => parent?.mode !== 'texture',
      description: 'Geef de achtergrond extra sfeer met een zacht patroon.',
    }),
    defineField({
      name: 'overlay',
      title: '🛡️ Extra overlay kleur',
      type: 'string',
      options: {list: designTokenOptions},
      components: {input: ColorTokenInput},
      fieldset: 'advanced',
      description: 'Optionele extra kleurlaag voor extra contrast.',
    }),
    defineField({
      name: 'overlayOpacity',
      title: '🛡️ Overlay dekking',
      type: 'number',
      hidden: ({parent}) => !parent?.overlay,
      validation: (rule) => rule.min(0).max(1),
      fieldset: 'advanced',
      description: 'Stel in hoe sterk de overlay zichtbaar is (0 = transparant, 1 = volledig).',
    }),
    defineField({
      name: 'ariaLabel',
      title: '🗣️ Omschrijving voor schermlezers (optioneel)',
      type: 'string',
      description:
        'Alleen invullen wanneer de achtergrond inhoudelijk iets toevoegt, bijvoorbeeld bij een betekenisvolle foto.',
      fieldset: 'advanced',
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
