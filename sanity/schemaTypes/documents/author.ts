import {UserIcon} from '../../lib/featherIcons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'author',
  title: 'Auteur',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Naam',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'role',
      title: 'Functie',
      type: 'string',
      description: 'Bijvoorbeeld: Content Marketeer, Senior Developer, etc.',
    }),
    defineField({
      name: 'company',
      title: 'Bedrijf',
      type: 'string',
      description: 'De organisatie waar de auteur werkt',
    }),
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternatieve tekst',
        },
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Biografie',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
