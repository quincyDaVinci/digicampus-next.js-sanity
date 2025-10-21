# Visual Editing Setup

Your Sanity Studio now has live preview/visual editing enabled! 🎉

## How to Use

### 1. Get a Sanity API Token
1. Go to https://sanity.io/manage
2. Select your project
3. Navigate to **API** → **Tokens**
4. Create a new token with **Viewer** permissions
5. Copy the token

### 2. Add Token to Environment
Add this line to your `.env.local` file:

```
SANITY_API_READ_TOKEN=your_token_here
```

### 3. Start Visual Editing

**Option A: From Sanity Studio**
1. Open Sanity Studio: http://localhost:3000/geheimelocatie
2. Navigate to any page document
3. The page will open with live preview - changes appear instantly!

**Option B: Manual Preview Mode**
1. Visit any page, e.g., http://localhost:3000/text-met-plaatje
2. Enable draft mode by visiting: http://localhost:3000/api/draft?slug=text-met-plaatje
3. You'll be redirected to the page in preview mode with live updates
4. To exit preview mode, visit: http://localhost:3000/api/disable-draft

## What You Get

✅ **Live Updates**: Changes in Sanity Studio appear instantly on your preview
✅ **Click-to-Edit**: Click any content element to jump to it in the Studio (when visual-editing overlay is active)
✅ **Draft Content**: Preview unpublished changes before they go live

## Files Created

- `/src/app/api/draft/route.ts` - Enables draft/preview mode
- `/src/app/api/disable-draft/route.ts` - Exits preview mode  
- `/src/components/VisualEditing.tsx` - Client component that enables live updates
- `/src/app/[slug]/PagePreview.tsx` - Live-updating page wrapper
- `/sanity/lib/token.ts` - Server-only token for authenticated queries

## Next Steps

Consider adding a "Preview" button to your page schemas in Sanity Studio to make it easier to jump into preview mode directly from the Studio interface.
