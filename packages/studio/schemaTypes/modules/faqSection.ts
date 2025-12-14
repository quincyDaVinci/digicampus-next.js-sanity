import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'object',
  fields: [defineField({name: 'heading', type: 'string'})],
  preview: {prepare: () => ({title: 'FAQ'})},
})
