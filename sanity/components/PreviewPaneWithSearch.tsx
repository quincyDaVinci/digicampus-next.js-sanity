import {useEffect, useMemo, useState} from 'react'
import {Card, Flex, Grid, Spinner, Stack, Text, TextInput, Button} from '@sanity/ui'
import {useClient, type PreviewComponent} from 'sanity'
import {SearchIcon, ExternalLinkIcon} from '../../src/components/icons/FeatherIcons'
import {buildPreviewUrl, buildPublicUrl} from '../lib/previewLinks'
import {apiVersion} from '../env'

type PageSummary = {
  _id: string
  title: string
  slug?: string
}

const pagesQuery = `*[_type == "page" && defined(slug.current)] | order(title asc){
  _id,
  title,
  "slug": slug.current
}`

export const PreviewPaneWithSearch: PreviewComponent = (props) => {
  const client = useClient({apiVersion})
  const [pages, setPages] = useState<PageSummary[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>()

  const currentSlug =
    typeof props.document.displayed?.slug?.current === 'string'
      ? props.document.displayed?.slug?.current
      : undefined

  useEffect(() => {
    let isMounted = true

    async function fetchPages() {
      setIsLoading(true)
      try {
        const result = await client.fetch<PageSummary[]>(pagesQuery)
        if (isMounted) {
          setPages(result)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchPages()
    return () => {
      isMounted = false
    }
  }, [client])

  useEffect(() => {
    if (currentSlug) {
      setSelectedSlug(currentSlug)
    }
  }, [currentSlug])

  const filteredPages = useMemo(() => {
    if (!search) {
      return pages
    }

    const term = search.toLowerCase()
    return pages.filter((page) =>
      [page.title, page.slug].some((part) => part?.toLowerCase().includes(term)),
    )
  }, [pages, search])

  const previewUrl = buildPreviewUrl(selectedSlug ?? currentSlug)
  const showEmptyState = !isLoading && filteredPages.length === 0

  return (
    <Stack space={4} padding={4} style={{height: '100%', boxSizing: 'border-box'}}>
      <Stack space={3}>
        <Text size={2} weight="semibold">
          🔍 Preview andere pagina’s
        </Text>
        <Text size={1} muted>
          Typ om snel bestaande pagina’s te vinden en bekijk ze rechts in de preview. Klik op een kaart om direct naar die
          pagina te springen.
        </Text>
        <TextInput
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          icon={SearchIcon}
          placeholder="Zoek op titel of slug"
        />
      </Stack>

      {isLoading ? (
        <Flex align="center" justify="center" style={{minHeight: '8rem'}}>
          <Spinner />
        </Flex>
      ) : (
        <Stack space={3}>
          <Grid columns={[1, 2]} gap={3}>
            {filteredPages.map((page) => {
              const isActive = selectedSlug === page.slug
              return (
                <Card
                  key={page._id}
                  padding={3}
                  radius={3}
                  shadow={isActive ? 2 : 1}
                  tone={isActive ? 'primary' : 'default'}
                  style={{cursor: 'pointer'}}
                  onClick={() => setSelectedSlug(page.slug)}
                >
                  <Stack space={2}>
                    <Text weight="medium">{page.title || 'Naamloos'}</Text>
                    <Text size={1} muted>
                      /{page.slug}
                    </Text>
                  </Stack>
                </Card>
              )
            })}
          </Grid>
          {showEmptyState ? (
            <Card padding={4} radius={3} tone="caution">
              <Stack space={2}>
                <Text weight="medium">Geen resultaten</Text>
                <Text size={1} muted>
                  Probeer een andere zoekterm of voeg een slug toe aan de pagina.
                </Text>
              </Stack>
            </Card>
          ) : null}
        </Stack>
      )}

      <Stack space={3}>
        <Text size={2} weight="semibold">
          👀 Live preview
        </Text>
        <Text size={1} muted>
          De live preview wordt hieronder geladen. De pagina opent in conceptmodus zodat je wijzigingen direct ziet.
        </Text>
        <Card radius={3} shadow={1} padding={0} style={{flex: 1, minHeight: '24rem', overflow: 'hidden'}}>
          <iframe src={previewUrl} style={{border: 0, width: '100%', height: '100%'}} title="Voorbeeldweergave" />
        </Card>
        <Flex gap={3}>
          <Button
            icon={ExternalLinkIcon}
            text="Open preview in nieuw tabblad"
            onClick={() => window.open(previewUrl, '_blank')}
            tone="primary"
          />
          {currentSlug ? (
            <Button
              text="Bekijk live pagina"
              mode="ghost"
              onClick={() => window.open(buildPublicUrl(currentSlug), '_blank')}
            />
          ) : null}
        </Flex>
      </Stack>
    </Stack>
  )
}
