# Accessibility Guidelines for DigiCampus

## Overview
DigiCampus maintains WCAG 2.1 Level AA compliance across all features.

## Quick Reference

### Color Contrast
All text meets minimum contrast ratios:
- **Normal text**: 4.5:1 minimum
- **Large text (18pt+)**: 3:1 minimum
- Use tokens from `globals.css` to maintain compliance

### Keyboard Navigation
All interactive elements must be:
- Reachable via `Tab` key
- Activatable via `Enter` or `Space`
- Dismissable via `Esc` (for modals/menus)
- Visually indicated with focus ring (`.ring-dc-focus`)

### Screen Readers
- Use semantic HTML (`<nav>`, `<main>`, `<article>`, etc.)
- Provide `alt` text for images using `next/image`
- Add ARIA labels where context is missing
- Use `.sr-only` class for visually hidden but accessible text

## Component Checklist

### Forms
- [ ] All inputs have associated `<label>`
- [ ] Use `aria-describedby` for helper text
- [ ] Provide inline validation with `aria-invalid` and `aria-errormessage`

### Buttons
- [ ] Use `<button>` (not `<div onClick>`)
- [ ] Provide descriptive `aria-label` when text is not self-explanatory
- [ ] Icon-only buttons have accessible names

### Modals/Dialogs
- [ ] Use `role="dialog"` and `aria-modal="true"`
- [ ] Trap focus within modal when open
- [ ] Close on `Esc` key
- [ ] Return focus to trigger element on close

### Images
- [ ] Use Next.js `<Image>` component with `alt` prop
- [ ] Decorative images: `alt=""` or `aria-hidden="true"`
- [ ] Informative images: descriptive alt text

## Testing Workflow

### Automated Testing
```powershell
# Run ESLint a11y rules
npm run lint:a11y

# Run Pa11y CI tests (requires dev server running)
npm run test:a11y
```

### Manual Testing
1. **Keyboard navigation**: Tab through entire page
2. **Screen reader**: Test with NVDA (Windows) or VoiceOver (macOS)
3. **Color contrast**: Use browser DevTools contrast checker
4. **Zoom**: Test at 200% browser zoom

## Design Token Usage

### Using Tokens in Components

```tsx
// Inline styles with alpha values
<div style={{ backgroundColor: 'rgb(var(--dc-primary))' }}>
  <p style={{ color: 'rgb(var(--dc-on-primary))' }}>Text</p>
</div>

// With alpha transparency
<div style={{ backgroundColor: 'rgb(var(--dc-primary) / 0.95)' }}>
  Content
</div>
```

### Helper Classes
```tsx
// Background colors
<div className="bg-dc-surface-98">Surface with opacity</div>
<div className="bg-dc-surface-90">Hover state</div>

// Borders
<div className="border border-dc">Accessible border</div>

// Focus rings
<button className="focus-visible:ring-2 ring-dc-focus">Button</button>

// Text colors
<p className="text-dc">Primary text</p>
<p className="text-dc-muted">Secondary text</p>
```

## Common Patterns

### Skip Link
Already implemented in `layout.tsx`:
```tsx
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
```

### Screen Reader Only Text
```tsx
<span className="sr-only">Additional context for screen readers</span>
```

### Focus Visible Always
```tsx
<button className="focus-visible-always">
  Always show focus outline
</button>
```

### ARIA Live Regions
For dynamic content updates:
```tsx
<div role="status" aria-live="polite" aria-atomic="true">
  {message}
</div>
```

## Icons

Use the FeatherIcons component with proper accessibility:

```tsx
import { CheckIcon, AlertIcon } from '@/components/icons/FeatherIcons'

// Decorative icon (hidden from screen readers)
<CheckIcon aria-hidden="true" />

// Meaningful icon (announced to screen readers)
<AlertIcon title="Warning" />

// Icon-only button
<button aria-label="Close menu">
  <CloseIcon aria-hidden="true" />
</button>
```

## Resources
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Next.js Accessibility Docs](https://nextjs.org/docs/accessibility)

## Common Issues to Avoid

### ❌ Bad
```tsx
// Missing alt text
<img src="/logo.svg" />

// div with onClick
<div onClick={handleClick}>Click me</div>

// No label for input
<input type="text" placeholder="Name" />

// Missing ARIA label
<button><SearchIcon /></button>
```

### ✅ Good
```tsx
// Proper alt text
<Image src="/logo.svg" alt="DigiCampus logo" width={120} height={40} />

// Button element
<button onClick={handleClick}>Click me</button>

// Label with input
<label htmlFor="name">Name</label>
<input id="name" type="text" />

// ARIA label for icon button
<button aria-label="Search">
  <SearchIcon aria-hidden="true" />
</button>
```

## Contribution Guidelines

When adding new components:

1. **Run linter**: `npm run lint:a11y` before committing
2. **Test keyboard navigation**: Tab through all interactive elements
3. **Check focus indicators**: Ensure visible focus rings
4. **Verify ARIA**: Use proper roles and labels
5. **Test with screen reader**: NVDA or VoiceOver
6. **Validate contrast**: Use DevTools contrast checker

## Questions?

If you're unsure about accessibility implementation, check:
1. The existing components (`Header.tsx`, `Footer.tsx`, `SearchInput.tsx`)
2. The [Accessibility Statement](/accessibility) page
3. The WCAG quick reference guide
4. Ask the team lead or open an issue

---

**Last updated**: October 21, 2025
