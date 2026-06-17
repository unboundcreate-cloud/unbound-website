"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { works } from "@/data/works";
import type { Work, WorkCategory } from "@/data/works";

// ─── Constants ────────────────────────────────────────────────────────────────

const KAKAO_URL = "http://pf.kakao.com/_humXX";

// ─── Types ────────────────────────────────────────────────────────────────────

type Step =
  | "service"
  | "purpose"
  | "budget"
  | "timeline"
  | "contact"
  | "note"
  | "submitting"
  | "done";

interface Answers {
  service: string;
  purpose: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  note: string;
}

const BLANK: Answers = {
  service: "", purpose: "", budget: "", timeline: "",
  name: "", email: "", phone: "", company: "", note: "",
};

// ─── Step options ─────────────────────────────────────────────────────────────

const SERVICE_OPTIONS = [
  { label: "모션그래픽 / 타이틀", icon: "✦" },
  { label: "기업 / 브랜드 홍보",   icon: "◎" },
  { label: "광고 / 상업영상",       icon: "▶" },
  { label: "AI 활용 영상",          icon: "◈" },
  { label: "공공기관 / 교육",       icon: "◉" },
  { label: "숏폼 / SNS 콘텐츠",    icon: "◇" },
] as const;

const PURPOSE_OPTIONS = [
  "브랜드 인지도 향상",
  "제품 · 서비스 소개",
  "채용 홍보",
  "이벤트 · 캠페인",
  "방송 · 미디어용",
  "SNS 바이럴",
] as const;

const BUDGET_OPTIONS = [
  "500만원 미만",
  "500만 ~ 1,500만원",
  "1,500만 ~ 5,000만원",
  "5,000만원 이상",
  "미정 · 협의 후 결정",
] as const;

const TIMELINE_OPTIONS = [
  "1개월 이내",
  "1 ~ 2개월",
  "3개월 이상",
  "미정",
] as const;

const WIZARD_STEPS: Step[] = [
  "service", "purpose", "budget", "timeline", "contact", "note",
];

// ─── Portfolio recommendation ─────────────────────────────────────────────────

const CAT_MAP: Record<string, WorkCategory[]> = {
  "모션그래픽 / 타이틀": ["drama", "ai"],
  "기업 / 브랜드 홍보":   ["b2b", "promo"],
  "광고 / 상업영상":       ["promo"],
  "AI 활용 영상":          ["ai"],
  "공공기관 / 교육":       ["public"],
  "숏폼 / SNS 콘텐츠":    ["promo", "b2b"],
};

const TAG_MAP: Record<string, string[]> = {
  "모션그래픽 / 타이틀": ["모션그래픽", "Opening Title", "애니메이션"],
  "기업 / 브랜드 홍보":   ["홍보", "브랜드", "B2B"],
  "광고 / 상업영상":       ["광고", "브랜드필름"],
  "AI 활용 영상":          ["AI", "브랜드필름"],
  "공공기관 / 교육":       ["채용", "인포그래픽"],
  "숏폼 / SNS 콘텐츠":    ["숏폼", "B2C"],
};

function getRecommended(service: string): Work[] {
  const cats: WorkCategory[] = CAT_MAP[service] ?? [];
  const tags: string[]        = TAG_MAP[service] ?? [];

  const eligible = works.filter((w) => w.thumbnailUrl && w.videoUrl);

  const scored = eligible.map((w) => {
    let score = 0;
    if (cats.includes(w.category)) score += 3;
    for (const t of tags) {
      if (w.tags.some((wt) => wt.includes(t) || t.includes(wt))) score += 2;
    }
    if (w.featured) score += 1;
    return { w, score };
  });

  const top = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.w);

  // Pad with featured works if needed
  if (top.length < 3) {
    const extra = eligible.filter((w) => w.featured && !top.includes(w));
    top.push(...extra.slice(0, 3 - top.length));
  }

  return top;
}

// ─── Animation variant ────────────────────────────────────────────────────────

const slide = {
  enter:  { opacity: 0, y: 10 },
  center: { opacity: 1, y: 0,  transition: { duration: 0.22 } },
  exit:   { opacity: 0, y: -6, transition: { duration: 0.14 } },
};

// ─── Main component ───────────────────────────────────────────────────────────

export function ProjectConsultation() {
  const [step, setStep] = useState<Step>("service");
  const [answers, setAnswers] = useState<Answers>(BLANK);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof Answers>(k: K, v: string) {
    setAnswers((a) => ({ ...a, [k]: v }));
  }

  function goBack() {
    const idx = WIZARD_STEPS.indexOf(step);
    if (idx > 0) setStep(WIZARD_STEPS[idx - 1]);
  }

  function choose<K extends keyof Answers>(k: K, v: string, next: Step) {
    setAnswers((a) => ({ ...a, [k]: v }));
    setTimeout(() => setStep(next), 120);
  }

  async function submit() {
    setError(null);
    if (!answers.name.trim())  { setError("이름을 입력해주세요."); return; }
    if (!answers.email.trim()) { setError("이메일을 입력해주세요."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) {
      setError("올바른 이메일 형식이 아닙니다."); return;
    }

    setStep("submitting");

    const msgLines = [
      "[가이드 상담 via 웹사이트]",
      "",
      `서비스 유형: ${answers.service}`,
      `영상 목적: ${answers.purpose}`,
      `예산 범위: ${answers.budget}`,
      `마감 일정: ${answers.timeline}`,
    ];
    if (answers.note.trim()) {
      msgLines.push("", "추가 메모:", answers.note.trim());
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    answers.name,
          email:   answers.email,
          phone:   answers.phone,
          company: answers.company,
          service: answers.service,
          budget:  answers.budget,
          message: msgLines.join("\n"),
        }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "전송 실패");
      }
      setStep("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "전송에 실패했습니다.");
      setStep("contact");
    }
  }

  const currentIdx  = WIZARD_STEPS.indexOf(step);
  const recommended = answers.service ? getRecommended(answers.service) : [];

  return (
    <div className="relative min-h-[320px]">
      {/* Progress bar */}
      {currentIdx >= 0 && (
        <div className="mb-8 flex gap-1.5">
          {WIZARD_STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${
                i <= currentIdx ? "bg-brand-accent" : "bg-white/10"
              }`}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait" initial={false}>

        {/* ── 01 서비스 유형 ──────────────────────────────────── */}
        {step === "service" && (
          <motion.div key="service" variants={slide} initial="enter" animate="center" exit="exit">
            <QLabel num="01" text="어떤 영상을 만들고 싶으신가요?" />
            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {SERVICE_OPTIONS.map((o) => (
                <Chip
                  key={o.label}
                  icon={o.icon}
                  label={o.label}
                  active={answers.service === o.label}
                  onClick={() => choose("service", o.label, "purpose")}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* ── 02 영상 목적 ────────────────────────────────────── */}
        {step === "purpose" && (
          <motion.div key="purpose" variants={slide} initial="enter" animate="center" exit="exit">
            <BackBtn onClick={goBack} />
            <QLabel num="02" text="영상의 주요 목적은 무엇인가요?" />
            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {PURPOSE_OPTIONS.map((o) => (
                <Chip
                  key={o}
                  label={o}
                  active={answers.purpose === o}
                  onClick={() => choose("purpose", o, "budget")}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* ── 03 예산 ─────────────────────────────────────────── */}
        {step === "budget" && (
          <motion.div key="budget" variants={slide} initial="enter" animate="center" exit="exit">
            <BackBtn onClick={goBack} />
            <QLabel num="03" text="예산 범위는 어느 정도인가요?" />
            <div className="mt-6 flex flex-col gap-2">
              {BUDGET_OPTIONS.map((o) => (
                <RowBtn
                  key={o}
                  label={o}
                  active={answers.budget === o}
                  onClick={() => choose("budget", o, "timeline")}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* ── 04 타임라인 ──────────────────────────────────────── */}
        {step === "timeline" && (
          <motion.div key="timeline" variants={slide} initial="enter" animate="center" exit="exit">
            <BackBtn onClick={goBack} />
            <QLabel num="04" text="희망 마감 일정이 어떻게 되나요?" />
            <div className="mt-6 grid grid-cols-2 gap-2.5">
              {TIMELINE_OPTIONS.map((o) => (
                <Chip
                  key={o}
                  label={o}
                  active={answers.timeline === o}
                  onClick={() => choose("timeline", o, "contact")}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* ── 05 연락처 ────────────────────────────────────────── */}
        {step === "contact" && (
          <motion.div key="contact" variants={slide} initial="enter" animate="center" exit="exit">
            <BackBtn onClick={goBack} />
            <QLabel
              num="05"
              text="연락처를 남겨주세요."
              sub="빠른 시일 내에 담당자가 직접 연락드립니다."
            />
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <LineInput label="이름 *"      placeholder="Name"           value={answers.name}    onChange={(v) => set("name", v)}    />
              <LineInput label="이메일 *"    placeholder="you@email.com"  type="email" value={answers.email}   onChange={(v) => set("email", v)}   />
              <LineInput label="연락처"      placeholder="Phone number"   value={answers.phone}   onChange={(v) => set("phone", v)}   />
              <LineInput label="회사명"      placeholder="Company"        value={answers.company} onChange={(v) => set("company", v)} />
            </div>
            {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => setStep("note")}
                disabled={!answers.name.trim() || !answers.email.trim()}
                className="rounded-full bg-brand-accent px-8 py-2.5 font-display text-sm uppercase tracking-widest text-white transition-opacity disabled:opacity-30 hover:opacity-80"
              >
                다음
              </button>
              <span className="text-[11px] text-white/25">* 필수 항목</span>
            </div>
          </motion.div>
        )}

        {/* ── 06 추가 메모 (선택) ───────────────────────────────── */}
        {step === "note" && (
          <motion.div key="note" variants={slide} initial="enter" animate="center" exit="exit">
            <BackBtn onClick={goBack} />
            <QLabel
              num="06"
              text="추가로 전달할 내용이 있으신가요?"
              sub="레퍼런스 링크, 스타일 참고, 기타 요청 등 — 선택 사항입니다."
            />
            <textarea
              value={answers.note}
              onChange={(e) => set("note", e.target.value)}
              rows={5}
              placeholder="자유롭게 작성해주세요."
              className="mt-6 w-full resize-none rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3.5 text-sm text-white/85 placeholder:text-white/25 focus:border-brand-accent/40 focus:outline-none"
            />
            <div className="mt-6">
              <button
                onClick={submit}
                className="rounded-full bg-brand-accent px-10 py-3 font-display text-sm uppercase tracking-widest text-white transition-opacity hover:opacity-80"
              >
                상담 신청하기
              </button>
            </div>
          </motion.div>
        )}

        {/* ── 전송 중 ──────────────────────────────────────────── */}
        {step === "submitting" && (
          <motion.div
            key="submitting"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center py-20 text-center"
          >
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-white/15 border-t-brand-accent" />
            <p className="mt-4 text-sm text-white/40">전송 중...</p>
          </motion.div>
        )}

        {/* ── 완료 ──────────────────────────────────────────────── */}
        {step === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Success message */}
            <div className="mb-10">
              <p className="font-display text-4xl uppercase text-brand-accent md:text-5xl">
                Thank You
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
                상담 신청이 완료되었습니다. 담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.
              </p>
              <a
                href={KAKAO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-yellow-300/25 bg-yellow-300/[0.06] px-4 py-2 text-[12px] font-medium text-yellow-300/70 transition-all hover:border-yellow-300/40 hover:bg-yellow-300/10"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M10 2C5.58 2 2 5.16 2 9.04c0 2.47 1.4 4.64 3.54 5.93l-.9 3.37a.3.3 0 0 0 .44.34L9.2 16.4c.26.03.53.05.8.05 4.42 0 8-3.16 8-7.04C18 5.16 14.42 2 10 2z" />
                </svg>
                카카오 채널로 추가 문의하기
              </a>
            </div>

            {/* Portfolio recommendations */}
            {recommended.length > 0 && (
              <div>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                  비슷한 영상 레퍼런스 — 참고해 보세요
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {recommended.map((work) => (
                    <WorkCard key={work.id} work={work} />
                  ))}
                </div>
                <div className="mt-5">
                  <Link
                    href="/works"
                    className="text-sm text-white/30 transition-colors hover:text-white/60"
                  >
                    전체 포트폴리오 보기 →
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

// ─── Small sub-components ─────────────────────────────────────────────────────

function QLabel({ num, text, sub }: { num: string; text: string; sub?: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand-accent/60">{num}</p>
      <p className="mt-1.5 text-xl font-medium leading-snug text-white sm:text-2xl">{text}</p>
      {sub && <p className="mt-1 text-sm text-white/40">{sub}</p>}
    </div>
  );
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mb-5 flex items-center gap-1.5 text-[11px] text-white/30 transition-colors hover:text-white/60"
    >
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-3.5 w-3.5">
        <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      이전
    </button>
  );
}

function Chip({
  icon,
  label,
  active,
  onClick,
}: {
  icon?: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col gap-2 rounded-xl border px-4 py-4 text-left transition-all duration-150 ${
        active
          ? "border-brand-accent bg-brand-accent/10 text-white"
          : "border-white/10 bg-white/[0.025] text-white/55 hover:border-white/20 hover:text-white"
      }`}
    >
      {icon && (
        <span className="text-sm leading-none text-brand-accent/75">{icon}</span>
      )}
      <span className="text-[12px] font-medium leading-snug">{label}</span>
    </button>
  );
}

function RowBtn({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between rounded-xl border px-5 py-3.5 text-left transition-all duration-150 ${
        active
          ? "border-brand-accent bg-brand-accent/10 text-white"
          : "border-white/10 bg-white/[0.025] text-white/55 hover:border-white/20 hover:text-white"
      }`}
    >
      <span className="text-[13px] font-medium">{label}</span>
      <svg
        viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.7}
        className={`h-4 w-4 ${active ? "text-brand-accent" : "text-white/20"}`}
      >
        <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function LineInput({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-muted">
        {label}
      </label>
      <div className="group relative border-b border-white/20">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="peer w-full bg-transparent py-3 text-white placeholder:text-brand-muted/60 focus:outline-none"
        />
        <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-brand-accent transition-[width] duration-[1200ms] ease-[cubic-bezier(0.37,0,0.63,1)] [@media(hover:hover)]:group-hover:w-full peer-focus:w-full" />
      </div>
    </div>
  );
}

function WorkCard({ work }: { work: Work }) {
  return (
    <Link
      href={`/works/${work.slug}`}
      className="group block overflow-hidden rounded-xl border border-white/10 transition-all duration-200 hover:border-white/25"
    >
      <div className="relative aspect-video overflow-hidden bg-white/5">
        <Image
          src={work.thumbnailUrl}
          alt={work.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-white">
              <path d="M6.5 5.5l7 4.5-7 4.5V5.5z" />
            </svg>
          </span>
        </div>
      </div>
      <div className="px-3 py-2.5">
        <p className="text-[10px] text-white/30">{work.client}</p>
        <p className="mt-0.5 line-clamp-2 text-[12px] font-medium leading-snug text-white/75">
          {work.title}
        </p>
        <p className="mt-1.5 text-[10px] text-brand-accent/60">포트폴리오 보기 →</p>
      </div>
    </Link>
  );
}
