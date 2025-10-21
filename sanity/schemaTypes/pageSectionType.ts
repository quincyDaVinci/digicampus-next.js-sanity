import {defineArrayMember, defineField, defineType} from 'sanity'

export const pageSectionType = defineType({
  name: 'pageSection',
  title: 'Sectie',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: '🏷️ Interne naam',
      type: 'string',
      description: 'Geef de sectie een herkenbare naam zodat je hem later snel terugvindt. Niet zichtbaar op de website.',
    }),
    defineField({
      name: 'layout',
      title: '🧱 Opbouw',
      type: 'object',
      options: {
        collapsible: false,
      },
      fields: [
        defineField({
          name: 'contentWidth',
          title: '📏 Breedte van de inhoud',
          type: 'string',
          description: 'Bepaal hoe breed de contentlijn mag worden. Breder is ideaal voor visuals, smaller voor tekst.',
          options: {
            list: [
              {title: '📄 Standaard', value: 'default'},
              {title: '📰 Breed', value: 'wide'},
              {title: '🧘 Volledige breedte', value: 'full'},
              {title: '✏️ Compact', value: 'narrow'},
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
          initialValue: 'default',
        }),
        defineField({
          name: 'verticalSpacing',
          title: '↕️ Ruimte boven & onder',
          type: 'string',
          description: 'Hoeveel ademruimte krijgt de sectie? Kies compact voor korte snippets of luchtig voor hero’s.',
          options: {
            list: [
              {title: '🥪 Compact', value: 'cozy'},
              {title: '😌 Ruim', value: 'roomy'},
              {title: '🌬️ Luchtig', value: 'airy'},
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
          initialValue: 'roomy',
        }),
        defineField({
          name: 'alignment',
          title: '🧭 Uitlijning van de inhoud',
          type: 'string',
          description: 'Kies of teksten en knoppen netjes links uitlijnen of vriendelijk gecentreerd worden weergegeven.',
          options: {
            list: [
              {title: '⬅️ Links', value: 'left'},
              {title: '↔️ Midden', value: 'center'},
            ],
            layout: 'radio',
            direction: 'horizontal',
          },
          initialValue: 'left',
        }),
      ],
    }),
    defineField({
      name: 'background',
      title: '🎨 Achtergrond',
      type: 'backgroundComponent',
      description: 'Geef de sectie een eigen sfeer met een toon, patroon of subtiele lijn.',
    }),
    defineField({
      name: 'columns',
      title: '📚 Kolommen',
      type: 'array',
      description: 'Bepaal hoe de inhoud in kolommen wordt verdeeld. Sleep om de volgorde snel aan te passen.',
      of: [defineArrayMember({type: 'pageColumn'})],
      validation: (rule) => rule.min(1).error('Voeg ten minste één kolom toe aan de sectie.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      columns: 'columns',
      background: 'background.tone',
    },
    prepare({title, columns, background}) {
      const count = columns?.length ?? 0
      return {
        title: title || 'Nieuwe sectie',
        subtitle: [
          count ? `${count} kolom${count === 1 ? '' : 'men'}` : 'Nog geen kolommen',
          background ? `🎨 ${background}` : undefined,
        ]
          .filter(Boolean)
          .join(' · '),
      }
    },
  },
})
