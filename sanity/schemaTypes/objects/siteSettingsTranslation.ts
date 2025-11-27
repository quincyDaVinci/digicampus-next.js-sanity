import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettingsTranslation',
  title: 'Vertaling (legacy site settings)',
  type: 'object',
  fields: [
    defineField({
      name: 'language',
      title: 'Taal',
      type: 'string',
      options: {
        list: [
          {title: 'Nederlands', value: 'nl'},
          {title: 'English', value: 'en'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Vertaalde titel',
      type: 'string',
    }),
  ],
})
