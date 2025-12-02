'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\src\app\geheimelocatie\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {presentationTool, defineLocations} from 'sanity/presentation'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'
import {customDocumentActions} from './sanity/lib/documentActions'

// Determine the preview URL based on environment
const getPreviewUrl = () => {
  // In production (Vercel), use VERCEL_URL or custom domain
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }
  // Check for custom domain
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  // Fallback to localhost for development
  return 'http://localhost:3000'
}

export default defineConfig({
  basePath: '/geheimelocatie',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  document: {
    actions: customDocumentActions,
  },
  // Try to load a couple of optional plugins dynamically. This keeps the
  // Studio runnable even when the packages are not installed locally. If
  // you want to enable them, install the packages listed in the comments
  // below and restart the Studio.
  plugins: ((): any[] => {
    // Dynamic requires are wrapped in try/catch so the Studio doesn't fail
    // to start when the packages are absent.
    let optional: any[] = []
    try {
      // Community media plugin — install with `npm install --save-dev sanity-plugin-media`
      // or `pnpm add -D sanity-plugin-media`
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      // @ts-ignore
      const mediaMod = require('sanity-plugin-media')
      const mediaFn = mediaMod?.media
      if (typeof mediaFn === 'function') {
        optional.push(mediaFn())
      }
    } catch (err) {
      // not installed — no-op
    }
    try {
      // Sanity AI Assist — official package: `@sanity/ai`
      // install with `npm install --save-dev @sanity/ai`
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      // @ts-ignore
      const aiPlugin = require('@sanity/ai')
      if (aiPlugin) optional.push(aiPlugin)
    } catch (err) {
      try {
        // Fallback community package name
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        // @ts-ignore
        const aiPlugin2 = require('sanity-plugin-ai-assist')
        if (aiPlugin2) optional.push(aiPlugin2)
      } catch (err2) {
        // not installed — no-op
      }
    }
    return [
      structureTool({structure}),
      presentationTool({
        previewUrl: {
          origin: getPreviewUrl(),
          previewMode: {
            enable: '/api/draft',
          },
        },
        resolve: {
          locations: {
            page: defineLocations({
              select: {
                title: 'title',
                slug: 'slug.current',
              },
              resolve: (doc) => ({
                locations: [
                  {
                    title: doc?.title || 'Naamloos',
                    href: `/${doc?.slug}`,
                  },
                ],
              }),
            }),
            post: defineLocations({
              select: {
                title: 'title',
                slug: 'slug.current',
              },
              resolve: (doc) => ({
                locations: [
                  {
                    title: doc?.title || 'Naamloos',
                    href: `/blog/${doc?.slug}`,
                  },
                ],
              }),
            }),
            homePage: defineLocations({
              select: {
                title: 'title',
              },
              resolve: (doc) => ({
                locations: [
                  {
                    title: 'Startpagina',
                    href: '/',
                  },
                ],
              }),
            }),
          },
        },
      }),
      // Vision is for querying with GROQ from inside the Studio
      // https://www.sanity.io/docs/the-vision-plugin
      visionTool({defaultApiVersion: apiVersion}),
      ...optional,
    ]
  })(),
  
})
