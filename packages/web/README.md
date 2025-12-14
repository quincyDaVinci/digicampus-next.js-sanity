# Digicampus Web App

This is the Next.js frontend application for Digicampus, deployed to Vercel.

## Overview

A modern Next.js (v15) application with TypeScript, Tailwind CSS v4, and styled-components integration. The app fetches content from Sanity CMS and features:

- Server-side rendering with App Router
- Internationalization support (Dutch/English)
- Accessibility-first design
- Dark mode support
- Dynamic page building with modular sections from Sanity

## Project Structure

```
packages/web/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   ├── [lang]/                   # Language route group
│   │   ├── globals.css               # Design tokens & utilities
│   │   ├── api/                      # API routes
│   │   ├── geheimelocatie/           # Sanity Studio mount point
│   │   ├── accessibility/
│   │   ├── showcase/
│   │   └── [slug]/                   # Dynamic pages
│   ├── components/
│   │   ├── Header.tsx                # Main header
│   │   ├── Footer.tsx                # Main footer
│   │   ├── sections/                 # Modular section components
│   │   │   ├── RenderSection.tsx     # Section router
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeatureSection.tsx
│   │   │   └── ...                   # Other section types
│   │   ├── ui/                       # Reusable UI primitives
│   │   ├── pageBuilder/              # Legacy page builder (backward compat)
│   │   ├── icons/
│   │   ├── navigation/
│   │   └── ...
│   ├── lib/
│   │   ├── i18n.ts                   # i18n configuration
│   │   ├── language.tsx              # Language context
│   │   ├── sanityImage.ts            # Image utilities
│   │   ├── cn.ts                     # Class name utilities
│   │   ├── translations.ts           # Translation helpers
│   │   └── ...
│   ├── types/
│   │   ├── sections.ts               # Section type definitions
│   │   └── pageBuilder.ts            # Page builder types
│   └── middleware.ts
├── public/
│   └── assets/images/                # Static images (logos, etc.)
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
└── package.json
```

## Getting Started

### Prerequisites
- Node.js >= 20.19.0
- npm >= 10
- Sanity project credentials (see Environment Variables)

### Installation

```bash
# Install dependencies for this package
npm install --workspace=@digicampus/web

# Or from the package directory
cd packages/web
npm install
```

### Development

```bash
# From root:
npm run dev

# From packages/web:
cd packages/web
npm run dev
```

The app will be available at `http://localhost:3000`

The Sanity Studio (if also running) is accessible at `http://localhost:3000/geheimelocatie/[[...tool]]/`

## Environment Variables

Create a `.env.local` file in this package with:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_VERCEL_URL=yourdomain.vercel.app
NEXT_PUBLIC_SANITY_STUDIO_HOST=studio.sanity.io
```

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET`: Dataset name (typically "production")
- `NEXT_PUBLIC_SANITY_API_VERSION`: Sanity API version (YYYY-MM-DD format)
- `NEXT_PUBLIC_SITE_URL`: Your site's public URL
- `NEXT_PUBLIC_VERCEL_URL`: Auto-set by Vercel in production
- `NEXT_PUBLIC_SANITY_STUDIO_HOST`: Sanity studio hostname for visual editing

## Available Commands

```bash
# Development
npm run dev          # Start dev server with turbopack

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:a11y    # Run accessibility-focused linting
npm run test:a11y    # Run accessibility tests with pa11y
npm run validate     # Run linting and build (full validation)
```

## Build & Deployment

### Building for Production

```bash
npm run build
```

This will:
1. Compile TypeScript
2. Build Next.js application
3. Generate optimized bundle
4. Run ESLint checks (with accessibility rules)

### Deploying to Vercel

This app is optimized for deployment to [Vercel](https://vercel.com).

**Configuration:**

1. Connect your Git repository to Vercel
2. Set Root Directory: `packages/web`
3. Build settings:
   - **Framework**: Next.js
   - **Build Command**: `npm install --workspace=@digicampus/web && npm --workspace=@digicampus/web run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
4. Environment Variables: Add the same variables from `.env.local`
5. Deploy

**Automatic deployments:**
- Every push to `main` deploys to production
- Pull requests create preview deployments
- Other branches can create preview deployments

## Design System

### Design Tokens

Tokens are defined in `src/app/globals.css` as CSS custom properties (HSL format):

```css
--dc-primary: 176 100% 24%;
--dc-surface-98: 200 25% 98%;
/* etc. */
```

Usage in components:
```tsx
// With transparency
style={{ backgroundColor: 'hsl(var(--dc-primary) / 0.95)' }}

// Without transparency
className="bg-dc-surface-98"
```

### Helpful CSS Classes

Predefined utilities in `globals.css`:
- `bg-dc-surface-98` — Default background
- `border-dc` — Standard border styling
- `ring-dc-focus` — Focus ring style
- `divider-dc` — Divider styling
- `text-fluid-*` — Responsive typography

### Dark Mode

Dark mode is toggled by adding `.dark` class to `<body>`:

```tsx
// In Header.tsx
document.documentElement.classList.toggle('dark')
localStorage.setItem('dc_dark', isDark ? 'true' : 'false')
```

The preference is persisted to `localStorage` key `dc_dark`.

## Internationalization (i18n)

The app supports multiple languages using the App Router route groups:

```
/en/                 # English pages
/nl/                 # Dutch pages
/                    # Default language
```

**Key files:**
- `src/lib/i18n.ts` — i18n configuration
- `src/lib/language.tsx` — Language context provider
- `src/lib/translations.ts` — Translation utilities
- `src/app/[lang]/` — Localized routes

**Usage in components:**
```tsx
import { useLanguage } from '@/lib/language'

export function MyComponent() {
  const { lang, t } = useLanguage()
  return <div>{t('common.hello')}</div>
}
```

## Accessibility

The project includes comprehensive accessibility support:

- **ESLint Plugin**: `eslint-plugin-jsx-a11y` enforces best practices
- **ARIA Attributes**: Used throughout components
- **Focus Management**: Focus rings use `--dc-focus` token
- **Keyboard Navigation**: All interactive elements keyboard accessible
- **Color Contrast**: Tokens ensure minimum contrast ratios
- **Testing**: pa11y-ci for automated accessibility testing

**Key patterns:**
```tsx
// Skip link for keyboard users
<a href="#main-content" className="skip-link">Skip to content</a>

// Semantic heading hierarchy
<h1>Page Title</h1>

// Proper button semantics
<button aria-label="Close dialog" onClick={handleClose}>×</button>

// Image alt text
<img src="..." alt="Descriptive text" />
```

## Components & Patterns

### Section Components

The app uses a modular section system for page building. Sections are rendered by `RenderSection.tsx`:

```tsx
<RenderSection section={sectionData} />
```

Each section type (Hero, Features, CTA, etc.) is in `src/components/sections/`.

### UI Primitives

Hybrid design system primitives in `src/components/ui/HybridComponents.tsx`:
- `section` — Main container
- `card` — Card component
- `button` — Button variants
- `badge` — Badge component

### Using Feather Icons

Icons are defined in `src/components/icons/FeatherIcons.tsx`:

```tsx
import { FeatherIcon } from '@/components/icons/FeatherIcons'

export function MyComponent() {
  return <FeatherIcon name="chevron-right" />
}
```

## Performance

### Image Optimization
- Uses Next.js `<Image>` component for automatic optimization
- Sanity images are served via `cdn.sanity.io` with `next/image` integration
- Remote image patterns configured in `next.config.ts`

### Code Splitting
- Automatic code splitting with App Router
- Dynamic imports for heavy components
- Turbopack for faster dev builds

### Revalidation
- ISR (Incremental Static Revalidation) for dynamic pages
- Cache control headers for optimal CDN usage

## Debugging

### Development Tools
- React DevTools
- TypeScript error checking
- ESLint real-time feedback
- Sanity Visual Editing integration

### Common Issues

**Port 3000 in use:**
```bash
npm run dev -- -p 3001
```

**TypeScript errors:**
```bash
npx tsc --noEmit
```

**Build failures:**
```bash
npm run lint    # Check linting errors
npm run build   # Check build errors
```

## Related Documentation

- [Design Tokens Guide](docs/DESIGN_TOKENS.md)
- [Accessibility Checklist](docs/A11Y_CHECKLIST.md)
- [Component Development Guide](docs/COMPONENTS.md)
- [Internationalization Setup](TRANSLATION_SETUP.md)

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Sanity React Loader](https://www.sanity.io/docs/react-loader)
- [Sanity Visual Editing](https://www.sanity.io/docs/live-content)

## Contributing

1. Create a feature branch from `main`
2. Make your changes (keep components in `src/components/`)
3. Run validation: `npm run validate`
4. Submit a pull request

## License

See LICENSE file for details.
