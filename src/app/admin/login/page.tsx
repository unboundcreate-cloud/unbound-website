"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const { error } = await res.json().catch(() => ({}));
      setError(error || "로그인 실패");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-black px-6">
      <form onSubmit={submit} className="w-full max-w-sm">
        <h1 className="font-display text-3xl uppercase text-white">Admin</h1>
        <p className="mt-2 mb-8 text-sm text-brand-muted">
          관리자 비밀번호를 입력하세요.
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          className="w-full border-b border-white/20 bg-transparent py-3 text-white placeholder:text-brand-muted/60 focus:border-brand-accent focus:outline-none"
          autoFocus
        />
        {error && <p className="mt-3 text-xs text-brand-accent">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full bg-brand-accent py-3 font-display text-sm uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-brand-black disabled:opacity-50"
        >
          {loading ? "확인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}
