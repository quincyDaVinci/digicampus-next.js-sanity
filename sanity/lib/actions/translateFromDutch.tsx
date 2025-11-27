import {useCallback, useState} from 'react'
import {
  DocumentActionComponent,
  DocumentActionComponentContext,
  DocumentActionDescription,
  DocumentActionProps,
  SanityDocument,
} from 'sanity'
import {useToast} from '@sanity/ui'
import {translateDeepObject, ensureArrayWithLanguage, isTranslationSupported} from '../translation'

type TranslationEntry = {_key?: string; language?: string}

type TranslatableDocument = SanityDocument & {
  title?: string
  language?: string
  metadata?: {title?: string; description?: string; language?: string}
  modules?: unknown[]
  body?: unknown[]
  excerpt?: string
  footerContent?: unknown[]
  copyright?: unknown[]
  translations?: TranslationEntry[]
}

function buildPageTranslation(doc: TranslatableDocument) {
  return {
    _type: 'pageTranslation',
    language: 'en',
    title: doc?.title || '',
    metadataTitle: doc?.metadata?.title || doc?.title || '',
    metadataDescription: doc?.metadata?.description || '',
    modules: doc?.modules || [],
  }
}

function buildBlogTranslation(doc: TranslatableDocument) {
  return {
    _type: 'blogPostTranslation',
    language: 'en',
    title: doc?.title || '',
    excerpt: doc?.excerpt || '',
    body: doc?.body || [],
  }
}

function buildSiteTranslation(doc: TranslatableDocument) {
  return {
    _type: 'siteTranslation',
    language: 'en',
    title: doc?.title || '',
    footerContent: doc?.footerContent || [],
    copyright: doc?.copyright || [],
  }
}

function buildSiteSettingsTranslation(doc: TranslatableDocument) {
  return {
    _type: 'siteSettingsTranslation',
    language: 'en',
    title: doc?.title || '',
  }
}

async function translatePayload(payload: Record<string, unknown>, sourceLanguage: string, targetLanguage: string) {
  return translateDeepObject(payload, sourceLanguage, targetLanguage)
}

export function createTranslateFromDutchAction(
  context: DocumentActionComponentContext
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

        const translated = await translatePayload(translationPayload, sourceLanguage, 'en')

        // Defensive: ensure the translated object contains expected keys (type, language, arrays/strings)
        if (translated && typeof translated === 'object') {
          const t = translated as Record<string, any>
          const proto = translationPayload as Record<string, any>
          if (!t._type && proto && proto._type) t._type = proto._type
          if (!t.language) t.language = 'en'
          if (proto?.modules && !Array.isArray(t.modules)) t.modules = []
          if (proto?.body && !Array.isArray(t.body)) t.body = []
          if (proto?.footerContent && !Array.isArray(t.footerContent)) t.footerContent = []
          if (typeof t.title !== 'string') t.title = proto?.title ?? ''
          if (typeof t.metadataTitle !== 'string') t.metadataTitle = proto?.metadataTitle ?? ''
          if (typeof t.metadataDescription !== 'string') t.metadataDescription = proto?.metadataDescription ?? ''
          if (typeof t.excerpt !== 'string') t.excerpt = proto?.excerpt ?? ''
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

        if (samples.length > 0) {
          // Ask the editor to confirm before saving translations.
          const message = `Voorbeeld vertalingen:\n\n${samples.join('\n')}\n\nVertalingen opslaan?`
          // `window.confirm` is acceptable in Studio action UI to request a quick confirmation.
          const proceed = typeof window !== 'undefined' ? window.confirm(message) : true
          if (!proceed) {
            setIsRunning(false)
            props.onComplete()
            return
          }
        } else {
          // If nothing meaningful changed, warn the editor so they know translations may be identical.
          toast.push({
            status: 'info',
            title: 'Geen zichtbare wijzigingen in voorbeeld',
            description: 'De automatische vertaling gaf geen andere tekst terug voor de belangrijkste velden.',
          })
        }

        let setPaths: Record<string, unknown> = {}

        if (docType === 'page' || docType === 'homePage') {
          setPaths = {
            translations: ensureArrayWithLanguage(draft?.translations, translated),
          }
        }

        if (docType === 'blogPost') {
          setPaths = {
            translations: ensureArrayWithLanguage(draft?.translations, translated),
          }
        }

        if (docType === 'site') {
          setPaths = {
            translations: ensureArrayWithLanguage(draft?.translations, translated),
          }
        }

        if (docType === 'siteSettings') {
          setPaths = {
            translations: ensureArrayWithLanguage(draft?.translations, translated),
          }
        }

        await client.patch(documentId).setIfMissing({translations: []}).set(setPaths).commit({autoGenerateArrayKeys: true})

        // Try to publish the document so translations are visible on the public site.
        // In Studio, the current user may or may not have publish rights; handle failures gracefully.
        try {
          // Some studio contexts provide a client with sufficient permissions to publish.
          // If the client here doesn't allow publishing, this call will throw and we'll show a warning toast.
          await client.publish(documentId)
          toast.push({
            status: 'success',
            title: 'Vertaling voltooid en gepubliceerd',
            description: 'Engelse velden zijn ingevuld en gepubliceerd.',
          })
        } catch (pubErr) {
          console.warn('[translate] publish failed', pubErr)
          toast.push({
            status: 'warning',
            title: 'Vertaling opgeslagen (niet gepubliceerd)',
            description: 'Vertaling is opgeslagen als concept. Publiceer het document om het live te zetten.',
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
      return props.renderDefault(props)
    }

    return {
      label: isRunning ? 'Vertalen...' : 'Translate from Dutch',
      onHandle: runTranslation,
      disabled: isRunning,
      tone: 'primary',
    }
  }
}
