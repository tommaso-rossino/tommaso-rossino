import { isAdmin, isAdminEnabled } from '@/lib/admin-auth'
import { getConversation } from '@/lib/chat-log'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const SYSTEM_PROMPT =
  'Summarize this website chat in at most two sentences: who the visitor seems to be, what they asked, and how interested they look. No preamble.'

const MAX_TRANSCRIPT_CHARS = 12_000
const MAX_TURN_CHARS = 1_000
const UPSTREAM_TIMEOUT_MS = 30_000

export async function POST(req: Request) {
  if (!isAdminEnabled()) return new Response('Not Found', { status: 404 })
  if (!isAdmin(req)) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  let id: unknown
  try {
    id = ((await req.json()) as { id?: unknown })?.id
  } catch {
    id = undefined
  }
  if (typeof id !== 'string' || !id) {
    return Response.json({ error: 'Missing conversation id' }, { status: 400 })
  }

  let conversation
  try {
    conversation = await getConversation(id)
  } catch {
    return Response.json({ error: 'Could not load the conversation' }, { status: 502 })
  }
  if (!conversation) {
    return Response.json({ error: 'Conversation not found' }, { status: 404 })
  }

  const apiUrl = process.env.HERMES_API_URL
  const apiKey = process.env.HERMES_API_KEY
  if (!apiUrl || !apiKey) {
    return Response.json({ error: 'Summary backend is not configured' }, { status: 503 })
  }

  const { city, region, country, language } = conversation.visitor
  const location = [city, region, country].filter(Boolean).join(', ')
  const header = [location && `Location: ${location}`, language && `Language: ${language}`]
    .filter(Boolean)
    .join('\n')
  const turns = conversation.messages
    .map((m) => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content.slice(0, MAX_TURN_CHARS)}`)
    .join('\n')
  const transcript = `${header ? `${header}\n\n` : ''}${turns}`.slice(0, MAX_TRANSCRIPT_CHARS)

  try {
    const upstream = await fetch(`${apiUrl.replace(/\/+$/, '')}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'hermes-agent',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: transcript }
        ],
        stream: false
      }),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      cache: 'no-store'
    })
    if (!upstream.ok) {
      console.error(`[summary] Hermes returned ${upstream.status}`)
      return Response.json({ error: 'Summary backend error' }, { status: 502 })
    }
    const data = (await upstream.json()) as { choices?: { message?: { content?: unknown } }[] }
    const summary = data?.choices?.[0]?.message?.content
    if (typeof summary !== 'string' || !summary.trim()) {
      return Response.json({ error: 'Empty summary' }, { status: 502 })
    }
    return Response.json({ summary: summary.trim() })
  } catch (err) {
    console.error('[summary] Hermes request failed:', err)
    return Response.json({ error: 'Summary backend unavailable' }, { status: 502 })
  }
}
