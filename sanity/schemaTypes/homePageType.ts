import { HomeIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const homePageType = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      initialValue: 'Homepage',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSection',
      title: 'Hero',
      type: 'heroSection',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoSection',
      title: 'Video',
      type: 'videoSection',
    }),
    defineField({
      name: 'textWithImageSection',
      title: 'Tekst met afbeelding',
      type: 'textWithImageSection',
    }),
    defineField({
      name: 'ctaBanner',
      title: 'CTA banner',
      type: 'ctaBanner',
    }),
    defineField({
      name: 'blogSection',
      title: 'Blog sectie',
      type: 'blogSection',
    }),
    defineField({
      name: 'projectsSection',
      title: 'Projecten sectie',
      type: 'projectsSection',
    }),
    defineField({
      name: 'partnersSection',
      title: 'Partners sectie',
      type: 'partnersSection',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})