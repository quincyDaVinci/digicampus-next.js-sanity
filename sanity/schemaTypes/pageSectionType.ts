import {defineArrayMember, defineField, defineType} from 'sanity'
import {ChoiceCardInput} from '../components/inputs'

export const pageSectionType = defineType({
  name: 'pageSection',
  title: 'Sectie',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Interne naam',
      type: 'string',
      description: 'Gebruik dit om secties in de lijst snel terug te vinden (niet zichtbaar op de website).',
    }),
    defineField({
      name: 'layout',
      title: '⚙️ Lay-out & ritme',
      type: 'object',
      options: {collapsible: false},
      fields: [
        defineField({
          name: 'contentWidth',
          title: '📐 Breedte inhoud',
          type: 'string',
          description: 'Bepaalt hoe breed de inhoudkolom wordt weergegeven.',
          options: {
            list: [
              {title: '🎯 Smalle focus', value: 'narrow'},
              {title: '📄 Standaard', value: 'default'},
              {title: '🖥️ Breed', value: 'wide'},
              {title: '🌍 Volledige breedte', value: 'full'},
            ],
          },
          initialValue: 'default',
          components: {input: ChoiceCardInput},
        }),
        defineField({
          name: 'paddingY',
          title: '↕️ Verticale ruimte',
          type: 'string',
          description: 'Voeg extra ademruimte boven en onder de sectie toe.',
          options: {
            list: [
              {title: '🚫 Geen', value: 'none'},
              {title: '🌱 Compact', value: 'sm'},
              {title: '🌤️ Comfortabel', value: 'md'},
              {title: '🌳 Ruim', value: 'lg'},
              {title: '🌄 Extra ruim', value: 'xl'},
            ],
          },
          initialValue: 'lg',
          components: {input: ChoiceCardInput},
        }),
        defineField({
          name: 'horizontalAlignment',
          title: '🎯 Uitlijning',
          type: 'string',
          description: 'Kies waar de inhoud binnen de sectie uitgelijnd wordt.',
          options: {
            list: [
              {title: '⬅️ Links', value: 'left'},
              {title: '↔️ Midden', value: 'center'},
              {title: '➡️ Rechts', value: 'right'},
            ],
          },
          initialValue: 'left',
          components: {input: ChoiceCardInput},
        }),
      ],
    }),
    defineField({
      name: 'background',
      title: 'Achtergrond',
      type: 'backgroundComponent',
      description: 'Kies een achtergrondstijl zodat redacteuren direct zien welke sfeer de sectie krijgt.',
    }),
    defineField({
      name: 'columns',
      title: 'Kolommen',
      type: 'array',
      description: 'Voeg een of meerdere kolommen toe en sleep ze om de volgorde te bepalen.',
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
