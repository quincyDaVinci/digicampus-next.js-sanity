import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pricingSection',
  title: 'Pricing Section',
  type: 'object',
  fields: [defineField({name: 'heading', type: 'string'})],
  preview: {prepare: () => ({title: 'Pricing'})},
})
