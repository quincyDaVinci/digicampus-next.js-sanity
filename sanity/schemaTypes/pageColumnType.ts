import {defineArrayMember, defineField, defineType} from 'sanity'

export const pageColumnType = defineType({
  name: 'pageColumn',
  title: 'Kolom',
  type: 'object',
  fields: [
    defineField({
      name: 'width',
      title: '↔️ Breedte',
      type: 'string',
      options: {
        list: [
          {title: '🧱 Volledige breedte (1/1)', value: '1/1'},
          {title: '🧱 Halve breedte (1/2)', value: '1/2'},
          {title: '🧱 Eenderde (1/3)', value: '1/3'},
          {title: '🧱 Tweederde (2/3)', value: '2/3'},
        ],
        layout: 'radio',
      },
      initialValue: '1/1',
      validation: (rule) => rule.required(),
      description: 'Kies hoe breed deze kolom is binnen de sectie.',
    }),
    defineField({
      name: 'horizontalAlignment',
      title: '🧭 Horizontale uitlijning',
      type: 'string',
      options: {
        list: [
          {title: '⬅️ Links', value: 'flex-start'},
          {title: '⏺️ Midden', value: 'center'},
          {title: '➡️ Rechts', value: 'flex-end'},
          {title: '📐 Uitgevuld', value: 'stretch'},
        ],
        layout: 'radio',
      },
      initialValue: 'flex-start',
      description: 'Bepaalt waar de componenten in deze kolom horizontaal worden uitgelijnd.',
    }),
    defineField({
      name: 'verticalAlignment',
      title: '🧭 Verticale uitlijning',
      type: 'string',
      options: {
        list: [
          {title: '🔼 Boven', value: 'flex-start'},
          {title: '⏺️ Midden', value: 'center'},
          {title: '🔽 Onder', value: 'flex-end'},
        ],
        layout: 'radio',
      },
      initialValue: 'flex-start',
      description: 'Plaats componenten bovenaan, in het midden of onderaan de kolom.',
    }),
    defineField({
      name: 'componentSpacing',
      title: '📏 Ruimte tussen componenten',
      type: 'string',
      options: {
        list: [
          {title: '🤏 Compact', value: 'tight'},
          {title: '✋ Normaal', value: 'normal'},
          {title: '👐 Ruim', value: 'relaxed'},
        ],
      },
      initialValue: 'normal',
      description: 'Stel de afstand tussen componenten binnen deze kolom in.',
    }),
    defineField({
      name: 'placement',
      title: '📍 Plaatsing binnen de sectie',
      description: 'Bepaalt waar de componenten in de kolom worden verankerd.',
      type: 'string',
      options: {
        list: [
          {title: '🔼 Boven', value: 'top'},
          {title: '🔽 Onder', value: 'bottom'},
          {title: '⬅️ Links', value: 'left'},
          {title: '➡️ Rechts', value: 'right'},
        ],
      },
      initialValue: 'top',
    }),
    defineField({
      name: 'components',
      title: '🧱 Componenten',
      type: 'array',
      of: [
        defineArrayMember({type: 'richTextComponent', title: 'Rijke tekst'}),
        defineArrayMember({type: 'imageComponent', title: 'Afbeelding'}),
        defineArrayMember({type: 'videoComponent', title: 'Video component'}),
        defineArrayMember({type: 'buttonComponent', title: 'Knop'}),
        defineArrayMember({type: 'blogCardComponent', title: 'Blogkaart'}),
        defineArrayMember({type: 'carouselComponent', title: 'Carousel'}),
      ],
      validation: (rule) => rule.min(1).warning('Voeg ten minste één component toe'),
      description: 'Sleep de componenten in de gewenste volgorde voor deze kolom.',
    }),
  ],
  preview: {
    select: {
      width: 'width',
      components: 'components',
    },
    prepare({width, components}) {
      const count = components?.length ?? 0
      return {
        title: width ? `Kolom ${width}` : 'Kolom',
        subtitle: count
          ? `${count} component${count === 1 ? '' : 'en'}`
          : 'Nog geen componenten',
      }
    },
  },
})
