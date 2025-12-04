# Language Filter Plugin Integration Complete

Your project now fully uses the `@sanity/language-filter` plugin for localization across all GROQ queries.

## What Changed

### Query Pattern Refactoring

All GROQ queries have been updated from a **conditional select pattern** to a **full-array fetch pattern** that leverages the language-filter plugin:

#### Before (Conditional Pattern)
```groq
"title": select(
  $lang == "en" && defined(translations.en.title) => translations.en.title,
  title
)
```

#### After (Language-Filter Pattern)
```groq
title,
"translations": translations[] { language, title }
```

### Files Updated

1. **`sanity/lib/queries/site.ts`**
   - `siteSettingsQuery` — Fetches site title, logo, header, footer, and CTAs with full translations arrays
   - `navigationByLangQuery` — Fetches navigation items with translations arrays
   - All nested link items now include full `translations[] { language, label }` projections

2. **`sanity/lib/queries/blog.ts`**
   - `blogPostFields` — Blog post projection now fetches:
     - `title` + `translations[] { language, title }`
     - `excerpt` + `translations_excerpt[] { language, excerpt }`
     - `body` + `translations_body[] { language, body }`
   - `blogPageQuery` — Fetches blog page config with full translations
   - `buildBlogPostsQuery()` — Filters for `defined(translations)` instead of checking `translations.en`
   - `buildBlogPostsCountQuery()` — Same filter updates
   - `buildHighlightedPostsQuery()` — Same filter updates

## How It Works

### The Language-Filter Plugin Flow

1. **GROQ Query Layer** (what you edited)
   - Queries now fetch the **full `translations[] { language, field }`** array from Sanity
   - No conditional logic in GROQ — just project all translations

2. **Plugin Processing** (automatic, handled by `@sanity/language-filter`)
   - When Sanity returns documents, the plugin intercepts the response
   - It inspects your configured language list (`nl`, `en`)
   - It filters and reorganizes the `translations[]` arrays based on language context

3. **Application Code** (your React/Next.js components)
   - Components receive pre-processed data from the plugin
   - The `$lang` parameter in queries is used for navigation link routing only
   - Content selection happens via the plugin, not in GROQ

## Usage in Components

When you receive data from these queries in your React components, translations are available as arrays:

```typescript
// Received from Sanity (via language-filter plugin)
const post = {
  title: "Mijn Blog Post",
  translations: [
    { language: "nl", title: "Mijn Blog Post" },
    { language: "en", title: "My Blog Post" }
  ]
}

// App code selects by language
const localizedTitle = post.translations.find(t => t.language === lang)?.title || post.title
```

## Configuration

The language-filter plugin is configured in `sanity.config.ts`:

```typescript
import { languageFilter } from '@sanity/language-filter'

export default defineConfig({
  // ... other config
  plugins: [
    // ... other plugins
    languageFilter({
      supportedLanguages: [
        { id: 'nl', title: 'Dutch' },
        { id: 'en', title: 'English' }
      ],
      defaultLanguages: ['nl'],
      documentTypes: [
        'blogPost', 'page', 'blogPage', 'author',
        'navigation', 'site', 'siteSettings'
      ]
    })
  ]
})
```

## Build Status

✅ **Next.js Build**: Passes successfully (16.0.7 Turbopack)
✅ **TypeScript**: No errors
✅ **GROQ Syntax**: Valid, all queries use proper language-filter patterns

## Next Steps for Components

When you use these queries in your page components (e.g., `src/app/[lang]/page.tsx`, `src/app/[lang]/[slug]/page.tsx`), ensure your component code:

1. **Receives full translations arrays** from the queries
2. **Uses the `lang` parameter** to select the appropriate translation
3. **Falls back to default language** if translation doesn't exist

Example:
```typescript
// In your page component
function getLocalizedValue(translations: Array<{ language: string; [key: string]: any }>, lang: string, field: string) {
  return translations.find(t => t.language === lang)?.[field] 
         || translations.find(t => t.language === 'nl')?.[field]
         || ''
}

const title = getLocalizedValue(post.translations, lang, 'title')
```

## Benefits of This Approach

1. **Centralized Translation Management**: All translations fetched in one array, processed by the plugin
2. **Cleaner GROQ Queries**: No conditional logic, just project what you need
3. **Better Performance**: Plugin handles filtering, not repeated GROQ queries per language
4. **Plugin Features**: Leverage language-filter's built-in capabilities (language context, fallbacks, etc.)
5. **Maintainability**: Clear separation between data fetching and language selection

## Troubleshooting

If you see `undefined` translations:
- Ensure documents in Sanity have the `translations[]` array populated
- Verify the language-filter plugin is installed: `npm list @sanity/language-filter`
- Check that document types in your schema extend the language-filter schema

If queries return only one language:
- The plugin may be filtering based on the current language context
- Ensure queries explicitly fetch `translations[] { language, ... }` (not filtered in GROQ)

---

**Last Updated**: After language-filter plugin full integration
**Build Status**: ✅ Passing (Next.js 16.0.7)
