import { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const secret = body.secret || req.headers.get('x-revalidate-secret')
    const expected = process.env.REVALIDATE_SECRET || process.env.NEXT_PUBLIC_REVALIDATE_SECRET
    if (!expected || secret !== expected) {
      return new Response(JSON.stringify({ error: 'Invalid secret' }), { status: 401 })
    }

    // Helper: compute paths from a Sanity payload entry
    function pathsFromDoc(doc: unknown) {
      const out: string[] = []
      if (!doc || typeof doc !== 'object') return out

      const d = doc as Record<string, unknown>
      const _type = (d._type as string) || (d.type as string)

      // homePage -> root for both locales
      if (_type === 'homePage') {
        out.push('/nl', '/en')
        return out
      }

      // blog posts: canonical slug at slug or slug.current
      if (_type === 'blogPost') {
          // Resolve slug which might be a string or an object with `current`/`value`
          let slugStr: string | undefined
          const rawSlug = d.slug
          if (typeof rawSlug === 'string') slugStr = rawSlug
          else if (rawSlug && typeof rawSlug === 'object') {
            const s = rawSlug as Record<string, unknown>
            if (typeof s.current === 'string') slugStr = s.current
            else if (typeof s.value === 'string') slugStr = s.value
          }
          if (typeof slugStr === 'string' && slugStr) out.push(`/nl/blog/${slugStr}`)

        // try translations.en object or translations_array style
        let en: Record<string, unknown> | undefined
        if (d.translations_en && typeof d.translations_en === 'object') en = d.translations_en as Record<string, unknown>
        if (!en && d.translations && typeof d.translations === 'object') {
          const translationsObj = d.translations as Record<string, unknown>
          if (translationsObj.en && typeof translationsObj.en === 'object') en = translationsObj.en as Record<string, unknown>
        }
        if (!en && Array.isArray(d.translations_array)) {
          const arr = d.translations_array as unknown[]
          const found = arr.find((t) => {
            return typeof t === 'object' && (t as Record<string, unknown>).language === 'en'
          })
          if (found && typeof found === 'object') en = found as Record<string, unknown>
        }

        let enSlug: string | undefined
        if (en) {
          const raw = en.slug
          if (typeof raw === 'string') enSlug = raw
          else if (raw && typeof raw === 'object') {
            const s2 = raw as Record<string, unknown>
            if (typeof s2.current === 'string') enSlug = s2.current
          }
        }
        if (typeof enSlug === 'string' && enSlug) out.push(`/en/blog/${enSlug}`)
        return out
      }

      // generic page-like docs
      if (_type === 'page' || _type === 'sitePage' || _type === 'siteSettings') {
        const rawSlug = d.slug
        let pageSlug: string | undefined
        if (typeof rawSlug === 'string') pageSlug = rawSlug
        else if (rawSlug && typeof rawSlug === 'object') {
          const s3 = rawSlug as Record<string, unknown>
          if (typeof s3.current === 'string') pageSlug = s3.current
        }
        if (pageSlug) out.push(`/nl/${pageSlug}`)
        // translations array style
        if (Array.isArray(d.translations_array)) {
          const arr = d.translations_array as unknown[]
          const found = arr.find((t) => typeof t === 'object' && (t as Record<string, unknown>).language === 'en')
          if (found && typeof found === 'object') {
            const f = found as Record<string, unknown>
            if (f.slug && typeof f.slug === 'string') out.push(`/en/${f.slug}`)
          }
        }
        // translations.en style
        if (d.translations_en && typeof d.translations_en === 'object') {
          const ten = d.translations_en as Record<string, unknown>
          const raw = ten.slug
          if (typeof raw === 'string') out.push(`/en/${raw}`)
          else if (raw && typeof raw === 'object' && typeof (raw as Record<string, unknown>).current === 'string') {
            out.push(`/en/${(raw as Record<string, unknown>).current}`)
          }
        }
        return out
      }

      return out
    }

    // Build paths list: prefer explicit `paths` in payload, otherwise compute from document(s)
    let paths: string[] = []

    if (Array.isArray(body.paths) && body.paths.length > 0) {
      paths = body.paths
    } else if (body.path) {
      paths = [body.path]
    } else if (Array.isArray(body)) {
      // body may be an array of docs
      for (const doc of body) {
        paths.push(...pathsFromDoc(doc))
      }
    } else if (body._type || body._id) {
      paths = pathsFromDoc(body)
    }

    // Validate we have something to do
    paths = paths.filter((p) => typeof p === 'string' && p.startsWith('/'))
    if (!paths || paths.length === 0) {
      return new Response(JSON.stringify({ error: 'No paths provided or could not compute paths from payload' }), { status: 400 })
    }

    // Revalidate unique paths
    const unique = Array.from(new Set(paths))
    for (const p of unique) {
      try {
        revalidatePath(p)
      } catch (err) {
        console.warn('Revalidate path failed for', p, err)
      }
    }

    return new Response(JSON.stringify({ revalidated: true, paths }), { status: 200 })
  } catch (err) {
    console.error('Revalidate handler error', err)
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}
