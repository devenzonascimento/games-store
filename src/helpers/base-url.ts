export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.NEXT_PUBLIC_BASE_URL
