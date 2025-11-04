'use client'

/* eslint-disable @next/next/no-img-element */

import {useEffect, useRef, useState} from 'react'
import {PortableText} from '@portabletext/react'
import type {AxeResults, Result} from 'axe-core'
import axe from 'axe-core'
import {Box, Badge, Card, Flex, Heading, Label, Select, Spinner, Stack, Text} from '@sanity/ui'
import {useClient} from 'sanity'

import {apiVersion} from '../../env'
import {urlFor} from '../../lib/image'
import type {
  BackgroundComponent,
  BlogCardComponent,
  CarouselComponent,
  PageComponent,
  PageDocument,
  PageSection,
  RichTextComponent,
  VideoComponent,
} from '@/types/pageBuilder'

interface PageSummary {
  _id: string
  title?: string
  slug?: {current?: string}
}

interface AuditState {
  status: 'idle' | 'loading' | 'error' | 'success'
  results?: AxeResults
  error?: string
}

const manualChecks = [
  'Provide captions and transcripts for audio and video media.',
  'Ensure every link text makes sense out of context (link purpose in context).',
  'Verify heading hierarchy and that the page has a descriptive title.',
  'Check that informative images convey meaning without relying solely on color.',
  'Confirm focus order is logical and follows the visual flow.',
  'Identify sections that change language and set the appropriate language attributes.',
  'Make sure users can pause, stop, or hide motion and animation that starts automatically.',
]

function ComponentRenderer({component}: {component: PageComponent}) {
  switch (component._type) {
    case 'richTextComponent': {
      const richText = component as RichTextComponent
      return (
        <div style={{maxWidth: '60ch'}}>
          <PortableText value={richText.content} />
        </div>
      )
    }
    case 'imageComponent': {
      const imageComponent = component as PageComponent & {
        image?: BackgroundComponent['image']
        allowZoom?: boolean
        rounded?: boolean
        background?: BackgroundComponent | null
        caption?: string
      }

      if (!imageComponent.image?.asset) return null

      const imageUrl = urlFor(imageComponent.image).width(1600).url()

      return (
        <figure style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '640px'}}>
          <img
            src={imageUrl}
            alt={imageComponent.image.alt || ''}
            style={{width: '100%', height: 'auto', borderRadius: '12px'}}
          />
          {imageComponent.image.caption ? (
            <figcaption style={{fontSize: '0.875rem', color: 'var(--card-muted-fg-color)'}}>
              {imageComponent.image.caption}
            </figcaption>
          ) : null}
        </figure>
      )
    }
    case 'videoComponent': {
      const videoComponent = component as VideoComponent
      const videoSource =
        videoComponent.sourceType === 'external'
          ? videoComponent.videoUrl
          : videoComponent.videoFile?.asset?.url

      if (!videoSource) return null

        return (
          <figure style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '720px'}}>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
            src={videoSource}
            controls={videoComponent.showControls ?? true}
            autoPlay={videoComponent.autoPlay ?? false}
            muted={videoComponent.muted ?? false}
            loop={videoComponent.loop ?? false}
            style={{width: '100%', borderRadius: '12px'}}
          >
            {videoComponent.captionsFile?.asset?.url ? (
              <track
                kind="captions"
                srcLang="nl"
                src={videoComponent.captionsFile.asset.url}
                label="Captions"
                default
              />
            ) : null}
          </video>
          <figcaption style={{fontSize: '0.875rem', color: 'var(--card-muted-fg-color)'}}>
            {videoComponent.title}
          </figcaption>
        </figure>
      )
    }
    case 'buttonComponent': {
      const button = component as PageComponent & {label?: string; link?: {href?: string; label?: string}}
      if (!button.label) return null
      const href = button.link?.href || '#'
      return (
        <a
          href={href}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.75rem 1.5rem',
            borderRadius: '999px',
            fontWeight: 600,
            backgroundColor: 'var(--card-bg-color)',
            border: '1px solid var(--card-border-color)',
            textDecoration: 'none',
          }}
        >
          {button.label}
        </a>
      )
    }
    case 'blogCardComponent': {
      const blogCard = component as BlogCardComponent
      const posts = Array.isArray(blogCard.resolvedPost)
        ? blogCard.resolvedPost
        : blogCard.resolvedPost
          ? [blogCard.resolvedPost]
          : []

      if (!posts.length) {
        return (
          <article style={{padding: '1.5rem', border: '1px solid var(--card-border-color)', borderRadius: '12px'}}>
            <Heading as="h3" size={1}>
              Blogkaart
            </Heading>
            <Text size={1} muted>
              Geen gekoppelde artikelen gevonden.
            </Text>
          </article>
        )
      }

      return (
        <div style={{display: 'grid', gap: '1rem'}}>
          {posts.map((post) => (
            <article
              key={post._id}
              style={{padding: '1.5rem', border: '1px solid var(--card-border-color)', borderRadius: '12px'}}
            >
              <Heading as="h3" size={1} style={{marginBottom: '0.5rem'}}>
                {post.title}
              </Heading>
              {post.summary ? (
                <Text size={1} muted>
                  {post.summary}
                </Text>
              ) : null}
            </article>
          ))}
        </div>
      )
    }
    case 'carouselComponent': {
      const carousel = component as CarouselComponent
      const carouselItems = carousel.items || []
      if (!carouselItems.length) return null
      return (
        <div role="list" aria-label={carousel.ariaLabel || 'Carrousel'} style={{display: 'grid', gap: '1rem'}}>
          {carouselItems.map((item, index) => (
            <div key={(item as {_key?: string})._key || index} role="listitem">
              <ComponentRenderer component={item as PageComponent} />
            </div>
          ))}
        </div>
      )
    }
    default:
      return null
  }
}

function SectionRenderer({section}: {section: PageSection}) {
  const columns = section.columns || []
  return (
    <section style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
      {section.title ? (
        <Heading as="h2" size={2}>
          {section.title}
        </Heading>
      ) : null}
      <div
        style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: columns.length > 1 ? `repeat(${columns.length}, minmax(0, 1fr))` : 'minmax(0, 1fr)',
        }}
      >
        {columns.map((column) => (
          <div key={column._key} style={{display: 'grid', gap: '1rem'}}>
            {column.components?.map((component) => (
              <ComponentRenderer key={component._key} component={component} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

function AuditGroup({results}: {results: Result[]}) {
  if (!results.length) {
    return (
      <Card padding={4} radius={3} shadow={1}>
        <Text size={1} muted>
          Geen items gevonden.
        </Text>
      </Card>
    )
  }

  return (
    <Stack space={3}>
      {results.map((result) => (
        <Card key={result.id} padding={4} radius={3} shadow={1}>
          <Stack space={3}>
            <Flex align="center" justify="space-between">
              <Stack space={2}>
                <Text weight="semibold">{result.id}</Text>
                <Text size={1}>{result.help}</Text>
              </Stack>
              <Badge tone={result.impact ? impactToneMap[result.impact] : 'default'}>
                {result.impact ?? 'unknown'}
              </Badge>
            </Flex>
            <Text size={1} muted>
              {result.description}
            </Text>
            <Stack space={2}>
              {result.nodes.map((node, idx) => (
                <Card key={idx} padding={3} radius={2} tone="transparent" style={{border: '1px solid var(--card-border-color)'}}>
                  <Stack space={2}>
                    <Text size={1} weight="medium">
                      Element
                    </Text>
                    <Text size={1}>
                      <code>{node.target.join(', ')}</code>
                    </Text>
                    {node.failureSummary ? (
                      <Text size={1}>{node.failureSummary}</Text>
                    ) : null}
                  </Stack>
                </Card>
              ))}
            </Stack>
            {result.helpUrl ? (
              <Text size={1}>
                <a href={result.helpUrl} target="_blank" rel="noreferrer">
                  Meer informatie
                </a>
              </Text>
            ) : null}
          </Stack>
        </Card>
      ))}
    </Stack>
  )
}

const impactToneMap: Record<NonNullable<Result['impact']>, 'critical' | 'caution' | 'primary' | 'positive'> = {
  critical: 'critical',
  serious: 'critical',
  moderate: 'caution',
  minor: 'primary',
}

export default function WcagCheckTool() {
  const client = useClient({apiVersion})
  const [pages, setPages] = useState<PageSummary[]>([])
  const [selectedPageId, setSelectedPageId] = useState<string>('')
  const [page, setPage] = useState<PageDocument | null>(null)
  const [isLoadingPages, setIsLoadingPages] = useState(false)
  const [isLoadingPage, setIsLoadingPage] = useState(false)
  const [auditState, setAuditState] = useState<AuditState>({status: 'idle'})
  const pageContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let isMounted = true
    setIsLoadingPages(true)
    client
      .fetch<PageSummary[]>(
        `*[_type == "page"] | order(title asc) { _id, title, slug }`
      )
        .then((result) => {
          if (!isMounted) return
          setPages(result)
          setSelectedPageId((current) => {
            if (current) return current
            return result[0]?._id ?? ''
          })
      })
      .catch((error) => {
        console.error('Failed to load pages', error)
      })
      .finally(() => {
        if (isMounted) setIsLoadingPages(false)
      })

    return () => {
      isMounted = false
    }
  }, [client])

  useEffect(() => {
    if (!selectedPageId) {
      setPage(null)
      setAuditState({status: 'idle'})
      return
    }

    let isMounted = true
    setIsLoadingPage(true)
    setAuditState({status: 'idle'})
    setPage(null)

    client
      .fetch<PageDocument>(
        `*[_type == "page" && _id == $id][0]{
          _id,
          title,
          slug,
          description,
          sections[]{
            _key,
            title,
            columns[]{
              _key,
              width,
              components[]{...}
            }
          }
        }`,
        {id: selectedPageId}
      )
      .then((doc) => {
        if (!isMounted) return
        setPage(doc)
      })
      .catch((error) => {
        console.error('Failed to load page', error)
        if (isMounted) {
          setPage(null)
          setAuditState({status: 'error', error: 'Kon pagina niet laden.'})
        }
      })
      .finally(() => {
        if (isMounted) setIsLoadingPage(false)
      })

    return () => {
      isMounted = false
    }
  }, [client, selectedPageId])

  useEffect(() => {
    if (!page) return
    const node = pageContainerRef.current
    if (!node) return

    let isCancelled = false
    setAuditState({status: 'loading'})

    const runAudit = async () => {
      try {
        const results = await axe.run(node, {
          runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa'],
          },
          resultTypes: ['violations', 'passes', 'incomplete'],
        })
        if (!isCancelled) {
          setAuditState({status: 'success', results})
        }
      } catch (error) {
        console.error('Axe audit failed', error)
        if (!isCancelled) {
          setAuditState({status: 'error', error: 'WCAG-audit is mislukt.'})
        }
      }
    }

    const frame = requestAnimationFrame(runAudit)

    return () => {
      isCancelled = true
      cancelAnimationFrame(frame)
    }
  }, [page])

  return (
    <Card padding={4} style={{height: '100%', overflow: 'auto'}}>
      <Stack space={5}>
        <Stack space={3}>
          <Heading as="h1" size={3}>
            WCAG check
          </Heading>
            <Text size={1} muted>
              Voer een automatische WCAG 2.1 AA-controle uit op geselecteerde pagina’s met axe-core.
            </Text>
        </Stack>

        <Stack space={3}>
          <Label htmlFor="wcag-page-select">Pagina</Label>
          <Select
            id="wcag-page-select"
            disabled={isLoadingPages || !pages.length}
            value={selectedPageId}
            onChange={(event) => setSelectedPageId(event.currentTarget.value)}
          >
              {pages.length ? null : <option value="">Geen pagina’s gevonden</option>}
            {pages.map((pageItem) => (
              <option key={pageItem._id} value={pageItem._id}>
                {pageItem.title || 'Naamloos'}
              </option>
            ))}
          </Select>
          {isLoadingPages ? (
            <Flex align="center" gap={3}>
              <Spinner />
              <Text size={1}>Paginas laden...</Text>
            </Flex>
          ) : null}
        </Stack>

        <Card padding={4} radius={3} shadow={1} tone="default">
          <Stack space={3}>
            <Heading as="h2" size={2}>
              Voorbeeld
            </Heading>
            {isLoadingPage ? (
              <Flex align="center" gap={3}>
                <Spinner />
                <Text size={1}>Pagina-inhoud laden...</Text>
              </Flex>
            ) : null}
            <Box
              ref={pageContainerRef}
              style={{
                display: 'grid',
                gap: '2.5rem',
                padding: '1rem',
                backgroundColor: 'var(--card-bg-color)',
                border: '1px solid var(--card-border-color)',
                borderRadius: '12px',
              }}
            >
              {page ? (
                page.sections?.length ? (
                  page.sections.map((section) => (
                    <SectionRenderer key={section._key} section={section} />
                  ))
                ) : (
                  <Text size={1} muted>
                    Deze pagina heeft geen secties.
                  </Text>
                )
              ) : (
                <Text size={1} muted>
                  Kies een pagina om de inhoud te bekijken.
                </Text>
              )}
            </Box>
          </Stack>
        </Card>

        <Stack space={4}>
          <Heading as="h2" size={2}>
            Resultaten van automatische WCAG-audit
          </Heading>
          {auditState.status === 'loading' ? (
            <Flex align="center" gap={3}>
              <Spinner />
              <Text size={1}>WCAG-audit wordt uitgevoerd...</Text>
            </Flex>
          ) : null}
          {auditState.status === 'error' ? (
            <Text size={1} tone="critical">
              {auditState.error || 'Er is een fout opgetreden tijdens de audit.'}
            </Text>
          ) : null}
          {auditState.status === 'success' && auditState.results ? (
            <Stack space={5}>
              <Stack space={3}>
                <Heading as="h3" size={1}>
                  Overtredingen
                </Heading>
                <AuditGroup results={auditState.results.violations} />
              </Stack>
              <Stack space={3}>
                <Heading as="h3" size={1}>
                  Onvolledig of waarschuwingen
                </Heading>
                <AuditGroup results={auditState.results.incomplete} />
              </Stack>
              <Stack space={3}>
                <Heading as="h3" size={1}>
                  Geslaagde controles
                </Heading>
                <AuditGroup results={auditState.results.passes} />
              </Stack>
            </Stack>
          ) : null}
        </Stack>

        <Stack space={3}>
          <Heading as="h2" size={2}>
            Handmatige controles vereist
          </Heading>
          <Text size={1} muted>
            Deze controles kunnen niet volledig automatisch worden geverifieerd maar zijn belangrijk voor WCAG 2.1 AA.
          </Text>
          <ul style={{paddingLeft: '1.5rem', display: 'grid', gap: '0.75rem'}}>
            {manualChecks.map((item) => (
              <li key={item}>
                <Text size={1}>{item}</Text>
              </li>
            ))}
          </ul>
        </Stack>
      </Stack>
    </Card>
  )
}
