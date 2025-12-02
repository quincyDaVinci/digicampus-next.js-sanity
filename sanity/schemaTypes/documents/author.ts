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
      name: 'category',
      title: 'Team category',
      type: 'reference',
      to: [{ type: 'teamCategory' }],
      description: 'Link this author to a team category. Create categories in the "Team category" document type.',
    }),
    defineField({
      name: 'includeInTeam',
      title: 'Include in team listings',
      type: 'boolean',
      description: 'Toggle to include or exclude this author from auto-included team sections',
      initialValue: true,
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
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Public contact email (optional).',
      validation: (Rule) => Rule.uri({allowRelative: false}).custom((v) => (v && v.indexOf('@') === -1) ? 'Invalid email' : true),
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Link to LinkedIn profile (optional).',
    }),
    defineField({
      name: 'bio',
      title: 'Biografie',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternatieve tekst',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'size',
              type: 'string',
              title: 'Afbeeldingsgrootte',
              options: {
                list: [
                  {title: 'Klein', value: 'small'},
                  {title: 'Gemiddeld', value: 'medium'},
                  {title: 'Groot', value: 'large'},
                ],
                layout: 'radio',
              },
              initialValue: 'large',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
