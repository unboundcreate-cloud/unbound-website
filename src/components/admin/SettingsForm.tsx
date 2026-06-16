"use client";

import { useState } from "react";

const inputCls = "w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/20 focus:border-brand-accent/60 focus:outline-none focus:ring-1 focus:ring-brand-accent/30 transition-colors";

export interface SettingFieldDef {
  key: string;
  label: string;
  hint?: string;
  multiline?: boolean;
  type?: "text" | "color" | "url";
}

interface Props {
  settingKey: string;
  title: string;
  fields: SettingFieldDef[];
  initialValue: Record<string, unknown>;
}

export function SettingsForm({ settingKey, title, fields, initialValue }: Props) {
  const [values, setValues] = useState<Record<string, unknown>>(initialValue);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const set = (key: string, val: string) => { setValues((v) => ({ ...v, [key]: val })); setSaved(false); };

  const save = async () => {
    setSaving(true); setError(""); setSaved(false);
    try {
      const res = await fetch(`/api/admin/settings/${settingKey}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(await res.text());
      setSaved(true);
    } catch (e) { setError(e instanceof Error ? e.message : "저장 실패"); }
    finally { setSaving(false); }
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-white">{title}</h1>
        <div className="flex items-center gap-3">
          {saved && <span className="text-xs text-green-400">저장됨 ✓</span>}
          {error && <span className="text-xs text-red-400">{error}</span>}
          <button onClick={save} disabled={saving} className="rounded-lg bg-brand-accent px-5 py-2 text-sm font-medium text-white hover:opacity-85 disabled:opacity-40 transition-opacity">
            {saving ? "저장 중…" : "저장"}
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-white/8 bg-white/[0.02] px-6">
        {fields.map((field, i) => (
          <div key={field.key} className={`grid grid-cols-[180px_1fr] gap-4 py-4 ${i < fields.length - 1 ? "border-b border-white/5" : ""}`}>
            <div>
              <div className="text-[13px] font-medium text-white/70">{field.label}</div>
              {field.hint && <div className="mt-0.5 text-[11px] text-white/30">{field.hint}</div>}
            </div>
            <div>
              {field.type === "color" ? (
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={String(values[field.key] ?? "#000000")}
                    onChange={(e) => set(field.key, e.target.value)}
                    className="h-9 w-14 cursor-pointer rounded border border-white/10 bg-transparent p-1"
                  />
                  <input
                    className={`${inputCls} flex-1`}
                    value={String(values[field.key] ?? "")}
                    onChange={(e) => set(field.key, e.target.value)}
                    placeholder="#000000"
                  />
                </div>
              ) : field.multiline ? (
                <textarea
                  className={`${inputCls} min-h-[80px] resize-y font-mono text-xs`}
                  value={String(values[field.key] ?? "")}
                  onChange={(e) => set(field.key, e.target.value)}
                />
              ) : (
                <input
                  className={inputCls}
                  type={field.type === "url" ? "url" : "text"}
                  value={String(values[field.key] ?? "")}
                  onChange={(e) => set(field.key, e.target.value)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
