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

export default defineConfig({
  basePath: '/geheimelocatie',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  document: {
    actions: customDocumentActions,
  },
  plugins: [
    structureTool({structure}),
    presentationTool({
      previewUrl: {
        origin: 'http://localhost:3000',
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
  ],
})
