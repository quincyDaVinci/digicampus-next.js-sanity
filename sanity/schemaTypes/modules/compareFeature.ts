import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'compareFeature',
  title: 'Compare Feature',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'description', type: 'text'}),
  ],
  preview: {
    select: {title: 'title'},
  },
})
