import {useCallback} from 'react'
import type {
  DocumentActionComponent,
  DocumentActionDescription,
  DocumentActionProps,
} from 'sanity'
import {useToast} from '@sanity/ui'

export function createApplyTranslationPreviewAction(
  context: any
): DocumentActionComponent {
  return function ApplyTranslationPreviewAction(props: DocumentActionProps): DocumentActionDescription {
    const toast = useToast()
    const client = context.getClient({apiVersion: context?.apiVersion || '2025-10-11'})
    const docType = props.type

    const onHandle = useCallback(async () => {
      const docId = props.id
      const draft = (props.draft || props.published) as any
      const targetId = draft?._id || docId
      const preview = draft?.translationsPreview

      if (!preview || typeof preview !== 'object') {
        toast.push({status: 'warning', title: 'Geen preview gevonden', description: 'Er is geen vertaalvoorbeeld om toe te passen.'})
        props.onComplete()
        return
      }

      const proceed = typeof window !== 'undefined' ? window.confirm('Wilt u de preview toepassen op de live vertalingen? Dit overschrijft bestaande vertalies voor dezelfde taal.') : true
      if (!proceed) {
        props.onComplete()
        return
      }

      try {
        const tx = client.transaction()
        if (docType === 'blogPost') {
          // Object-based inline translations
          tx.patch(targetId, {setIfMissing: {translations: {}}})
          for (const [lang, value] of Object.entries(preview)) {
            tx.patch(targetId, {set: {[`translations.${lang}`]: value}})
            tx.patch(targetId, {unset: {[`translationsPreview.${lang}`]: []} as any})
          }
          tx.patch(targetId, {unset: ['translationsPreview']})
        } else if (docType === 'page' || docType === 'homePage' || docType === 'site' || docType === 'siteSettings') {
          // Array-based translations; replace per-language entries
          const existing = (draft?.translations || []) as any[]
          let next = existing.filter((e) => !e || typeof e !== 'object' || !('language' in e) || !(e.language in preview))
          for (const [lang, value] of Object.entries(preview)) {
            next = [...next, {...(value as any), language: lang}]
            tx.patch(targetId, {unset: {[`translationsPreview.${lang}`]: []} as any})
          }
          tx.patch(targetId, {set: {translations: next}})
          tx.patch(targetId, {unset: ['translationsPreview']})
        } else {
          // Fallback: just clear preview
          tx.patch(targetId, {unset: ['translationsPreview']})
        }

        await tx.commit({autoGenerateArrayKeys: true})
        toast.push({status: 'success', title: 'Preview toegepast', description: 'Vertaalvoorbeeld is naar de live vertalingen gekopieerd.'})
      } catch (err) {
        console.error('[applyPreview] failed', err)
        toast.push({status: 'error', title: 'Toepassen mislukt', description: 'Kon de preview niet toepassen. Bekijk de console voor details.'})
      } finally {
        props.onComplete()
      }
    }, [client, docType, props, toast])

    return {
      label: 'Apply translation preview',
      onHandle,
      tone: 'positive',
    }
  }
}

export default createApplyTranslationPreviewAction
