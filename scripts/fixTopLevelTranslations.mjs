import {createClient} from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-10-11',
  token: process.env.SANITY_MANAGEMENT_TOKEN || process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
})

// Fields that sometimes ended up at the document root due to older translation commits
const STRAY_KEYS = ['language', 'metadataTitle', 'metadataDescription']

export async function runFixTopLevel({commit = false} = {}) {
  console.log('Fix top-level translation fields script')
  console.log('Commit mode:', commit ? 'APPLYING PATCHES' : 'DRY RUN')

  // Find documents that contain any of the stray keys at the root
  const query = `*[_type in ["blogPost","page","homePage","site","siteSettings"] && (defined(language) || defined(metadataTitle) || defined(metadataDescription))]{_id, _type, title, language, metadataTitle, metadataDescription, translations}`
  const docs = await client.fetch(query)
  console.log(`Found ${docs.length} documents with stray fields.`)

  let totalPatched = 0
  const report = []
  for (const doc of docs) {
    const patches = []

    // Move language into translations.<lang>.language or ensure translations.<lang> exists
    if (doc.language && typeof doc.language === 'string') {
      const lang = doc.language
      const tObj = (doc.translations && doc.translations[lang]) || {}
      if (!tObj.language) tObj.language = lang
      patches.push({op: 'set', path: `translations.${lang}.language`, value: lang})
      patches.push({op: 'unset', path: 'language'})
    }

    // Move metadataTitle/metadataDescription into translations.<lang>.metadataTitle/metadataDescription (prefer doc.language or 'en')
    const targetLang = (doc.language && typeof doc.language === 'string') ? doc.language : 'en'
    if (doc.metadataTitle !== undefined) {
      patches.push({op: 'set', path: `translations.${targetLang}.metadataTitle`, value: doc.metadataTitle})
      patches.push({op: 'unset', path: 'metadataTitle'})
    }
    if (doc.metadataDescription !== undefined) {
      patches.push({op: 'set', path: `translations.${targetLang}.metadataDescription`, value: doc.metadataDescription})
      patches.push({op: 'unset', path: 'metadataDescription'})
    }

    if (patches.length > 0) {
      console.log(`Document ${doc._id} will be patched:`, patches.map(p=>p.path))
      totalPatched += 1
      report.push({docId: doc._id, patches: patches.map(p=>p.path)})
      if (commit) {
        try {
          const tx = client.transaction()
          // Ensure translations object exists
          tx.patch(doc._id, {setIfMissing: {translations: {}}})
          for (const p of patches) {
            if (p.op === 'set') tx.patch(doc._id, {set: {[p.path]: p.value}})
            if (p.op === 'unset') tx.patch(doc._id, {unset: [p.path]})
          }
          const res = await tx.commit({autoGenerateArrayKeys: true})
          console.log('Patched', doc._id, res._id)
        } catch (err) {
          console.error('Failed to patch', doc._id, err)
        }
      }
    }
  }

  console.log('Done. Documents needing fixes:', totalPatched)
  return {totalPatched, report}
}

// CLI compatibility
if (import.meta.url === `file://${process.argv[1]}`) {
  const commit = !!process.env.SANITY_COMMIT
  runFixTopLevel({commit}).then(res => {
    console.log('Result:', res)
  }).catch(err=>{console.error(err); process.exit(1)})
}
