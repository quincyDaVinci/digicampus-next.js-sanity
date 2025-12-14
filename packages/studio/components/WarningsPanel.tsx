import React from 'react'

export default function WarningsPanel() {
  return (
    <div style={{padding: 20}}>
      <h2>Warnings & Alerts</h2>
      <p>This panel will surface administrative warnings and checks.</p>
      <ul>
        <li>WCAG alerts (missing alt text, contrast issues)</li>
        <li>Old or unused media</li>
        <li>Missing translations</li>
        <li>Other automated checks</li>
      </ul>
      <p>Implement automated checks or integrations to populate this list.</p>
      <hr style={{margin: '16px 0'}} />
      <h3>AI Assist (optional)</h3>
      <p>
        To enable AI-assisted content tools inside the Studio install the Sanity AI plugin
        and provide the required API key in your environment.
      </p>
      <p style={{marginTop: 8}}>
        <strong>Install (npm)</strong>
      </p>
      <pre style={{background: '#f6f6f8', padding: 8}}>npm install --save-dev @sanity/ai</pre>
      <p style={{marginTop: 8}}>
        Then set <code>OPENAI_API_KEY</code> (or the provider key) in your environment and restart the Studio.
      </p>
    </div>
  )
}
