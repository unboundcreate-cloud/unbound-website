"use client";

import { useState } from "react";

const inputCls = "w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/20 focus:border-brand-accent/60 focus:outline-none focus:ring-1 focus:ring-brand-accent/30 transition-colors";

interface FieldDef {
  key: string;
  label: string;
  multiline?: boolean;
  hint?: string;
}

interface Props {
  slug: string;
  title: string;
  fields: FieldDef[];
  initialContent: Record<string, string>;
}

export function PageEditor({ slug, title, fields, initialContent }: Props) {
  const [content, setContent] = useState<Record<string, string>>(initialContent);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const set = (key: string, val: string) => { setContent((c) => ({ ...c, [key]: val })); setSaved(false); };

  const save = async () => {
    setSaving(true); setError(""); setSaved(false);
    try {
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content),
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
          <div key={field.key} className={`grid grid-cols-[160px_1fr] gap-4 py-4 ${i < fields.length - 1 ? "border-b border-white/5" : ""}`}>
            <div>
              <div className="text-[13px] font-medium text-white/70">{field.label}</div>
              {field.hint && <div className="mt-0.5 text-[11px] text-white/30">{field.hint}</div>}
            </div>
            <div>
              {field.multiline ? (
                <textarea
                  className={`${inputCls} min-h-[80px] resize-y`}
                  value={content[field.key] ?? ""}
                  onChange={(e) => set(field.key, e.target.value)}
                />
              ) : (
                <input
                  className={inputCls}
                  value={content[field.key] ?? ""}
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
