import {useEffect, useMemo, useState} from 'react'
import {Card, Flex, Spinner, Stack, Text, TextInput, Button} from '@sanity/ui'
import {groq} from 'next-sanity'
import {useClient} from 'sanity'
import type {DocumentViewComponentProps} from 'sanity/desk'
import {apiVersion} from '../env'

interface PreviewItem {
  _id: string
  title: string
  path: string
  type: string
}

const PREVIEW_QUERY = groq`
  *[_type in ["page", "post"] && defined(slug.current)]{
    _id,
    title,
    "path": select(_type == "post" => "/blog/" + slug.current, "/" + slug.current),
    "type": _type
  } | order(lower(title) asc)
`

const HOME_QUERY = groq`
  *[_type == "homePage"][0]{
    _id,
    title,
    "path": "/",
    "type": _type
  }
`

type PreviewPaneProps = DocumentViewComponentProps & {
  options?: {
    previewBaseUrl?: string
  }
}

interface DocumentPreviewValue {
  _type?: string
  slug?: {current?: string} | null
}

function resolveDocumentPath(doc: DocumentPreviewValue | null | undefined): string | null {
  if (!doc) return null
  const slug = doc?.slug?.current
  switch (doc._type) {
    case 'homePage':
      return '/'
    case 'page':
      return slug ? `/${slug}` : null
    case 'post':
      return slug ? `/blog/${slug}` : null
    default:
      return null
  }
}

function EmojiIcon() {
  return (
    <span role="img" aria-label="Open" style={{fontSize: '1.1em', lineHeight: 1}}>
      🔗
    </span>
  )
}

export default function PreviewPane(props: PreviewPaneProps) {
  const {document, options} = props
  const client = useClient({apiVersion})
  const [items, setItems] = useState<PreviewItem[]>([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [manualPath, setManualPath] = useState<string | null>(null)

  const displayed = document?.displayed
  const currentPath = resolveDocumentPath(displayed as DocumentPreviewValue | null)

  useEffect(() => {
    let isMounted = true
    async function loadItems() {
      try {
        setIsLoading(true)
        const [collection, home] = await Promise.all([
          client.fetch<PreviewItem[]>(PREVIEW_QUERY),
          client.fetch<PreviewItem | null>(HOME_QUERY),
        ])
        if (!isMounted) return
        const merged = [...collection]
        if (home?._id) {
          merged.unshift(home)
        }
        setItems(merged)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    loadItems()
    return () => {
      isMounted = false
    }
  }, [client])

  useEffect(() => {
    if (currentPath) {
      setManualPath(currentPath)
    }
  }, [currentPath])

  const previewBaseUrl = options?.previewBaseUrl || 'http://localhost:3000'
  const activePath = manualPath || currentPath
  const previewUrl = activePath ? new URL(activePath, previewBaseUrl).toString() : null

  const filteredItems = useMemo(() => {
    if (!search.trim()) return items
    const needle = search.trim().toLowerCase()
    return items.filter((item) =>
      [item.title, item.path, item.type].some((value) => value?.toLowerCase().includes(needle)),
    )
  }, [items, search])

  return (
    <Flex direction="column" height="fill">
      <Card padding={4} borderBottom>
        <Stack space={3}>
          <Stack space={1}>
            <Text size={1} weight="semibold">
              🔎 Zoek een bestaande pagina
            </Text>
            <Text size={1} muted>
              Typ om snel te springen naar een andere pagina en bekijk hem direct in de preview.
            </Text>
          </Stack>
          <TextInput
            value={search}
            placeholder="Zoek op titel of pad"
            onChange={(event) => setSearch(event.currentTarget.value)}
          />
          <Stack space={2}>
            {isLoading ? (
              <Flex align="center" justify="center" padding={4}>
                <Spinner muted />
              </Flex>
            ) : filteredItems.length ? (
              filteredItems.slice(0, 10).map((item) => {
                const isActive = item.path === activePath
                return (
                  <Card
                    key={item._id}
                    padding={3}
                    radius={2}
                    shadow={isActive ? 2 : 1}
                    tone={isActive ? 'primary' : 'transparent'}
                    border
                    style={{cursor: 'pointer'}}
                    onClick={() => setManualPath(item.path)}
                  >
                    <Flex direction="column" gap={1}>
                      <Text size={1} weight="semibold">
                        {item.title || 'Naamloos'}
                      </Text>
                      <Text size={1} muted>
                        {item.path}
                      </Text>
                    </Flex>
                  </Card>
                )
              })
            ) : (
              <Card padding={4} radius={2} tone="caution">
                <Text size={1} align="center">
                  Geen resultaten gevonden.
                </Text>
              </Card>
            )}
          </Stack>
        </Stack>
      </Card>
      <Card padding={3} tone="transparent" borderBottom>
        <Flex align="center" justify="space-between">
          <Stack space={1}>
            <Text size={1} weight="semibold">
              🖥️ Live preview
            </Text>
            <Text size={1} muted>
              Bekijk wijzigingen direct. Open in een nieuw tabblad voor een volledig scherm.
            </Text>
          </Stack>
          <Button
            text="Open preview"
            icon={EmojiIcon}
            mode="ghost"
            disabled={!previewUrl}
            onClick={() => {
              if (!previewUrl) return
              window.open(previewUrl, '_blank', 'noopener')
            }}
          />
        </Flex>
      </Card>
      <Card flex={1} radius={0} style={{height: '100%'}}>
        {previewUrl ? (
          <iframe
            key={previewUrl}
            src={previewUrl}
            title="Pagina preview"
            style={{width: '100%', height: '100%', border: 0}}
          />
        ) : (
          <Flex align="center" justify="center" height="fill">
            <Text size={2} muted>
              Sla de pagina eerst op of kies een item om de preview te zien.
            </Text>
          </Flex>
        )}
      </Card>
    </Flex>
  )
}
