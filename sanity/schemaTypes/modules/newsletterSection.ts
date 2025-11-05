import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'newsletterSection',
  title: 'Newsletter Section',
  type: 'object',
  fields: [defineField({name: 'heading', type: 'string'})],
  preview: {prepare: () => ({title: 'Newsletter'})},
})
