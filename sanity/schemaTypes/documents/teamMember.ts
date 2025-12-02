import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
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
      name: 'includeInTeam',
      title: 'Include in team listings',
      type: 'boolean',
      description: 'Toggle to include or exclude this person from auto-included team sections',
      initialValue: true,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alternative text' }],
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
  preview: {
    select: { title: 'name', subtitle: 'position', media: 'image' },
  },
})
