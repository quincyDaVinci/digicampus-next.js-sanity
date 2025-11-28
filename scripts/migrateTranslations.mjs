import sanityClient from '@sanity/client'
import dotenv from 'dotenv'
dotenv.config()

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-10-11',
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN,
  useCdn: false,
})

async function run() {
  console.log('Scanning for documents with legacy translations array...')
  const docs = await client.fetch(`*[_type in ["page","blogPost","homePage","site","siteSettings"] && defined(translations) && count(translations) > 0]{_id, _type, title, translations}`)
  console.log(`Found ${docs.length} documents with translations array.`)
  for (const doc of docs) {
    if (!Array.isArray(doc.translations)) continue
    const obj = {}
    for (const t of doc.translations) {
      if (t && t.language) obj[t.language] = t
    }
    if (Object.keys(obj).length === 0) continue
    console.log(`Patching ${doc._id} -> converting ${doc.translations.length} entries to object keys:`, Object.keys(obj))
    await client.patch(doc._id).set({translations: obj}).commit({autoGenerateArrayKeys: true})
  }
  console.log('Migration complete')
}

run().catch((err)=>{console.error(err); process.exit(1)})
