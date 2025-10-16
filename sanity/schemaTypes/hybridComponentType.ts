import { defineField, defineType } from 'sanity'
import { FlagIcon, LayersIcon, ShieldIcon, UsersIcon, BookOpenIcon, ZapIcon } from '../lib/featherIcons'

const iconChoices = [
  { title: 'Samenwerking', value: 'users', icon: UsersIcon },
  { title: 'Initiatief', value: 'flag', icon: FlagIcon },
  { title: 'Innovatie', value: 'zap', icon: ZapIcon },
  { title: 'Structuur', value: 'layers', icon: LayersIcon },
  { title: 'Veiligheid', value: 'shield', icon: ShieldIcon },
  { title: 'Kennis', value: 'book-open', icon: BookOpenIcon },
] as const

type IconValue = typeof iconChoices[number]['value']

export const hybridComponentType = defineType({
  name: 'hybridComponent',
  title: 'Hybride component',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Type component',
      type: 'string',
      options: {
        list: [
          { title: 'Featurekaart', value: 'feature' },
          { title: 'Call-to-action', value: 'callout' },
        ],
        layout: 'radio',
      },
      initialValue: 'feature',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stylePreset',
      title: 'Sectiestijl',
      type: 'string',
      options: {
        list: [
          { title: 'Gebalanceerd', value: 'structured' },
          { title: 'Verfrissend', value: 'fresh' },
          { title: 'Contrasterend', value: 'contrast' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'tone',
      title: 'Kaartaccent',
      type: 'string',
      options: {
        list: [
          { title: 'Neutraal', value: 'surface' },
          { title: 'Accent', value: 'accent' },
          { title: 'Contrasterend', value: 'contrast' },
        ],
        layout: 'radio',
      },
      initialValue: 'surface',
    }),
    defineField({
      name: 'icon',
      title: 'Pictogram',
      type: 'string',
      options: {
        list: iconChoices.map(({ title, value }) => ({ title, value })),
      },
      initialValue: 'layers',
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Korte bovenkop voor context.',
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required().min(5).max(120),
    }),
    defineField({
      name: 'body',
      title: 'Beschrijving',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.max(400),
    }),
    defineField({
      name: 'cta',
      title: 'Call to action',
      type: 'linkField',
      hidden: ({ parent }) => parent?.variant !== 'callout',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eyebrow',
      iconValue: 'icon',
    },
    prepare(selection) {
      const { title, subtitle, iconValue } = selection as { title?: string; subtitle?: string; iconValue?: IconValue }
      const selected = iconChoices.find((item) => item.value === iconValue)
      return {
        title: title ?? 'Hybride component',
        subtitle,
        media: selected?.icon ?? LayersIcon,
      }
    },
  },
})
