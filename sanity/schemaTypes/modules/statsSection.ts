import {defineField, defineType} from 'sanity'

// Placeholder schemas - TO BE COMPLETED
// Copy from sane-kit repo for each

export default defineType({
  name: 'statsSection',
  title: 'Stats Section',
  type: 'object',
  fields: [defineField({name: 'heading', type: 'string'})],
  preview: {prepare: () => ({title: 'Stats Section'})},
})
