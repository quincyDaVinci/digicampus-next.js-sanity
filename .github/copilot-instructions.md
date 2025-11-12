Project snapshot and quick-start

- This is a Next.js (v15) + Sanity project using TypeScript, Tailwind v4 and styled-components.
- Repo root scripts you can run (use PowerShell on Windows):
  - dev: `npm run dev` (runs `next dev --turbopack`)
  - build: `npm run build` (production build)
  - start: `npm run start` (start built app)
  - lint: `npm run lint` (ESLint)

High-level architecture (why/how)

- Frontend: `src/app/` holds the Next.js App Router pages and layout. Key files:
  - `src/app/layout.tsx`, `src/app/page.tsx` — app shell and landing page (now uses modular sections from Sanity).
  - `src/app/[slug]/page.tsx` — dynamic pages using the new modular section system.
  - `src/app/globals.css` — global CSS and the design tokens (see "Design tokens" below).
  - `src/components/` — reusable UI; `Header.tsx` is a good example of site conventions (client component, dark toggle, responsive menu).
- `src/components/sections/` — Modular section components (Hero, Features, CTA, FAQ, etc.) that render content from Sanity.
  - `RenderSection.tsx` — Main router that handles all section types.
  - Individual section files (HeroSection.tsx, FeatureSection.tsx, etc.) — Each handles its own variants.
- `src/components/ui/HybridComponents.tsx` exposes the hybrid design system primitives (section, card, button, badge) that blend DaisyUI visuals with NL Design System semantics. Prefer these over ad-hoc markup for new UI.
- `src/components/pageBuilder/` — Legacy page builder components (still functional for backward compatibility).
- CMS: `sanity/` contains Sanity Studio config and schemas used by the site:
  - `sanity/schemaTypes/documents/` — Main content types (page, site, homePage, blogPost, author, etc.)
  - `sanity/schemaTypes/objects/` — Reusable field groups (metadata, link, cta, moduleAttributes)
  - `sanity/schemaTypes/modules/` — Page building blocks / sections (hero, feature, blog, stats, etc.)
  - `sanity/lib/client.ts` and `sanity.config.ts` are integration points.
- API: Minimal Next API routes live under `src/app/api/` (e.g. `src/app/api/env/route.ts`).
- Public assets: `public/assets/images/` (logo SVGs, etc.).

Project-specific conventions to follow

- Design tokens are defined as HSL triples in `src/app/globals.css` so components can use alpha values:
  - Use `hsl(var(--dc-<name>) / <alpha>)` for inline styles and element style props.
  - Example: `style={{ backgroundColor: 'hsl(var(--dc-primary))' }}` or `backgroundColor: 'hsl(var(--dc-primary) / 0.95)'`.
- Helpful CSS helper classes were added in `src/app/globals.css` (search for `bg-dc-surface-98`, `border-dc`, `ring-dc-focus`, `divider-dc`). Use those in markup to keep styles consistent.
- Dark mode: toggled by adding `.dark` class to `<body>`. The app persists the preference to `localStorage` key `dc_dark` (see `src/components/Header.tsx`). Keep that behavior when editing dark-mode logic.
- Accessibility patterns visible in the codebase:
  - Skip link `.skip-link` is present in `globals.css`.
  - Focus rings use token `--dc-focus`. Prefer visible focus state and `aria-*` attributes already used in `Header.tsx`.
- Feather icons live in `src/components/icons/FeatherIcons.tsx`. Import icons from this module (or from `sanity/lib/featherIcons` inside Studio schemas) instead of other icon libraries.
- Component types:
  - Many components are client components (look for the `"use client"` pragma at top). If you convert to server components, be mindful of hooks and browser APIs used.

Common patterns & examples

- Menu definition: `src/components/Header.tsx` uses a static `MENUS` constant to render navigation — follow this pattern for small navigations.
- Mobile menu: leverages `<details>`/`<summary>` for accordions; preserves keyboard accessibility.
- Fluid typography utilities: `text-fluid-*` classes in `globals.css` are used across components — prefer these for responsive font sizing.
- Tooling: Tailwind and arbitrary utility classes are used. Be careful when replacing `bg-[--color-brand]` style utilities — the project now also provides a `--color-brand` alias for backward compatibility.

Integration points and external dependencies

- Sanity: `@sanity/client`, `next-sanity` — check `sanity/lib/client.ts` and `sanity.config.ts` when modifying how content is fetched.
- Next.js: app router and server functions. Changing API routes or server components may require updating imports and rendering strategy.

Developer workflow notes

- Lint and build after UI or type changes: `npm run lint` and `npm run build`.
- Next.js dev server uses turbopack by default in the script: `next dev --turbopack`. If you experience dev-time problems, run `next dev` without turbopack.
- Running the Sanity Studio is configured separately (see `sanity.cli.ts`) — edits to schema types will require restarting the Studio.

Where to make token/color updates

- Add or update tokens in `src/app/globals.css`. Tokens are named `--dc-<name>` and kept as HSL triples (example: `--dc-primary: 176 100% 24%;`).
- Keep or add backward-compatible aliases (e.g. `--color-brand`) if consumers still use `bg-[--color-brand]` in Tailwind.

What the AI agent should do first when editing UI styles

1. Update tokens in `src/app/globals.css` if adding or adjusting colors.
2. Prefer helper classes (`bg-dc-surface-98`, `border-dc`, `ring-dc-focus`) or inline style with `hsl(var(--dc-...)/alpha)` in React components.
3. Run `npm run lint` and `npm run build` locally to catch TS/ESLint errors.

Files to read for more context

- `src/app/globals.css` — tokens, utilities, accessibility helpers
- `src/components/Header.tsx` — practical examples for dark-mode, responsive nav, and token usage
- `src/components/sections/RenderSection.tsx` — main section router, handles both new modular sections and legacy pageBuilder
- `src/components/sections/*Section.tsx` — individual section implementations
- `sanity/schemaTypes/index.ts` — registry of all Sanity schemas
- `sanity/schemaTypes/documents/` — document type schemas (page, site, homePage, etc.)
- `sanity/schemaTypes/modules/` — section/module schemas (hero, feature, blog, etc.)
- `sanity/structure.ts` — Sanity Studio organization and structure
- `sanity/` folder — CMS schemas and client setup
- `package.json` — scripts and dependencies
- `INTEGRATION_COMPLETE.md` — full documentation of the SanityPress + Sane-Kit integration
- `QUICK_START.md` — quick start guide for creating content

If you modify behavior that affects other parts of the app

- Update mapping aliases in `globals.css` to avoid breaking existing Tailwind arbitrary classes.
- If you change the dark-mode class name or persistence key, update `Header.tsx` and any code that reads `localStorage.dc_dark`.

Questions for the maintainer

- Do you want the project to prefer `next/image` for logo and images? ESLint currently warns about `<img>` usage in `Header.tsx`.
- Any preferred color token names beyond the `--dc-` set already present?

If anything above is unclear or incomplete, tell me which area to expand (tokens, Sanity integration, or developer scripts) and I will iterate.