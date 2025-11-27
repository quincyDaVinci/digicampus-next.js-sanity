import {useState} from 'react'
import type {DocumentActionComponent, SanityClient} from 'sanity'
import {useClient} from 'sanity'
import {useToast} from '@sanity/ui'
import {apiVersion} from '../env'
import {buildTranslationPatch, TranslationTarget} from './translateDocument'

const supportedTypes = new Set(['page', 'blogPost', 'site', 'siteSettings'])

async function fetchDocument(client: SanityClient, id: string) {
  const baseId = id.replace(/^drafts\./, '')
  return client.fetch(
    '*[_id in [$draft, $published]] | order(_id desc)[0]',
    {draft: `drafts.${baseId}`, published: baseId}
  )
}

export const TranslateFromDutchAction: DocumentActionComponent = (props) => {
  const {type, id, onComplete} = props
  const toast = useToast()
  const client = useClient({apiVersion})
  const [isRunning, setIsRunning] = useState(false)

  if (!supportedTypes.has(type)) {
    return null
  }

  return {
    label: isRunning ? 'Translating…' : 'Translate from Dutch',
    tone: 'primary',
    disabled: isRunning,
    onHandle: async () => {
      setIsRunning(true)
      toast.push({status: 'info', title: 'Vertalen gestart', description: 'Engelse velden worden bijgewerkt.'})

      try {
        const document = await fetchDocument(client, id)
        if (!document) {
          throw new Error('Document niet gevonden')
        }

        const patch = await buildTranslationPatch(document, type as TranslationTarget)
        const targetId = id.startsWith('drafts.') ? id : `drafts.${id}`

        await client.patch(targetId).set(patch.set).commit({autoGenerateArrayKeys: true})

        toast.push({status: 'success', title: 'Engelse vertaling bijgewerkt'})
      } catch (error) {
        console.error('Translation failed', error)
        toast.push({
          status: 'error',
          title: 'Vertalen mislukt',
          description: error instanceof Error ? error.message : 'Onbekende fout',
        })
      } finally {
        setIsRunning(false)
        onComplete()
      }
    },
  }
}

export default TranslateFromDutchAction
