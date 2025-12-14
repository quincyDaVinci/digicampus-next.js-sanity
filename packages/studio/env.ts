export const apiVersion =
  process.env.SANITY_STUDIO_API_VERSION || '2025-10-11'

export const dataset = assertValue(
  process.env.SANITY_STUDIO_DATASET,
  'Missing environment variable: SANITY_STUDIO_DATASET'
)

export const projectId = assertValue(
  process.env.SANITY_STUDIO_PROJECT_ID,
  'Missing environment variable: SANITY_STUDIO_PROJECT_ID'
)

// Base path where the Studio is mounted. Defaults to root for standalone studio
export const studioBasePath = '/'

// Studio URL for preview links
export const studioUrl =
  process.env.SANITY_STUDIO_URL || 'http://localhost:3333'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
