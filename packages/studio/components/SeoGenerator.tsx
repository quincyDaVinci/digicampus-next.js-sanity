import React, {useState} from 'react'
import {Button, Card, Flex, Stack, Text, useToast} from '@sanity/ui'
import type {ObjectInputProps} from 'sanity'
import {PatchEvent, set} from 'sanity'
import {useFormValue} from 'sanity'

async function generateSeoRemote(payload: {title?: string; content?: string; language?: string}) {
  try {
    const res = await fetch('/api/generate-seo', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`SEO generation failed (${res.status})`)
    return (await res.json()) as {title?: string; description?: string; provider?: string}
  } catch (err) {
    console.warn('SEO remote generation failed', err)
    throw err
  }
}

export default function SeoGenerator(props: ObjectInputProps) {
  const {renderDefault, onChange} = props
  const toast = useToast()
  const [isGenerating, setIsGenerating] = useState(false)

  // gather source content from the document
  const docTitle = (useFormValue(['title']) as string | undefined) ?? ''
  const docBody = (useFormValue(['modules']) as unknown) ?? null
  const docExcerpt = (useFormValue(['excerpt']) as string | undefined) ?? ''
  const docLang = ((useFormValue(['metadata', 'language']) as string | undefined) ?? 'nl')

  // helper: basic slugify for canonical and localized slugs
  const slugify = (input?: string) => {
    if (!input) return ''
    return input
      .toString()
      .normalize('NFKD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-_/]+/g, '')
      .trim()
      .replace(/[_\s\/]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  async function translateTextSegment(text: string, source: string, target: string) {
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({segments: [text], sourceLanguage: source, targetLanguage: target}),
      })
      if (!res.ok) return undefined
      const json = await res.json()
      return Array.isArray(json.translations) && json.translations[0] ? String(json.translations[0]) : undefined
    } catch (err) {
      return undefined
    }
  }

  // crude serializer for module blocks to plain text
  const serializeModulesToText = (modules: unknown): string => {
    if (!modules) return ''
    try {
      const arr = Array.isArray(modules) ? (modules as any[]) : []
      const parts: string[] = []
      arr.forEach((block) => {
        if (!block) return
        if (block._type === 'block' && Array.isArray(block.children)) {
          const txt = block.children.map((c: any) => c.text || '').join(' ')
          parts.push(txt)
        } else if (typeof block === 'string') {
          parts.push(block)
        } else if (block.heading) {
          parts.push(block.heading)
        } else if (block.title) {
          parts.push(block.title)
        } else if (block.subtitle) {
          parts.push(block.subtitle)
        }
      })
      return parts.join('\n\n').slice(0, 4000)
    } catch (err) {
      return ''
    }
  }

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const contentText = docExcerpt || serializeModulesToText(docBody)
      const payload = {title: docTitle, content: contentText, language: docLang}
      const result = await generateSeoRemote(payload)

      const patches = [] as ReturnType<typeof set>[]
      // metadata object root: set title and description
      if (result?.title) patches.push(set(result.title, ['title']))
      if (result?.description) patches.push(set(result.description, ['description']))

      // localized slugs: canonical uses canonical title; other language uses translated title
      const canonicalLang = docLang || 'nl'
      const otherLang = canonicalLang === 'nl' ? 'en' : 'nl'

      const canonicalSourceTitle = docTitle || result?.title || ''
      const canonicalSlug = slugify(canonicalSourceTitle)
      if (canonicalSlug) {
        patches.push(set({current: canonicalSlug}, ['localizedSlugs', canonicalLang]))
      }

      // attempt to translate docTitle to the other language for a localized slug
      let translatedTitle: string | undefined = undefined
      if (docTitle) {
        translatedTitle = await translateTextSegment(docTitle, canonicalLang, otherLang)
      }
      if (!translatedTitle) translatedTitle = (result && result.title && canonicalLang !== otherLang) ? result.title : undefined
      if (!translatedTitle) translatedTitle = docTitle || undefined

      const translatedSlug = slugify(translatedTitle)
      if (translatedSlug) {
        patches.push(set({current: translatedSlug}, ['localizedSlugs', otherLang]))
      }

      if (patches.length > 0) onChange(PatchEvent.from(patches))
      toast.push({status: 'success', title: 'SEO gegenereerd', description: 'Metatitel, beschrijving en slugs zijn bijgewerkt.'})
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'SEO generatie mislukt'
      toast.push({status: 'error', title: 'Genereren mislukt', description: msg})
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Stack space={3}>
      <Card padding={3} tone="primary" radius={2}>
        <Flex align="center" justify="space-between">
          <Text weight="semibold">Genereer SEO & metadata</Text>
          <Button text={isGenerating ? 'Genereren…' : 'Genereer met AI'} tone="primary" onClick={handleGenerate} disabled={isGenerating} />
        </Flex>
        <Text size={1} muted>
          Gebruik de Content AI sleutel op de server om automatisch een SEO-titel en meta-beschrijving te genereren.
        </Text>
      </Card>
      {renderDefault(props)}
    </Stack>
  )
}
