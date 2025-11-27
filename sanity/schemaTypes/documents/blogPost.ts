import React from 'react'
import {BookOpenIcon} from '../../lib/featherIcons'
import {defineField, defineType} from 'sanity'
import {useFormValue, set} from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blogbericht',
  type: 'document',
  icon: BookOpenIcon,
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
      initialValue: 'nl',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      to: [{type: 'author'}],
    }),
    defineField({
      name: 'mainImage',
      title: 'Hoofdafbeelding',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternatieve tekst',
        },
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categorieën',
      type: 'array',
      of: [{type: 'reference', to: {type: 'blogCategory'}}],
      validation: (Rule) => Rule.max(3).warning('Maximum 3 categorieën aanbevolen voor een overzichtelijke weergave'),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
      description: 'Optional tags for taxonomy and related-posts filtering',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Gepubliceerd op',
      type: 'datetime',
    }),
    defineField({
      name: 'estimatedReadTime',
      title: 'Geschatte leestijd (minuten)',
      type: 'number',
      description: 'Laat leeg om automatisch te berekenen op basis van de inhoud. Klik op "Bereken leestijd" om handmatig te berekenen.',
      validation: (Rule) => Rule.min(1).integer(),
      components: {
        input: function CustomReadTimeInput(props) {
          const {onChange, renderDefault} = props
          // Use useFormValue hook to access the body field from the current form state
          const body = useFormValue(['body'])
          
          const calculateReadTime = () => {
            // Debug: log what we have access to
            console.log('Document body:', body)
            console.log('Body type:', typeof body)
            console.log('Is array:', Array.isArray(body))
            
            if (!body || !Array.isArray(body) || body.length === 0) {
              alert('Geen inhoud gevonden om leestijd te berekenen. Voeg eerst inhoud toe aan het veld "Inhoud".')
              return
            }

            let wordCount = 0
            const traverse = (blocks: unknown[]) => {
              blocks.forEach((block: unknown) => {
                if (block && typeof block === 'object' && 'children' in block) {
                  const typedBlock = block as {_type?: string; children?: unknown[]}
                  if (typedBlock._type === 'block' && Array.isArray(typedBlock.children)) {
                    typedBlock.children.forEach((child: unknown) => {
                      if (child && typeof child === 'object' && 'text' in child) {
                        const typedChild = child as {text?: unknown}
                        if (typeof typedChild.text === 'string') {
                          wordCount += typedChild.text.split(/\s+/).filter(Boolean).length
                        }
                      }
                    })
                  }
                  if (Array.isArray(typedBlock.children)) {
                    traverse(typedBlock.children)
                  }
                }
              })
            }

            traverse(body)
            
            console.log('Total word count:', wordCount)
            
            if (wordCount === 0) {
              alert('Geen tekst gevonden in de inhoud. Voeg eerst tekst toe aan het veld "Inhoud".')
              return
            }
            
            const minutes = Math.max(1, Math.round(wordCount / 200))
            onChange(set(minutes))
          }

          return React.createElement(
            'div',
            {style: {display: 'flex', gap: '0.5rem', alignItems: 'flex-end'}},
            React.createElement('div', {style: {flex: 1}}, renderDefault(props)),
            React.createElement(
              'button',
              {
                type: 'button',
                onClick: calculateReadTime,
                style: {
                  padding: '0.5rem 1rem',
                  background: '#2276fc',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  height: 'fit-content',
                },
              },
              'Bereken leestijd'
            )
          )
        },
      },
    }),
    defineField({
      name: 'featured',
      title: 'Uitgelicht',
      type: 'boolean',
      initialValue: false,
      description: 'Markeer dit bericht als uitgelicht voor speciale weergave.',
    }),
    defineField({
      name: 'viewCount',
      title: 'Aantal weergaven',
      type: 'number',
      initialValue: 0,
      description: 'Het aantal keer dat dit bericht is bekeken (voor populariteit).',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Samenvatting',
      type: 'text',
      rows: 4,
      description: 'Korte samenvatting voor kaarten (maximaal 75 woorden)',
      validation: (Rule) => Rule
        .custom((value) => {
          if (!value) return true
          const wordCount = value.trim().split(/\s+/).filter(Boolean).length
          return wordCount <= 75 || `Maximaal 75 woorden aanbevolen (nu ${wordCount}).`
        })
        .warning(),
    }),
    defineField({
      name: 'body',
      title: 'Inhoud',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) => Rule.uri({
                      scheme: ['http', 'https', 'mailto', 'tel'],
                    }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          icon: () => '🖼️',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternatieve tekst',
              description: 'Beschrijf de afbeelding voor toegankelijkheid',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Onderschrift',
              description: 'Optioneel onderschrift dat onder de afbeelding wordt weergegeven',
            },
            {
              name: 'size',
              type: 'string',
              title: 'Afbeeldingsgrootte',
              description: 'Kies de weergavegrootte van de afbeelding',
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
      options: {
        insertMenu: {
          filter: true,
          groups: [
            {
              name: 'media',
              title: 'Media',
              of: ['image'],
            },
          ],
          views: [
            {type: 'grid', layout: 'default'},
            {type: 'inline', layout: 'default'},
          ],
        },
      },
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related posts (per-post settings)',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        { name: 'heading', title: 'Section heading', type: 'string', initialValue: 'Meer blogs' },
        { name: 'subheading', title: 'Section subheading', type: 'string' },
        {
          name: 'relationMode',
          title: 'Relation mode',
          type: 'string',
          options: {
            list: [
              { title: 'Recent posts', value: 'recent' },
              { title: 'Related by tags', value: 'tags' },
              { title: 'Related by author', value: 'author' },
              { title: 'Related by read time', value: 'readTime' },
            ],
            layout: 'radio',
          },
          initialValue: 'tags',
          description: 'Choose how similar posts should be selected for the related posts section.',
        },
      ],
      description: 'Configure how the related posts section should find similar articles. The section is shown by default on the blog page; choose the relation method and heading/subheading.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `door ${author}`}
    },
  },
})
