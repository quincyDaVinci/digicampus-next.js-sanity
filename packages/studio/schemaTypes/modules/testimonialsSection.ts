import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonialsSection',
  title: 'Testimonials Section',
  type: 'object',
  fields: [defineField({name: 'heading', type: 'string'})],
  preview: {prepare: () => ({title: 'Testimonials'})},
})
