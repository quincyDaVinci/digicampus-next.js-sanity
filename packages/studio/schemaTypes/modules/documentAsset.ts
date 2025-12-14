import {defineField, defineType} from 'sanity'
import {FileTextIcon} from '../../lib/featherIcons'

export default defineType({
  name: 'documentAsset',
  title: 'Accessible Document',
  type: 'object',
  icon: FileTextIcon,
  description:
    'Upload tagged PDFs or provide an HTML alternative. See docs/PDF_ACCESSIBILITY.md for remediation guidance.',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'accessibility', title: 'Accessibility'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Human-readable Title',
      type: 'string',
      description: 'Display name users will see for this document.',
      validation: (Rule) => Rule.required().max(160),
      group: 'content',
    }),
    defineField({
      name: 'summary',
      title: 'Summary / Abstract',
      type: 'text',
      rows: 3,
      description: 'Short description for context and accessibility.',
      validation: (Rule) => Rule.required().min(20).max(400),
      group: 'content',
    }),
    defineField({
      name: 'documentFile',
      title: 'Document (PDF)',
      type: 'file',
      options: {
        accept: 'application/pdf',
      },
      description:
        'Upload a tagged PDF. Need help? See docs/PDF_ACCESSIBILITY.md for remediation steps.',
      group: 'content',
    }),
    defineField({
      name: 'language',
      title: 'Document Language',
      type: 'string',
      description: 'Language of the document content (e.g., en, nl).',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return true
          // Match ISO 639-1 (2 letters) or BCP 47 (e.g., en-US)
          const languageCodePattern = /^[a-z]{2}(-[A-Z]{2})?$/
          return languageCodePattern.test(value) || 'Please use a valid language code (e.g., "en", "nl", "en-US")'
        }),
      group: 'content',
    }),
    defineField({
      name: 'wcagStatus',
      title: 'PDF is tagged and meets WCAG?',
      type: 'boolean',
      description: 'Confirm the uploaded PDF has proper tagging and passes accessibility checks.',
      initialValue: false,
      group: 'accessibility',
    }),
    defineField({
      name: 'accessibilityReport',
      title: 'Accessibility Report',
      type: 'file',
      description: 'Upload an accessibility evaluation report (optional).',
      group: 'accessibility',
    }),
    defineField({
      name: 'htmlAlternativeUrl',
      title: 'HTML Alternative URL',
      type: 'url',
      description: 'Link to an accessible HTML version of this content.',
      group: 'accessibility',
    }),
    defineField({
      name: 'htmlAlternativeFile',
      title: 'HTML Alternative (Upload File)',
      type: 'file',
      options: {
        accept: 'text/html,.html,.htm',
      },
      description: 'Upload an HTML file as an accessible alternative to the PDF.',
      group: 'accessibility',
    }),
    defineField({
      name: 'htmlAlternativePortableText',
      title: 'HTML Alternative (Portable Text)',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternatieve tekst',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'size',
              type: 'string',
              title: 'Afbeeldingsgrootte',
              options: {
                list: [
                  {title: 'Klein', value: 'small'},
                  {title: 'Gemiddeld', value: 'medium'},
                  {title: 'Groot', value: 'large'},
                ],
                layout: 'radio',
              },
              initialValue: 'large',
            },
          ],
        },
      ],
      description: 'Provide an inline HTML alternative when a PDF cannot be remediated (legacy field).',
      group: 'accessibility',
    }),
  ],
  validation: (Rule) =>
    Rule.custom((fields) => {
      if (!fields) return true
      const f = fields as any
      const hasHtmlAlternative = Boolean(
        f.htmlAlternativeUrl ||
        (f.htmlAlternativeFile?.asset) ||
        (f.htmlAlternativePortableText?.length ?? 0) > 0
      )
      const hasAccessiblePdf = Boolean(f.documentFile?.asset && f.wcagStatus)

      if (!hasAccessiblePdf && !hasHtmlAlternative) {
        return 'Upload a tagged PDF (checked as WCAG-ready) or provide an HTML alternative before publishing.'
      }

      return true
    }),
  preview: {
    select: {
      title: 'title',
      language: 'language',
      hasHtmlUrl: 'htmlAlternativeUrl',
      hasHtmlFile: 'htmlAlternativeFile',
      hasHtmlPortableText: 'htmlAlternativePortableText',
    },
    prepare: ({title, language, hasHtmlUrl, hasHtmlFile, hasHtmlPortableText}) => {
      const hasHtmlAlternative = hasHtmlUrl || hasHtmlFile || (hasHtmlPortableText?.length ?? 0) > 0
      return {
        title: title || 'Accessible document',
        subtitle: language ? `${language.toUpperCase()}${hasHtmlAlternative ? ' • HTML alternative' : ''}` : undefined,
        media: FileTextIcon,
      }
    },
  },
})
