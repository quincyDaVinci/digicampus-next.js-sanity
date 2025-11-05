import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'compareFeaturesSection',
  title: 'Compare Features Section',
  type: 'object',
  fields: [defineField({name: 'heading', type: 'string'})],
  preview: {prepare: () => ({title: 'Compare Features'})},
})
