"use client";

import { useState } from "react";
import type { RedirectRule } from "@/lib/settings-store";

const inputCls = "rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/20 focus:border-brand-accent/60 focus:outline-none focus:ring-1 focus:ring-brand-accent/30 transition-colors";

interface Props { initialRules: RedirectRule[]; }

export function RedirectsEditor({ initialRules }: Props) {
  const [rules, setRules] = useState<RedirectRule[]>(initialRules);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const add = () => { setRules((r) => [...r, { from: "", to: "", type: "301" }]); setSaved(false); };
  const remove = (idx: number) => { setRules((r) => r.filter((_, i) => i !== idx)); setSaved(false); };
  const update = (idx: number, key: keyof RedirectRule, val: string) => {
    setRules((r) => r.map((rule, i) => i === idx ? { ...rule, [key]: val } : rule));
    setSaved(false);
  };

  const save = async () => {
    setSaving(true); setError(""); setSaved(false);
    try {
      const res = await fetch("/api/admin/settings/redirects", {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(rules),
      });
      if (!res.ok) throw new Error(await res.text());
      setSaved(true);
    } catch (e) { setError(e instanceof Error ? e.message : "저장 실패"); }
    finally { setSaving(false); }
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-white">리다이렉트</h1>
          <p className="mt-0.5 text-sm text-white/40">next.config.js의 redirects()를 관리합니다.</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-green-400">저장됨 ✓</span>}
          {error && <span className="text-xs text-red-400">{error}</span>}
          <button onClick={add} className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/60 hover:text-white transition-colors">+ 추가</button>
          <button onClick={save} disabled={saving} className="rounded-lg bg-brand-accent px-5 py-2 text-sm font-medium text-white hover:opacity-85 disabled:opacity-40 transition-opacity">
            {saving ? "저장 중…" : "저장"}
          </button>
        </div>
      </div>

      {rules.length === 0 ? (
        <div className="rounded-xl border border-white/8 px-6 py-12 text-center text-sm text-white/30">
          리다이렉트 규칙이 없습니다. + 추가를 눌러 생성하세요.
        </div>
      ) : (
        <div className="space-y-3">
          {rules.map((rule, idx) => (
            <div key={idx} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
              <span className="text-xs text-white/20 w-5 text-center">{idx + 1}</span>
              <input className={`${inputCls} flex-1`} value={rule.from} onChange={(e) => update(idx, "from", e.target.value)} placeholder="From: /old-page" />
              <span className="text-white/20 text-xs">→</span>
              <input className={`${inputCls} flex-1`} value={rule.to} onChange={(e) => update(idx, "to", e.target.value)} placeholder="To: /new-page" />
              <select className={`${inputCls} w-20`} value={rule.type} onChange={(e) => update(idx, "type", e.target.value)}>
                <option value="301">301</option>
                <option value="302">302</option>
              </select>
              <button onClick={() => remove(idx)} className="text-white/20 hover:text-red-400 transition-colors text-xs px-1">✕</button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 rounded-lg bg-white/[0.02] border border-white/5 px-4 py-3 text-xs text-white/30">
        참고: 저장 후 실제 적용은 next.config.js의 redirects() 함수와 연동이 필요합니다.
      </div>
    </div>
  );
}
