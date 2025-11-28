import {useMemo, useState} from 'react'
import {Button, Card, Flex, Stack, Text, useToast} from '@sanity/ui'
import type {ObjectInputProps} from 'sanity'
import {PatchEvent, set} from 'sanity'
import {useFormValue} from 'sanity'

async function translateText(
  text: string,
  source: string,
  target: string
): Promise<string | undefined> {
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({segments: [text], sourceLanguage: source, targetLanguage: target}),
    })

    if (!response.ok) {
      const errBody = await response.text().catch(() => '')
      throw new Error(`Translation failed (${response.status}): ${errBody}`)
    }

    const data = (await response.json()) as {translations?: string[]}
    if (!data?.translations || data.translations.length === 0) return undefined
    return data.translations[0]
  } catch (error) {
    console.warn('Translation request failed', error)
    throw error
  }
}

export function PageTranslationInput(props: ObjectInputProps) {
  const {renderDefault, value, onChange} = props
  const [isTranslating, setIsTranslating] = useState(false)
  const toast = useToast()
  const baseTitle = (useFormValue(['title']) as string | undefined) ?? ''
  const baseMetadataTitle = (useFormValue(['metadata', 'title']) as string | undefined) ?? ''
  const baseDescription = (useFormValue(['metadata', 'description']) as string | undefined) ?? ''
  const baseModules = useFormValue(['modules']) as unknown
  const sourceLanguage =
    (useFormValue(['metadata', 'language']) as string | undefined) ?? 'nl'

  const targetLanguage = useMemo(() => {
    if (typeof value === 'object' && value && 'language' in value) {
      return (value as Record<string, string>).language
    }
    return undefined
  }, [value])

  const handleTranslate = async () => {
    if (!targetLanguage) return
    setIsTranslating(true)
    try {
      // Batch the three main segments so we only call the server once.
      const segments: string[] = []
      const segmentMap: Array<{key: 'title' | 'metadataTitle' | 'metadataDescription'; present: boolean}> = []

      if (baseTitle) {
        segmentMap.push({key: 'title', present: true})
        segments.push(baseTitle)
      }
      if (baseMetadataTitle) {
        segmentMap.push({key: 'metadataTitle', present: true})
        segments.push(baseMetadataTitle)
      }
      if (baseDescription) {
        segmentMap.push({key: 'metadataDescription', present: true})
        segments.push(baseDescription)
      }

      let translatedResults: (string | undefined)[] = []
      if (segments.length > 0) {
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({segments, sourceLanguage, targetLanguage}),
        })

        if (!response.ok) {
          const body = await response.json().catch(() => ({}))
          const msg = body?.error || `Translation server error (${response.status})`
          throw new Error(msg)
        }

        const json = (await response.json()) as {translations?: string[]}
        translatedResults = (json.translations || []).map((s) => s)
      }

      const patches = [] as ReturnType<typeof set>[]
      let idx = 0
      for (const mapping of segmentMap) {
        const translated = translatedResults[idx]
        if (mapping.key === 'title') patches.push(set(translated ?? baseTitle, ['title']))
        if (mapping.key === 'metadataTitle') patches.push(set(translated ?? baseMetadataTitle, ['metadataTitle']))
        if (mapping.key === 'metadataDescription') patches.push(set(translated ?? baseDescription, ['metadataDescription']))
        idx += 1
      }

      if (baseModules) patches.push(set(baseModules, ['modules']))

      onChange(PatchEvent.from(patches))
      toast.push({status: 'success', title: 'Vertaling voltooid', description: 'Velden zijn bijgewerkt met AI-vertalingen.'})
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Vertaling mislukt'
      toast.push({status: 'error', title: 'Vertalen mislukt', description: message})
    } finally {
      setIsTranslating(false)
    }
  }

  return (
    <Stack space={3}>
      <Card padding={3} tone="primary" radius={2}>
        <Flex align="center" justify="space-between">
          <Text weight="semibold">Vertaal deze taalvariant</Text>
          <Button
            text={isTranslating ? 'Vertalen...' : 'AI-vertalen'}
            disabled={!targetLanguage || isTranslating}
            tone="primary"
            onClick={handleTranslate}
          />
        </Flex>
        <Text size={1} muted>
          De titel en metabeschrijving worden automatisch vertaald op basis van de standaardtaal.
          Modules worden als startpunt gekopieerd zodat je de tekst eenvoudig kunt bijwerken.
        </Text>
      </Card>
      {renderDefault(props)}
    </Stack>
  )
}

export default PageTranslationInput
