import {defineArrayMember, defineField, defineType} from 'sanity'

export const pageColumnType = defineType({
  name: 'pageColumn',
  title: 'Kolom',
  type: 'object',
  fields: [
    defineField({
      name: 'width',
      title: '📐 Kolombreedte',
      description: 'Kies hoe breed deze kolom is binnen de sectie.',
      type: 'string',
      options: {
        list: [
          {title: '🧱 1/1 – volledige breedte', value: '1/1'},
          {title: '🧱 1/2 – twee kolommen', value: '1/2'},
          {title: '🧱 1/3 – drie kolommen', value: '1/3'},
          {title: '🧱 2/3 – nadruk links/rechts', value: '2/3'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: '1/1',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'horizontalAlignment',
      title: '↔️ Horizontale uitlijning',
      description: 'Lijn componenten in de kolom links, midden of rechts uit.',
      type: 'string',
      options: {
        list: [
          {title: '⬅️ Links', value: 'flex-start'},
          {title: '↔️ Midden', value: 'center'},
          {title: '➡️ Rechts', value: 'flex-end'},
          {title: '🧱 Uitgevuld', value: 'stretch'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'flex-start',
    }),
    defineField({
      name: 'verticalAlignment',
      title: '↕️ Verticale uitlijning',
      description: 'Zet componenten bovenaan, in het midden of onderaan de kolom.',
      type: 'string',
      options: {
        list: [
          {title: '⬆️ Boven', value: 'flex-start'},
          {title: '↕️ Midden', value: 'center'},
          {title: '⬇️ Onder', value: 'flex-end'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'flex-start',
    }),
    defineField({
      name: 'componentSpacing',
      title: '🪄 Ruimte tussen componenten',
      description: 'Bepaalt hoeveel witruimte er tussen losse onderdelen zit.',
      type: 'string',
      options: {
        list: [
          {title: '🔹 Compact', value: 'tight'},
          {title: '🔹 Normaal', value: 'normal'},
          {title: '🔹 Ruim', value: 'relaxed'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'normal',
    }),
    defineField({
      name: 'placement',
      title: '🎯 Plaatsing binnen de sectie',
      description: 'Bepaalt waar de kolom als geheel wordt verankerd in de sectie.',
      type: 'string',
      options: {
        list: [
          {title: '⬆️ Boven', value: 'top'},
          {title: '⬇️ Onder', value: 'bottom'},
          {title: '⬅️ Links', value: 'left'},
          {title: '➡️ Rechts', value: 'right'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'top',
    }),
    defineField({
      name: 'components',
      title: '🧱 Componenten',
      description: 'Sleep componenten in de gewenste volgorde. Voeg er meerdere toe voor rijke content.',
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
