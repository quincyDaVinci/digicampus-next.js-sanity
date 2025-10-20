import {defineField, defineType} from 'sanity'

const variantOptions = [
  {title: 'Primaire CTA', value: 'cta'},
  {title: 'Gevulde knop', value: 'filled'},
  {title: 'Rand (outline)', value: 'outline'},
  {title: 'Ghost', value: 'ghost'},
  {title: 'Eigen kleur', value: 'custom'},
]

const colorTokens = [
  {title: 'Brand (var(--dc-brand))', value: 'brand'},
  {title: 'Primary (var(--dc-primary))', value: 'primary'},
  {title: 'Navy (var(--dc-navy))', value: 'navy'},
  {title: 'Text (var(--dc-text))', value: 'text'},
  {title: 'Surface (var(--dc-surface))', value: 'surface'},
]

const iconOptions = [
  {title: 'Geen icoon', value: 'none'},
  {title: 'Pijl naar rechts', value: 'arrow-right'},
  {title: 'Download', value: 'download'},
  {title: 'Externe link', value: 'external'},
  {title: 'Video', value: 'video'},
]

export const buttonComponentType = defineType({
  name: 'buttonComponent',
  title: 'Knop',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Knoptekst',
      type: 'string',
      validation: (rule) => rule.required().min(2).max(60),
    }),
    defineField({
      name: 'ariaLabel',
      title: 'Alternatieve aria-label',
      type: 'string',
      description: 'Gebruik dit om extra context te geven, bijvoorbeeld "Download jaarverslag (PDF)".',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'linkField',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Stijl',
      type: 'string',
      options: {list: variantOptions, layout: 'radio'},
      initialValue: 'cta',
    }),
    defineField({
      name: 'customColorToken',
      title: 'Design token voor achtergrond',
      type: 'string',
      options: {list: colorTokens},
      hidden: ({parent}) => parent?.variant !== 'custom',
    }),
    defineField({
      name: 'customTextColorToken',
      title: 'Design token voor tekst',
      type: 'string',
      options: {list: colorTokens},
      hidden: ({parent}) => parent?.variant !== 'custom',
    }),
    defineField({
      name: 'icon',
      title: 'Icoon',
      type: 'string',
      options: {list: iconOptions},
      initialValue: 'none',
    }),
    defineField({
      name: 'iconPosition',
      title: 'Positie icoon',
      type: 'string',
      options: {
        list: [
          {title: 'Voor de tekst', value: 'leading'},
          {title: 'Na de tekst', value: 'trailing'},
        ],
      },
      hidden: ({parent}) => !parent?.icon || parent.icon === 'none',
      initialValue: 'trailing',
    }),
    defineField({
      name: 'fullWidth',
      title: 'Volledige breedte',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'label',
      variant: 'variant',
    },
    prepare({title, variant}) {
      return {
        title: title || 'Knop',
        subtitle: variant ? `Stijl: ${variant}` : undefined,
      }
    },
  },
})
