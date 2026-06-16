"use client";

import { useState } from "react";
import type { Service } from "@/data/services";

const inputCls = "w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/20 focus:border-brand-accent/60 focus:outline-none focus:ring-1 focus:ring-brand-accent/30 transition-colors";

interface Props { initialServices: Service[]; }

export function ServicesEditor({ initialServices }: Props) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const update = (idx: number, key: keyof Service, val: string) => {
    setServices((prev) => prev.map((s, i) => i === idx ? { ...s, [key]: val } as Service : s));
    setSaved(false);
  };

  const save = async () => {
    setSaving(true); setError(""); setSaved(false);
    try {
      const res = await fetch("/api/admin/content/services", {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(services),
      });
      if (!res.ok) throw new Error(await res.text());
      setSaved(true);
    } catch (e) { setError(e instanceof Error ? e.message : "저장 실패"); }
    finally { setSaving(false); }
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-white">서비스 관리</h1>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-green-400">저장됨 ✓</span>}
          {error && <span className="text-xs text-red-400">{error}</span>}
          <button onClick={save} disabled={saving} className="rounded-lg bg-brand-accent px-5 py-2 text-sm font-medium text-white hover:opacity-85 disabled:opacity-40 transition-opacity">
            {saving ? "저장 중…" : "저장"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {services.map((service, idx) => (
          <div key={service.slug} className="rounded-xl border border-white/8 bg-white/[0.02] p-5">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl font-bold text-white/10">{service.number}</span>
              <span className="text-sm font-medium text-white">{service.title}</span>
              {service.subtitle && <span className="text-xs text-white/40">{service.subtitle}</span>}
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-[11px] text-white/40">영문 제목</label>
                  <input className={inputCls} value={service.title} onChange={(e) => update(idx, "title", e.target.value)} />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] text-white/40">한글 보조표기</label>
                  <input className={inputCls} value={service.subtitle ?? ""} onChange={(e) => update(idx, "subtitle", e.target.value)} />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[11px] text-white/40">설명</label>
                <textarea className={`${inputCls} min-h-[100px] resize-y`} value={service.description} onChange={(e) => update(idx, "description", e.target.value)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
