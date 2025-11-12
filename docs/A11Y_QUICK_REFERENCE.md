# 🎯 DigiCampus A11y Quick Reference

## ⚡ Quick Commands

```powershell
# Development
npm run dev                    # Start dev server

# Testing
npm run lint                   # Run ESLint (includes a11y)
npm run lint:a11y             # Strict a11y linting
npm run test:a11y             # Run Pa11y tests (needs dev server)
npm run validate              # Lint + build check

# Build
npm run build                  # Production build
npm run start                  # Start production server
```

## 🎨 Common CSS Classes

```tsx
// Screen reader only
<span className="sr-only">Hidden visually</span>

// Focus indicators
<button className="focus-visible:ring-2 ring-dc-focus">Button</button>

// Skip link (already in layout)
<a href="#main-content" className="skip-link">Skip to main</a>

// Background colors
<div className="bg-dc-surface-98">Surface</div>
<div className="bg-dc-surface-90">Hover state</div>

// Text colors
<p className="text-dc">Primary text</p>
<p className="text-dc-muted">Secondary text</p>

// Borders
<div className="border border-dc">Accessible border</div>
```

## 🧩 Component Patterns

### Button with Icon
```tsx
<button aria-label="Close menu">
  <CloseIcon aria-hidden="true" />
</button>
```

### Form Input
```tsx
<label htmlFor="email" className="sr-only">Email address</label>
<input id="email" type="email" placeholder="you@example.com" />
```

### Toggle Button
```tsx
<button 
  aria-pressed={isActive}
  onClick={() => setActive(!isActive)}
>
  {isActive ? 'Active' : 'Inactive'}
</button>
```

### Live Region
```tsx
<div role="status" aria-live="polite" aria-atomic="true">
  {dynamicMessage}
</div>
```

### External Link
```tsx
<a 
  href="https://example.com" 
  target="_blank" 
  rel="noopener noreferrer"
  aria-label="Visit Example (opens in new window)"
>
  Example
</a>
```

### Image
```tsx
import Image from 'next/image'

// Informative image
<Image src="/photo.jpg" alt="Team photo" width={400} height={300} />

// Decorative image
<Image src="/pattern.jpg" alt="" width={400} height={300} />
```

## 🎹 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Move focus forward |
| `Shift + Tab` | Move focus backward |
| `Enter` / `Space` | Activate button/link |
| `Esc` | Close menu/modal |
| `Arrow keys` | Navigate menus/lists |

## 📐 Design Tokens

```tsx
// Use HSL tokens with alpha
<div style={{ 
  backgroundColor: 'hsl(var(--dc-primary))',
  color: 'hsl(var(--dc-on-primary))'
}}>
  Primary button
</div>

// With transparency
<div style={{ 
  backgroundColor: 'hsl(var(--dc-primary) / 0.9)'
}}>
  Transparent overlay
</div>
```

### Available Tokens
- `--dc-bg` - Page background
- `--dc-surface` - Cards, modals
- `--dc-border` - Dividers
- `--dc-text` - Body text
- `--dc-text-muted` - Secondary text
- `--dc-brand` - Links, accents
- `--dc-primary` - Primary buttons
- `--dc-on-primary` - Text on primary
- `--dc-focus` - Focus rings

## ⚠️ Common Mistakes

### ❌ Don't
```tsx
// Missing alt
<img src="/logo.svg" />

// div with onClick
<div onClick={handleClick}>Click</div>

// No label
<input placeholder="Name" />

// Color only for status
<span style={{ color: 'red' }}>Error</span>
```

### ✅ Do
```tsx
// Proper alt
<Image src="/logo.svg" alt="DigiCampus logo" width={120} height={40} />

// Button element
<button onClick={handleClick}>Click</button>

// With label
<label htmlFor="name">Name</label>
<input id="name" placeholder="John Doe" />

// Icon + text for status
<span className="text-error">
  <AlertIcon aria-hidden="true" /> Error
</span>
```

## 📚 Resources

- **Developer Guide**: `docs/ACCESSIBILITY.md`
- **Checklist**: `docs/A11Y_CHECKLIST.md`
- **Summary**: `docs/IMPLEMENTATION_SUMMARY.md`
- **Public Statement**: `/accessibility` page
- **WCAG Quick Ref**: https://www.w3.org/WAI/WCAG21/quickref/
- **ARIA Patterns**: https://www.w3.org/WAI/ARIA/apg/

## 🧪 Testing Checklist

Before committing:
- [ ] Run `npm run lint:a11y` (no errors)
- [ ] Tab through all interactive elements
- [ ] Check focus rings are visible
- [ ] Test in dark mode
- [ ] Verify color contrast
- [ ] Test with screen reader (optional but recommended)

## 🎓 When to Use What

| Need | Solution |
|------|----------|
| Hide text visually | `.sr-only` |
| Skip to content | `.skip-link` |
| Focus indicator | `focus-visible:ring-2 ring-dc-focus` |
| Announce changes | `aria-live="polite"` |
| Icon button | `aria-label` + `aria-hidden` on icon |
| Toggle state | `aria-pressed` |
| Menu state | `aria-expanded` |
| Form error | `aria-invalid` + `aria-describedby` |

---

**Quick Help**: Check existing components (`Header.tsx`, `Footer.tsx`, `SearchInput.tsx`) for patterns!
