import { NextResponse } from 'next/server'

// Simple API for Studio to trigger the translation fixer scripts.
// Security: require a header `x-translation-fixer-secret` matching env TRANSLATION_FIXER_SECRET.

const SECRET = process.env.TRANSLATION_FIXER_SECRET || ''

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(()=>({}))
    const commit = !!body.commit
    const header = req.headers.get('x-translation-fixer-secret') || ''
    const userId = body?.userId as string | undefined

    // Allow dry-run without secret. Require secret only when commit/apply is requested.
    if (commit) {
      // Accept either: matching server secret OR role-based admin membership.
      const hasValidSecret = !!SECRET && header === SECRET
      if (!hasValidSecret) {
        // Role-based enforcement path only if secret is not provided
        const mgmtToken = process.env.SANITY_MANAGEMENT_TOKEN || process.env.SANITY_API_WRITE_TOKEN
        if (!mgmtToken) {
          return NextResponse.json({error: 'Server missing SANITY_MANAGEMENT_TOKEN or SANITY_API_WRITE_TOKEN'}, {status: 500})
        }
        if (!userId) {
          return NextResponse.json({error: 'Missing userId from Studio'}, {status: 400})
        }

        const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
        if (!projectId) {
          return NextResponse.json({error: 'Missing SANITY projectId on server'}, {status: 500})
        }

        // Fetch project memberships and verify role. Try multiple endpoints for compatibility.
        const headers = {Authorization: `Bearer ${mgmtToken}`}
        const urls = [
          `https://api.sanity.io/v1/projects/${projectId}/memberships`,
          `https://api.sanity.io/v2021-06-07/projects/${projectId}/memberships`,
          `https://api.sanity.io/v1/projects/${projectId}/members`,
          `https://api.sanity.io/v2021-06-07/projects/${projectId}/members`,
          // region variants fallback just in case
          `https://eu.api.sanity.io/v1/projects/${projectId}/memberships`,
          `https://eu.api.sanity.io/v2021-06-07/projects/${projectId}/memberships`,
          `https://us.api.sanity.io/v1/projects/${projectId}/memberships`,
          `https://us.api.sanity.io/v2021-06-07/projects/${projectId}/memberships`,
        ]
        let list: Array<Record<string, unknown>> | null = null
        let lastStatus = 0
        for (const url of urls) {
          const r = await fetch(url, {headers})
          lastStatus = r.status
          if (r.ok) {
            const payload = await r.json() as Record<string, unknown>
            list = Array.isArray(payload?.result) ? payload.result : Array.isArray(payload?.memberships) ? payload.memberships : Array.isArray(payload) ? payload : []
            if (Array.isArray(list)) break
          } else if (r.status !== 404) {
            await r.text()
            break
          }
        }
        if (!Array.isArray(list)) {
          // If membership API is unavailable, allow secret fallback if configured and provided
          if (hasValidSecret) {
            list = [] // bypass role check because secret was validated
          } else {
            return NextResponse.json({error: `Failed to fetch members: ${lastStatus}`}, {status: 500})
          }
        }
        const me = list.find((m) => (m as Record<string, unknown>)?.userId === userId || (m as Record<string, unknown>)?.id === userId || ((m as Record<string, unknown>)?.user as Record<string, unknown>)?.id === userId)
        if (!me) {
          if (!hasValidSecret) {
            return NextResponse.json({error: 'User not a member of this project'}, {status: 403})
          }
        }
        if (me) {
          const rolesRaw = me?.roles || (me?.role ? [me.role] : [])
          const roleIds: string[] = (Array.isArray(rolesRaw) ? rolesRaw : []).map((r) => (typeof r === 'string' ? r : ((r as Record<string, unknown>)?.name || (r as Record<string, unknown>)?.id) as string)).filter(Boolean)
          const allowed = roleIds.includes('administrator') || roleIds.includes('admin')
          if (!allowed && !hasValidSecret) {
            return NextResponse.json({error: 'Forbidden: requires administrator role'}, {status: 403})
          }
        }
      }
    }

    if (commit && !(process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_MANAGEMENT_TOKEN)) {
      return NextResponse.json({error: 'Server missing SANITY_API_WRITE_TOKEN or SANITY_MANAGEMENT_TOKEN for commit mode'}, {status: 500})
    }

    // Dynamically import the scripts so we reuse their logic
    const sanitizeModule = await import('../../../../scripts/sanitizeTranslations.mjs')
    const fixTopModule = await import('../../../../scripts/fixTopLevelTranslations.mjs')

    const sanitizeResult = await sanitizeModule.runSanitize({commit})
    const fixTopResult = await fixTopModule.runFixTopLevel({commit})

    return NextResponse.json({ok: true, commit, sanitizeResult, fixTopResult})
  } catch (err) {
    return NextResponse.json({error: String(err)}, {status: 500})
  }
}
