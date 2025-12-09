export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-10-11'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

// Base path where the Studio is mounted. Defaults to the in-app route,
// but can be overridden (e.g. when using Sanity-managed Studio hosting).
export const studioBasePath =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_BASEPATH || '/geheimelocatie'

// Fully-qualified Studio URL for stega/preview links. When the Studio is
// hosted by Sanity, set NEXT_PUBLIC_SANITY_STUDIO_URL to the hosted domain.
// Falls back to the in-app route so local development keeps working.
export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || studioBasePath

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
