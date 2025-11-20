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
      validation: (Rule) => Rule.required(),
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
      name: 'htmlAlternativePortableText',
      title: 'HTML Alternative (Portable Text)',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Provide an inline HTML alternative when a PDF cannot be remediated.',
      group: 'accessibility',
    }),
  ],
  validation: (Rule) =>
    Rule.custom((fields) => {
      if (!fields) return true
      const hasHtmlAlternative = Boolean(
        fields.htmlAlternativeUrl || (fields.htmlAlternativePortableText?.length ?? 0) > 0
      )
      const hasAccessiblePdf = Boolean(fields.documentFile && fields.wcagStatus)

      if (!hasAccessiblePdf && !hasHtmlAlternative) {
        return 'Upload a tagged PDF (checked as WCAG-ready) or provide an HTML alternative before publishing.'
      }

      return true
    }),
  preview: {
    select: {
      title: 'title',
      language: 'language',
      hasHtml: 'htmlAlternativeUrl',
    },
    prepare: ({title, language, hasHtml}) => ({
      title: title || 'Accessible document',
      subtitle: language ? `${language.toUpperCase()}${hasHtml ? ' • HTML alternative' : ''}` : undefined,
      media: FileTextIcon,
    }),
  },
})
