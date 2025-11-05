# Sanity Studio Migration Guide: SanityPress + Sane-Kit Integration

## Overview
This migration combines the best of both templates:
- **SanityPress Studio**: Professional admin dashboard with TypeGen, global modules, proper structure
- **Sane-Kit Components**: Rich frontend section components with multiple variants

## What's Been Done

### ✅ Completed
1. **Object Schemas Created** (`sanity/schemaTypes/objects/`)
   - `metadata.ts` - SEO and page metadata
   - `link.ts` - Internal/external links
   - `linkList.ts` - Dropdown menus
   - `cta.ts` - Call-to-action buttons
   - `moduleAttributes.ts` - Section IDs and visibility

2. **Module Schemas Started** (`sanity/schemaTypes/modules/`)
   - `heroSection.ts` - Hero with 3 variants (buttonBanner, badgeBanner, gridGallery)
   - `featureSection.ts` - Features with 9 variants

3. **Schema Index** (`sanity/schemaTypes/index.ts`)
   - Main export file organizing all schemas

## What Still Needs to Be Created

### Document Schemas (`sanity/schemaTypes/documents/`)

You need to create these document types:

#### 1. `site.ts` - Global Site Settings
```typescript
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'site',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {name: 'branding', title: 'Branding', default: true},
    {name: 'navigation', title: 'Navigation'},
    {name: 'info', title: 'Site Info'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      group: 'branding',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: {hotspot: true},
      group: 'branding',
    }),
    defineField({
      name: 'header',
      title: 'Header Navigation',
      type: 'reference',
      to: [{type: 'navigation'}],
      group: 'navigation',
    }),
    defineField({
      name: 'ctas',
      title: 'Header CTAs',
      type: 'array',
      of: [{type: 'cta'}],
      group: 'navigation',
    }),
    defineField({
      name: 'footer',
      title: 'Footer Navigation',
      type: 'reference',
      to: [{type: 'navigation'}],
      group: 'navigation',
    }),
    defineField({
      name: 'footerContent',
      title: 'Footer Content',
      type: 'array',
      of: [{type: 'block'}],
      group: 'info',
    }),
  ],
  preview: {
    prepare: () => ({
      title: 'Site Settings',
    }),
  },
})
```

#### 2. `page.ts` - Regular Pages
```typescript
import {defineField, defineType} from 'sanity'
import {FileTextIcon} from '../../lib/featherIcons'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: FileTextIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'metadata', title: 'SEO & Metadata'},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'modules',
      title: 'Page Sections',
      type: 'array',
      of: [
        {type: 'heroSection'},
        {type: 'featureSection'},
        {type: 'blogSection'},
        {type: 'statsSection'},
        {type: 'testimonialsSection'},
        {type: 'pricingSection'},
        {type: 'casesSection'},
        {type: 'ctaSection'},
        {type: 'faqSection'},
        {type: 'contactSection'},
        {type: 'newsletterSection'},
        {type: 'compareFeaturesSection'},
      ],
      group: 'content',
    }),
    defineField({
      name: 'metadata',
      type: 'metadata',
      group: 'metadata',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'metadata.slug.current',
    },
    prepare: ({title, slug}) => ({
      title,
      subtitle: `/${slug || ''}`,
    }),
  },
})
```

#### 3. `homePage.ts` - Homepage Singleton
Similar to page.ts but as a singleton (only one instance)

#### 4. `globalModule.ts` - Reusable Content Blocks
```typescript
import {defineField, defineType} from 'sanity'
import {LayersIcon} from '../../lib/featherIcons'

export default defineType({
  name: 'global-module',
  title: 'Global Module',
  type: 'document',
  icon: LayersIcon,
  description: 'Reusable content blocks that appear across multiple pages',
  fields: [
    defineField({
      name: 'path',
      title: 'Target Path',
      type: 'string',
      description: 'Use "*" for all pages, or specific path like "blog/"',
      placeholder: 'e.g. *, blog/, contact',
    }),
    defineField({
      name: 'before',
      title: 'Before Content',
      type: 'array',
      of: [/* same modules as page */],
      description: 'Modules added before page content',
    }),
    defineField({
      name: 'after',
      title: 'After Content',
      type: 'array',
      of: [/* same modules as page */],
      description: 'Modules added after page content',
    }),
  ],
})
```

#### 5. `navigation.ts` - Navigation Menus
```typescript
import {defineField, defineType} from 'sanity'
import {LayersIcon} from '../../lib/featherIcons'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: LayersIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{type: 'link'}, {type: 'link.list'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      count: 'items.length',
    },
    prepare: ({title, count}) => ({
      title,
      subtitle: `${count || 0} items`,
    }),
  },
})
```

#### 6. Keep your existing: `blogPost.ts`, `author.ts`, `tag.ts`, `category.ts`

### Remaining Module Schemas

Create these following the same pattern as heroSection.ts and featureSection.ts:

1. **blogSection.ts** - Blog post listing
2. **statsSection.ts** - Statistics display with 2 variants (grid, withContent)
3. **testimonialsSection.ts** - Testimonials with 3 variants (carousel, grid, masonry)
4. **pricingSection.ts** - Pricing plans
5. **casesSection.ts** - Case studies/logos with 2 variants (logoCarousel, compactSlider)
6. **ctaSection.ts** - Call-to-action with 4 variants (default, highlight, minimal, full)
7. **faqSection.ts** - FAQ with 2 variants (sideBySide, centered)
8. **contactSection.ts** - Contact form
9. **newsletterSection.ts** - Newsletter signup with 4 variants
10. **compareFeaturesSection.ts** - Feature comparison table
11. **compareFeature.ts** - Individual feature for comparison

## Frontend Components

The frontend components from sane-kit should be copied to:
`src/components/sections/`

Structure:
```
src/components/sections/
  hero/
    index.tsx (router)
    buttonBanner.tsx
    badgeBanner.tsx
    gridGallery.tsx
    shared.tsx
  feature/
    index.tsx
    default.tsx
    withImage.tsx
    leftImage.tsx
    ... (all 9 variants)
    shared.tsx
  blog/
    index.tsx
    default.tsx
    grid.tsx
    shared.tsx
  ... (repeat for all sections)
  RenderSection.tsx (main router)
```

## Configuration Changes

### 1. Update `sanity.config.ts`

Add these plugins:
```typescript
import {codeInput} from '@sanity/code-input'
import {dashboardTool, projectInfoWidget, projectUsersWidget} from '@sanity/dashboard'

plugins: [
  structureTool({structure}),
  presentationTool({...}),
  dashboardTool({
    widgets: [projectInfoWidget(), projectUsersWidget()],
  }),
  visionTool({defaultApiVersion: apiVersion}),
  codeInput(),
],
```

### 2. Update `package.json`

Add dependencies:
```json
{
  "dependencies": {
    "@sanity/code-input": "^4.1.4",
    "@sanity/dashboard": "^4.0.1"
  },
  "scripts": {
    "typegen": "sanity typegen generate"
  }
}
```

### 3. Create `sanity.cli.ts` for TypeGen

```typescript
import {defineCliConfig} from 'sanity/cli'
import {apiVersion, dataset, projectId} from './sanity/env'

export default defineCliConfig({
  api: {projectId, dataset, apiVersion},
})
```

### 4. Update `sanity/structure.ts`

```typescript
import {structureTool} from 'sanity/structure'
import type {StructureResolver} from 'sanity/structure'

// Helper for singleton documents
const singleton = (S: any, type: string) =>
  S.listItem()
    .title(type.replace(/([A-Z])/g, ' $1').trim())
    .id(type)
    .child(S.document().schemaType(type).documentId(type))

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.divider().title('Global'),
      singleton(S, 'site'),
      S.documentTypeListItem('global-module').title('Global Modules'),
      
      S.divider().title('Pages'),
      singleton(S, 'homePage'),
      S.documentTypeListItem('page').title('Pages'),
      
      S.divider().title('Blog'),
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('tag').title('Tags'),
      
      S.divider().title('Navigation'),
      S.documentTypeListItem('navigation'),
      
      S.divider().title('Team'),
      S.documentTypeListItem('author').title('Team Members'),
    ])
```

## Migration Steps

1. ✅ Create all object schemas (DONE)
2. ⏳ Create all document schemas (IN PROGRESS - follow templates above)
3. ⏳ Create remaining module schemas (follow hero/feature pattern)
4. ⏳ Copy sane-kit components to src/components/sections/
5. ⏳ Update sanity.config.ts with new plugins
6. ⏳ Update structure.ts
7. ⏳ Run `npm install` for new packages
8. ⏳ Run `npm run typegen` to generate types
9. ⏳ Test in Studio

## Key Patterns

### Module Schema Pattern
All section schemas follow this structure:
- Groups: content, appearance, (optional: media, features, etc.)
- Variant field for layout options
- Content fields (heading, subheading, etc.)
- Array fields for repeatable items
- attributes field (module-attributes)
- Good preview

### Frontend Component Pattern
Each section has:
- index.tsx - Router that picks variant
- variant components (e.g., default.tsx, grid.tsx)
- shared.tsx - Reusable parts (headers, items)

## Next Steps

1. Create the remaining document schemas using the templates above
2. Create the remaining module schemas (copy from the sane-kit repo schemas)
3. Copy the frontend components from sane-kit
4. Update your page rendering to use the new RenderSection component
5. Test everything in the Studio

Would you like me to continue with any specific schema or component?
