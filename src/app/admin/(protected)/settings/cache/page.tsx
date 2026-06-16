"use client";

import { useState } from "react";

export default function CachePage() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const revalidate = async (tag?: string) => {
    setStatus("loading"); setMessage("");
    try {
      const url = tag ? `/api/admin/cache/revalidate?tag=${encodeURIComponent(tag)}` : "/api/admin/cache/revalidate";
      const res = await fetch(url, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "실패");
      setStatus("done"); setMessage(data.message ?? "재검증 완료");
    } catch (e) {
      setStatus("error"); setMessage(e instanceof Error ? e.message : "오류 발생");
    }
  };

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="mb-2 text-lg font-semibold text-white">캐시 관리</h1>
      <p className="mb-6 text-sm text-white/40">Next.js 캐시를 수동으로 재검증합니다.</p>

      <div className="space-y-3">
        {[
          { label: "전체 재검증", tag: undefined, desc: "모든 페이지의 캐시를 초기화합니다." },
          { label: "Works 재검증", tag: "works", desc: "포트폴리오 페이지의 캐시를 초기화합니다." },
          { label: "Services 재검증", tag: "services", desc: "서비스 페이지의 캐시를 초기화합니다." },
          { label: "About 재검증", tag: "about", desc: "About 페이지의 캐시를 초기화합니다." },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-5 py-4">
            <div>
              <div className="text-sm font-medium text-white">{item.label}</div>
              <div className="text-xs text-white/30">{item.desc}</div>
            </div>
            <button
              onClick={() => revalidate(item.tag)}
              disabled={status === "loading"}
              className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/60 hover:bg-white/5 hover:text-white disabled:opacity-40 transition-colors"
            >
              {status === "loading" ? "처리 중…" : "실행"}
            </button>
          </div>
        ))}
      </div>

      {message && (
        <div className={`mt-4 rounded-lg px-4 py-3 text-sm ${status === "done" ? "bg-green-500/10 border border-green-500/20 text-green-400" : "bg-red-500/10 border border-red-500/20 text-red-400"}`}>
          {message}
        </div>
      )}
    </div>
  );
}
