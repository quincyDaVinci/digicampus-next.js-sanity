import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accessibility Statement - DigiCampus',
  description: 'Our commitment to digital accessibility',
}

export default function AccessibilityPage() {
  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">Accessibility Statement</h1>
      
      <section className="prose prose-lg max-w-none space-y-6">
        <p className="text-lg">
          DigiCampus is committed to ensuring digital accessibility for people with disabilities. 
          We continually improve the user experience for everyone and apply relevant accessibility standards.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Conformance Status</h2>
        <p>
          This website aims to conform to <strong>WCAG 2.1 Level AA</strong> standards. 
          We have implemented the following measures:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Semantic HTML5 markup with proper landmark roles</li>
          <li>Keyboard navigation support throughout the site</li>
          <li>Screen reader compatibility with ARIA labels and descriptions</li>
          <li>Sufficient color contrast ratios (minimum 4.5:1)</li>
          <li>Responsive design that works across devices and zoom levels</li>
          <li>Skip navigation links for keyboard users</li>
          <li>Alt text for all meaningful images</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Features</h2>
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li><strong>Keyboard Navigation:</strong> All interactive elements can be accessed using Tab, Enter, Space, and Escape keys</li>
          <li><strong>Focus Indicators:</strong> Clear visual focus rings help keyboard users track their position</li>
          <li><strong>Screen Reader Support:</strong> Proper ARIA labels, roles, and live regions for dynamic content</li>
          <li><strong>Dark Mode:</strong> Toggle between light and dark themes for visual comfort</li>
          <li><strong>Reduced Motion:</strong> Respects user preferences for reduced motion</li>
          <li><strong>Language Support:</strong> Multi-language support with proper lang attributes</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Feedback</h2>
        <p>
          We welcome your feedback on the accessibility of DigiCampus. 
          Please let us know if you encounter accessibility barriers:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Email: <a href="mailto:accessibility@digicampus.com" className="text-dc-brand hover:underline focus-visible:ring-2 ring-dc-focus rounded">accessibility@digicampus.com</a></li>
          <li>Phone: +31 (0)20 123 4567</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Technical Specifications</h2>
        <p>
          Accessibility of DigiCampus relies on the following technologies:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>HTML5</li>
          <li>CSS3 with custom properties</li>
          <li>JavaScript (ES2020+)</li>
          <li>ARIA (Accessible Rich Internet Applications)</li>
          <li>Next.js 15</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Testing Approach</h2>
        <p>
          We test our accessibility using:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Automated testing with ESLint jsx-a11y plugin</li>
          <li>Pa11y CI for WCAG compliance checking</li>
          <li>Manual keyboard navigation testing</li>
          <li>Screen reader testing (NVDA, JAWS, VoiceOver)</li>
          <li>Color contrast analysis</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Known Limitations</h2>
        <p>
          While we strive for full accessibility, we recognize there may be limitations:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 mb-6">
          <li>Third-party content or embedded widgets may not fully meet accessibility standards</li>
          <li>Legacy PDF documents may require alternative formats upon request</li>
        </ul>

        <p className="text-sm text-dc-text-muted mt-8 pt-4 border-t border-dc">
          <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </section>
    </article>
  )
}
