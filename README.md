This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## ♿ Accessibility

This project maintains **WCAG 2.1 Level AA compliance**. Key features:

- ✅ Semantic HTML with proper landmarks (`<main>`, `<nav>`, `<footer>`)
- ✅ Keyboard navigation support (Tab, Enter, Esc)
- ✅ Screen reader compatibility (NVDA, JAWS, VoiceOver)
- ✅ ARIA labels and live regions
- ✅ Sufficient color contrast (4.5:1 minimum)
- ✅ Skip links for keyboard users
- ✅ Dark mode with maintained contrast ratios
- ✅ Reduced motion support

### Quick Commands

```bash
# Run accessibility linting
npm run lint:a11y

# Run automated accessibility tests (requires dev server running)
npm run test:a11y

# Full validation (lint + build)
npm run validate
```

### Documentation

- **Developer Guide**: [`docs/ACCESSIBILITY.md`](docs/ACCESSIBILITY.md)
- **Quick Reference**: [`docs/A11Y_QUICK_REFERENCE.md`](docs/A11Y_QUICK_REFERENCE.md)
- **Implementation Checklist**: [`docs/A11Y_CHECKLIST.md`](docs/A11Y_CHECKLIST.md)
- **Public Statement**: [/accessibility](http://localhost:3000/accessibility)

## 🎨 Icons and Accessibility

Feather icons live in `src/components/icons/FeatherIcons.tsx`. They expose React components with sensible a11y defaults:

- Provide a `title` when the icon conveys meaning; the component will render `<title>` and use `role="img"`.
- Omit `title` for decorative usage; it will set `aria-hidden="true"` and use `role="presentation"`.
- You can override hiding by passing `ariaHidden`.

Example:

```tsx
import { SearchIcon, CloseIcon } from '@/components/icons/FeatherIcons'

// Meaningful icon (announced by AT)
<SearchIcon title="Search" className="w-5 h-5" />

// Decorative icon (hidden from AT)
<CloseIcon className="w-5 h-5" />

// Icon-only button (best practice)
<button aria-label="Close menu">
  <CloseIcon aria-hidden="true" className="w-5 h-5" />
</button>
```

## 🧪 Testing

### Automated Testing

```bash
# ESLint with jsx-a11y plugin
npm run lint

# Pa11y CI (WCAG 2.1 AA)
npm run test:a11y
```

### Manual Testing Checklist

- [ ] Keyboard navigation (Tab through all interactive elements)
- [ ] Screen reader test (NVDA or VoiceOver)
- [ ] Color contrast validation (DevTools)
- [ ] Test at 200% zoom
- [ ] Dark mode verification

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - accessibility standards
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) - accessible component patterns

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚢 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
