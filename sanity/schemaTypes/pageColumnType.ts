import {defineArrayMember, defineField, defineType} from 'sanity'

export const pageColumnType = defineType({
  name: 'pageColumn',
  title: 'Kolom',
  type: 'object',
  fields: [
    defineField({
      name: 'width',
      title: 'Breedte',
      type: 'string',
      options: {
        list: [
          {title: 'Volledige breedte (1/1)', value: '1/1'},
          {title: 'Halve breedte (1/2)', value: '1/2'},
          {title: 'Eenderde (1/3)', value: '1/3'},
          {title: 'Tweederde (2/3)', value: '2/3'},
        ],
        layout: 'radio',
      },
      initialValue: '1/1',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'components',
      title: 'Componenten',
      type: 'array',
      of: [
        defineArrayMember({type: 'heroSection', title: 'Hero'}),
        defineArrayMember({type: 'videoSection', title: 'Video'}),
        defineArrayMember({type: 'textWithImageSection', title: 'Tekst met afbeelding'}),
        defineArrayMember({type: 'ctaBanner', title: 'CTA banner'}),
        defineArrayMember({type: 'blogSection', title: 'Blog sectie'}),
        defineArrayMember({type: 'projectsSection', title: 'Projecten sectie'}),
        defineArrayMember({type: 'partnersSection', title: 'Partners sectie'}),
        defineArrayMember({type: 'hybridComponent', title: 'Hybride component'}),
      ],
      validation: (rule) => rule.min(1).warning('Voeg ten minste één component toe'),
    }),
  ],
  preview: {
    select: {
      width: 'width',
      components: 'components',
    },
    prepare({width, components}) {
      const count = components?.length ?? 0
      return {
        title: width ? `Kolom ${width}` : 'Kolom',
        subtitle: count
          ? `${count} component${count === 1 ? '' : 'en'}`
          : 'Nog geen componenten',
      }
    },
  },
})
