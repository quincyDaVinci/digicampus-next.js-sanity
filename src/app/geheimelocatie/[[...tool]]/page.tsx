'use client'

/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your geheimelocatie path is handled by this file using Next.js' catch-all routes.
 */
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function GeheimelocatiePage() {
  return <NextStudio config={config} />
}
