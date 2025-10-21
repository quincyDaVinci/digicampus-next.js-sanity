import {defineField, defineType} from 'sanity'
import {ChoiceCardInput, DesignTokenSwatchInput} from '../../components/inputs'

const designTokenOptions = [
  {title: '☁️ Surface', value: 'surface', subtitle: 'Zachte neutrale achtergrond'},
  {title: '🌤️ Soft', value: 'bg-soft', subtitle: 'Lichte accentkleur'},
  {title: '📄 Pagina', value: 'bg', subtitle: 'Standaard achtergrondkleur'},
  {title: '✨ Brand', value: 'brand', subtitle: 'Gebruik de merkaccentkleur'},
  {title: '🔥 Primary', value: 'primary', subtitle: 'Voor opvallende CTA secties'},
  {title: '🌊 Navy', value: 'navy', subtitle: 'Donker contrast met lichte tekst'},
  {title: '🖊️ Tekstkleur', value: 'text', subtitle: 'Zeer donker – gebruik spaarzaam'},
]

const textureOptions = [
  {title: '🚫 Geen patroon', value: 'none'},
  {title: '• Zachte stippen', value: 'dots'},
  {title: '# Rasterlijnen', value: 'grid'},
  {title: '╱ Diagonaal', value: 'diagonal'},
]

export const backgroundComponentType = defineType({
  name: 'backgroundComponent',
  title: 'Achtergrond',
  type: 'object',
  fields: [
    defineField({
      name: 'mode',
      title: '🎨 Type achtergrond',
      type: 'string',
      initialValue: 'color',
      options: {
        list: [
          {title: '🎨 Effen kleur', value: 'color'},
          {title: '🌈 Kleurverloop', value: 'gradient'},
          {title: '🖼️ Afbeelding', value: 'image'},
          {title: '🧩 Textuur', value: 'texture'},
        ],
      },
      validation: (rule) => rule.required(),
      components: {input: ChoiceCardInput},
    }),
    defineField({
      name: 'colorToken',
      title: 'Basiskleur',
      type: 'string',
      options: {list: designTokenOptions},
      description: 'Kies een vooraf gedefinieerde kleur die past bij het design systeem.',
      hidden: ({parent}) => !parent || !['color', 'gradient', 'texture'].includes(parent.mode ?? ''),
      components: {input: DesignTokenSwatchInput},
    }),
    defineField({
      name: 'secondaryColorToken',
      title: 'Tweede kleur (gradient)',
      type: 'string',
      options: {list: designTokenOptions},
      hidden: ({parent}) => parent?.mode !== 'gradient',
      components: {input: DesignTokenSwatchInput},
    }),
    defineField({
      name: 'customColor',
      title: 'Eigen hexkleur',
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
      title: 'Achtergrondafbeelding',
      type: 'image',
      description: 'Gebruik een beeld dat de boodschap ondersteunt. Zorg voor voldoende contrast met tekst.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternatieve tekst',
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
      title: 'Kleurwaas',
      type: 'string',
      options: {list: designTokenOptions},
      hidden: ({parent}) => parent?.mode !== 'image',
      components: {input: DesignTokenSwatchInput},
    }),
    defineField({
      name: 'imageTintOpacity',
      title: 'Dekking van de kleurwaas',
      type: 'number',
      description: 'Waarde tussen 0 en 1. Bijvoorbeeld 0.45 voor 45% dekking.',
      hidden: ({parent}) => parent?.mode !== 'image' || !parent?.imageTint,
      validation: (rule) => rule.min(0).max(1),
    }),
    defineField({
      name: 'texture',
      title: 'Textuurpatroon',
      type: 'string',
      options: {list: textureOptions},
      hidden: ({parent}) => parent?.mode !== 'texture',
      components: {input: ChoiceCardInput},
    }),
    defineField({
      name: 'overlay',
      title: 'Overlay kleur',
      type: 'string',
      options: {list: designTokenOptions},
      description: 'Voeg een transparante kleurlaag toe voor extra contrast.',
      components: {input: DesignTokenSwatchInput},
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Overlay dekking',
      type: 'number',
      hidden: ({parent}) => !parent?.overlay,
      validation: (rule) => rule.min(0).max(1),
    }),
    defineField({
      name: 'ariaLabel',
      title: 'Omschrijving voor schermlezers (optioneel)',
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
