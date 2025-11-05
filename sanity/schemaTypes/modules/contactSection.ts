import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'object',
  fields: [defineField({name: 'heading', type: 'string'})],
  preview: {prepare: () => ({title: 'Contact'})},
})
