"use client";

import { useState } from "react";

export function SummarizeButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const summarize = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = (await res.json().catch(() => null)) as
        | { summary?: string; error?: string }
        | null;
      if (!res.ok || !data?.summary) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }
      setSummary(data.summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Summary failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={summarize}
        disabled={loading}
        className="self-start rounded-full border border-accent/40 px-3 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent/10 disabled:opacity-50"
      >
        {loading ? "Summarizing…" : summary ? "Summarize again" : "Summarize"}
      </button>
      {summary && (
        <p className="text-sm text-text">
          {summary}
        </p>
      )}
      {error && <p className="text-xs text-accent-light">{error}</p>}
    </div>
  );
}
