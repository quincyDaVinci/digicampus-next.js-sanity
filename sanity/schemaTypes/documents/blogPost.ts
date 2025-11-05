import {BookOpenIcon} from '../../lib/featherIcons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blogbericht',
  type: 'document',
  icon: BookOpenIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      to: [{type: 'author'}],
    }),
    defineField({
      name: 'mainImage',
      title: 'Hoofdafbeelding',
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
      name: 'categories',
      title: 'Categorieën',
      type: 'array',
      of: [{type: 'reference', to: {type: 'blogCategory'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Gepubliceerd op',
      type: 'datetime',
    }),
    defineField({
      name: 'excerpt',
      title: 'Samenvatting',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'body',
      title: 'Inhoud',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `door ${author}`}
    },
  },
})
