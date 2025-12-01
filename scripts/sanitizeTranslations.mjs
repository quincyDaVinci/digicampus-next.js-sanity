import {createClient} from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-10-11',
  token: process.env.SANITY_MANAGEMENT_TOKEN || process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
})

const ALLOWED_LIST_ITEMS = new Set(['bullet', 'number'])
const ALLOWED_BLOCK_STYLES = new Set(['normal', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'])

function sanitizeTranslatedBody(protoBody = [], translatedBody = []) {
  let changed = false
  const out = translatedBody.map((tItem, i) => {
    const pItem = Array.isArray(protoBody) ? protoBody[i] : undefined
    if (!tItem || typeof tItem !== 'object') return tItem

    const copy = {...tItem}

    // Preserve block _type from original if present
    if (pItem && typeof pItem === 'object' && pItem._type && copy._type !== pItem._type) {
      copy._type = pItem._type
      changed = true
    }

    // Preserve style from original (prevents invalid nesting like blockquote inside normal)
    if (pItem && typeof pItem === 'object' && pItem.style) {
      if (copy.style !== pItem.style) {
        copy.style = pItem.style
        changed = true
      }
    } else if (copy.style && !ALLOWED_BLOCK_STYLES.has(copy.style)) {
      // If translated style is invalid, reset to normal or match prototype
      copy.style = 'normal'
      changed = true
    }

    // Preserve or repair listItem
    if (pItem && typeof pItem === 'object' && pItem.listItem) {
      if (copy.listItem !== pItem.listItem) {
        copy.listItem = pItem.listItem
        changed = true
      }
    } else if (copy.listItem && !ALLOWED_LIST_ITEMS.has(copy.listItem)) {
      delete copy.listItem
      changed = true
    }

    // Preserve marks and markDefs
    if (pItem && typeof pItem === 'object') {
      if (pItem.markDefs && JSON.stringify(copy.markDefs) !== JSON.stringify(pItem.markDefs)) {
        copy.markDefs = pItem.markDefs
        changed = true
      }
      if (pItem.marks && JSON.stringify(copy.marks) !== JSON.stringify(pItem.marks)) {
        copy.marks = pItem.marks
        changed = true
      }
    }

    return copy
  })

  return {out, changed}
}

export async function runSanitize({commit = false} = {}) {
  console.log('Sanitize translations script')
  console.log('Commit mode:', commit ? 'APPLYING PATCHES' : 'DRY RUN')

  const docs = await client.fetch(`*[_type in ["blogPost","page","homePage","site","siteSettings"] && defined(translations)]{_id, _type, title, body, translations}`)
  console.log(`Found ${docs.length} documents with translations`)

  let totalPatched = 0
  const report = []
  for (const doc of docs) {
    const {translations} = doc
    if (!translations || typeof translations !== 'object') continue

    const patches = []
    for (const [lang, translation] of Object.entries(translations)) {
      if (!translation || typeof translation !== 'object') continue
      const protoBody = doc.body
      const translatedBody = translation.body
      if (!Array.isArray(translatedBody)) continue

      const {out, changed} = sanitizeTranslatedBody(protoBody, translatedBody)
      if (changed) {
        console.log(`Document ${doc._id} lang=${lang} needs sanitization`)
        patches.push({lang, out})
      }
    }

    if (patches.length > 0) {
      totalPatched += patches.length
      console.log(`Will patch ${doc._id}:`, patches.map(p=>p.lang))
      report.push({docId: doc._id, langs: patches.map(p=>p.lang)})
      if (commit) {
        const tx = client.transaction()
        for (const p of patches) {
          tx.patch(doc._id, {set: {[`translations.${p.lang}.body`]: p.out}})
        }
        try {
          const res = await tx.commit({autoGenerateArrayKeys: true})
          console.log('Patched', doc._id, res)
        } catch (err) {
          console.error('Failed to patch', doc._id, err)
        }
      }
    }
  }

  console.log('Done. Total patched language entries:', totalPatched)
  return {totalPatched, report}
}

// CLI compatibility
if (import.meta.url === `file://${process.argv[1]}`) {
  const commit = !!process.env.SANITY_COMMIT
  runSanitize({commit}).then(res => {
    console.log('Result:', res)
  }).catch(err=>{console.error(err); process.exit(1)})
}
