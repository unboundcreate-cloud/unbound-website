"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Reorder, AnimatePresence } from "framer-motion";
import type { Work } from "@/data/works";

const CATEGORY_OPTS: { value: string; label: string }[] = [
  { value: "drama", label: "드라마 & 예능" },
  { value: "promo", label: "광고 & 홍보" },
  { value: "b2b", label: "B2B" },
  { value: "ai", label: "AI" },
  { value: "public", label: "공공 / 기관" },
];

const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  CATEGORY_OPTS.map((c) => [c.value, c.label]),
);

type SaveState = "idle" | "saving" | "saved" | "error";

export default function WorksPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<string>("");
  const [filterFeatured, setFilterFeatured] = useState(false);
  const [reorderSaving, setReorderSaving] = useState(false);
  const [reorderError, setReorderError] = useState("");

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/admin/content/works", { cache: "no-store" });
        if (!res.ok) throw new Error("로드 실패");
        const data: Work[] = await res.json();
        setWorks(data);
      } catch {
        setReorderError("작업물 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // filtered view (DnD는 필터 미적용일 때만 활성)
  const filtered = works.filter((w) => {
    if (search.trim()) {
      const s = search.toLowerCase();
      const hit =
        w.title.toLowerCase().includes(s) ||
        (w.client ?? "").toLowerCase().includes(s) ||
        (w.id ?? "").toLowerCase().includes(s);
      if (!hit) return false;
    }
    if (filterCat && w.category !== filterCat) return false;
    if (filterFeatured && !w.featured) return false;
    return true;
  });

  const filterActive = !!search.trim() || !!filterCat || filterFeatured;

  async function persistReorder(next: Work[]) {
    setReorderSaving(true);
    setReorderError("");
    try {
      const res = await fetch("/api/admin/content/works", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: next.map((w) => w.id) }),
      });
      if (!res.ok) throw new Error("순서 저장 실패");
    } catch {
      setReorderError("순서 저장에 실패했습니다. 새로고침 후 다시 시도해주세요.");
    } finally {
      setReorderSaving(false);
    }
  }

  function handleReorder(next: Work[]) {
    setWorks(next);
    void persistReorder(next);
  }

  async function updateWork(id: string, patch: Partial<Work>) {
    const current = works.find((w) => w.id === id);
    if (!current) return;
    const merged = { ...current, ...patch };
    setWorks((prev) => prev.map((w) => (w.id === id ? merged : w)));
    try {
      const res = await fetch(`/api/admin/content/works/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(merged),
      });
      if (!res.ok) throw new Error("저장 실패");
    } catch {
      // 롤백
      setWorks((prev) => prev.map((w) => (w.id === id ? current : w)));
      setReorderError("저장에 실패했습니다.");
    }
  }

  async function deleteWork(id: string, title: string) {
    if (!confirm(`"${title}"을(를) 삭제하시겠습니까?`)) return;
    const prev = works;
    setWorks((w) => w.filter((x) => x.id !== id));
    try {
      const res = await fetch(`/api/admin/content/works/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
    } catch {
      setWorks(prev);
      setReorderError("삭제에 실패했습니다.");
    }
  }

  async function duplicateWork(orig: Work) {
    const newId = `${orig.id}-copy-${Date.now().toString(36)}`;
    const copy: Work = {
      ...orig,
      id: newId,
      slug: orig.slug ? `${orig.slug}-copy` : newId,
      title: `${orig.title} (복사본)`,
      featured: false,
    };
    try {
      const res = await fetch("/api/admin/content/works", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(copy),
      });
      if (!res.ok) throw new Error();
      setWorks((w) => [...w, copy]);
    } catch {
      setReorderError("복제에 실패했습니다.");
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-white">작업물 (Works)</h1>
          <p className="mt-0.5 text-sm text-white/40">
            {works.length}개 · 행을 잡고 드래그해서 순서 변경
            {reorderSaving && <span className="ml-2 text-brand-accent">저장 중…</span>}
          </p>
        </div>
        <Link
          href="/admin/content/works/new"
          className="rounded-lg bg-brand-accent px-4 py-2 text-sm font-medium text-white hover:opacity-85 transition-opacity"
        >
          + 작업물 추가
        </Link>
      </div>

      {/* 필터 바 */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="제목 · 클라이언트 · ID 검색…"
          className="flex-1 min-w-[200px] rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/25 focus:border-brand-accent/60 focus:outline-none"
        />
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm text-white focus:border-brand-accent/60 focus:outline-none"
        >
          <option value="">전체 카테고리</option>
          {CATEGORY_OPTS.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 cursor-pointer">
          <input
            type="checkbox"
            checked={filterFeatured}
            onChange={(e) => setFilterFeatured(e.target.checked)}
            className="h-4 w-4 accent-brand-accent"
          />
          Featured만
        </label>
        {filterActive && (
          <button
            onClick={() => { setSearch(""); setFilterCat(""); setFilterFeatured(false); }}
            className="text-xs text-white/40 hover:text-white"
          >
            초기화
          </button>
        )}
      </div>

      {reorderError && (
        <div className="mb-3 rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2 text-sm text-red-400">
          {reorderError}
        </div>
      )}

      {filterActive && (
        <p className="mb-3 text-[11px] text-white/35">
          ⚠ 필터링 중에는 드래그 정렬이 비활성화됩니다. 정렬을 변경하려면 필터를 초기화하세요.
        </p>
      )}

      {/* 헤더 */}
      <div className="grid grid-cols-[28px_72px_minmax(0,2.2fr)_minmax(0,1.2fr)_minmax(0,1fr)_72px_80px_96px] gap-3 border-b border-white/10 px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-white/30">
        <div />
        <div>썸네일</div>
        <div>제목</div>
        <div>클라이언트</div>
        <div>카테고리</div>
        <div>연도</div>
        <div>Featured</div>
        <div className="text-right">관리</div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-sm text-white/40">불러오는 중…</div>
      ) : filtered.length === 0 ? (
        <div className="py-12 text-center text-sm text-white/40">
          {filterActive ? "조건에 맞는 작업물이 없습니다." : "작업물이 없습니다."}
        </div>
      ) : filterActive ? (
        // 필터 활성 시: DnD 없는 일반 리스트
        <div className="divide-y divide-white/5">
          <AnimatePresence initial={false}>
            {filtered.map((work) => (
              <WorkRow
                key={work.id}
                work={work}
                onUpdate={(p) => void updateWork(work.id, p)}
                onDelete={() => void deleteWork(work.id, work.title)}
                onDuplicate={() => void duplicateWork(work)}
                draggable={false}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        // 필터 비활성: DnD 활성
        <Reorder.Group
          axis="y"
          values={works}
          onReorder={handleReorder}
          className="divide-y divide-white/5"
        >
          <AnimatePresence initial={false}>
            {works.map((work) => (
              <Reorder.Item
                key={work.id}
                value={work}
                className="bg-transparent"
                whileDrag={{
                  scale: 1.01,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  zIndex: 50,
                  backgroundColor: "rgba(255,255,255,0.04)",
                }}
                transition={{ duration: 0.25 }}
              >
                <WorkRow
                  work={work}
                  onUpdate={(p) => void updateWork(work.id, p)}
                  onDelete={() => void deleteWork(work.id, work.title)}
                  onDuplicate={() => void duplicateWork(work)}
                  draggable
                />
              </Reorder.Item>
            ))}
          </AnimatePresence>
        </Reorder.Group>
      )}
    </div>
  );
}

// ─── Row ──────────────────────────────────────────────────────────────────────

function WorkRow({
  work,
  onUpdate,
  onDelete,
  onDuplicate,
  draggable,
}: {
  work: Work;
  onUpdate: (patch: Partial<Work>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  draggable: boolean;
}) {
  return (
    <div
      className="grid grid-cols-[28px_72px_minmax(0,2.2fr)_minmax(0,1.2fr)_minmax(0,1fr)_72px_80px_96px] gap-3 items-center px-3 py-2 hover:bg-white/[0.02] transition-colors group"
    >
      {/* 드래그 핸들 */}
      <div
        className={`flex items-center justify-center ${
          draggable ? "cursor-grab active:cursor-grabbing text-white/25 hover:text-white/70" : "text-white/10"
        }`}
        title={draggable ? "드래그해서 순서 변경" : "필터 중 정렬 비활성"}
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <circle cx="7" cy="5" r="1.4" />
          <circle cx="7" cy="10" r="1.4" />
          <circle cx="7" cy="15" r="1.4" />
          <circle cx="13" cy="5" r="1.4" />
          <circle cx="13" cy="10" r="1.4" />
          <circle cx="13" cy="15" r="1.4" />
        </svg>
      </div>

      {/* 썸네일 */}
      <div>
        {work.thumbnailUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={work.thumbnailUrl}
            alt={work.title}
            className="h-12 w-16 rounded object-cover bg-white/10"
          />
        ) : (
          <div className="h-12 w-16 rounded bg-white/10" />
        )}
      </div>

      {/* 제목 (인라인) */}
      <InlineText
        value={work.title}
        onSave={(v) => onUpdate({ title: v })}
        className="text-white"
      />

      {/* 클라이언트 (인라인) */}
      <InlineText
        value={work.client ?? ""}
        placeholder="—"
        onSave={(v) => onUpdate({ client: v })}
        className="text-white/60"
      />

      {/* 카테고리 (셀렉트 인라인) */}
      <InlineSelect
        value={work.category ?? "drama"}
        options={CATEGORY_OPTS}
        onSave={(v) => onUpdate({ category: v as Work["category"] })}
        renderLabel={(v) => CATEGORY_LABELS[v] ?? v}
      />

      {/* 연도 (인라인) */}
      <InlineText
        value={work.year ?? ""}
        placeholder="—"
        onSave={(v) => onUpdate({ year: v })}
        className="text-white/60"
      />

      {/* Featured 토글 */}
      <div>
        <button
          onClick={() => onUpdate({ featured: !work.featured })}
          className={`rounded-full px-2.5 py-0.5 text-[11px] transition-colors ${
            work.featured
              ? "bg-brand-accent/25 text-brand-accent hover:bg-brand-accent/35"
              : "bg-white/8 text-white/35 hover:bg-white/12 hover:text-white/55"
          }`}
        >
          {work.featured ? "★ ON" : "☆ OFF"}
        </button>
      </div>

      {/* 관리 버튼 */}
      <div className="flex items-center justify-end gap-1.5 text-[11px]">
        <Link
          href={`/admin/content/works/${work.id}`}
          className="rounded px-1.5 py-1 text-white/40 hover:text-white hover:bg-white/5 transition-colors"
          title="상세 편집"
        >
          편집
        </Link>
        <button
          onClick={onDuplicate}
          className="rounded px-1.5 py-1 text-white/40 hover:text-white hover:bg-white/5 transition-colors"
          title="복제"
        >
          복제
        </button>
        <button
          onClick={onDelete}
          className="rounded px-1.5 py-1 text-red-400/65 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          title="삭제"
        >
          삭제
        </button>
      </div>
    </div>
  );
}

// ─── Inline editors ───────────────────────────────────────────────────────────

function InlineText({
  value,
  placeholder,
  onSave,
  className,
}: {
  value: string;
  placeholder?: string;
  onSave: (v: string) => void;
  className?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  function commit() {
    setEditing(false);
    if (draft !== value) onSave(draft);
  }

  function cancel() {
    setDraft(value);
    setEditing(false);
  }

  if (editing) {
    return (
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          else if (e.key === "Escape") cancel();
        }}
        spellCheck={false}
        className="w-full rounded bg-white/8 border border-brand-accent/50 px-2 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-brand-accent/40"
      />
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className={`w-full truncate rounded px-2 py-1 text-left text-sm hover:bg-white/5 transition-colors ${className ?? ""}`}
      title="클릭해서 편집"
    >
      {value || <span className="text-white/20">{placeholder ?? "—"}</span>}
    </button>
  );
}

function InlineSelect({
  value,
  options,
  onSave,
  renderLabel,
}: {
  value: string;
  options: { value: string; label: string }[];
  onSave: (v: string) => void;
  renderLabel?: (v: string) => string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onSave(e.target.value)}
      className="w-full rounded bg-white/5 border border-white/10 px-2 py-1 text-sm text-white/70 focus:border-brand-accent/60 focus:outline-none hover:bg-white/8 cursor-pointer"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{renderLabel ? renderLabel(o.value) : o.label}</option>
      ))}
    </select>
  );
}
