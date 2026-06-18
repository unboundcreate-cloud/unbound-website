"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { works } from "@/data/works";
import type { Work, WorkCategory } from "@/data/works";

// ─── Constants ────────────────────────────────────────────────────────────────

const KAKAO_URL = "https://pf.kakao.com/_xejmXX/chat";

// ─── Screen / step types ──────────────────────────────────────────────────────

type Screen = "home" | "faq" | "consult";
type ConsultStep =
  | "service"
  | "duration"
  | "budget"
  | "reference"
  | "contact"
  | "submitting"
  | "done";

// ─── FAQ data ─────────────────────────────────────────────────────────────────

type Category = "서비스" | "프로젝트" | "상담";

interface QnAItem {
  id: string;
  question: string;
  answer: string;
  category: Category;
  nextIds: string[];
}

const QNA_LIST: QnAItem[] = [
  { id: "q1",  question: "Unbound Studio는 어떤 회사인가요?",   answer: "경계 없는 창의성, 무한한 가능성으로 이야기를 살리는 영상제작스튜디오입니다. 모션그래픽스, 4K/8K 영상 제작, AI 기술을 활용한 차별화된 콘텐츠를 제공합니다.", category: "서비스",   nextIds: ["q2","q3","q7"] },
  { id: "q2",  question: "주요 서비스가 무엇인가요?",            answer: "① 모션 그래픽스  ② 영상 포스트 프로덕션  ③ AI 콘텐츠 생성  ④ 기업 홍보영상  ⑤ 제품 영상 등을 제공합니다.", category: "서비스",   nextIds: ["q3","q5","q4"] },
  { id: "q3",  question: "AI 기술을 어떻게 활용하나요?",         answer: "Kling, Midjourney, Runway, Zenspark 등 최신 AI 도구로 혁신적인 영상을 제작합니다. 빠른 제작 속도와 창의적인 표현이 가능합니다.", category: "서비스",   nextIds: ["q6","q7","q10"] },
  { id: "q4",  question: "포트폴리오를 볼 수 있나요?",           answer: "네, 웹사이트의 포트폴리오 메뉴에서 KT Enterprise, Corning, SK Signet 등 주요 프로젝트를 확인하실 수 있습니다.", category: "서비스",   nextIds: ["q7","q5","q10"] },
  { id: "q5",  question: "프로젝트는 어떻게 진행되나요?",        answer: "상담 및 기획 → 구성안/스토리보드 → 제작 → 포스트 프로덕션 → 최종 검수 순으로 진행됩니다.", category: "프로젝트", nextIds: ["q6","q9","q10"] },
  { id: "q6",  question: "제작 기간은 얼마나 걸리나요?",         answer: "프로젝트 규모에 따라 다릅니다. 간단한 영상은 2~3일, 복잡한 프로젝트는 2~8주가 소요될 수 있습니다.", category: "프로젝트", nextIds: ["q8","q9","q10"] },
  { id: "q7",  question: "어떤 기업들과 일했나요?",              answer: "KT Enterprise, Corning, SK Signet, GS Caltex, Karcher, dsm-firmenich, Macrogen 등 국내외 주요 B2B 기업들과 협력해왔습니다.", category: "프로젝트", nextIds: ["q4","q2","q13"] },
  { id: "q8",  question: "영상 길이는 제한이 있나요?",           answer: "없습니다. 15초 숏폼부터 5분 이상의 장편 다큐멘터리까지 모두 제작 가능합니다.", category: "프로젝트", nextIds: ["q6","q9","q5"] },
  { id: "q9",  question: "수정/재작업은 가능한가요?",            answer: "네, 계약 범위 내에서 합리적인 수정은 포함됩니다. 상담 시 구체적인 수정 횟수를 함께 정의합니다.", category: "프로젝트", nextIds: ["q5","q10","q11"] },
  { id: "q10", question: "견적은 어떻게 받나요?",               answer: "문의하기를 통해 프로젝트 상세정보(목표·예산·기간·스타일)를 공유해 주시면 당일 내 견적을 드립니다. 카카오 채널로 연락주셔도 됩니다.", category: "상담",    nextIds: ["q11","q12","q13"] },
  { id: "q11", question: "상담은 무료인가요?",                   answer: "네, 초기 상담은 완전 무료입니다. 커피 한 잔 마시며 편하게 대화해요 ☕", category: "상담",    nextIds: ["q10","q12","q13"] },
  { id: "q12", question: "야간/주말 상담도 가능한가요?",          answer: "프로젝트 상황에 따라 협의 가능합니다. 카카오 채널로 연락주시면 일정을 조율해드립니다.", category: "상담",    nextIds: ["q11","q10","q13"] },
  { id: "q13", question: "협력사/파트너십이 가능한가요?",         answer: "네, 협력 가능한 프로젝트는 기꺼이 함께합니다. 카카오 채널이나 이메일로 편하게 연락주세요.", category: "상담",    nextIds: ["q10","q11","q12"] },
];

const QNA: Record<string, QnAItem> = {};
for (const item of QNA_LIST) QNA[item.id] = item;

const INITIAL_IDS: string[] = ["q1", "q2", "q5", "q10"];

const CAT_STYLE: Record<Category, string> = {
  서비스:   "text-sky-400/70 border-sky-400/20 bg-sky-400/[0.06]",
  프로젝트: "text-emerald-400/70 border-emerald-400/20 bg-emerald-400/[0.06]",
  상담:     "text-amber-300/70 border-amber-300/20 bg-amber-300/[0.06]",
};

// ─── Consult data ─────────────────────────────────────────────────────────────

interface ConsultAnswers {
  service: string;
  duration: string;
  budget: string;
  reference: string;
  name: string;
  email: string;
}

const BLANK: ConsultAnswers = {
  service: "", duration: "", budget: "", reference: "", name: "", email: "",
};

const SERVICE_OPTIONS = [
  { label: "모션그래픽 / 타이틀", icon: "✦" },
  { label: "기업 / 브랜드 홍보",   icon: "◎" },
  { label: "광고 / 상업영상",       icon: "▶" },
  { label: "AI 활용 영상",          icon: "◈" },
  { label: "공공기관 / 교육",       icon: "◉" },
  { label: "숏폼 / SNS 콘텐츠",    icon: "◇" },
];

const DURATION_OPTIONS = ["15초 이하", "30초", "1분", "2~3분", "5분 이상", "미정"];

const BUDGET_OPTIONS = [
  "500만원 미만",
  "500만 ~ 1,500만원",
  "1,500만 ~ 5,000만원",
  "5,000만원 이상",
  "미정 · 협의 후 결정",
];

const CONSULT_STEPS: ConsultStep[] = [
  "service", "duration", "budget", "reference", "contact",
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
  "모션그래픽 / 타이틀": ["모션그래픽", "Opening Title"],
  "기업 / 브랜드 홍보":   ["홍보", "브랜드", "B2B"],
  "광고 / 상업영상":       ["광고", "브랜드필름"],
  "AI 활용 영상":          ["AI"],
  "공공기관 / 교육":       ["채용", "인포그래픽"],
  "숏폼 / SNS 콘텐츠":    ["숏폼"],
};

function getRecommended(service: string): Work[] {
  const cats: WorkCategory[] = CAT_MAP[service] ?? [];
  const tags: string[]        = TAG_MAP[service] ?? [];
  const eligible = works.filter((w) => w.thumbnailUrl && w.videoUrl);
  const scored = eligible.map((w) => {
    let s = 0;
    if (cats.includes(w.category)) s += 3;
    for (const t of tags) if (w.tags.some((wt) => wt.includes(t) || t.includes(wt))) s += 2;
    if (w.featured) s += 1;
    return { w, s };
  });
  const top = scored.sort((a, b) => b.s - a.s).slice(0, 2).map((x) => x.w);
  if (top.length < 2) {
    const extra = eligible.filter((w) => w.featured && !top.includes(w));
    top.push(...extra.slice(0, 2 - top.length));
  }
  return top;
}

// ─── Animation variants ───────────────────────────────────────────────────────

const screenFade = {
  enter:  { opacity: 0, y: 8 },
  center: { opacity: 1, y: 0, transition: { duration: 0.22 } },
  exit:   { opacity: 0, y: -5, transition: { duration: 0.14 } },
};

const msgV = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const listV = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.075, delayChildren: 0.1 } },
};
const itemV = {
  hidden: { opacity: 0, y: 7 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

// ─── Typing text ──────────────────────────────────────────────────────────────

function TypingText({ text, onDone }: { text: string; onDone?: () => void }) {
  const [count, setCount] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => { setCount(0); }, [text]);

  useEffect(() => {
    if (count >= text.length) { doneRef.current?.(); return; }
    const ms = Math.max(8, Math.min(22, 900 / text.length));
    const t = setTimeout(() => setCount((n) => Math.min(n + 1, text.length)), ms);
    return () => clearTimeout(t);
  }, [count, text]);

  return (
    <>
      {text.slice(0, count)}
      {count < text.length && (
        <span className="ml-0.5 inline-block h-[13px] w-[1.5px] translate-y-[1px] animate-pulse bg-white/50" />
      )}
    </>
  );
}

// ─── Tiny shared components ───────────────────────────────────────────────────

function BotDot() {
  return (
    <div className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-accent/90 text-[8px] font-bold text-white">
      U
    </div>
  );
}

function KakaoIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 flex-none">
      <path d="M10 2C5.58 2 2 5.16 2 9.04c0 2.47 1.4 4.64 3.54 5.93l-.9 3.37a.3.3 0 0 0 .44.34L9.2 16.4c.26.03.53.05.8.05 4.42 0 8-3.16 8-7.04C18 5.16 14.42 2 10 2z" />
    </svg>
  );
}

// Chip (auto-advance on click)
function Chip({ icon, label, active, onClick }: { icon?: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col gap-1.5 rounded-xl border px-3 py-3 text-left transition-all duration-150 ${
        active
          ? "border-brand-accent bg-brand-accent/10 text-white"
          : "border-white/10 bg-white/[0.025] text-white/50 hover:border-white/20 hover:text-white"
      }`}
    >
      {icon && <span className="text-sm leading-none text-brand-accent/70">{icon}</span>}
      <span className="text-[11.5px] font-medium leading-snug">{label}</span>
    </button>
  );
}

// Row (auto-advance on click)
function RowBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all duration-150 ${
        active
          ? "border-brand-accent bg-brand-accent/10 text-white"
          : "border-white/10 bg-white/[0.025] text-white/50 hover:border-white/20 hover:text-white"
      }`}
    >
      <span className="text-[12px] font-medium">{label}</span>
      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.7} className={`h-3.5 w-3.5 ${active ? "text-brand-accent" : "text-white/18"}`}>
        <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

// Consult step label
function StepQ({ num, text, sub }: { num: string; text: string; sub?: string }) {
  return (
    <div className="mb-4">
      <p className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-brand-accent/55">{num}</p>
      <p className="mt-1 text-[15px] font-medium leading-snug text-white">{text}</p>
      {sub && <p className="mt-0.5 text-[11px] text-white/35">{sub}</p>}
    </div>
  );
}

// ─── ChatBot ──────────────────────────────────────────────────────────────────

export function ChatBot() {
  const [open, setOpen]             = useState(false);
  const [screen, setScreen]         = useState<Screen>("home");

  // FAQ
  const [faqHistory, setFaqHistory]         = useState<string[]>([]);
  const [faqTypingDone, setFaqTypingDone]   = useState(true);

  // Consult
  const [cStep, setCStep]           = useState<ConsultStep>("service");
  const [cAns, setCAns]             = useState<ConsultAnswers>(BLANK);
  const [cError, setCError]         = useState<string | null>(null);
  const [recommended, setRecommended] = useState<Work[]>([]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [faqHistory, faqTypingDone, cStep, open]);

  function reset() {
    setScreen("home");
    setFaqHistory([]);
    setFaqTypingDone(true);
    setCStep("service");
    setCAns(BLANK);
    setCError(null);
  }

  function closeWidget() {
    setOpen(false);
    setTimeout(reset, 400);
  }

  // ── FAQ helpers ──────────────────────────────────────────────────────────────

  function goFaq(qid: string) {
    setFaqTypingDone(false);
    setFaqHistory([qid]);
    setScreen("faq");
  }

  function faqSelect(qid: string) {
    setFaqTypingDone(false);
    setFaqHistory((h) => [...h, qid]);
  }

  const faqOptions: string[] =
    faqHistory.length === 0
      ? INITIAL_IDS
      : (QNA[faqHistory[faqHistory.length - 1]]?.nextIds ?? INITIAL_IDS);

  // ── Consult helpers ──────────────────────────────────────────────────────────

  function goConsult() {
    setCAns(BLANK);
    setCStep("service");
    setCError(null);
    setScreen("consult");
  }

  function cSet<K extends keyof ConsultAnswers>(k: K, v: string) {
    setCAns((a) => ({ ...a, [k]: v }));
  }

  function cChoose<K extends keyof ConsultAnswers>(k: K, v: string, next: ConsultStep) {
    setCAns((a) => ({ ...a, [k]: v }));
    setTimeout(() => setCStep(next), 120);
  }

  function cBack() {
    const idx = CONSULT_STEPS.indexOf(cStep);
    if (idx <= 0) { setScreen("home"); }
    else { setCStep(CONSULT_STEPS[idx - 1]); }
  }

  async function cSubmit() {
    setCError(null);
    if (!cAns.name.trim())  { setCError("이름을 입력해주세요."); return; }
    if (!cAns.email.trim()) { setCError("이메일을 입력해주세요."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cAns.email)) {
      setCError("올바른 이메일 형식이 아닙니다."); return;
    }

    setCStep("submitting");
    setRecommended(getRecommended(cAns.service));

    const msgLines = [
      "[챗봇 프로젝트 상담]",
      "",
      `영상 유형: ${cAns.service}`,
      `영상 길이: ${cAns.duration}`,
      `예산 범위: ${cAns.budget}`,
      cAns.reference ? `레퍼런스: ${cAns.reference}` : "",
    ].filter(Boolean).join("\n");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cAns.name, email: cAns.email,
          service: cAns.service, budget: cAns.budget,
          message: msgLines,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "전송 실패");
      }
      setCStep("done");
    } catch (e) {
      setCError(e instanceof Error ? e.message : "전송에 실패했습니다.");
      setCStep("contact");
    }
  }

  const cIdx = CONSULT_STEPS.indexOf(cStep);
  const showReset = screen !== "home";

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="fixed bottom-6 right-6 z-[9990] flex flex-col items-end">
      {/* ── Widget ────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1     }}
            exit={{    opacity: 0, y: 18, scale: 0.96  }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 flex h-[600px] w-[368px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d0d] shadow-[0_24px_72px_rgba(0,0,0,0.85)]"
          >
            {/* Header */}
            <div className="flex flex-none items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-accent text-[9px] font-bold text-white">U</div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-[1.5px] border-[#0d0d0d] bg-emerald-400" />
                </div>
                <div>
                  <p className="font-display text-[11px] uppercase tracking-[0.2em] text-white">Unbound Studio</p>
                  <p className="mt-0.5 text-[9px] leading-none text-white/30">온라인 · 지금 바로 답변 가능</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {showReset && (
                  <button onClick={reset} aria-label="처음으로" title="처음으로"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-white/25 transition-colors hover:bg-white/5 hover:text-white/60">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-3.5 w-3.5">
                      <path d="M4 10a6 6 0 1 1 1.8 4.3M4 6v4h4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
                <button onClick={closeWidget} aria-label="닫기"
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition-colors hover:bg-white/5 hover:text-white/80">
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                    <path d="M15 5L5 15M5 5l10 10" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <AnimatePresence mode="wait" initial={false}>

                {/* ══ HOME ══════════════════════════════════════════════════════════ */}
                {screen === "home" && (
                  <motion.div
                    key="home"
                    variants={screenFade} initial="enter" animate="center" exit="exit"
                    className="px-5 py-5 space-y-4"
                  >
                    {/* Greeting */}
                    <motion.div initial="hidden" animate="show" variants={msgV} className="flex gap-3">
                      <BotDot />
                      <p className="pt-0.5 text-[13px] leading-[1.8] text-white/70">
                        안녕하세요! 👋&nbsp;&nbsp;Unbound Studio입니다.
                        <br />무엇을 도와드릴까요?
                      </p>
                    </motion.div>

                    {/* Consult CTA — primary action, always above the fold */}
                    <motion.div
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18, duration: 0.28, ease: "easeOut" }}
                    >
                      <button
                        onClick={goConsult}
                        className="group flex w-full items-center justify-between rounded-xl border border-brand-accent/25 bg-brand-accent/[0.07] px-4 py-3.5 transition-all hover:border-brand-accent/50 hover:bg-brand-accent/10"
                      >
                        <div className="text-left">
                          <p className="text-[13px] font-semibold text-white/85 transition-colors group-hover:text-white">
                            프로젝트 상담 시작하기
                          </p>
                          <p className="mt-0.5 text-[10.5px] text-white/35">
                            영상 유형 · 길이 · 예산 · 레퍼런스 입력 → 이메일 접수
                          </p>
                        </div>
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.7}
                          className="h-4 w-4 flex-none text-brand-accent/40 transition-colors group-hover:text-brand-accent">
                          <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </motion.div>

                    {/* Divider */}
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-white/[0.07]" />
                      <span className="text-[9px] text-white/20">자주 묻는 질문</span>
                      <div className="h-px flex-1 bg-white/[0.07]" />
                    </div>

                    {/* FAQ quick options */}
                    <motion.div initial="hidden" animate="show" variants={listV}>
                      {INITIAL_IDS.map((qid) => {
                        const item = QNA[qid];
                        if (!item) return null;
                        return (
                          <motion.button
                            key={qid}
                            variants={itemV}
                            onClick={() => goFaq(qid)}
                            className="group flex w-full items-center justify-between gap-3 border-b border-white/[0.06] py-2.5 text-left last:border-0"
                          >
                            <span className="text-[12px] leading-snug text-white/40 transition-colors duration-200 group-hover:text-white/80">
                              {item.question}
                            </span>
                            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.7}
                              className="h-3.5 w-3.5 flex-none text-white/15 transition-colors duration-200 group-hover:text-white/40">
                              <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                )}

                {/* ══ FAQ ═══════════════════════════════════════════════════════════ */}
                {screen === "faq" && (
                  <motion.div
                    key="faq"
                    variants={screenFade} initial="enter" animate="center" exit="exit"
                    className="px-5 py-5 space-y-5"
                  >
                    {/* Greeting (context) */}
                    <div className="flex gap-3">
                      <BotDot />
                      <p className="pt-0.5 text-[13px] leading-[1.8] text-white/70">
                        안녕하세요! 👋 무엇을 도와드릴까요?
                      </p>
                    </div>

                    {/* History */}
                    {faqHistory.map((qid, i) => {
                      const item = QNA[qid];
                      if (!item) return null;
                      const isLatest = i === faqHistory.length - 1;
                      return (
                        <motion.div key={i} initial="hidden" animate="show" variants={msgV} className="space-y-4">
                          {/* User bubble */}
                          <div className="flex justify-end">
                            <div className="max-w-[78%] rounded-2xl rounded-tr-sm bg-white/[0.07] px-4 py-2.5 text-[13px] leading-snug text-white/80 ring-1 ring-white/[0.06]">
                              {item.question}
                            </div>
                          </div>
                          {/* Bot answer */}
                          <div className="flex gap-3">
                            <BotDot />
                            <div className="flex-1 space-y-2.5 pt-0.5">
                              <p className="text-[13px] leading-[1.8] text-white/70">
                                {isLatest
                                  ? <TypingText text={item.answer} onDone={() => setFaqTypingDone(true)} />
                                  : item.answer}
                              </p>
                              {(!isLatest || faqTypingDone) && (
                                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex flex-col gap-2">
                                  <span className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${CAT_STYLE[item.category]}`}>
                                    {item.category}
                                  </span>
                                  {item.category === "상담" && (
                                    <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer"
                                      className="inline-flex w-fit items-center gap-2 rounded-lg border border-amber-300/20 bg-amber-300/[0.05] px-3 py-2 text-[11px] font-medium text-amber-300/65 transition-all hover:border-amber-300/35 hover:bg-amber-300/[0.09]">
                                      <KakaoIcon />카카오 채널로 바로 문의하기 →
                                    </a>
                                  )}
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}

                    {/* Next options */}
                    <AnimatePresence>
                      {faqTypingDone && (
                        <motion.div key="opts" initial="hidden" animate="show" exit={{ opacity: 0, transition: { duration: 0.1 } }} variants={listV} className="pt-1">
                          <motion.p variants={itemV} className="mb-2.5 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/22">
                            {faqHistory.length === 0 ? "궁금한 것을 선택해 주세요" : "이런 것도 궁금하신가요?"}
                          </motion.p>
                          {faqOptions.map((qid) => {
                            const item = QNA[qid];
                            if (!item) return null;
                            return (
                              <motion.button key={qid} variants={itemV} onClick={() => faqSelect(qid)}
                                className="group flex w-full items-center justify-between gap-3 border-b border-white/[0.06] py-3 text-left last:border-0">
                                <span className="text-[12px] leading-snug text-white/42 transition-colors duration-200 group-hover:text-white/80">{item.question}</span>
                                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-3.5 w-3.5 flex-none text-white/15 transition-colors duration-200 group-hover:text-white/45">
                                  <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </motion.button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* ══ CONSULT ═══════════════════════════════════════════════════════ */}
                {screen === "consult" && (
                  <motion.div
                    key="consult"
                    variants={screenFade} initial="enter" animate="center" exit="exit"
                    className="flex h-full flex-col px-5 py-5"
                  >
                    {/* Progress bar */}
                    {cIdx >= 0 && (
                      <div className="mb-5 flex gap-1.5">
                        {CONSULT_STEPS.map((_, i) => (
                          <div key={i} className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${i <= cIdx ? "bg-brand-accent" : "bg-white/10"}`} />
                        ))}
                      </div>
                    )}

                    {/* Back button */}
                    {cStep !== "done" && cStep !== "submitting" && (
                      <button onClick={cBack} className="mb-4 flex items-center gap-1.5 text-[11px] text-white/28 transition-colors hover:text-white/60">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-3.5 w-3.5">
                          <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        이전
                      </button>
                    )}

                    <AnimatePresence mode="wait" initial={false}>

                      {/* 01 영상 유형 */}
                      {cStep === "service" && (
                        <motion.div key="cs-service" variants={screenFade} initial="enter" animate="center" exit="exit">
                          <StepQ num="01" text="어떤 영상을 만들고 싶으신가요?" />
                          <div className="grid grid-cols-3 gap-2">
                            {SERVICE_OPTIONS.map((o) => (
                              <Chip key={o.label} icon={o.icon} label={o.label} active={cAns.service === o.label}
                                onClick={() => cChoose("service", o.label, "duration")} />
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* 02 영상 길이 */}
                      {cStep === "duration" && (
                        <motion.div key="cs-duration" variants={screenFade} initial="enter" animate="center" exit="exit">
                          <StepQ num="02" text="영상 길이는 어느 정도인가요?" />
                          <div className="grid grid-cols-3 gap-2">
                            {DURATION_OPTIONS.map((o) => (
                              <Chip key={o} label={o} active={cAns.duration === o}
                                onClick={() => cChoose("duration", o, "budget")} />
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* 03 예산 */}
                      {cStep === "budget" && (
                        <motion.div key="cs-budget" variants={screenFade} initial="enter" animate="center" exit="exit">
                          <StepQ num="03" text="예산 범위는 어느 정도인가요?" />
                          <div className="flex flex-col gap-2">
                            {BUDGET_OPTIONS.map((o) => (
                              <RowBtn key={o} label={o} active={cAns.budget === o}
                                onClick={() => cChoose("budget", o, "reference")} />
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* 04 레퍼런스 */}
                      {cStep === "reference" && (
                        <motion.div key="cs-ref" variants={screenFade} initial="enter" animate="center" exit="exit">
                          <StepQ num="04" text="레퍼런스 영상 링크가 있으신가요?" sub="YouTube URL, 인스타그램 링크, 키워드 모두 가능해요 — 선택 사항입니다." />
                          <div className="group relative border-b border-white/20">
                            <input
                              type="text"
                              value={cAns.reference}
                              onChange={(e) => cSet("reference", e.target.value)}
                              placeholder="https://youtu.be/... 또는 참고 키워드"
                              className="peer w-full bg-transparent py-3 text-[13px] text-white placeholder:text-white/25 focus:outline-none"
                            />
                            <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-brand-accent transition-[width] duration-[1200ms] ease-[cubic-bezier(0.37,0,0.63,1)] peer-focus:w-full" />
                          </div>
                          <div className="mt-5 flex gap-3">
                            <button onClick={() => setCStep("contact")}
                              className="rounded-full bg-brand-accent px-6 py-2 font-display text-[11px] uppercase tracking-widest text-white transition-opacity hover:opacity-80">
                              다음
                            </button>
                            <button onClick={() => { cSet("reference", ""); setCStep("contact"); }}
                              className="text-[11px] text-white/28 transition-colors hover:text-white/55">
                              건너뛰기
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* 05 연락처 */}
                      {cStep === "contact" && (
                        <motion.div key="cs-contact" variants={screenFade} initial="enter" animate="center" exit="exit">
                          <StepQ num="05" text="연락처를 남겨주세요." sub="빠른 시일 내에 담당자가 연락드립니다." />
                          <div className="space-y-5">
                            <LineInput label="이름 *" placeholder="Name" value={cAns.name} onChange={(v) => cSet("name", v)} />
                            <LineInput label="이메일 *" placeholder="you@email.com" type="email" value={cAns.email} onChange={(v) => cSet("email", v)} />
                          </div>
                          {cError && <p className="mt-3 text-[11px] text-red-400">{cError}</p>}
                          <div className="mt-5 flex items-center gap-2.5">
                            <button onClick={cSubmit}
                              disabled={!cAns.name.trim() || !cAns.email.trim()}
                              className="rounded-full bg-brand-accent px-7 py-2.5 font-display text-[11px] uppercase tracking-widest text-white transition-opacity disabled:opacity-30 hover:opacity-80">
                              상담 신청하기
                            </button>
                            <span className="text-[10px] text-white/22">* 필수</span>
                          </div>
                        </motion.div>
                      )}

                      {/* Submitting */}
                      {cStep === "submitting" && (
                        <motion.div key="cs-loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="flex flex-col items-center py-16 text-center">
                          <div className="h-7 w-7 animate-spin rounded-full border-2 border-white/15 border-t-brand-accent" />
                          <p className="mt-4 text-[12px] text-white/35">전송 중...</p>
                        </motion.div>
                      )}

                      {/* Done */}
                      {cStep === "done" && (
                        <motion.div key="cs-done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                          <p className="font-display text-3xl uppercase text-brand-accent">Thank You</p>
                          <p className="mt-2 text-[12px] leading-relaxed text-white/55">
                            상담 신청이 완료되었습니다. 담당자가 확인 후 빠른 시일 내에 연락드리겠습니다.
                          </p>
                          <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-amber-300/20 bg-amber-300/[0.05] px-3 py-2 text-[11px] font-medium text-amber-300/65 transition-all hover:border-amber-300/35">
                            <KakaoIcon />카카오 채널로 추가 문의하기
                          </a>

                          {recommended.length > 0 && (
                            <div className="mt-5">
                              <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/28">
                                비슷한 영상 레퍼런스
                              </p>
                              <div className="grid grid-cols-2 gap-2.5">
                                {recommended.map((work) => (
                                  <Link key={work.id} href={`/works/${work.slug}`}
                                    className="group block overflow-hidden rounded-xl border border-white/10 transition-all hover:border-white/25">
                                    <div className="relative aspect-video overflow-hidden bg-white/5">
                                      <Image src={work.thumbnailUrl} alt={work.title} fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="160px" />
                                    </div>
                                    <div className="px-2.5 py-2">
                                      <p className="text-[9px] text-white/30">{work.client}</p>
                                      <p className="mt-0.5 line-clamp-2 text-[11px] font-medium leading-snug text-white/70">{work.title}</p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                              <Link href="/works" onClick={closeWidget}
                                className="mt-3 block text-[10.5px] text-white/28 transition-colors hover:text-white/55">
                                전체 포트폴리오 보기 →
                              </Link>
                            </div>
                          )}
                        </motion.div>
                      )}

                    </AnimatePresence>
                  </motion.div>
                )}

              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Footer */}
            <div className="flex-none border-t border-white/[0.07] px-4 py-3.5 space-y-1.5">
              <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-300/20 bg-amber-300/[0.05] py-2.5 text-[11px] font-semibold text-amber-300/65 transition-all hover:border-amber-300/35 hover:bg-amber-300/[0.09]">
                <KakaoIcon />카카오톡으로 문의하기
              </a>
              <Link href="/contact" onClick={closeWidget}
                className="flex w-full items-center justify-center py-1.5 text-[10.5px] text-white/22 transition-colors hover:text-white/50">
                온라인 문의하기 →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle button ──────────────────────────────────────────────────────── */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        aria-label={open ? "닫기" : "FAQ · 문의"}
        className="relative flex h-[54px] w-[54px] items-center justify-center rounded-full bg-brand-accent text-white shadow-[0_8px_28px_rgba(230,50,38,0.4)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.18 }}>
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                <path d="M15 5L5 15M5 5l10 10" strokeLinecap="round" />
              </svg>
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.18 }}>
              <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth={1.9} className="h-5 w-5">
                <path d="M20 14a2 2 0 0 1-2 2H6l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/50 opacity-60" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-white" />
          </span>
        )}
      </motion.button>
    </div>
  );
}

// ─── LineInput ────────────────────────────────────────────────────────────────

function LineInput({ label, placeholder, type = "text", value, onChange }: {
  label: string; placeholder: string; type?: string; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-muted">{label}</label>
      <div className="group relative border-b border-white/20">
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          className="peer w-full bg-transparent py-3 text-[13px] text-white placeholder:text-brand-muted/60 focus:outline-none" />
        <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-brand-accent transition-[width] duration-[1200ms] ease-[cubic-bezier(0.37,0,0.63,1)] [@media(hover:hover)]:group-hover:w-full peer-focus:w-full" />
      </div>
    </div>
  );
}
