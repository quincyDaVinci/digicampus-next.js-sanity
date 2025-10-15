import { MdLayers } from 'react-icons/md'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const projectCardType = defineType({
  name: 'projectCard',
  title: 'Project kaart',
  type: 'object',
  icon: MdLayers,
  fields: [
    defineField({
      name: 'title',
      title: 'Naam',
      type: 'string',
      validation: (rule) => rule.required().min(3).max(120),
    }),
    defineField({
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(320),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'linkField',
    }),
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternatieve tekst',
          type: 'string',
          validation: (rule) => rule.required().max(160),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'image',
    },
  },
})

export const projectsSectionType = defineType({
  name: 'projectsSection',
  title: 'Projecten sectie',
  type: 'object',
  icon: MdLayers,
  fields: [
    defineField({
      name: 'heading',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(120),
    }),
    defineField({
      name: 'description',
      title: 'Introductie',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(320),
    }),
    defineField({
      name: 'projects',
      title: 'Projecten',
      type: 'array',
      of: [defineArrayMember({ type: 'projectCard' })],
      validation: (rule) => rule.required().min(1).max(6),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'description',
    },
  },
})