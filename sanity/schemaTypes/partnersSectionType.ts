import { UsersIcon } from '../lib/featherIcons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const partnerLogoType = defineType({
  name: 'partnerLogo',
  title: 'Partner logo',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Naam',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(120),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
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
      title: 'name',
      media: 'logo',
    },
  },
})

export const partnersSectionType = defineType({
  name: 'partnersSection',
  title: 'Partners sectie',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'stylePreset',
      title: 'Stijlvariant',
      type: 'string',
      options: {
        list: [
          { title: 'Verfrissend', value: 'fresh' },
          { title: 'Gebalanceerd', value: 'structured' },
          { title: 'Contrasterend', value: 'contrast' },
        ],
        layout: 'radio',
      },
      initialValue: 'fresh',
    }),
    defineField({
      name: 'heading',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(120),
    }),
    defineField({
      name: 'logos',
      title: 'Partner logo\'s',
      type: 'array',
      of: [defineArrayMember({ type: 'partnerLogo' })],
      validation: (rule) => rule.required().min(2),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'logos.length',
    },
    prepare(selection) {
      const { title, subtitle } = selection as { title?: string; subtitle?: number }
      return {
        title,
        subtitle: subtitle ? `${subtitle} partners` : 'Nog geen partners',
      }
    },
  },
})