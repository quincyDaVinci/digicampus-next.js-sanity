import {useCallback, useState} from 'react'
import {
  DocumentActionComponent,
  DocumentActionComponentContext,
  DocumentActionDescription,
  DocumentActionProps,
  SanityDocument,
  useToast,
} from 'sanity'
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

        toast.push({
          status: 'success',
          title: 'Vertaling voltooid',
          description: 'Engelse velden zijn ingevuld op basis van de Nederlandse inhoud.',
        })
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
