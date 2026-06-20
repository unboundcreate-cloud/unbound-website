"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Work } from "@/data/works";

const CATEGORIES = [
  { value: "drama", label: "드라마 & 예능" },
  { value: "promo", label: "광고 & 홍보" },
  { value: "b2b", label: "B2B" },
  { value: "ai", label: "AI" },
  { value: "public", label: "공공 / 기관" },
];

const SIZES = [
  { value: "large", label: "Large" },
  { value: "medium", label: "Medium" },
  { value: "small", label: "Small" },
];

interface Props {
  work?: Work;
  mode: "edit" | "new";
}

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="grid grid-cols-[160px_1fr] gap-4 border-b border-white/5 py-4">
      <div>
        <div className="text-[13px] font-medium text-white/70">{label}</div>
        {hint && <div className="mt-0.5 text-[11px] text-white/30">{hint}</div>}
      </div>
      <div>{children}</div>
    </div>
  );
}

const inputCls = "w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/20 focus:border-brand-accent/60 focus:outline-none focus:ring-1 focus:ring-brand-accent/30 transition-colors";

export function WorkForm({ work, mode }: Props) {
  const router = useRouter();
  const isNew = mode === "new";

  const [form, setForm] = useState<Partial<Work>>({
    id: work?.id ?? "",
    slug: work?.slug ?? "",
    title: work?.title ?? "",
    client: work?.client ?? "",
    category: work?.category ?? "drama",
    categoryLabel: work?.categoryLabel ?? "",
    year: work?.year ?? new Date().getFullYear().toString(),
    duration: work?.duration ?? "",
    period: work?.period ?? "",
    role: work?.role ?? "",
    thumbnailUrl: work?.thumbnailUrl ?? "",
    videoUrl: work?.videoUrl ?? "",
    embedUrl: work?.embedUrl ?? "",
    description: work?.description ?? "",
    tags: work?.tags ?? [],
    featured: work?.featured ?? false,
    size: work?.size ?? "medium",
  });

  const [tagsInput, setTagsInput] = useState((work?.tags ?? []).join(", "));
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const [ytInput, setYtInput] = useState("");
  const [ytBusy, setYtBusy] = useState(false);
  const [ytError, setYtError] = useState("");
  const [ytMsg, setYtMsg] = useState("");

  const set = (key: keyof Work, val: unknown) => setForm((f) => ({ ...f, [key]: val } as Partial<Work>));

  const importFromYoutube = async () => {
    if (!ytInput.trim()) { setYtError("YouTube 링크를 입력해주세요."); return; }
    setYtBusy(true); setYtError(""); setYtMsg("");
    try {
      const res = await fetch(`/api/admin/youtube-meta?url=${encodeURIComponent(ytInput.trim())}`);
      if (!res.ok) {
        const body: { error?: string } = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "가져오기 실패");
      }
      const data: {
        title?: string;
        thumbnailUrl?: string;
        videoUrl?: string;
        embedUrl?: string;
        description?: string;
        duration?: string;
      } = await res.json();
      setForm((f) => ({
        ...f,
        title: data.title ?? f.title,
        thumbnailUrl: data.thumbnailUrl ?? f.thumbnailUrl,
        videoUrl: data.videoUrl ?? f.videoUrl,
        embedUrl: data.embedUrl ?? f.embedUrl,
        description: data.description ?? f.description,
        duration: data.duration ?? f.duration,
      }));
      const filled = ["제목", "썸네일", "영상 URL"];
      if (data.description) filled.push("설명");
      if (data.duration) filled.push("길이");
      setYtMsg(`${filled.join(" · ")} 불러옴. 확인 후 저장하세요.`);
    } catch (e) {
      setYtError(e instanceof Error ? e.message : "가져오기 실패");
    } finally {
      setYtBusy(false);
    }
  };

  const save = async () => {
    if (!form.id || !form.title) { setError("ID와 제목은 필수입니다."); return; }
    setSaving(true); setError("");
    try {
      const payload = { ...form, tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean) };
      const url = isNew ? "/api/admin/content/works" : `/api/admin/content/works/${form.id}`;
      const method = isNew ? "POST" : "PUT";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(await res.text());
      router.push("/admin/content/works");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "저장 실패");
    } finally { setSaving(false); }
  };

  const remove = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/content/works/${form.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      router.push("/admin/content/works");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "삭제 실패");
    } finally { setDeleting(false); }
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <button onClick={() => router.back()} className="mb-1 text-xs text-white/30 hover:text-white transition-colors">← 목록으로</button>
          <h1 className="text-lg font-semibold text-white">{isNew ? "작업물 추가" : "작업물 편집"}</h1>
        </div>
        <div className="flex gap-3">
          {!isNew && (
            <button onClick={remove} disabled={deleting} className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 disabled:opacity-40 transition-colors">
              {deleting ? "삭제 중…" : "삭제"}
            </button>
          )}
          <button onClick={save} disabled={saving} className="rounded-lg bg-brand-accent px-5 py-2 text-sm font-medium text-white hover:opacity-85 disabled:opacity-40 transition-opacity">
            {saving ? "저장 중…" : "저장"}
          </button>
        </div>
      </div>

      {error && <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">{error}</div>}

      {/* YouTube 빠른 채우기 */}
      <div className="mb-4 rounded-xl border border-brand-accent/25 bg-brand-accent/[0.04] p-4">
        <div className="mb-2 flex items-center gap-2">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-red-500">
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
          </svg>
          <span className="text-[13px] font-medium text-white">YouTube 링크로 빠르게 채우기</span>
        </div>
        <p className="mb-3 text-[11px] text-white/40">
          링크를 붙여넣으면 제목 · 썸네일 · 영상 URL이 자동으로 채워집니다.
        </p>
        <div className="flex gap-2">
          <input
            className={inputCls}
            value={ytInput}
            onChange={(e) => setYtInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); void importFromYoutube(); } }}
            placeholder="https://youtu.be/… 또는 https://www.youtube.com/watch?v=…"
            spellCheck={false}
          />
          <button
            onClick={() => void importFromYoutube()}
            disabled={ytBusy}
            className="flex-none rounded-lg bg-brand-accent px-4 py-2 text-sm font-medium text-white hover:opacity-85 disabled:opacity-40 transition-opacity"
          >
            {ytBusy ? "가져오는 중…" : "가져오기"}
          </button>
        </div>
        {ytError && <p className="mt-2 text-[12px] text-red-400">{ytError}</p>}
        {ytMsg && <p className="mt-2 text-[12px] text-emerald-400">{ytMsg}</p>}
      </div>

      <div className="rounded-xl border border-white/8 bg-white/[0.02] px-6">
        <Field label="ID" hint="고유값, 변경 불가">
          <input className={inputCls} value={form.id ?? ""} onChange={(e) => set("id", e.target.value)} disabled={!isNew} placeholder="예: 25" />
        </Field>
        <Field label="Slug" hint="URL에 사용됨">
          <input className={inputCls} value={form.slug ?? ""} onChange={(e) => set("slug", e.target.value)} placeholder="예: channela-aizit-opening" />
        </Field>
        <Field label="제목">
          <input className={inputCls} value={form.title ?? ""} onChange={(e) => set("title", e.target.value)} placeholder="예: 예능 'Ai지트' Opening Title" />
        </Field>
        <Field label="클라이언트">
          <input className={inputCls} value={form.client ?? ""} onChange={(e) => set("client", e.target.value)} placeholder="예: 채널A" />
        </Field>
        <Field label="카테고리">
          <select className={inputCls} value={form.category ?? "drama"} onChange={(e) => set("category", e.target.value)}>
            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </Field>
        <Field label="카테고리 레이블" hint="표시될 레이블">
          <input className={inputCls} value={form.categoryLabel ?? ""} onChange={(e) => set("categoryLabel", e.target.value)} placeholder="예: AI" />
        </Field>
        <Field label="연도">
          <input className={inputCls} value={form.year ?? ""} onChange={(e) => set("year", e.target.value)} placeholder="예: 2025" />
        </Field>
        <Field label="영상 길이">
          <input className={inputCls} value={form.duration ?? ""} onChange={(e) => set("duration", e.target.value)} placeholder="예: 15s" />
        </Field>
        <Field label="제작 기간">
          <input className={inputCls} value={form.period ?? ""} onChange={(e) => set("period", e.target.value)} placeholder="예: 2025.01" />
        </Field>
        <Field label="담당">
          <input className={inputCls} value={form.role ?? ""} onChange={(e) => set("role", e.target.value)} placeholder="예: 기획, 모션그래픽" />
        </Field>
        <Field label="썸네일 URL">
          <input className={inputCls} value={form.thumbnailUrl ?? ""} onChange={(e) => set("thumbnailUrl", e.target.value)} placeholder="예: https://img.youtube.com/vi/…/maxresdefault.jpg" />
          {form.thumbnailUrl && (
            <img src={form.thumbnailUrl} alt="" className="mt-2 h-20 w-32 rounded object-cover bg-white/10" />
          )}
        </Field>
        <Field label="영상 URL">
          <input className={inputCls} value={form.videoUrl ?? ""} onChange={(e) => set("videoUrl", e.target.value)} placeholder="예: https://youtu.be/…" />
        </Field>
        <Field label="임베드 URL" hint="iframe용">
          <input className={inputCls} value={form.embedUrl ?? ""} onChange={(e) => set("embedUrl", e.target.value)} placeholder="예: https://www.youtube.com/embed/…" />
        </Field>
        <Field label="설명">
          <textarea className={`${inputCls} min-h-[80px] resize-y`} value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} placeholder="프로젝트 설명" />
        </Field>
        <Field label="태그" hint="쉼표로 구분">
          <input className={inputCls} value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="예: 모션그래픽, 오프닝, AI" />
        </Field>
        <Field label="크기">
          <select className={inputCls} value={form.size ?? "medium"} onChange={(e) => set("size", e.target.value as Work["size"])}>
            {SIZES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </Field>
        <div className="flex items-center gap-3 py-4">
          <input
            type="checkbox"
            id="featured"
            checked={form.featured ?? false}
            onChange={(e) => set("featured", e.target.checked)}
            className="h-4 w-4 rounded border-white/20 accent-brand-accent"
          />
          <label htmlFor="featured" className="text-sm text-white/70">Featured (홈페이지 강조 표시)</label>
        </div>
      </div>
    </div>
  );
}
