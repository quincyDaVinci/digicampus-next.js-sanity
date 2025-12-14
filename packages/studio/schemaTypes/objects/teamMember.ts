import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'teamMemberInline',
  title: 'Team member (inline)',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Innovatoren', value: 'innovatoren' },
          { title: 'Promovendi', value: 'promovendi' },
          { title: 'Associate researchers', value: 'associate researchers' },
          { title: 'Students', value: 'students' },
          { title: 'Bestuurders', value: 'bestuurders' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alternative text' },
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Short bio',
      type: 'text',
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{ type: 'link' }],
    }),
  ],
})
