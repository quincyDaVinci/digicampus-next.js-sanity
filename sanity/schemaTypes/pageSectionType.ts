import {defineArrayMember, defineField, defineType} from 'sanity'

export const pageSectionType = defineType({
  name: 'pageSection',
  title: 'Sectie',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: '🧩 Interne naam',
      type: 'string',
      description: '💬 Alleen zichtbaar in de studio. Gebruik een korte beschrijving zodat je secties snel terugvindt.',
    }),
    defineField({
      name: 'layout',
      title: '🎛️ Lay-out & ruimte',
      description: 'Kies hoe breed de sectie is en hoeveel ruimte eromheen zit. Iedere keuze toont direct een korte uitleg.',
      type: 'object',
      options: {
        collapsible: false,
      },
      fields: [
        defineField({
          name: 'contentWidth',
          title: '📐 Breedte inhoud',
          description: 'Bepaalt hoe breed de content op desktop wordt weergegeven.',
          type: 'string',
          options: {
            list: [
              {title: '📎 Smal – focus op tekst', value: 'narrow'},
              {title: '📄 Standaard – gebalanceerd', value: 'default'},
              {title: '🖼️ Breed – veel lucht', value: 'wide'},
              {title: '🧱 Volle breedte – rand tot rand', value: 'full'},
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
          initialValue: 'default',
        }),
        defineField({
          name: 'paddingY',
          title: '↕️ Verticale ruimte',
          description: 'Hoeveel witruimte boven en onder de sectie zichtbaar is.',
          type: 'string',
          options: {
            list: [
              {title: '🔹 Geen', value: 'none'},
              {title: '🔹 Compact', value: 'sm'},
              {title: '🔹 Comfortabel', value: 'md'},
              {title: '🔹 Ruim', value: 'lg'},
              {title: '🔹 Extra ruim', value: 'xl'},
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
          initialValue: 'lg',
        }),
        defineField({
          name: 'paddingX',
          title: '↔️ Horizontale marge',
          description: 'Regelt de zijmarge binnen de sectie.',
          type: 'string',
          options: {
            list: [
              {title: '🔸 Geen', value: 'none'},
              {title: '🔸 Compact', value: 'sm'},
              {title: '🔸 Normaal', value: 'md'},
              {title: '🔸 Ruim', value: 'lg'},
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
          initialValue: 'md',
        }),
        defineField({
          name: 'componentSpacing',
          title: '📏 Ruimte tussen componenten',
          description: 'Bepaalt de ruimte tussen onderdelen binnen dezelfde kolom.',
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
          name: 'horizontalAlignment',
          title: '🧭 Horizontale uitlijning',
          description: 'Zet de content links, midden of rechts binnen de sectie.',
          type: 'string',
          options: {
            list: [
              {title: '⬅️ Links', value: 'left'},
              {title: '↔️ Midden', value: 'center'},
              {title: '➡️ Rechts', value: 'right'},
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
          initialValue: 'left',
        }),
        defineField({
          name: 'verticalAlignment',
          title: '🧭 Verticale uitlijning',
          description: 'Lijn de inhoud bovenaan, in het midden of onderaan uit.',
          type: 'string',
          options: {
            list: [
              {title: '⬆️ Boven', value: 'top'},
              {title: '↕️ Midden', value: 'center'},
              {title: '⬇️ Onder', value: 'bottom'},
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
          initialValue: 'top',
        }),
      ],
    }),
    defineField({
      name: 'background',
      title: '🎨 Achtergrond',
      type: 'backgroundComponent',
      description: 'Kies optioneel een kleur, verloop of textuur. De opties tonen direct hoe ze eruitzien.',
    }),
    defineField({
      name: 'columns',
      title: '🧱 Kolommen',
      description: 'Voeg kolommen toe en sleep ze om de volgorde aan te passen. Iedere kolom kan eigen componenten bevatten.',
      type: 'array',
      of: [defineArrayMember({type: 'pageColumn'})],
      validation: (rule) => rule.min(1).error('Voeg ten minste één kolom toe aan de sectie.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      columns: 'columns',
      background: 'background.mode',
    },
    prepare({title, columns, background}) {
      const count = columns?.length ?? 0
      return {
        title: title || 'Nieuwe sectie',
        subtitle: [
          count ? `${count} kolom${count === 1 ? '' : 'men'}` : 'Nog geen kolommen',
          background ? `Achtergrond: ${background}` : undefined,
        ]
          .filter(Boolean)
          .join(' · '),
      }
    },
  },
})
