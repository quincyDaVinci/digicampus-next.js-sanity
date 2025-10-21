'use client'

import {useEffect, useMemo, useState} from 'react'
import type {ReactNode} from 'react'
import type {PreviewHeaderProps} from 'sanity/presentation'
import {usePresentationNavigate} from 'sanity/presentation'
import {useClient} from 'sanity'
import {Box, Button, Card, Flex, Spinner, Stack, Text, TextInput} from '@sanity/ui'
import {SearchIcon, LaunchIcon, DocumentsIcon} from '@sanity/icons'
import {apiVersion} from '../env'

type SearchResult = {
  _id: string
  _type: string
  title?: string
  slug?: string | null
}

type Props = PreviewHeaderProps & {
  renderDefault: (props: PreviewHeaderProps) => ReactNode
}

const searchQuery = `*[
  (_type == "page" && defined(slug.current) && title match $search) ||
  (_type == "homePage" && title match $search)
][0...10]{
  _id,
  _type,
  title,
  "slug": select(_type == "homePage" => "/", slug.current)
}`

function sanitizeSlug(slug?: string | null) {
  if (!slug) return null
  return slug.startsWith('/') ? slug : `/${slug}`
}

function buildPreviewPath(result: SearchResult): string | null {
  if (result._type === 'page') {
    return sanitizeSlug(result.slug)
  }
  if (result._type === 'homePage') {
    return '/'
  }
  return null
}

export default function PreviewHeaderEnhancer(props: Props) {
  const {renderDefault, ...rest} = props
  const navigate = usePresentationNavigate()
  const client = useClient({apiVersion})
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    const controller = new AbortController()
    setIsSearching(true)

    client
      .fetch<SearchResult[]>(searchQuery, {search: `${query.trim()}*`}, {signal: controller.signal})
      .then((docs) => {
        setResults(docs ?? [])
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.error('Preview search failed', error)
        }
      })
      .finally(() => {
        setIsSearching(false)
      })

    return () => controller.abort()
  }, [client, query])

  const helpfulHint = useMemo(() => {
    if (!query.trim()) {
      return '🔎 Zoek op titel om snel naar een bestaande pagina te springen.'
    }
    if (!results.length && !isSearching) {
      return '😕 Geen pagina gevonden. Controleer de titel of probeer een ander trefwoord.'
    }
    return null
  }, [isSearching, query, results.length])

  return (
    <Stack space={3} padding={3}>
      <Card padding={3} radius={3} shadow={1} tone="transparent">
        <Stack space={3}>
          <Text size={1} weight="medium">
            🔍 Pagina zoeken
          </Text>
          <TextInput
            icon={SearchIcon}
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder="Typ een paginatitel..."
            aria-label="Zoek naar bestaande pagina's"
          />
          {helpfulHint ? (
            <Text size={1} muted>
              {helpfulHint}
            </Text>
          ) : null}
          {isSearching ? (
            <Flex align="center" gap={2}>
              <Spinner muted />
              <Text size={1}>Bezig met zoeken…</Text>
            </Flex>
          ) : null}
          {results.length > 0 ? (
            <Stack space={2}>
              {results.map((result) => {
                const previewPath = buildPreviewPath(result)
                if (!previewPath) {
                  return null
                }
                const cleanedId = result._id.replace(/^drafts\./, '')
                return (
                  <Card key={result._id} padding={2} radius={2} shadow={1} tone="primary">
                    <Flex align="center" gap={2}>
                      <Box padding={2}>
                        <DocumentsIcon />
                      </Box>
                      <Stack flex={1} space={1}>
                        <Text weight="medium">{result.title || 'Naamloze pagina'}</Text>
                        <Text size={1} muted>
                          {previewPath}
                        </Text>
                      </Stack>
                      <Button
                        icon={LaunchIcon}
                        mode="ghost"
                        text="Open in preview"
                        onClick={() => {
                          navigate(previewPath, {type: result._type, id: cleanedId})
                        }}
                      />
                    </Flex>
                  </Card>
                )
              })}
            </Stack>
          ) : null}
        </Stack>
      </Card>
      {renderDefault(rest)}
    </Stack>
  )
}
