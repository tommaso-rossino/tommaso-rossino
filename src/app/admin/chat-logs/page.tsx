import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ADMIN_COOKIE, isAdminEnabled, matchesAdminToken } from "@/lib/admin-auth";
import {
  isChatLogEnabled,
  listConversations,
  type ChatConversation,
} from "@/lib/chat-log";
import { SummarizeButton } from "./SummarizeButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Chat logs",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function relativeTime(iso: string): string {
  const seconds = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
  if (!Number.isFinite(seconds)) return "";
  if (seconds < 60) return "just now";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} d ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function deviceSummary(ua?: string): string {
  if (!ua) return "Unknown device";
  if (/bot|crawler|spider|curl|wget|python|headless/i.test(ua)) return "Bot";

  const device = /iPad|Tablet/i.test(ua)
    ? "Tablet"
    : /Mobi|Android|iPhone|iPod/i.test(ua)
      ? "Mobile"
      : "Desktop";

  const browser = /Edg(e|A|iOS)?\//.test(ua)
    ? "Edge"
    : /OPR\/|Opera/.test(ua)
      ? "Opera"
      : /SamsungBrowser\//.test(ua)
        ? "Samsung Internet"
        : /Firefox\/|FxiOS\//.test(ua)
          ? "Firefox"
          : /Chrome\/|CriOS\//.test(ua)
            ? "Chrome"
            : /Safari\//.test(ua)
              ? "Safari"
              : "Unknown browser";

  return `${device} · ${browser}`;
}

function locationLabel({ city, region, country }: ChatConversation["visitor"]) {
  return [city, region, country].filter(Boolean).join(", ") || "Unknown location";
}

const STATUS_STYLES: Record<ChatConversation["status"], string> = {
  ok: "border-white/10 text-text-secondary",
  open: "border-white/10 text-text-muted",
  error: "border-accent/40 text-accent",
};

function LoginForm({ error }: { error: boolean }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form
        method="POST"
        action="/api/admin/login"
        className="flex w-full max-w-sm flex-col gap-3"
      >
        <h1 className="text-lg font-medium text-text">Chat logs</h1>
        <input
          type="password"
          name="token"
          required
          autoFocus
          autoComplete="current-password"
          placeholder="Admin token"
          className="rounded-lg border border-border bg-surface px-4 py-3 text-base text-text placeholder:text-text-muted focus:border-accent/60 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-accent px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-light"
        >
          Sign in
        </button>
        {error && <p className="text-sm text-accent-light">Wrong token.</p>}
      </form>
    </main>
  );
}

function ConversationCard({ conv }: { conv: ChatConversation }) {
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4 sm:p-6">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-base font-medium text-text">
          {locationLabel(conv.visitor)}
        </h2>
        <time
          dateTime={conv.updatedAt}
          title={new Date(conv.updatedAt).toUTCString()}
          className="text-xs text-text-muted"
        >
          {relativeTime(conv.updatedAt)}
        </time>
      </header>

      <div className="flex flex-wrap items-center gap-2 text-xs text-text-secondary">
        <span>{deviceSummary(conv.visitor.userAgent)}</span>
        <span aria-hidden>·</span>
        <span>
          {conv.messages.length} message{conv.messages.length === 1 ? "" : "s"}
        </span>
        {conv.visitor.language && (
          <>
            <span aria-hidden>·</span>
            <span>{conv.visitor.language.split(",")[0]}</span>
          </>
        )}
        <span
          className={`rounded-full border px-2 py-0.5 ${STATUS_STYLES[conv.status]}`}
        >
          {conv.status}
        </span>
      </div>

      {conv.visitor.referer && (
        <p className="truncate text-xs text-text-muted" title={conv.visitor.referer}>
          From {conv.visitor.referer}
        </p>
      )}

      <ol className="flex flex-col gap-3 border-l border-border pl-4">
        {conv.messages.map((m, i) => (
          <li
            key={i}
            className={`whitespace-pre-wrap break-words text-sm leading-relaxed ${
              m.role === "user" ? "text-accent" : "text-text-secondary"
            }`}
          >
            {m.content}
          </li>
        ))}
      </ol>

      <SummarizeButton id={conv.id} />
    </article>
  );
}

export default async function ChatLogsPage({ searchParams }: PageProps) {
  if (!isAdminEnabled()) notFound();

  const params = await searchParams;
  const queryToken = typeof params.token === "string" ? params.token : null;
  // A ?token= link is handed to the login route, which sets the cookie.
  if (queryToken) {
    redirect(`/api/admin/login?token=${encodeURIComponent(queryToken)}`);
  }

  const cookieStore = await cookies();
  if (!matchesAdminToken(cookieStore.get(ADMIN_COOKIE)?.value)) {
    return <LoginForm error={params.error === "1"} />;
  }

  let conversations: ChatConversation[] = [];
  let loadError = false;
  try {
    conversations = await listConversations(50);
  } catch (err) {
    console.error("[admin] Failed to load conversations:", err);
    loadError = true;
  }

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-10 sm:px-6 sm:py-16">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-medium text-text">Chat logs</h1>
        <p className="text-sm text-text-secondary">
          Last {conversations.length} conversation
          {conversations.length === 1 ? "" : "s"}, newest first.
        </p>
      </header>

      {!isChatLogEnabled() && (
        <p className="rounded-xl border border-border bg-surface p-4 text-sm text-text-secondary">
          Logging is off: no Upstash Redis credentials are configured.
        </p>
      )}
      {loadError && (
        <p className="rounded-xl border border-accent/40 bg-surface p-4 text-sm text-accent">
          Could not load conversations from storage.
        </p>
      )}
      {isChatLogEnabled() && !loadError && conversations.length === 0 && (
        <p className="text-sm text-text-muted">No conversations yet.</p>
      )}

      {conversations.map((conv) => (
        <ConversationCard key={conv.id} conv={conv} />
      ))}
    </main>
  );
}
