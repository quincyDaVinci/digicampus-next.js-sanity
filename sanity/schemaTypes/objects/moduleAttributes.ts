import {defineField, defineType} from 'sanity'

/**
 * Module attributes for section customization
 * Based on SanityPress pattern - allows anchor links and visibility control
 */
export default defineType({
  name: 'module-attributes',
  title: 'Module Attributes',
  type: 'object',
  fields: [
    defineField({
      name: 'uid',
      title: 'Unique Identifier',
      type: 'string',
      description: 'Used for anchor/jump links (HTML id attribute)',
      placeholder: 'e.g. contact-section',
      validation: (Rule) =>
        Rule.regex(/^[a-zA-Z0-9-]+$/).error('Only letters, numbers, and hyphens allowed'),
    }),
    defineField({
      name: 'hidden',
      title: 'Hide Section',
      type: 'boolean',
      description: 'Temporarily hide this section from the page',
      initialValue: false,
    }),
  ],
})
