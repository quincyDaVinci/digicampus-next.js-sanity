import React from 'react'
import {Button, Box, Card, Text, Stack, TextInput, Label} from '@sanity/ui'
import {useCurrentUser} from 'sanity'

export default function TranslationFixer() {
  const [running, setRunning] = React.useState(false)
  const [result, setResult] = React.useState(null)
  const currentUser = useCurrentUser()
  const [adminSecret, setAdminSecret] = React.useState('')

  async function runDry() {
    setRunning(true)
    setResult(null)
    try {
      const res = await fetch('/api/run-translation-fixer', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          // Studio should provide the secret via environment when building, but during dev you'll need to set via Studio proxy or local env.
          'x-translation-fixer-secret': window.__SANITY_TRANSLATION_FIXER_SECRET || ''
        },
        body: JSON.stringify({commit: false}),
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setResult({error: String(err)})
    }
    setRunning(false)
  }

  async function runApply() {
    if (!confirm('Run fixer in APPLY mode? This will write changes to the dataset.')) return
    setRunning(true)
    setResult(null)
    try {
      const userId = (currentUser as any)?.value?._id || (currentUser as any)?.value?.id || (currentUser as any)?._id || (currentUser as any)?.id || undefined
      const res = await fetch('/api/run-translation-fixer', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          // Optional secret fallback: server will accept either a valid secret OR a valid admin user
          'x-translation-fixer-secret': adminSecret || (window as any)?.__SANITY_TRANSLATION_FIXER_SECRET || ''
        },
        body: JSON.stringify({commit: true, userId}),
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setResult({error: String(err)})
    }
    setRunning(false)
  }

  return (
    <Card padding={4} tone="default">
      <Stack space={3}>
        <Text><strong>Translation Fixer</strong></Text>
        <Text size={1}>Run the translation sanitization and top-level fixer. Start with a dry-run to review changes.</Text>
        <Box style={{display: 'flex', gap: 8}}>
          <Button text={running ? 'Running…' : 'Dry run'} tone="caution" onClick={runDry} disabled={running} />
          <Button text="Apply fixes" tone="positive" onClick={runApply} disabled={running} />
        </Box>
        <Box>
          <Label size={1}>Admin secret (optional fallback)</Label>
          <TextInput type="password" value={adminSecret} onChange={(e)=>setAdminSecret((e.currentTarget as HTMLInputElement).value)} />
          <Text size={1}>If Studio can’t read your user or you’re not signed in, paste the server-configured secret here as a fallback. Otherwise, your administrator role will be used automatically.</Text>
        </Box>
        {result && (
          <Box marginTop={3}>
            <pre style={{whiteSpace: 'pre-wrap', maxHeight: 400, overflow: 'auto'}}>{JSON.stringify(result, null, 2)}</pre>
          </Box>
        )}
      </Stack>
    </Card>
  )
}
