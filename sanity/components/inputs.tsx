'use client'

import {useCallback, useMemo} from 'react'
import type {StringInputProps} from 'sanity'
import {set, unset} from 'sanity'
import {Card, Grid, Stack, Text, Flex, Box} from '@sanity/ui'
import type {ComponentType} from 'react'

interface OptionWithMeta {
  title?: string
  value: string
  subtitle?: string
  icon?: ComponentType<{size?: number}>
}

function getListOptions(schemaType: StringInputProps['schemaType']): OptionWithMeta[] {
  const options = schemaType.options?.list || []
  return options.map((option) => {
    if (typeof option === 'string') {
      return {title: option, value: option}
    }
    if (typeof option === 'object' && option) {
      return option as OptionWithMeta
    }
    return {title: String(option), value: String(option)}
  })
}

function getCssVarForToken(token: string) {
  return `rgb(var(--dc-${token}))`
}

export function ChoiceCardInput(props: StringInputProps) {
  const {value, onChange, schemaType, readOnly, renderDefault} = props
  const options = useMemo(() => getListOptions(schemaType), [schemaType])

  const handleSelect = useCallback(
    (next: string) => {
      if (readOnly) return
      if (next === value) {
        onChange?.(unset())
        return
      }
      onChange?.(set(next))
    },
    [onChange, readOnly, value],
  )

  if (!options.length) {
    return renderDefault(props)
  }

  return (
    <Stack space={3}>
      {schemaType.description ? (
        <Text muted size={1}>
          {schemaType.description}
        </Text>
      ) : null}
      <Grid columns={[1, 2]} gap={2}>
        {options.map((option) => {
          const isActive = value === option.value
          const Icon = option.icon
          const tone = isActive ? 'primary' : 'inherit'
          return (
            <Card
              key={option.value}
              padding={3}
              radius={2}
              tone={tone}
              border
              shadow={isActive ? 1 : 0}
              as={readOnly ? 'div' : 'button'}
              type="button"
              onClick={() => handleSelect(option.value)}
              aria-pressed={isActive}
              aria-label={option.title}
              disabled={readOnly}
              style={{textAlign: 'left', cursor: readOnly ? 'not-allowed' : 'pointer'}}
            >
              <Stack space={2}>
                <Flex align="center" gap={2}>
                  {Icon ? <Icon size={20} /> : null}
                  <Text weight="semibold">{option.title}</Text>
                </Flex>
                {option.subtitle ? (
                  <Text muted size={1}>
                    {option.subtitle}
                  </Text>
                ) : null}
              </Stack>
            </Card>
          )
        })}
      </Grid>
    </Stack>
  )
}

export function DesignTokenSwatchInput(props: StringInputProps) {
  const {value, onChange, schemaType, readOnly, renderDefault} = props
  const options = useMemo(() => getListOptions(schemaType), [schemaType])

  const handleSelect = useCallback(
    (next: string) => {
      if (readOnly) return
      if (next === value) {
        onChange?.(unset())
        return
      }
      onChange?.(set(next))
    },
    [onChange, readOnly, value],
  )

  if (!options.length) {
    return renderDefault(props)
  }

  return (
    <Stack space={3}>
      {schemaType.description ? (
        <Text muted size={1}>
          {schemaType.description}
        </Text>
      ) : null}
      <Grid columns={[2, 3]} gap={2}>
        {options.map((option) => {
          const isActive = value === option.value
          const tone = isActive ? 'primary' : 'inherit'
          const swatchColor = getCssVarForToken(option.value)
          return (
            <Card
              key={option.value}
              padding={3}
              radius={2}
              tone={tone}
              border
              shadow={isActive ? 1 : 0}
              as={readOnly ? 'div' : 'button'}
              type="button"
              onClick={() => handleSelect(option.value)}
              aria-pressed={isActive}
              aria-label={option.title}
              disabled={readOnly}
              style={{textAlign: 'left', cursor: readOnly ? 'not-allowed' : 'pointer'}}
            >
              <Flex align="center" gap={3}>
                <Box
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: swatchColor,
                    border: '1px solid rgb(var(--dc-border)/0.2)',
                  }}
                />
                <Stack space={1}>
                  <Text weight="semibold">{option.title}</Text>
                  {option.subtitle ? (
                    <Text muted size={1}>
                      {option.subtitle}
                    </Text>
                  ) : null}
                </Stack>
              </Flex>
            </Card>
          )
        })}
      </Grid>
    </Stack>
  )
}
