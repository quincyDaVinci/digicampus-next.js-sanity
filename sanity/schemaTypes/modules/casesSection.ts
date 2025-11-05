import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'casesSection',
  title: 'Cases Section',
  type: 'object',
  fields: [defineField({name: 'heading', type: 'string'})],
  preview: {prepare: () => ({title: 'Cases'})},
})
