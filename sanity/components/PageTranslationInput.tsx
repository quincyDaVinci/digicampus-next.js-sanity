import {useMemo, useState} from 'react'
import {Button, Card, Flex, Stack, Text} from '@sanity/ui'
import type {ObjectInputProps} from 'sanity'
import {PatchEvent, set} from 'sanity'
import {useFormValue} from 'sanity'

async function translateText(
  text: string,
  source: string,
  target: string
): Promise<string | undefined> {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`
    )
    const data = await response.json()
    const translated = data?.responseData?.translatedText as string | undefined
    if (translated) {
      return translated
    }
    return undefined
  } catch (error) {
    console.warn('Translation request failed', error)
    return undefined
  }
}

export function PageTranslationInput(props: ObjectInputProps) {
  const {renderDefault, value, onChange} = props
  const [isTranslating, setIsTranslating] = useState(false)
  const baseTitle = (useFormValue(['title']) as string | undefined) ?? ''
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

    const title = baseTitle
      ? await translateText(baseTitle, sourceLanguage, targetLanguage)
      : undefined
    const description = baseDescription
      ? await translateText(baseDescription, sourceLanguage, targetLanguage)
      : undefined

    onChange(
      PatchEvent.from([
        set(title ?? baseTitle, ['title']),
        set(description ?? baseDescription, ['metadataDescription']),
        baseModules ? set(baseModules, ['modules']) : undefined,
      ].filter(Boolean) as any)
    )
    setIsTranslating(false)
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
