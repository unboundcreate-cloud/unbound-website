"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SiteConfig, Align, StatItem, AboutBlock } from "@/lib/site-config";

const ALIGN_OPTS: [string, string][] = [
  ["left", "왼쪽"],
  ["center", "가운데"],
  ["right", "오른쪽"],
];

export function AdminEditor({
  initialConfig,
  storeReady,
}: {
  initialConfig: SiteConfig;
  storeReady: boolean;
}) {
  const [cfg, setCfg] = useState<SiteConfig>(initialConfig);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [msg, setMsg] = useState("");
  const [previewKey, setPreviewKey] = useState(0);
  const router = useRouter();

  const hero = cfg.home.hero;
  const about = cfg.home.about;
  const setHero = (patch: Partial<SiteConfig["home"]["hero"]>) =>
    setCfg((c) => ({ ...c, home: { ...c.home, hero: { ...c.home.hero, ...patch } } }));
  const setAbout = (patch: Partial<SiteConfig["home"]["about"]>) =>
    setCfg((c) => ({ ...c, home: { ...c.home, about: { ...c.home.about, ...patch } } }));

  const save = async () => {
    setStatus("saving");
    setMsg("");
    const res = await fetch("/api/admin/config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cfg),
    });
    if (res.ok) {
      setStatus("saved");
      setPreviewKey((k) => k + 1);
      setTimeout(() => setStatus("idle"), 2000);
    } else {
      setStatus("error");
      setMsg((await res.json().catch(() => ({})))?.error || "저장 실패");
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-6 py-4">
        <h1 className="font-display text-xl uppercase">Unbound 관리자</h1>
        <div className="flex items-center gap-4">
          {status === "saved" && <span className="text-sm text-green-400">✓ 저장됨</span>}
          {status === "error" && <span className="text-sm text-brand-accent">{msg}</span>}
          <button
            onClick={save}
            disabled={status === "saving"}
            className="rounded bg-brand-accent px-5 py-2 text-sm font-semibold transition-colors hover:bg-white hover:text-black disabled:opacity-50"
          >
            {status === "saving" ? "저장 중..." : "저장"}
          </button>
          <button onClick={logout} className="text-sm text-neutral-400 hover:text-white">
            로그아웃
          </button>
        </div>
      </header>

      {!storeReady && (
        <div className="border-b border-yellow-700/50 bg-yellow-900/20 px-6 py-3 text-sm text-yellow-300">
          ⚠️ DB(KV)가 아직 연결되지 않았습니다. Vercel에서 KV 스토어를 연결하면 저장이 활성화됩니다.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[440px_1fr]">
        {/* 편집 패널 */}
        <div className="max-h-[calc(100vh-65px)] space-y-10 overflow-y-auto border-r border-neutral-800 p-6">
          {/* HERO */}
          <Panel title="홈 · Hero (메인 첫 화면)">
            <FieldLabel>헤드라인 (줄별)</FieldLabel>
            <ListEditor
              items={hero.lines}
              onChange={(lines) => setHero({ lines })}
              render={(value, onChange, remove) => (
                <div className="flex gap-2">
                  <input className={INPUT} value={value} onChange={(e) => onChange(e.target.value)} />
                  <RemoveBtn onClick={remove} />
                </div>
              )}
              empty=""
              addLabel="줄 추가"
            />
            <TwoCol>
              <Text label="태그라인 1줄" value={hero.taglineLine1} onChange={(v) => setHero({ taglineLine1: v })} />
              <Text label="태그라인 2줄" value={hero.taglineLine2} onChange={(v) => setHero({ taglineLine2: v })} />
            </TwoCol>
            <TwoCol>
              <Text label="버튼 문구 (비우면 숨김)" value={hero.buttonText} onChange={(v) => setHero({ buttonText: v })} />
              <Text label="버튼 링크" value={hero.buttonHref} onChange={(v) => setHero({ buttonHref: v })} />
            </TwoCol>
          </Panel>

          {/* ABOUT */}
          <Panel title="홈 · About 섹션">
            <TwoCol>
              <Text label="제목 1줄" value={about.headlineLine1} onChange={(v) => setAbout({ headlineLine1: v })} />
              <Text label="제목 2줄" value={about.headlineLine2} onChange={(v) => setAbout({ headlineLine2: v })} />
            </TwoCol>

            <div>
              <FieldLabel>본문 내용</FieldLabel>
              <textarea
                className={`${INPUT} h-28 resize-none`}
                value={about.body}
                onChange={(e) => setAbout({ body: e.target.value })}
              />
            </div>

            <Select
              label="레이아웃"
              value={about.bodyPosition}
              onChange={(v) => setAbout({ bodyPosition: v as "right" | "below" })}
              options={[["right", "제목 옆 (2열)"], ["below", "제목 아래 (쌓기)"]]}
            />

            <TwoCol>
              <Select label="제목 정렬" value={about.headlineAlign} onChange={(v) => setAbout({ headlineAlign: v as Align })} options={ALIGN_OPTS} />
              <Select label="본문 정렬" value={about.bodyAlign} onChange={(v) => setAbout({ bodyAlign: v as Align })} options={ALIGN_OPTS} />
            </TwoCol>
            <TwoCol>
              <Select label="통계 정렬" value={about.statsAlign} onChange={(v) => setAbout({ statsAlign: v as Align })} options={ALIGN_OPTS} />
              <Select label="버튼 정렬" value={about.learnMoreAlign} onChange={(v) => setAbout({ learnMoreAlign: v as Align })} options={ALIGN_OPTS} />
            </TwoCol>

            <div>
              <FieldLabel>블록 순서 (드래그로 변경)</FieldLabel>
              <SortableRows
                items={about.blockOrder}
                labels={{ body: "본문", stats: "통계", learnMore: "Learn More 버튼" }}
                onReorder={(order) => setAbout({ blockOrder: order as AboutBlock[] })}
              />
            </div>

            <Range label={`본문 글자 크기: ${about.bodyFontPx}px`} min={14} max={32} value={about.bodyFontPx} onChange={(v) => setAbout({ bodyFontPx: v })} />
            <Range label={`본문 줄 간격: ${about.bodyLineHeight}`} min={1.1} max={2.2} step={0.05} value={about.bodyLineHeight} onChange={(v) => setAbout({ bodyLineHeight: v })} />
            <Range label={`통계 숫자 크기: ${about.statFontPx}px`} min={40} max={120} value={about.statFontPx} onChange={(v) => setAbout({ statFontPx: v })} />
            <Range label={`위쪽 여백: ${about.paddingTop}px`} min={0} max={240} step={8} value={about.paddingTop} onChange={(v) => setAbout({ paddingTop: v })} />
            <Range label={`아래쪽 여백: ${about.paddingBottom}px`} min={0} max={240} step={8} value={about.paddingBottom} onChange={(v) => setAbout({ paddingBottom: v })} />

            {/* 통계 항목 (추가/삭제) */}
            <div>
              <FieldLabel>통계 항목</FieldLabel>
              <ListEditor<StatItem>
                items={about.stats}
                onChange={(stats) => setAbout({ stats })}
                empty={{ useSymbol: false, value: 0, display: "", suffix: "+", label: "새 항목" }}
                addLabel="통계 추가"
                render={(item, onChange, remove) => (
                  <div className="rounded border border-neutral-700 bg-neutral-900 p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-xs text-neutral-300">
                        <input
                          type="checkbox"
                          checked={item.useSymbol}
                          onChange={(e) => onChange({ ...item, useSymbol: e.target.checked })}
                        />
                        기호로 표시 (예: ∞)
                      </label>
                      <RemoveBtn onClick={remove} />
                    </div>
                    {item.useSymbol ? (
                      <input className={INPUT} placeholder="기호 (예: ∞)" value={item.display} onChange={(e) => onChange({ ...item, display: e.target.value })} />
                    ) : (
                      <div className="flex gap-2">
                        <input type="number" className={INPUT} placeholder="숫자" value={item.value} onChange={(e) => onChange({ ...item, value: Number(e.target.value) })} />
                        <input className={`${INPUT} w-20`} placeholder="접미 (+)" value={item.suffix} onChange={(e) => onChange({ ...item, suffix: e.target.value })} />
                      </div>
                    )}
                    <input className={INPUT} placeholder="라벨" value={item.label} onChange={(e) => onChange({ ...item, label: e.target.value })} />
                  </div>
                )}
              />
            </div>

            <TwoCol>
              <Text label="Learn More 문구" value={about.learnMoreText} onChange={(v) => setAbout({ learnMoreText: v })} />
              <div className="flex items-end pb-2">
                <label className="flex items-center gap-2 text-sm text-neutral-300">
                  <input type="checkbox" checked={about.showLearnMore} onChange={(e) => setAbout({ showLearnMore: e.target.checked })} />
                  Learn More 표시
                </label>
              </div>
            </TwoCol>
          </Panel>

          <p className="text-xs leading-relaxed text-neutral-500">
            ※ 저장을 눌러야 사이트에 반영됩니다. 다른 섹션은 순차 추가됩니다.
          </p>
        </div>

        {/* 미리보기 */}
        <div className="hidden bg-neutral-900 lg:block">
          <div className="px-4 py-2 text-xs text-neutral-500">미리보기 (저장 시 갱신)</div>
          <iframe key={previewKey} src="/" className="h-[calc(100vh-105px)] w-full border-0 bg-black" title="preview" />
        </div>
      </div>
    </div>
  );
}

/* ---------- 작은 UI 헬퍼들 ---------- */

const INPUT =
  "w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white focus:border-brand-accent focus:outline-none";

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-brand-accent">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-xs font-medium text-neutral-400">{children}</label>;
}

function TwoCol({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-3">{children}</div>;
}

function Text({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input className={INPUT} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <select className={INPUT} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([v, l]) => (
          <option key={v} value={v}>
            {l}
          </option>
        ))}
      </select>
    </div>
  );
}

function Range({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-brand-accent"
      />
    </div>
  );
}

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 rounded border border-neutral-700 px-2 text-sm text-neutral-400 hover:border-brand-accent hover:text-brand-accent"
      title="삭제"
    >
      ✕
    </button>
  );
}

function SortableRows({
  items,
  labels,
  onReorder,
}: {
  items: string[];
  labels: Record<string, string>;
  onReorder: (items: string[]) => void;
}) {
  const [drag, setDrag] = useState<number | null>(null);
  const move = (from: number, to: number) => {
    const arr = [...items];
    const [x] = arr.splice(from, 1);
    arr.splice(to, 0, x);
    onReorder(arr);
  };
  return (
    <div className="space-y-1.5">
      {items.map((key, i) => (
        <div
          key={key}
          draggable
          onDragStart={() => setDrag(i)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => {
            if (drag !== null && drag !== i) move(drag, i);
            setDrag(null);
          }}
          className={`flex cursor-grab items-center gap-2 rounded border bg-neutral-900 px-3 py-2 text-sm active:cursor-grabbing ${
            drag === i ? "border-brand-accent" : "border-neutral-700"
          }`}
        >
          <span className="text-neutral-500">⠿</span>
          {labels[key] ?? key}
        </div>
      ))}
    </div>
  );
}

function ListEditor<T>({
  items,
  onChange,
  render,
  empty,
  addLabel,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  render: (item: T, onItemChange: (v: T) => void, remove: () => void) => React.ReactNode;
  empty: T;
  addLabel: string;
}) {
  const update = (i: number, v: T) => onChange(items.map((it, idx) => (idx === i ? v : it)));
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const add = () =>
    onChange([...items, typeof empty === "object" ? ({ ...empty } as T) : empty]);

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i}>{render(item, (v) => update(i, v), () => remove(i))}</div>
      ))}
      <button
        type="button"
        onClick={add}
        className="w-full rounded border border-dashed border-neutral-700 py-2 text-sm text-neutral-400 hover:border-brand-accent hover:text-brand-accent"
      >
        + {addLabel}
      </button>
    </div>
  );
}
