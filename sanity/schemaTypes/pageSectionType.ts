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
      description: 'Gebruik dit om secties in de lijst snel terug te vinden (niet zichtbaar op de website).',
    }),
    defineField({
      name: 'layout',
      title: '⚙️ Lay-out',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
      },
      description: 'Stuur de breedte en ruimte van deze sectie aan. Alle keuzes zijn voorzien van een korte toelichting.',
      fields: [
        defineField({
          name: 'contentWidth',
          title: '↔️ Breedte inhoud',
          type: 'string',
          options: {
            list: [
              {title: '📎 Smalle kolom', value: 'narrow'},
              {title: '📐 Standaard', value: 'default'},
              {title: '🖥️ Breed', value: 'wide'},
              {title: '🧱 Volledige breedte', value: 'full'},
            ],
            layout: 'radio',
          },
          initialValue: 'default',
          description: 'Bepaalt hoe breed de content binnen de sectie wordt weergegeven.',
        }),
        defineField({
          name: 'paddingY',
          title: '↕️ Verticale ruimte',
          type: 'string',
          options: {
            list: [
              {title: '🚪 Geen', value: 'none'},
              {title: '📏 Klein', value: 'sm'},
              {title: '📏 Normaal', value: 'md'},
              {title: '📏 Groot', value: 'lg'},
              {title: '📏 Extra groot', value: 'xl'},
            ],
          },
          initialValue: 'lg',
          description: 'Voeg meer ademruimte boven en onder de sectie toe.',
        }),
        defineField({
          name: 'paddingX',
          title: '⬅️➡️ Horizontale ruimte',
          type: 'string',
          options: {
            list: [
              {title: '🚪 Geen', value: 'none'},
              {title: '📐 Compact', value: 'sm'},
              {title: '📐 Normaal', value: 'md'},
              {title: '📐 Ruim', value: 'lg'},
            ],
          },
          initialValue: 'md',
          description: 'Bepaalt de zijmarges binnen de sectie.',
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
          description: 'Zet de afstand tussen de componenten binnen dezelfde kolom.',
        }),
        defineField({
          name: 'horizontalAlignment',
          title: '🧭 Horizontale uitlijning',
          type: 'string',
          options: {
            list: [
              {title: '⬅️ Links', value: 'left'},
              {title: '⏺️ Midden', value: 'center'},
              {title: '➡️ Rechts', value: 'right'},
            ],
            layout: 'radio',
          },
          initialValue: 'left',
          description: 'Lijn de inhoud uit binnen de sectie.',
        }),
        defineField({
          name: 'verticalAlignment',
          title: '🧭 Verticale uitlijning',
          type: 'string',
          options: {
            list: [
              {title: '🔼 Boven', value: 'top'},
              {title: '⏺️ Midden', value: 'center'},
              {title: '🔽 Onder', value: 'bottom'},
            ],
            layout: 'radio',
          },
          initialValue: 'top',
          description: 'Bepaalt of de kolommen bovenaan, in het midden of onderaan uitgelijnd worden.',
        }),
      ],
    }),
    defineField({
      name: 'background',
      title: '🌈 Achtergrond',
      type: 'backgroundComponent',
      description: 'Kies optioneel een aangepaste achtergrond voor deze sectie. De opties tonen direct een voorbeeld.',
    }),
    defineField({
      name: 'columns',
      title: '🧱 Kolommen',
      type: 'array',
      of: [defineArrayMember({type: 'pageColumn'})],
      validation: (rule) => rule.min(1).error('Voeg ten minste één kolom toe aan de sectie.'),
      description: 'Bepaal hoeveel kolommen deze sectie heeft en welke componenten daarin staan.',
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
