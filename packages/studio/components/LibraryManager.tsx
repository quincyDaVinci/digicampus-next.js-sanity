import React, {useEffect} from 'react'

export default function LibraryManager() {
  useEffect(() => {
    // Route to the Media tool path (Sanity v3 tools use path segments like /<basePath>/media)
    const {pathname} = window.location
    if (pathname.includes('/media')) return
    // Derive basePath from the first path segment (e.g., "/geheimelocatie")
    const parts = pathname.split('/').filter(Boolean)
    const base = parts.length > 0 ? `/${parts[0]}` : '/geheimelocatie'
    const target = `${base}/media`
    window.location.replace(target)
  }, [])

  return (
    <div style={{padding: 20}}>
      <h2>Library Manager</h2>
      <p>Manage document assets and media used across the site.</p>
      <div style={{marginTop: 12, color: '#666'}}>Opening Media…</div>
    </div>
  )
}
