import {defineArrayMember, defineField, defineType} from 'sanity'

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
      title: 'Lay-out instellingen',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: 'contentWidth',
          title: 'Breedte inhoud',
          type: 'string',
          options: {
            list: [
              {title: 'Smalle kolom', value: 'narrow'},
              {title: 'Standaard', value: 'default'},
              {title: 'Breed', value: 'wide'},
              {title: 'Volledige breedte', value: 'full'},
            ],
            layout: 'radio',
          },
          initialValue: 'default',
        }),
        defineField({
          name: 'paddingY',
          title: 'Verticale ruimte',
          type: 'string',
          options: {
            list: [
              {title: 'Geen', value: 'none'},
              {title: 'Klein', value: 'sm'},
              {title: 'Normaal', value: 'md'},
              {title: 'Groot', value: 'lg'},
              {title: 'Extra groot', value: 'xl'},
            ],
          },
          initialValue: 'lg',
        }),
        defineField({
          name: 'paddingX',
          title: 'Horizontale ruimte',
          type: 'string',
          options: {
            list: [
              {title: 'Geen', value: 'none'},
              {title: 'Compact', value: 'sm'},
              {title: 'Normaal', value: 'md'},
              {title: 'Ruim', value: 'lg'},
            ],
          },
          initialValue: 'md',
        }),
        defineField({
          name: 'componentSpacing',
          title: 'Ruimte tussen componenten',
          type: 'string',
          options: {
            list: [
              {title: 'Compact', value: 'tight'},
              {title: 'Normaal', value: 'normal'},
              {title: 'Ruim', value: 'relaxed'},
            ],
          },
          initialValue: 'normal',
        }),
        defineField({
          name: 'horizontalAlignment',
          title: 'Horizontale uitlijning',
          type: 'string',
          options: {
            list: [
              {title: 'Links', value: 'left'},
              {title: 'Midden', value: 'center'},
              {title: 'Rechts', value: 'right'},
            ],
            layout: 'radio',
          },
          initialValue: 'left',
        }),
        defineField({
          name: 'verticalAlignment',
          title: 'Verticale uitlijning',
          type: 'string',
          options: {
            list: [
              {title: 'Boven', value: 'top'},
              {title: 'Midden', value: 'center'},
              {title: 'Onder', value: 'bottom'},
            ],
            layout: 'radio',
          },
          initialValue: 'top',
        }),
      ],
    }),
    defineField({
      name: 'background',
      title: 'Achtergrond',
      type: 'backgroundComponent',
      description: 'Kies optioneel een aangepaste achtergrond voor deze sectie.',
    }),
    defineField({
      name: 'columns',
      title: 'Kolommen',
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
