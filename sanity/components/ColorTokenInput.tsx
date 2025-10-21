import {Card, Flex, Grid, Stack, Text} from '@sanity/ui'
import {set, unset, type StringInputProps} from 'sanity'

type Option = {title: string; value: string}

const tokenColorSwatches: Record<string, string> = {
  surface: 'var(--dc-surface, #ffffff)',
  'bg-soft': 'var(--dc-bg-soft, #f3f4f6)',
  bg: 'var(--dc-bg, #f9fafb)',
  brand: 'var(--dc-brand, #00a19a)',
  primary: 'var(--dc-primary, #0061ff)',
  navy: 'var(--dc-navy, #0f172a)',
  text: 'var(--dc-text, #1f2937)',
}

export function ColorTokenInput(props: StringInputProps) {
  const {schemaType, value, onChange, renderDefault} = props
  const options = (schemaType.options?.list as Option[] | undefined) ?? []

  if (!options.length) {
    return renderDefault(props)
  }

  return (
    <Stack space={3}>
      <Grid columns={[2, 3, 4]} gap={2}>
        {options.map((option) => {
          const isActive = option.value === value
          const swatchColor = tokenColorSwatches[option.value] ?? 'var(--card-border-color)'

          return (
            <Card
              key={option.value}
              as="button"
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(isActive ? unset() : set(option.value))}
              padding={3}
              radius={3}
              tone={isActive ? 'primary' : 'default'}
              shadow={isActive ? 1 : 0}
              style={{cursor: 'pointer'}}
            >
              <Stack space={3}>
                <Card
                  radius={2}
                  height={6}
                  style={{background: swatchColor, border: '1px solid var(--card-border-color)'}}
                />
                <Text align="center" size={1} weight={isActive ? 'medium' : 'regular'}>
                  {option.title}
                </Text>
              </Stack>
            </Card>
          )
        })}
      </Grid>
      <Flex gap={3}>
        <Card
          as="button"
          type="button"
          padding={3}
          radius={3}
          tone="critical"
          style={{cursor: value ? 'pointer' : 'not-allowed', opacity: value ? 1 : 0.5}}
          onClick={() => value && onChange(unset())}
        >
          <Text size={1} weight="medium">
            🗑️ Verwijder keuze
          </Text>
        </Card>
      </Flex>
    </Stack>
  )
}
