// Chat conversation log, stored in Upstash Redis through its REST API.
// Server-only. When no Redis credentials are configured every helper is a
// silent no-op, so the chat keeps working without storage.
//
// Layout:
//   chat:conversations  list of conversation ids, newest first (LPUSH)
//   chat:conv:<id>      hash, field `data` holds the conversation JSON

export type ChatVisitor = {
  country?: string
  region?: string
  city?: string
  userAgent?: string
  referer?: string
  language?: string
}

export type ChatConversation = {
  id: string
  startedAt: string
  updatedAt: string
  visitor: ChatVisitor
  messages: { role: 'user' | 'assistant'; content: string; at: string }[]
  status: 'open' | 'ok' | 'error'
}

const LIST_KEY = 'chat:conversations'
const convKey = (id: string) => `chat:conv:${id}`

const MAX_CONVERSATIONS = 500
const MAX_MESSAGES = 40
const MAX_MESSAGE_CHARS = 4000
const MAX_USER_AGENT_CHARS = 300
const MAX_REFERER_CHARS = 200
const MAX_LANGUAGE_CHARS = 100
const REDIS_TIMEOUT_MS = 3000

type RedisCredentials = { url: string; token: string }

function getCredentials(): RedisCredentials | null {
  const kvUrl = process.env.KV_REST_API_URL
  const kvToken = process.env.KV_REST_API_TOKEN
  if (kvUrl && kvToken) return { url: kvUrl, token: kvToken }

  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN
  if (upstashUrl && upstashToken) return { url: upstashUrl, token: upstashToken }

  return null
}

export function isChatLogEnabled(): boolean {
  return getCredentials() !== null
}

type RedisReply = { result?: unknown; error?: string }

async function redisRequest(creds: RedisCredentials, path: string, body: unknown): Promise<unknown> {
  const res = await fetch(`${creds.url.replace(/\/+$/, '')}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${creds.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(REDIS_TIMEOUT_MS),
    cache: 'no-store'
  })
  const data = (await res.json().catch(() => null)) as unknown
  if (!res.ok) {
    const error = (data as RedisReply | null)?.error
    throw new Error(`Redis request failed (${res.status})${error ? `: ${error}` : ''}`)
  }
  return data
}

async function redis(creds: RedisCredentials, command: (string | number)[]): Promise<unknown> {
  const data = (await redisRequest(creds, '', command.map(String))) as RedisReply
  if (data?.error) throw new Error(`Redis error: ${data.error}`)
  return data?.result
}

// Runs several commands in one round trip via the Upstash /pipeline endpoint.
async function redisPipeline(creds: RedisCredentials, commands: (string | number)[][]): Promise<RedisReply[]> {
  if (commands.length === 0) return []
  const data = await redisRequest(
    creds,
    '/pipeline',
    commands.map((c) => c.map(String))
  )
  return Array.isArray(data) ? (data as RedisReply[]) : []
}

const truncate = (value: string, max: number) => (value.length > max ? value.slice(0, max) : value)

// Vercel sends geo headers percent-encoded (e.g. "S%C3%A3o%20Paulo").
function decodeHeader(value: string | null): string | undefined {
  const trimmed = value?.trim()
  if (!trimmed) return undefined
  try {
    return decodeURIComponent(trimmed)
  } catch {
    return trimmed
  }
}

type RawVisitorHeaders = { [K in keyof ChatVisitor]-?: string | null }

// Cleans raw header values into visitor metadata: decodes geo, trims, caps
// lengths. The client IP is intentionally not part of this shape.
export function sanitizeVisitor(raw: RawVisitorHeaders): ChatVisitor {
  const visitor: ChatVisitor = {}
  const country = decodeHeader(raw.country)
  const region = decodeHeader(raw.region)
  const city = decodeHeader(raw.city)
  const userAgent = raw.userAgent?.trim()
  const referer = raw.referer?.trim()
  const language = raw.language?.trim()

  if (country) visitor.country = country
  if (region) visitor.region = region
  if (city) visitor.city = city
  if (userAgent) visitor.userAgent = truncate(userAgent, MAX_USER_AGENT_CHARS)
  if (referer) visitor.referer = truncate(referer, MAX_REFERER_CHARS)
  if (language) visitor.language = truncate(language, MAX_LANGUAGE_CHARS)
  return visitor
}

function applyCaps(conv: ChatConversation): ChatConversation {
  return {
    ...conv,
    messages: conv.messages.slice(-MAX_MESSAGES).map((m) => ({
      ...m,
      content: truncate(m.content, MAX_MESSAGE_CHARS)
    }))
  }
}

function parseConversation(raw: unknown): ChatConversation | null {
  if (typeof raw !== 'string') return null
  try {
    return JSON.parse(raw) as ChatConversation
  } catch {
    return null
  }
}

export async function saveConversation(conv: ChatConversation): Promise<void> {
  const creds = getCredentials()
  if (!creds) return

  const json = JSON.stringify(applyCaps(conv))
  // HSET returns the number of new fields: 1 on first save, 0 on updates.
  const added = await redis(creds, ['HSET', convKey(conv.id), 'data', json])
  if (Number(added) !== 1) return

  const length = Number(await redis(creds, ['LPUSH', LIST_KEY, conv.id]))
  if (length <= MAX_CONVERSATIONS) return

  // Drop the hashes of the conversations about to fall off the list.
  const stale = await redis(creds, ['LRANGE', LIST_KEY, MAX_CONVERSATIONS, -1])
  if (Array.isArray(stale) && stale.length > 0) {
    await redis(creds, ['DEL', ...stale.map((id) => convKey(String(id)))])
  }
  await redis(creds, ['LTRIM', LIST_KEY, 0, MAX_CONVERSATIONS - 1])
}

export async function getConversation(id: string): Promise<ChatConversation | null> {
  const creds = getCredentials()
  if (!creds) return null
  return parseConversation(await redis(creds, ['HGET', convKey(id), 'data']))
}

export async function listConversations(limit = 50): Promise<ChatConversation[]> {
  const creds = getCredentials()
  if (!creds) return []

  const ids = await redis(creds, ['LRANGE', LIST_KEY, 0, Math.max(0, limit - 1)])
  if (!Array.isArray(ids) || ids.length === 0) return []

  const replies = await redisPipeline(
    creds,
    ids.map((id) => ['HGET', convKey(String(id)), 'data'])
  )
  return replies
    .map((reply) => parseConversation(reply?.result))
    .filter((conv): conv is ChatConversation => conv !== null)
}

export async function deleteConversation(id: string): Promise<void> {
  const creds = getCredentials()
  if (!creds) return
  await redisPipeline(creds, [
    ['DEL', convKey(id)],
    ['LREM', LIST_KEY, 0, id]
  ])
}
