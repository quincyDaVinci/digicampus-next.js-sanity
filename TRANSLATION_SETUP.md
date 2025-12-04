# Translation Service Setup

## Current Status

**Sanity AI Assist is NOT available for programmatic translations.**
- It requires the `@sanity/assist` plugin installed in Studio
- Only works on Growth plan or higher ($99/month+)
- Works within Studio UI but not via API for custom translation flows

**Current fallback (MyMemory) hit its daily limit** (100 requests/day).

## Recommended Solution: Google Translate API

**Best for production use:**
- Free tier: 500,000 characters/month
- Then $20 per million characters
- Fast and reliable
- No daily limits

### Setup Steps:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Cloud Translation API**
4. Create credentials → API Key
5. Add to `.env.local`:
   ```
   GOOGLE_TRANSLATE_API_KEY=your-api-key-here
   ```
6. Restart your dev server

**That's it!** Translations will now show: `"Vertaling via: Google Translate API"`

---

## Alternative: DeepL API (Best Quality)

**For premium translation quality:**
- Free tier: 500,000 characters/month
- Best accuracy (especially for European languages)
- Then €4.99 + €20 per million characters

### Setup:
1. Sign up at [DeepL API](https://www.deepl.com/pro-api)
2. Get API key from account settings
3. Add to `.env.local`:
   ```
   DEEPL_API_KEY=your-key-here
   ```

Translations will show: `"Vertaling via: DeepL API (Premium)"`

---

## Translation Provider Priority

The system tries providers in this order:

1. **Google Translate** (if `GOOGLE_TRANSLATE_API_KEY` set) ← Recommended
2. **DeepL** (if `DEEPL_API_KEY` set)
3. **Custom adapter** (if `TRANSLATION_API_URL` set)
4. **MyMemory** (if `TRANSLATION_FALLBACK=allow-dev`) - Dev only, 100/day limit
5. **Error** - Clear message instead of copying Dutch text

---

## Studio Notifications

When you click "Translate from Dutch", you'll see:

```
Vertaling via: Google Translate API

Voorbeeld vertalingen:
title: "Hallo wereld" → "Hello world"
excerpt: "Dit is een test" → "This is a test"

Bestaande Engelse vertaling overschrijven?
```

After saving:
```
✓ Vertaling voltooid en gepubliceerd
Vertaald via Google Translate API. Document gepubliceerd.
```

This way you always know which service translated your content!

---

## Why Not Sanity AI Assist?

From [Sanity's documentation](https://www.sanity.io/docs/ai-assist):
- AI Assist is a **Studio plugin** for Growth plan+
- Requires `@sanity/assist` npm package
- Works through Studio UI, not programmatic API
- Uses OpenAI under the hood
- Designed for manual workflows, not automated translation flows

For programmatic translations in custom actions, use Google Translate or DeepL.

---

## Cost Comparison

| Service | Free Tier | Overage Cost | Best For |
|---------|-----------|--------------|----------|
| Google Translate | 500K chars/mo | $20/million | General use, production |
| DeepL | 500K chars/mo | €20/million | Premium quality |
| MyMemory | 100 req/day | N/A | Development only |
| Sanity AI Assist | N/A | Included in Growth+ | Studio UI workflows |

**Recommendation:** Start with Google Translate API - generous free tier and production-ready.

## Editor/Dev test checklist
- Restart Studio after pulling changes to ensure the language filter plugin (if installed) loads correctly.
- Open a page/home/blog document and confirm the **Vertalingen** group is collapsed by default and only contains text fields plus module text overrides.
- Update a link label translation inside a link; verify navigation uses the localized label without duplicating menu-level translations.
- View the site in English and Dutch to confirm text falls back to the canonieke velden when no override exists.
- Run a quick WCAG AA spot-check: keyboard focus states on the language toggle, ARIA labels on translation hints, and sufficient contrast for badges.
