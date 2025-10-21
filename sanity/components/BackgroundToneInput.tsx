import type {StringInputProps} from 'sanity'
import {set, unset} from 'sanity'
import {Card, Flex, Stack, Text} from '@sanity/ui'
import {useCallback} from 'react'

interface ToneOption {
  value: string
  title: string
  description: string
  preview: {
    background: string
    foreground: string
  }
}

const toneOptions: ToneOption[] = [
  {
    value: 'surface',
    title: '⬜ Licht',
    description: 'Neutraal en helder. Ideaal voor standaard secties.',
    preview: {
      background: 'var(--dc-surface)',
      foreground: 'var(--dc-navy)',
    },
  },
  {
    value: 'soft',
    title: '🫧 Zacht',
    description: 'Een subtiele achtergrond voor rustige contentblokken.',
    preview: {
      background: 'var(--dc-bg-soft)',
      foreground: 'var(--dc-navy)',
    },
  },
  {
    value: 'brand',
    title: '🌈 Accent',
    description: 'Gebruik om een sectie op te laten vallen met merkaccenten.',
    preview: {
      background: 'var(--dc-brand)',
      foreground: 'var(--dc-surface)',
    },
  },
  {
    value: 'contrast',
    title: '🌙 Contrast',
    description: 'Donkere achtergrond voor sterke contrasten en call-to-actions.',
    preview: {
      background: 'var(--dc-navy)',
      foreground: 'var(--dc-surface)',
    },
  },
]

export default function BackgroundToneInput(props: StringInputProps) {
  const {value, onChange, readOnly, schemaType} = props

  const handleSelect = useCallback(
    (nextValue: string) => {
      if (readOnly) return
      if (nextValue === value) {
        onChange(unset())
        return
      }
      onChange(set(nextValue))
    },
    [onChange, readOnly, value],
  )

  return (
    <Stack space={3}>
      <Stack space={2}>
        <Text size={1} weight="semibold">
          {schemaType.title}
        </Text>
        {schemaType.description ? (
          <Text size={1} muted>
            {schemaType.description}
          </Text>
        ) : null}
      </Stack>
      <Flex wrap="wrap" gap={3}>
        {toneOptions.map((option) => {
          const isActive = value === option.value
          return (
            <Card
              key={option.value}
              padding={3}
              radius={2}
              shadow={isActive ? 2 : 1}
              tone={isActive ? 'primary' : 'transparent'}
              border
              style={{cursor: readOnly ? 'not-allowed' : 'pointer', maxWidth: 200}}
              onClick={() => handleSelect(option.value)}
              aria-pressed={isActive}
              role="button"
            >
              <Stack space={3}>
                <Card
                  padding={3}
                  radius={2}
                  shadow={1}
                  style={{
                    background: option.preview.background,
                    color: option.preview.foreground,
                    fontWeight: 600,
                    textAlign: 'center',
                  }}
                >
                  Aa
                </Card>
                <Stack space={1}>
                  <Text size={1} weight="semibold">
                    {option.title}
                  </Text>
                  <Text size={1} muted>
                    {option.description}
                  </Text>
                </Stack>
              </Stack>
            </Card>
          )
        })}
      </Flex>
    </Stack>
  )
}
