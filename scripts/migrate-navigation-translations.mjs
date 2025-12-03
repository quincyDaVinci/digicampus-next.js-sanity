#!/usr/bin/env node
import sanityClient from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Missing SANITY_PROJECT_ID / SANITY_DATASET / SANITY_API_WRITE_TOKEN environment variables')
  process.exit(1)
}

const client = sanityClient({
  projectId,
  dataset,
  token,
  apiVersion: '2025-10-11',
  useCdn: false,
})

async function migrate() {
  console.log('Fetching navigation documents...')
  const docs = await client.fetch('*[_type == "navigation"]{_id, _rev, items, translations}')
  console.log(`Found ${docs.length} navigation docs`)

  for (const doc of docs) {
    const translations = Array.isArray(doc.translations) ? doc.translations : []
    let changed = false
    const newTranslations = translations.map((t) => {
      if (!t || !Array.isArray(t.items)) return t
      // Remove any legacy `title` field from the translation object
      const cleaned = {...t}
      if ('title' in cleaned) delete cleaned.title
      const newItems = (cleaned.items || t.items).map((it) => {
        if (!it || typeof it !== 'object') return it
        // If item already matches navigationItemTranslation (no link/list types), leave it
        if (it._type === 'navigationItemTranslation' || it.itemType) return it

        if (it._type === 'link') {
          changed = true
          return {
            _type: 'navigationItemTranslation',
            itemType: 'link',
            label: it.label || '',
          }
        }
        if (it._type === 'link.list') {
          changed = true
          return {
            _type: 'navigationItemTranslation',
            itemType: 'link.list',
            label: (it.link && it.link.label) || it.label || '',
            link: { label: it.link?.label || '' },
            links: Array.isArray(it.links) ? it.links.map((l) => ({ label: l?.label || '' })) : [],
          }
        }
        // fallback: wrap
        return {
          _type: 'navigationItemTranslation',
          itemType: it._type || 'unknown',
          label: it.label || '',
        }
      })
      return {...cleaned, items: newItems}
    })

    if (changed) {
      console.log(`Patching ${doc._id} — replacing translations.items to normalized shape`)
      try {
        const tx = client.transaction()
        tx.patch(doc._id, {set: {translations: newTranslations}})
        const res = await tx.commit({autoGenerateArrayKeys: true})
        console.log('Patched', doc._id)
      } catch (err) {
        console.error('Failed to patch', doc._id, err)
      }
    }
  }

  console.log('Done')
}

migrate().catch((err) => {
  console.error(err)
  process.exit(1)
})
