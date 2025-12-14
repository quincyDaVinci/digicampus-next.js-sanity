# Sanity Studio

This is the Sanity Studio for Digicampus CMS, deployed directly to Sanity's infrastructure.

## Overview

A self-hosted Sanity Studio application providing a headless CMS for Digicampus content management. This studio is separate from the web app and can be deployed independently.

## Features

- Content modeling with custom schema
- Modular page sections (Hero, Features, CTA, Blog, etc.)
- Multi-language support (Dutch/English)
- Document actions and custom workflows
- Visual editing integration with the web app
- Media management
- SEO optimization tools
- Automatic type generation

## Project Structure

```
packages/studio/
├── sanity.config.ts              # Studio configuration
├── sanity.cli.ts                 # CLI configuration
├── structure.ts                  # Studio structure & organization
├── env.ts                        # Environment configuration
├── schemaTypes/
│   ├── index.ts                  # Schema registry
│   ├── documents/                # Main content types
│   │   ├── page.ts              # Pages
│   │   ├── homePage.ts          # Homepage
│   │   ├── blogPost.ts          # Blog posts
│   │   ├── site.ts              # Site settings
│   │   ├── author.ts            # Authors
│   │   └── ...
│   ├── modules/                  # Reusable content blocks
│   │   ├── hero.ts
│   │   ├── features.ts
│   │   ├── cta.ts
│   │   └── ...
│   └── objects/                  # Object types (non-documents)
│       ├── metadata.ts
│       ├── link.ts
│       ├── cta.ts
│       └── ...
├── lib/
│   ├── client.ts                 # Sanity client configuration
│   ├── documentActions.ts        # Custom document actions
│   ├── featherIcons.ts          # Icon definitions
│   ├── image.ts                  # Image configuration
│   ├── token.ts                  # API token setup
│   ├── translation.ts            # Translation utilities
│   ├── live.ts                   # Live content configuration
│   ├── queries/
│   │   ├── site.ts
│   │   └── blog.ts
│   ├── actions/                  # Custom action implementations
│   │   ├── translateFromDutch.tsx
│   │   └── ...
├── components/                   # Custom Studio components
│   ├── ImageWithOverlayInput.tsx
│   ├── LibraryManager.tsx
│   ├── SeoGenerator.tsx
│   └── ...
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites
- Node.js >= 20.19.0
- npm >= 10
- Sanity account and project
- Sanity credentials

### Installation

```bash
# Install dependencies for this package
npm install --workspace=@digicampus/studio

# Or from the package directory
cd packages/studio
npm install
```

### Configuration

The Studio uses environment variables from your Sanity project:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_AUTH_TOKEN=your_token_here
```

These should be set in:
- `.env.local` for development
- Sanity dashboard for hosted Studio
- Environment variables in deployment platform

## Development

### Running the Studio Locally

```bash
# From root:
npm run studio:dev

# From packages/studio:
cd packages/studio
npm run dev
```

The Studio will be available at `http://localhost:3333`

### Accessing the Studio

**Locally (during development):**
```
http://localhost:3333
```

**Hosted by Sanity:**
Login via [Sanity Manage](https://sanity.io/manage)

**Embedded in web app:**
```
http://localhost:3000/geheimelocatie/[[...tool]]/
```

## Building & Deployment

### Building the Studio

```bash
npm run build
```

This compiles the Studio and prepares it for deployment.

### Deploying to Sanity

```bash
# From root:
npm run studio:deploy

# From packages/studio:
cd packages/studio
npm run deploy
```

This deploys the Studio to Sanity's hosted infrastructure.

**What gets deployed:**
- Schema definitions
- Custom components
- Desk structure
- Plugins and tools
- Configuration

**Note**: Your content (documents) stays in the dataset and is not affected by redeployment.

### Verifying Deployment

After deployment:
1. Go to [Sanity Manage](https://sanity.io/manage)
2. Select your project
3. Go to Settings → Studio
4. Confirm your Studio URL is updated
5. Open the Studio and verify changes

## Schema Management

### Understanding the Schema

The schema defines all content types and their fields:

- **Documents** (`documents/`): Main content types (Page, BlogPost, Author, etc.)
  - Can be created, edited, and published
  - Appear in the document list

- **Objects** (`objects/`): Nested data structures
  - Used within documents or other objects
  - Cannot stand alone

- **Modules** (`modules/`): Reusable content blocks
  - Used to build flexible pages
  - Each module represents a UI section

### Adding a New Content Type

**1. Create a schema file** in `schemaTypes/documents/`:

```typescript
// packages/studio/schemaTypes/documents/product.ts
import {defineType} from 'sanity'

export default defineType({
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
  ],
})
```

**2. Register in schema registry** (`schemaTypes/index.ts`):

```typescript
import product from './documents/product'

export const schema = {
  types: [
    // ... existing types
    product,
  ],
}
```

**3. Optionally add to desk structure** (`structure.ts`):

```typescript
S.documentTypeListItem('product')
  .title('Products')
```

**4. Generate types:**

```bash
npm run typegen
```

### Modifying Existing Types

**Safe changes:**
- Adding optional fields
- Changing field titles or descriptions
- Reordering fields

**Requires data migration:**
- Removing fields
- Changing field types
- Making required fields optional

## Sanity Queries (GROQ)

### Common Queries

**Fetch all blog posts:**
```groq
*[_type == "blogPost"] | order(publishedAt desc)
```

**Fetch a page by slug:**
```groq
*[_type == "page" && slug.current == $slug][0]
```

**Fetch with nested data:**
```groq
*[_type == "page"] {
  _id,
  title,
  sections[] {
    _type,
    _key,
    ...
  }
}
```

See `sanity/lib/queries/` for more examples.

## Document Actions

Custom actions available in the Studio:

- **Translate from Dutch** — Auto-translate documents to English
- **Apply Translation Preview** — Preview translated content
- **SEO Generation** — Generate SEO metadata

These are defined in `lib/actions/` and registered in `lib/documentActions.ts`.

## Multi-Language Support

The schema supports multiple languages:

- Documents have language variants
- Content can be translated
- Fallback language is Dutch

**Key files:**
- `lib/translation.ts` — Translation utilities
- `components/PageTranslationInput.tsx` — Translation UI
- Document schemas use language arrays

## Visual Editing

Visual editing allows live preview of content changes in the web app:

**Setup:**
- Web app uses `@sanity/visual-editing`
- Studio configured with preview URL
- Real-time updates in preview

**Preview URL:** (Configured in `sanity.config.ts`)
```
https://yourdomain.com/preview?preview=true&secret=...
```

## Plugins

Installed plugins:

- **@sanity/vision** — GROQ query sandbox
- **@sanity/language-filter** — Multi-language UI
- **@sanity/assist** — AI-powered content tools
- **sanity-plugin-media** — Enhanced media management

## Environment Variables

Required for development and deployment:

```
NEXT_PUBLIC_SANITY_PROJECT_ID      # Your Sanity project ID
NEXT_PUBLIC_SANITY_DATASET         # Dataset name (production)
NEXT_PUBLIC_SANITY_API_VERSION     # API version (YYYY-MM-DD)
NEXT_PUBLIC_VERCEL_URL             # For preview URLs
NEXT_PUBLIC_SITE_URL               # Your site URL
SANITY_AUTH_TOKEN                  # Personal access token (for deploys)
NEXT_PUBLIC_SANITY_STUDIO_HOST     # Studio hostname
```

## TypeScript Type Generation

Generate TypeScript types from your schema:

```bash
npm run typegen
```

This creates/updates type files used by the web app for type safety.

**Generated files:**
- `sanity.types.ts` — All schema types
- Used in `@/lib/sanityImage.ts` and data fetching

## API Tokens

For deployment and CI/CD:

1. Go to [Sanity Manage](https://sanity.io/manage)
2. Select your project
3. Settings → API → Tokens
4. Create a new token with:
   - Read access to production
   - Write access (for deployments)
5. Use as `SANITY_AUTH_TOKEN`

## Troubleshooting

### Studio won't start

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install --workspace=@digicampus/studio
npm run studio:dev
```

### TypeScript errors

```bash
npx tsc --noEmit
npm run typegen
```

### Deployment fails

- Verify `SANITY_AUTH_TOKEN` is set
- Check token has deploy permissions
- Ensure schema validates: `npm run build`

### Content not syncing with web app

- Check `NEXT_PUBLIC_SANITY_PROJECT_ID` matches
- Verify dataset name is correct
- Publish documents (they won't appear until published)
- Check Sanity API version compatibility

## Related Documentation

- [Schema Development](docs/SCHEMA_GUIDE.md)
- [GROQ Query Guide](docs/GROQ_GUIDE.md)
- [Sanity Visual Editing](docs/VISUAL_EDITING_SETUP.md)
- [Custom Actions](docs/CUSTOM_ACTIONS.md)

## Useful Links

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Studio Configuration](https://www.sanity.io/docs/studio)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity CLI Reference](https://www.sanity.io/docs/cli)
- [Sanity Manage](https://sanity.io/manage)

## Contributing

When modifying the Studio:

1. Update schema types as needed
2. Test in development: `npm run studio:dev`
3. Run `npm run typegen` to update types
4. Verify the web app still compiles
5. Deploy: `npm run studio:deploy`

## License

See LICENSE file for details.
