"use client";

import { useState } from "react";
import type { Client } from "@/data/clients";

const inputCls = "w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/20 focus:border-brand-accent/60 focus:outline-none focus:ring-1 focus:ring-brand-accent/30 transition-colors";

interface Props { initialLogos: Client[]; }

export function LogosEditor({ initialLogos }: Props) {
  const [logos, setLogos] = useState<Client[]>(initialLogos);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const update = (idx: number, key: keyof Client, val: string) => {
    setLogos((prev) => prev.map((l, i) => i === idx ? { ...l, [key]: val } as Client : l));
    setSaved(false);
  };

  const remove = (idx: number) => { setLogos((prev) => prev.filter((_, i) => i !== idx)); setSaved(false); };
  const add = () => { setLogos((prev) => [...prev, { name: "새 클라이언트", logo: "" }]); setSaved(false); };
  const move = (idx: number, dir: -1 | 1) => {
    const newArr = [...logos];
    const target = idx + dir;
    if (target < 0 || target >= newArr.length) return;
    [newArr[idx], newArr[target]] = [newArr[target], newArr[idx]];
    setLogos(newArr); setSaved(false);
  };

  const save = async () => {
    setSaving(true); setError(""); setSaved(false);
    try {
      const res = await fetch("/api/admin/content/logos", {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(logos),
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
          <h1 className="text-lg font-semibold text-white">클라이언트 로고</h1>
          <p className="mt-0.5 text-sm text-white/40">{logos.length}개</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-green-400">저장됨 ✓</span>}
          {error && <span className="text-xs text-red-400">{error}</span>}
          <button onClick={add} className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/60 hover:text-white transition-colors">
            + 추가
          </button>
          <button onClick={save} disabled={saving} className="rounded-lg bg-brand-accent px-5 py-2 text-sm font-medium text-white hover:opacity-85 disabled:opacity-40 transition-opacity">
            {saving ? "저장 중…" : "저장"}
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-white/8 overflow-hidden">
        {logos.map((logo, idx) => (
          <div key={idx} className="flex items-center gap-3 border-b border-white/5 px-4 py-3 hover:bg-white/[0.02]">
            <div className="flex flex-col gap-0.5">
              <button onClick={() => move(idx, -1)} disabled={idx === 0} className="text-white/20 hover:text-white disabled:opacity-20 text-xs">▲</button>
              <button onClick={() => move(idx, 1)} disabled={idx === logos.length - 1} className="text-white/20 hover:text-white disabled:opacity-20 text-xs">▼</button>
            </div>
            <span className="w-5 text-center text-xs text-white/20">{idx + 1}</span>
            {logo.logo ? (
              <img src={logo.logo} alt={logo.name} className="h-8 w-16 object-contain opacity-60" />
            ) : (
              <div className="h-8 w-16 rounded bg-white/5 flex items-center justify-center text-[10px] text-white/20">No logo</div>
            )}
            <div className="flex flex-1 gap-3">
              <input
                className={inputCls}
                value={logo.name}
                onChange={(e) => update(idx, "name", e.target.value)}
                placeholder="클라이언트 이름"
              />
              <input
                className={inputCls}
                value={logo.logo ?? ""}
                onChange={(e) => update(idx, "logo", e.target.value)}
                placeholder="/clients/logo.png"
              />
            </div>
            <button onClick={() => remove(idx)} className="text-white/20 hover:text-red-400 transition-colors text-xs px-1">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
