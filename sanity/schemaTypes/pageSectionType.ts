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
    },
    prepare({title, columns}) {
      const count = columns?.length ?? 0
      return {
        title: title || 'Nieuwe sectie',
        subtitle: count
          ? `${count} kolom${count === 1 ? '' : 'men'}`
          : 'Nog geen kolommen',
      }
    },
  },
})
