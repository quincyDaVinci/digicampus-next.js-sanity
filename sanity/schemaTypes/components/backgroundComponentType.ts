import {defineField, defineType} from 'sanity'

import BackgroundToneInput from '../../components/BackgroundToneInput'

const textureOptions = [
  {title: 'Geen patroon', value: 'none', icon: '⬜'},
  {title: 'Stippen', value: 'dots', icon: '⋮'},
  {title: 'Raster', value: 'grid', icon: '#'},
]

export const backgroundComponentType = defineType({
  name: 'backgroundComponent',
  title: '🎨 Achtergrond',
  type: 'object',
  fields: [
    defineField({
      name: 'tone',
      title: '🎨 Toon',
      type: 'string',
      description: 'Kies een achtergrondgevoel. De kleurvoorbeeldjes laten direct zien hoe het oogt.',
      components: {
        input: BackgroundToneInput,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'texture',
      title: '✨ Textuur',
      type: 'string',
      description: 'Voeg optioneel een subtiel patroon toe voor extra gelaagdheid.',
      options: {
        list: textureOptions.map((option) => ({
          title: `${option.icon} ${option.title}`,
          value: option.value,
        })),
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'showDivider',
      title: '➖ Boven- en onderrand',
      type: 'boolean',
      description: 'Voegt een subtiele scheidingslijn toe zodat de sectie loskomt van de rest.',
      initialValue: false,
    }),
    defineField({
      name: 'ariaLabel',
      title: '🗣️ Beschrijving voor schermlezers',
      type: 'string',
      description: 'Alleen invullen wanneer de achtergrond inhoudelijk iets toevoegt (bijv. een betekenisvolle afbeelding).',
    }),
  ],
  preview: {
    select: {
      tone: 'tone',
      texture: 'texture',
    },
    prepare({tone, texture}) {
      const toneLabel = tone ? `Toon: ${tone}` : 'Geen toon gekozen'
      const textureLabel = texture && texture !== 'none' ? ` · ${texture}` : ''
      return {
        title: 'Achtergrond',
        subtitle: `${toneLabel}${textureLabel}`,
      }
    },
  },
})
