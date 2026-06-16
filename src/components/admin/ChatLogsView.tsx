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

function PasswordModal({ onClose }: { onClose: () => void }) {
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pw !== confirm) { setMsg("비밀번호가 일치하지 않습니다."); return; }
    setStatus("saving");
    const res = await fetch("/api/admin/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok) {
      setStatus("done");
      setTimeout(async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
      }, 1200);
    } else {
      setStatus("error");
      setMsg(json.error || "변경 실패");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#111] p-8 shadow-2xl">
        <h2 className="mb-6 font-display text-lg uppercase tracking-widest text-white">비밀번호 변경</h2>
        {status === "done" ? (
          <p className="text-sm text-green-400">변경됐습니다. 다시 로그인해주세요...</p>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs text-white/40">새 비밀번호</label>
              <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="6자 이상" autoFocus className="w-full border-b border-white/20 bg-transparent py-2.5 text-sm text-white placeholder:text-white/25 focus:border-brand-accent focus:outline-none" />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-white/40">확인</label>
              <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="다시 입력" className="w-full border-b border-white/20 bg-transparent py-2.5 text-sm text-white placeholder:text-white/25 focus:border-brand-accent focus:outline-none" />
            </div>
            {msg && <p className="text-xs text-brand-accent">{msg}</p>}
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={status === "saving" || !pw} className="flex-1 bg-brand-accent py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-85 disabled:opacity-40">
                {status === "saving" ? "저장 중..." : "변경"}
              </button>
              <button type="button" onClick={onClose} className="flex-1 border border-white/15 py-2.5 text-sm text-white/50 transition-colors hover:text-white">취소</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export function ChatLogsView({ logs: initial, ready }: { logs: ChatEntry[]; ready: boolean }) {
  const [logs, setLogs] = useState(initial);
  const [clearing, setClearing] = useState(false);
  const [pwModal, setPwModal] = useState(false);

  const clear = async () => {
    if (!confirm(`대화 기록 ${logs.length}개를 모두 삭제하시겠습니까?`)) return;
    setClearing(true);
    await fetch("/api/admin/chats", { method: "DELETE" });
    setLogs([]);
    setClearing(false);
  };

  return (
    <div className="p-8">
      {pwModal && <PasswordModal onClose={() => setPwModal(false)} />}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-white">AI 대화 기록</h1>
          <p className="mt-0.5 text-sm text-white/40">{logs.length}건</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setPwModal(true)} className="text-xs text-white/40 transition-colors hover:text-white">
            비밀번호 변경
          </button>
          <button onClick={clear} disabled={clearing || logs.length === 0} className="rounded-lg border border-red-500/20 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 disabled:opacity-30 transition-colors">
            {clearing ? "삭제 중..." : "전체 삭제"}
          </button>
        </div>
      </div>

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
        <div className="py-32 text-center text-sm text-white/25">아직 대화 기록이 없습니다.</div>
      ) : (
        <div className="space-y-4">
          {logs.map((entry) => (
            <div key={entry.id} className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
              <div className="mb-4 font-mono text-[11px] text-white/25">{fmt(entry.ts)}</div>
              <div className="space-y-2.5">
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-brand-accent px-4 py-2.5 text-sm leading-relaxed">{entry.user}</div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/10 px-4 py-2.5 text-sm leading-relaxed text-white/80">{entry.ai}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
