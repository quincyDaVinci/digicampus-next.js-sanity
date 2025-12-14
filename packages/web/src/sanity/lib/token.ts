import 'server-only'

// This token is used for server-side preview/draft mode
// Get your token from https://sanity.io/manage
export const token = process.env.SANITY_API_READ_TOKEN || ''
