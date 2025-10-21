'use client'

import {useEffect, useMemo, useState} from 'react'
import {useClient} from 'sanity'
import {usePresentationNavigate} from 'sanity/presentation'
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Spinner,
  Stack,
  Text,
  TextInput,
} from '@sanity/ui'
import {SearchIcon, LaunchIcon} from '@sanity/icons'
import {previewOrigin, resolvePreviewPath} from '../lib/previewConfig'

interface PagePreviewPaneProps {
  document: {
    displayed?: {
      _type?: string
      _id?: string
      title?: string
      slug?: {current?: string}
    }
  }
}

interface PreviewablePage {
  _id: string
  title?: string
  slug?: string
}

const pageQuery = `*[_type == "page" && defined(slug.current)]|order(title asc){
  _id,
  title,
  "slug": slug.current
}`

const homeQuery = `*[_type == "homePage"][0]{
  _id,
  "title": title != null => title,
  "slug": "/"
}`

export default function PagePreviewPane(props: PagePreviewPaneProps) {
  const {document} = props
  const client = useClient({apiVersion: '2025-10-11'})
  const navigate = usePresentationNavigate()
  const [pages, setPages] = useState<PreviewablePage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activePath, setActivePath] = useState<string | undefined>(() =>
    resolvePreviewPath(document.displayed ?? {}),
  )

  useEffect(() => {
    let isMounted = true
    async function loadPages() {
      try {
        const [pageDocs, homeDoc] = await Promise.all([
          client.fetch<PreviewablePage[]>(pageQuery),
          client.fetch<PreviewablePage | null>(homeQuery),
        ])
        if (!isMounted) return
        const merged = [...pageDocs]
        if (homeDoc?._id) {
          merged.unshift(homeDoc)
        }
        setPages(merged)
      } catch (error) {
        console.error('Failed to load previewable pages', error)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    loadPages()
    return () => {
      isMounted = false
    }
  }, [client])

  useEffect(() => {
    const currentPath = resolvePreviewPath(document.displayed ?? {})
    if (currentPath) {
      setActivePath(currentPath)
    }
  }, [document.displayed])

  const filteredPages = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return pages
    return pages.filter((page) => {
      const title = page.title?.toLowerCase() ?? ''
      const slug = page.slug?.toLowerCase() ?? ''
      return title.includes(term) || slug.includes(term)
    })
  }, [pages, searchTerm])

  const handleOpen = (path: string | undefined) => {
    if (!path) return
    setActivePath(path)
    navigate?.({params: {preview: path}})
  }

  const handlePreviewButton = () => {
    if (!activePath) return
    window.open(`${previewOrigin}${activePath}`, '_blank', 'noopener')
  }

  return (
    <Stack space={4} padding={4} height="fill">
      <Stack space={3}>
        <Text size={1} muted>
          🔍 Zoek een pagina en klik om de preview te laden. De geselecteerde pagina verschijnt rechts in het venster en kan in een nieuw tabblad worden geopend.
        </Text>
        <TextInput
          icon={SearchIcon}
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
          placeholder="Zoek op titel of slug"
        />
      </Stack>

      <Card padding={3} radius={3} border>
        {isLoading ? (
          <Flex align="center" justify="center" paddingY={5}>
            <Spinner />
          </Flex>
        ) : (
          <Stack space={2}>
            {filteredPages.length === 0 ? (
              <Text size={1} muted>
                Geen pagina&apos;s gevonden. Pas je zoekopdracht aan.
              </Text>
            ) : (
              <Grid columns={[1, 1]} gap={2}>
                {filteredPages.map((page) => {
                  const rawPath = page.slug === '/' ? '/' : `/${page.slug ?? ''}`
                  const url = new URL(rawPath, 'http://localhost')
                  const cleaned =
                    url.pathname !== '/' && url.pathname.endsWith('/')
                      ? url.pathname.slice(0, -1)
                      : url.pathname
                  const path = cleaned || '/'
                  const isActive = path === activePath
                  return (
                    <Card
                      key={page._id}
                      padding={3}
                      radius={2}
                      border
                      tone={isActive ? 'primary' : 'inherit'}
                      shadow={isActive ? 1 : 0}
                      as="button"
                      type="button"
                      onClick={() => handleOpen(path)}
                      style={{textAlign: 'left'}}
                    >
                      <Stack space={1}>
                        <Text weight="semibold">{page.title || 'Naamloze pagina'}</Text>
                        <Text muted size={1}>{path}</Text>
                      </Stack>
                    </Card>
                  )
                })}
              </Grid>
            )}
          </Stack>
        )}
      </Card>

      <Stack space={3}>
        <Button
          icon={LaunchIcon}
          text="Open preview in nieuw tabblad"
          tone="primary"
          mode="ghost"
          disabled={!activePath}
          onClick={handlePreviewButton}
        />
        <Box flex={1}>
          {activePath ? (
            <iframe
              title="Pagina preview"
              src={`${previewOrigin}${activePath}`}
              style={{border: '1px solid var(--card-border-color)', borderRadius: '12px', width: '100%', height: '60vh'}}
            />
          ) : (
            <Card padding={4} radius={3} tone="transparent">
              <Text size={1} muted>
                Selecteer een pagina om de live preview te bekijken.
              </Text>
            </Card>
          )}
        </Box>
      </Stack>
    </Stack>
  )
}
