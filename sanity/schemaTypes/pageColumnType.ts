import {defineArrayMember, defineField, defineType} from 'sanity'

export const pageColumnType = defineType({
  name: 'pageColumn',
  title: 'Kolom',
  type: 'object',
  fields: [
    defineField({
      name: 'width',
      title: '📐 Breedte',
      type: 'string',
      description: 'Bepaal hoeveel ruimte de kolom in de rij inneemt. Gebruik meerdere kolommen voor grids.',
      options: {
        list: [
          {title: '⬛ Volledig (1/1)', value: '1/1'},
          {title: '🟦 Half (1/2)', value: '1/2'},
          {title: '🟩 Eén derde (1/3)', value: '1/3'},
          {title: '🟥 Twee derde (2/3)', value: '2/3'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: '1/1',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'align',
      title: '🧲 Uitlijning van de componenten',
      type: 'string',
      description: 'Kies hoe elementen binnen de kolom worden uitgelijnd. Midden werkt goed voor korte tekst of kaarten.',
      options: {
        list: [
          {title: '⬅️ Links', value: 'start'},
          {title: '↔️ Midden', value: 'center'},
          {title: '➡️ Rechts', value: 'end'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'start',
    }),
    defineField({
      name: 'spacing',
      title: '↕️ Afstand tussen componenten',
      type: 'string',
      description: 'Bepaalt hoeveel ruimte er tussen kaarten, tekstblokken en knoppen zit.',
      options: {
        list: [
          {title: '🥪 Compact', value: 'tight'},
          {title: '😌 Normaal', value: 'normal'},
          {title: '🌬️ Luchtig', value: 'relaxed'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'normal',
    }),
    defineField({
      name: 'components',
      title: '🧩 Componenten',
      type: 'array',
      description: 'Voeg content toe aan deze kolom. Combineer gerust tekst, afbeeldingen en knoppen.',
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
