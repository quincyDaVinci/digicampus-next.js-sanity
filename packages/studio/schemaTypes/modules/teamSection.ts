import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'teamSection',
  title: 'Team section',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'string' }),
    defineField({
      name: 'autoIncludeAll',
      title: 'Automatically include all team members?',
      type: 'boolean',
      description: 'If enabled, this section will render all `author` documents from the dataset that have "Include in team listings" enabled.',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'subheading' },
  },
})
