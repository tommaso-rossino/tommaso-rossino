import { NextResponse } from 'next/server'
import { ADMIN_COOKIE, adminCookieOptions, isAdminEnabled, matchesAdminToken } from '@/lib/admin-auth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const DASHBOARD_PATH = '/admin/chat-logs'

function respond(req: Request, token: string | null) {
  if (!isAdminEnabled()) return new Response('Not Found', { status: 404 })

  if (!matchesAdminToken(token)) {
    return NextResponse.redirect(new URL(`${DASHBOARD_PATH}?error=1`, req.url), 303)
  }

  const res = NextResponse.redirect(new URL(DASHBOARD_PATH, req.url), 303)
  res.cookies.set(ADMIN_COOKIE, token as string, adminCookieOptions)
  return res
}

// Login form submission.
export async function POST(req: Request) {
  let token: string | null = null
  try {
    const value = (await req.formData()).get('token')
    token = typeof value === 'string' ? value.trim() : null
  } catch {
    token = null
  }
  return respond(req, token)
}

// `/admin/chat-logs?token=...` forwards here so the cookie can be set and the
// token dropped from the address bar.
export async function GET(req: Request) {
  return respond(req, new URL(req.url).searchParams.get('token'))
}
