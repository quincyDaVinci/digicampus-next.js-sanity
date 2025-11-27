const fs = require('fs')
const path = require('path')

function loadEnv() {
  const base = process.cwd()
  const candidates = ['.env', '.env.production']
  for (const c of candidates) {
    const p = path.join(base, c)
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf8')
      const lines = content.split(/\r?\n/)
      const env = {}
      for (const line of lines) {
        const m = line.match(/^\s*([^#=\s]+)=(.*)$/)
        if (m) env[m[1]] = m[2]
      }
      return env
    }
  }
  return process.env
}

async function main() {
  const env = loadEnv()
  const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = env.NEXT_PUBLIC_SANITY_DATASET
  const apiVersion = env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-10-11'

  if (!projectId || !dataset) {
    console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in .env or environment')
    process.exit(1)
  }

  let client
  try {
    const sanityClient = require('@sanity/client')
    client = sanityClient({projectId, dataset, apiVersion, useCdn: true})
  } catch (err) {
    console.error('Could not load @sanity/client. Run `npm install` first.')
    console.error(err.message)
    process.exit(1)
  }

  const query = `*[_type == "page" && defined(metadata.slug.current)]{_id, title, "slug": coalesce(metadata.localizedSlugs.en.current, metadata.slug.current), metadata.localizedSlugs}[0..200]`

  try {
    const pages = await client.fetch(query)
    if (!pages || pages.length === 0) {
      console.log('No pages found')
      return
    }
    console.log(JSON.stringify(pages, null, 2))
  } catch (err) {
    console.error('Fetch failed:', err.message)
    process.exit(1)
  }
}

main()
