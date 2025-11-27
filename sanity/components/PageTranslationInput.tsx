import {useMemo, useState} from 'react'
import {Button, Card, Flex, Stack, Text} from '@sanity/ui'
import type {ObjectInputProps} from 'sanity'
import {PatchEvent, set} from 'sanity'
import {useFormValue} from 'sanity'
import {translateTexts} from '../lib/translationClient'

export function PageTranslationInput(props: ObjectInputProps) {
  const {renderDefault, value, onChange} = props
  const [isTranslating, setIsTranslating] = useState(false)
  const baseTitle = (useFormValue(['title']) as string | undefined) ?? ''
  const baseDescription = (useFormValue(['metadata', 'description']) as string | undefined) ?? ''
  const baseMetaTitle = (useFormValue(['metadata', 'title']) as string | undefined) ?? ''
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

    const [title, metaTitle, description] = await translateTexts(
      [baseTitle, baseMetaTitle, baseDescription],
      sourceLanguage,
      targetLanguage
    )

    const patches = [
      set(title ?? baseTitle, ['title']),
      set(metaTitle ?? baseMetaTitle, ['metadataTitle']),
      set(description ?? baseDescription, ['metadataDescription']),
      baseModules ? set(baseModules, ['modules']) : undefined,
    ].filter((patch): patch is NonNullable<ReturnType<typeof set>> => Boolean(patch))

    onChange(PatchEvent.from(patches))
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
