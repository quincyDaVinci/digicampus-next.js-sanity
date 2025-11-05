import {defineField, defineType} from 'sanity'
import {BookOpenIcon} from '../../lib/featherIcons'

// Placeholder - TO BE COMPLETED
// Copy full schema from sane-kit: studio/schemaTypes/blogSection.ts
export default defineType({
  name: 'blogSection',
  title: 'Blog Section',
  type: 'object',
  icon: BookOpenIcon,
  fields: [
    defineField({name: 'heading', type: 'string'}),
    defineField({name: 'variant', type: 'string', options: {list: ['default', 'grid']}}),
    // TODO: Add remaining fields from sane-kit
  ],
  preview: {
    prepare: () => ({title: 'Blog Section'}),
  },
})
