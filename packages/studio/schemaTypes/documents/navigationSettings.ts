import {defineType, defineField} from 'sanity'
import {LayersIcon} from '../../lib/featherIcons'

// Minimal singleton for navigation-related site settings
export default defineType({
  name: 'navigationSettings',
  title: 'Navigation Settings',
  type: 'document',
  icon: LayersIcon,
  fields: [
    defineField({
      name: 'defaultHeader',
      title: 'Default header menu',
      type: 'reference',
      to: [{type: 'navigation'}],
      description: 'Reference to the navigation document to use as the site header',
    }),
    defineField({
      name: 'defaultFooter',
      title: 'Default footer menu',
      type: 'reference',
      to: [{type: 'navigation'}],
      description: 'Reference to the navigation document to use as the site footer',
    }),
  ],
  preview: {
    select: {
      headerTitle: 'defaultHeader.title',
      headerLang: 'defaultHeader.language',
      footerTitle: 'defaultFooter.title',
      footerLang: 'defaultFooter.language',
    },
    prepare(selection) {
      const {headerTitle, headerLang, footerTitle, footerLang} = selection as any
      const headerLabel = headerTitle ? `${headerTitle} ${headerLang ? `(${headerLang.toUpperCase()})` : ''}` : 'Not set'
      const footerLabel = footerTitle ? `${footerTitle} ${footerLang ? `(${footerLang.toUpperCase()})` : ''}` : 'Not set'
      return {
        title: 'Navigation Settings',
        subtitle: `Header: ${headerLabel} • Footer: ${footerLabel}`,
        media: LayersIcon,
      }
    },
  },
})
