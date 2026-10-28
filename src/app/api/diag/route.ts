export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Temporary env diagnostic. Reports presence, lengths, and identifiers only —
// never the value of HERMES_API_KEY or the full HERMES_API_URL.
export async function GET() {
  const url = process.env.HERMES_API_URL
  const key = process.env.HERMES_API_KEY

  let urlHost: string | null = null
  try {
    urlHost = new URL(url ?? '').host
  } catch {
    urlHost = null
  }

  const body = {
    vercelEnv: process.env.VERCEL_ENV ?? null,
    projectId: process.env.VERCEL_PROJECT_ID ?? null,
    hermesKeys: Object.keys(process.env)
      .filter((k) => k.toUpperCase().includes('HERMES'))
      .sort(),
    hasHermesUrl: Boolean(url),
    hasHermesKey: Boolean(key),
    urlLength: url?.length ?? 0,
    urlHost,
    keyLength: key?.length ?? 0,
    commit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
  }

  return Response.json(body, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
