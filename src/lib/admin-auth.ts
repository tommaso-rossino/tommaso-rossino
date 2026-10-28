import { createHash, timingSafeEqual } from 'node:crypto'

// Owner-only admin area. Server-only. When ADMIN_TOKEN is unset the admin area
// must answer 404 so it stays invisible.

export const ADMIN_COOKIE = 'admin_token'
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export function getAdminToken(): string | null {
  return process.env.ADMIN_TOKEN || null
}

export function isAdminEnabled(): boolean {
  return getAdminToken() !== null
}

// Constant-time comparison; hashing first makes both buffers the same length.
export function matchesAdminToken(candidate: string | null | undefined): boolean {
  const expected = getAdminToken()
  if (!expected || !candidate) return false
  const a = createHash('sha256').update(candidate).digest()
  const b = createHash('sha256').update(expected).digest()
  return timingSafeEqual(a, b)
}

function readCookie(header: string | null, name: string): string | null {
  if (!header) return null
  for (const part of header.split(';')) {
    const eq = part.indexOf('=')
    if (eq === -1) continue
    if (part.slice(0, eq).trim() !== name) continue
    const value = part.slice(eq + 1).trim()
    try {
      return decodeURIComponent(value)
    } catch {
      return value
    }
  }
  return null
}

// True when the `admin_token` cookie or the `token` query param matches
// ADMIN_TOKEN. Pages cannot set cookies, so the dashboard hands a valid query
// token to /api/admin/login, which sets the cookie.
export function isAdmin(request: Request): boolean {
  if (!isAdminEnabled()) return false
  if (matchesAdminToken(readCookie(request.headers.get('cookie'), ADMIN_COOKIE))) return true
  try {
    return matchesAdminToken(new URL(request.url).searchParams.get('token'))
  } catch {
    return false
  }
}

export const adminCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: true,
  path: '/',
  maxAge: ADMIN_COOKIE_MAX_AGE
}
