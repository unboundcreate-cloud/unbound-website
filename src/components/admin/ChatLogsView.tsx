"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ChatEntry } from "@/lib/chat-store";

function fmt(ts: number) {
  return new Date(ts).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ChatLogsView({
  logs: initial,
  ready,
}: {
  logs: ChatEntry[];
  ready: boolean;
}) {
  const [logs, setLogs] = useState(initial);
  const [clearing, setClearing] = useState(false);
  const router = useRouter();

  const clear = async () => {
    if (!confirm(`대화 기록 ${logs.length}개를 모두 삭제하시겠습니까?`)) return;
    setClearing(true);
    await fetch("/api/admin/chats", { method: "DELETE" });
    setLogs([]);
    setClearing(false);
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0a0a0a]/95 px-6 py-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-brand-accent" />
          <span className="font-display text-sm uppercase tracking-widest text-white">
            Unbound Studio
          </span>
          <span className="text-white/20">/</span>
          <span className="text-sm text-white/50">대화 기록</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="font-mono text-xs text-white/30">{logs.length}건</span>
          <button
            onClick={clear}
            disabled={clearing || logs.length === 0}
            className="text-xs text-white/40 transition-colors hover:text-red-400 disabled:opacity-30"
          >
            {clearing ? "삭제 중..." : "전체 삭제"}
          </button>
          <button
            onClick={logout}
            className="text-xs text-white/40 transition-colors hover:text-white"
          >
            로그아웃
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 py-8">
        {!ready && (
          <div className="mb-6 rounded-lg border border-yellow-700/40 bg-yellow-900/15 px-4 py-3 text-sm text-yellow-300">
            Upstash Redis가 연결되지 않았습니다.{" "}
            <span className="opacity-70">
              Vercel → Settings → Environment Variables에서{" "}
              <code className="font-mono">UPSTASH_REDIS_REST_URL</code>과{" "}
              <code className="font-mono">UPSTASH_REDIS_REST_TOKEN</code>을 추가하세요.
            </span>
          </div>
        )}

        {logs.length === 0 ? (
          <div className="py-32 text-center text-sm text-white/25">
            아직 대화 기록이 없습니다.
          </div>
        ) : (
          <div className="space-y-4">
            {logs.map((entry) => (
              <div
                key={entry.id}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-5"
              >
                <div className="mb-4 font-mono text-[11px] text-white/25">
                  {fmt(entry.ts)}
                </div>
                <div className="space-y-2.5">
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-brand-accent px-4 py-2.5 text-sm leading-relaxed">
                      {entry.user}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 px-4 py-2.5 text-sm leading-relaxed text-white/80">
                      {entry.ai}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
