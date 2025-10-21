import {defineArrayMember, defineField, defineType} from 'sanity'
import {ChoiceCardInput} from '../components/inputs'

export const pageColumnType = defineType({
  name: 'pageColumn',
  title: 'Kolom',
  type: 'object',
  fields: [
    defineField({
      name: 'width',
      title: '📏 Kolombreedte',
      type: 'string',
      description: 'Bepaal hoe breed deze kolom wordt in het grid.',
      options: {
        list: [
          {title: '🟥 Volledig (1/1)', value: '1/1'},
          {title: '🟧 Half (1/2)', value: '1/2'},
          {title: '🟨 Eén derde (1/3)', value: '1/3'},
          {title: '🟩 Twee derde (2/3)', value: '2/3'},
        ],
      },
      initialValue: '1/1',
      validation: (rule) => rule.required(),
      components: {input: ChoiceCardInput},
    }),
    defineField({
      name: 'horizontalAlignment',
      title: '↔️ Uitlijning',
      type: 'string',
      description: 'Hoe moeten componenten binnen de kolom zich horizontaal uitlijnen?',
      options: {
        list: [
          {title: '⬅️ Links', value: 'flex-start'},
          {title: '↔️ Midden', value: 'center'},
          {title: '➡️ Rechts', value: 'flex-end'},
          {title: '📐 Uitgevuld', value: 'stretch'},
        ],
      },
      initialValue: 'flex-start',
      components: {input: ChoiceCardInput},
    }),
    defineField({
      name: 'verticalAlignment',
      title: '↕️ Verticale uitlijning',
      type: 'string',
      description: 'Zet de inhoud bovenaan, in het midden of onderaan de kolom.',
      options: {
        list: [
          {title: '⬆️ Boven', value: 'flex-start'},
          {title: '🟰 Midden', value: 'center'},
          {title: '⬇️ Onder', value: 'flex-end'},
        ],
      },
      initialValue: 'flex-start',
      components: {input: ChoiceCardInput},
    }),
    defineField({
      name: 'componentSpacing',
      title: '📦 Ruimte tussen componenten',
      type: 'string',
      description: 'Stel in hoe veel ruimte er tussen de onderdelen in deze kolom zit.',
      options: {
        list: [
          {title: '🔹 Compact', value: 'tight'},
          {title: '⚖️ Normaal', value: 'normal'},
          {title: '🌬️ Ruim', value: 'relaxed'},
        ],
      },
      initialValue: 'normal',
      components: {input: ChoiceCardInput},
    }),
    defineField({
      name: 'placement',
      title: '📍 Plaatsing',
      description: 'Laat content bijvoorbeeld onderaan de sectie landen of juist bovenaan.',
      type: 'string',
      options: {
        list: [
          {title: '⬆️ Boven', value: 'top'},
          {title: '⬇️ Onder', value: 'bottom'},
          {title: '⬅️ Links', value: 'left'},
          {title: '➡️ Rechts', value: 'right'},
        ],
      },
      initialValue: 'top',
      components: {input: ChoiceCardInput},
    }),
    defineField({
      name: 'components',
      title: 'Componenten',
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
