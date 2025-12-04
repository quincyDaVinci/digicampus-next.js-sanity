import {useCallback, useState} from 'react'
import {
  DocumentActionComponent,
  DocumentActionDescription,
  DocumentActionProps,
  SanityDocument,
} from 'sanity'
import {useToast} from '@sanity/ui'
import {translateDeepObject, isTranslationSupported} from '../translation'

type TranslatableDocument = SanityDocument & {
  title?: string
  language?: string
  metadata?: {title?: string; description?: string; language?: string}
  modules?: unknown[]
  body?: unknown[]
  excerpt?: string
  footerContent?: unknown[]
  copyright?: unknown[]
  translations?: Record<string, unknown>
}

function buildPageTranslation(doc: TranslatableDocument) {
  return {
    title: doc?.title || '',
    metadataTitle: doc?.metadata?.title || doc?.title || '',
    metadataDescription: doc?.metadata?.description || '',
    modules: [],
  }
}

function buildBlogTranslation(doc: TranslatableDocument) {
  const onlyBlocks = Array.isArray(doc?.body)
    ? (doc.body as any[]).filter((item) => item && typeof item === 'object' && (item as any)._type === 'block')
    : []
  return {
    // Inline translation object — copy only textual fields as starting point.
    title: doc?.title || '',
    excerpt: doc?.excerpt || '',
    body: onlyBlocks,
  }
}

function buildSiteTranslation(doc: TranslatableDocument) {
  const onlyBlocks = (value?: unknown[]) =>
    Array.isArray(value) ? (value as any[]).filter((item) => item?._type === 'block') : undefined
  return {
    title: doc?.title || '',
    footerContent: onlyBlocks(doc?.footerContent) || [],
    copyright: onlyBlocks(doc?.copyright) || [],
  }
}

function buildSiteSettingsTranslation(doc: TranslatableDocument) {
  return {
    title: doc?.title || '',
  }
}

async function translatePayload(payload: Record<string, unknown>, sourceLanguage: string, targetLanguage: string) {
  return translateDeepObject(payload, sourceLanguage, targetLanguage)
}

export function createTranslateFromDutchAction(
  context: any
): DocumentActionComponent {
  return function TranslateFromDutchAction(props: DocumentActionProps): DocumentActionDescription {
    const toast = useToast()
    const [isRunning, setIsRunning] = useState(false)
    const documentId = props.id
    const docType = props.type
    const draft = (props.draft || props.published) as TranslatableDocument | null
    const sourceLanguage = (draft?.metadata?.language || draft?.language || 'nl') as string

    const client = context.getClient({apiVersion: context?.apiVersion || '2025-10-11'})

    const runTranslation = useCallback(async () => {
      if (!draft) {
        toast.push({status: 'warning', title: 'Open het document eerst', description: 'Geen concept gevonden om te vertalen.'})
        props.onComplete()
        return
      }

      setIsRunning(true)

      try {
        let translationPayload: Record<string, unknown> | null = null

        if (docType === 'page' || docType === 'homePage') {
          translationPayload = buildPageTranslation(draft)
        } else if (docType === 'blogPost') {
          translationPayload = buildBlogTranslation(draft)
        } else if (docType === 'site') {
          translationPayload = buildSiteTranslation(draft)
        } else if (docType === 'siteSettings') {
          translationPayload = buildSiteSettingsTranslation(draft)
        } else {
          throw new Error('Vertaalactie is niet beschikbaar voor dit documenttype')
        }

        if (!translationPayload) {
          throw new Error('Geen vertaalbare gegevens gevonden voor dit document')
        }

        const result = await translatePayload(translationPayload, sourceLanguage, 'en')
        let translated: any = result.translated
        const translationProvider = result.providerName

        // Defensive: normalize the translated payload per document type
        if (translated && typeof translated === 'object') {
          const t = translated as Record<string, any>
          const proto = translationPayload as Record<string, any>

          if (docType === 'blogPost') {
            // Inline blog translation must only contain: title, excerpt, body
            const cleaned: Record<string, any> = {
              title: typeof t.title === 'string' ? t.title : (typeof proto?.title === 'string' ? proto.title : ''),
              excerpt: typeof t.excerpt === 'string' ? t.excerpt : (typeof proto?.excerpt === 'string' ? proto.excerpt : ''),
              body: Array.isArray(t.body) ? t.body : (Array.isArray(proto?.body) ? proto.body : []),
            }
            translated = cleaned
          } else if (docType === 'page' || docType === 'homePage') {
            translated = {
              title: typeof t.title === 'string' ? t.title : (typeof proto?.title === 'string' ? proto.title : ''),
              metadataTitle:
                typeof t.metadataTitle === 'string'
                  ? t.metadataTitle
                  : (typeof proto?.metadataTitle === 'string' ? proto.metadataTitle : ''),
              metadataDescription:
                typeof t.metadataDescription === 'string'
                  ? t.metadataDescription
                  : (typeof proto?.metadataDescription === 'string' ? proto.metadataDescription : ''),
              modules: Array.isArray(t.modules) ? t.modules : [],
            }
          } else if (docType === 'site') {
            translated = {
              title: typeof t.title === 'string' ? t.title : (typeof proto?.title === 'string' ? proto.title : ''),
              footerContent: Array.isArray(t.footerContent) ? t.footerContent : [],
              copyright: Array.isArray(t.copyright) ? t.copyright : [],
            }
          } else if (docType === 'siteSettings') {
            translated = {title: typeof t.title === 'string' ? t.title : (typeof proto?.title === 'string' ? proto.title : '')}
          }
        }

        // Build a small preview of translated strings for the editor to confirm.
        const previewKeys = ['title', 'metadataTitle', 'metadataDescription', 'excerpt'] as const
        const samples: string[] = []
        for (const key of previewKeys) {
          const orig = (translationPayload as Record<string, unknown>)[key]
          const after = (translated as Record<string, unknown>)[key]
          if (typeof orig === 'string' && typeof after === 'string') {
            const o = orig.trim()
            const a = after.trim()
            if (o.length > 0 && a.length > 0 && o !== a) {
              const short = (s: string) => (s.length > 120 ? s.slice(0, 117) + '...' : s)
              samples.push(`${key}: "${short(o)}" → "${short(a)}"`)
            }
          }
        }

        // Always confirm overwrite for consistency, include samples when available
        const baseConfirm = samples.length > 0
          ? `Vertaling via: ${translationProvider}\n\nVoorbeeld vertalingen:\n\n${samples.join('\n')}\n\nBestaande Engelse vertaling overschrijven?`
          : `Vertaling via: ${translationProvider}\n\nBestaande Engelse vertaling overschrijven? Dit vervangt alle vertaalde velden (titel, samenvatting, inhoud).`
        const proceed = typeof window !== 'undefined' ? window.confirm(baseConfirm) : true
        if (!proceed) {
          setIsRunning(false)
          props.onComplete()
          return
        }

        // We will overwrite the translation for the target language entirely

        // Force-replace the language entry so we always write a new object even when contents are identical.
        const langKey = 'en'
        // Build the translated object to save for this language
        const translatedObj = translated as Record<string, unknown>

        // Sanitize structural fields in portable text so we don't write translated structural keys
        const protoBody = docType === 'blogPost' ? (translationPayload as Record<string, any>)?.body : undefined
        const translatedBody = docType === 'blogPost' ? (translatedObj as Record<string, any>)?.body : undefined

        let structuralChangeDetected = false
        let sanitizedBody: any[] | undefined = undefined

        if (docType === 'blogPost') {
          try {
            if (Array.isArray(protoBody) && Array.isArray(translatedBody)) {
              const allowedListItems = new Set(['bullet', 'number'])
              sanitizedBody = translatedBody.map((tItem: any, i: number) => {
                const pItem = protoBody[i]
                if (!tItem || typeof tItem !== 'object') return tItem
                const copy: Record<string, any> = {...tItem}

                // Preserve block type
                if (pItem && typeof pItem === 'object' && pItem._type && copy._type !== pItem._type) {
                  copy._type = pItem._type
                }

                // Preserve or repair listItem
                if (pItem && typeof pItem === 'object' && pItem.listItem) {
                  if (copy.listItem !== pItem.listItem) {
                    copy.listItem = pItem.listItem
                  }
                } else if (copy.listItem && !allowedListItems.has(copy.listItem)) {
                  delete copy.listItem
                }

                // Preserve style; if invalid or missing, default to original or 'normal'
                if (pItem && typeof pItem === 'object') {
                  const originalStyle = (pItem as any).style
                  if (originalStyle && copy.style !== originalStyle) {
                    copy.style = originalStyle
                  } else if (!copy.style && originalStyle) {
                    copy.style = originalStyle
                  } else if (copy.style && typeof copy.style !== 'string') {
                    copy.style = originalStyle || 'normal'
                  }
                } else if (copy && copy._type === 'block' && !copy.style) {
                  copy.style = 'normal'
                }

                // Preserve marks and markDefs from original
                if (pItem && typeof pItem === 'object') {
                  if (pItem.markDefs && JSON.stringify(copy.markDefs) !== JSON.stringify(pItem.markDefs)) {
                    copy.markDefs = pItem.markDefs
                  }
                  if (pItem.marks && JSON.stringify(copy.marks) !== JSON.stringify(pItem.marks)) {
                    copy.marks = pItem.marks
                  }
                }

                // Detect if we've made structural edits by comparing JSON
                try {
                  const before = JSON.stringify(tItem)
                  const after = JSON.stringify(copy)
                  if (before !== after) structuralChangeDetected = true
                } catch (e) {
                  structuralChangeDetected = true
                }

                return copy
              })
            }
          } catch (sanErr) {
            console.warn('[translate] sanitization failed', sanErr)
          }
        }

        // If structural changes were detected, let editor choose to force-apply or save as preview
        if (structuralChangeDetected) {
          const previewObj = {...translatedObj}
          if (sanitizedBody) previewObj.body = sanitizedBody

          const forceApply = typeof window !== 'undefined'
            ? window.confirm('Structuurwijzigingen gedetecteerd in de vertaalde inhoud. Toch live overschrijven? Klik op Annuleren om als Preview op te slaan.')
            : false

          if (!forceApply) {
            const txPrev = client.transaction()
            const targetId = draft?._id || documentId
            txPrev.patch(targetId, {setIfMissing: {translationsPreview: {}}})
            txPrev.patch(targetId, {set: {[`translationsPreview.${langKey}`]: previewObj}})
            const previewResult = await txPrev.commit({autoGenerateArrayKeys: true})
            console.debug('[translate] preview saved', previewResult)
            toast.push({
              status: 'warning',
              title: 'Preview opgeslagen i.v.m. structuurwijzigingen',
              description:
                'We hebben een preview opgeslagen onder Vertalingen → Preview. Controleer en pas handmatig aan of klik op "Apply translation preview" om live te zetten.',
            })
            setIsRunning(false)
            props.onComplete()
            return
          }
        }

        // No structural changes detected — proceed to overwrite translations
        if (sanitizedBody) translatedObj.body = sanitizedBody
        const tx = client.transaction()
        const targetId = draft?._id || documentId
        if (docType === 'blogPost') {
          tx.patch(targetId, {unset: [`translations.${langKey}`]})
          tx.patch(targetId, {set: {[`translations.${langKey}`]: translatedObj}})
        } else if (docType === 'page' || docType === 'homePage' || docType === 'site' || docType === 'siteSettings') {
          tx.patch(targetId, {unset: [`translations.${langKey}`]})
          tx.patch(targetId, {set: {[`translations.${langKey}`]: translatedObj}})
        }
        const commitResult = await tx.commit({autoGenerateArrayKeys: true})

        // Debug: show what was written so editors can verify translations exist
        console.debug('[translate] commit result', commitResult)

        // Try to publish the document so translations are visible on the public site.
        // In Studio, the current user may or may not have publish rights; handle failures gracefully.
        try {
          // Some studio contexts provide a client with sufficient permissions to publish.
          // If the client here doesn't allow publishing, this call will throw and we'll show a warning toast.
          await client.publish(documentId)
          // If publishing succeeds, show summary of saved translations
          toast.push({
            status: 'success',
            title: 'Vertaling voltooid en gepubliceerd',
            description: `Vertaald via ${translationProvider}. Document gepubliceerd.`,
          })
        } catch (pubErr) {
          console.warn('[translate] publish failed', pubErr)
          // If publish fails, still show the saved translations summary
          toast.push({
            status: 'warning',
            title: 'Vertaling opgeslagen (niet gepubliceerd)',
            description: `Vertaald via ${translationProvider}. Publiceer het document om live te zetten.`,
          })
        }
      } catch (error: unknown) {
        console.error('[translate] failed', error)
        toast.push({
          status: 'error',
          title: 'Vertalen mislukt',
          description:
            error instanceof Error
              ? error.message
              : 'Kon geen vertaling uitvoeren. Probeer het opnieuw.',
        })
      } finally {
        setIsRunning(false)
        props.onComplete()
      }
    }, [client, docType, documentId, draft, props, sourceLanguage, toast])

    if (!isTranslationSupported(docType)) {
      // Some Sanity versions/types may not include `renderDefault` on the props type.
      // Fall back to calling it via `any` when present, otherwise return a disabled action.
      return (props as any).renderDefault ? (props as any).renderDefault(props) : {disabled: true, label: 'Translate from Dutch'}
    }

    return {
      label: isRunning ? 'Vertalen...' : 'Translate from Dutch',
      onHandle: runTranslation,
      disabled: isRunning,
      tone: 'primary',
    }
  }
}
