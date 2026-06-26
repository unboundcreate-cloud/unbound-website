"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useDragControls } from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────

const KAKAO_URL = "https://pf.kakao.com/_xejmXX/chat";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "서비스" | "프로젝트" | "상담";

interface QnAItem {
  id: string;
  question: string;
  answer: string;
  category: Category;
  nextIds: string[];
  cta?: { label: string; href: string };
}

// ─── Q&A Data ─────────────────────────────────────────────────────────────────

const QNA_LIST: QnAItem[] = [
  {
    id: "q1",
    question: "Unbound Studio는 어떤 회사인가요?",
    answer:
      "경계 없는 창의성, 무한한 가능성으로 이야기를 살리는 영상제작스튜디오입니다. 모션그래픽스, 4K/8K 영상 제작, AI 기술을 활용한 차별화된 콘텐츠를 제공합니다.",
    category: "서비스",
    nextIds: ["q2", "q3", "q4"],
  },
  {
    id: "q2",
    question: "주요 서비스가 무엇인가요?",
    answer:
      "① 모션 그래픽스  ② 영상 포스트 프로덕션  ③ AI 콘텐츠 생성  ④ 기업 홍보영상  ⑤ 제품 영상 등을 제공합니다.",
    category: "서비스",
    nextIds: ["q3", "q5", "q4"],
  },
  {
    id: "q3",
    question: "AI 기술을 어떻게 활용하나요?",
    answer:
      "Kling, Midjourney, Runway, Zenspark 등 최신 AI 도구로 혁신적인 영상을 제작합니다. 빠른 제작 속도와 창의적인 표현이 가능합니다.",
    category: "서비스",
    nextIds: ["q6", "q4", "q10"],
  },
  {
    id: "q4",
    question: "포트폴리오를 볼 수 있나요?",
    answer:
      "네, Works 메뉴에서 드라마 & 예능, 광고 & 홍보, B2B, AI, 공공 / 기관 등 다양한 분야의 작업물을 확인하실 수 있습니다.",
    category: "서비스",
    nextIds: ["q2", "q5", "q10"],
    cta: { label: "Works 보러가기", href: "/works" },
  },
  {
    id: "q5",
    question: "프로젝트는 어떻게 진행되나요?",
    answer:
      "상담 및 기획 → 구성안/스토리보드 → 제작 → 포스트 프로덕션 → 최종 검수 순으로 진행됩니다.",
    category: "프로젝트",
    nextIds: ["q6", "q9", "q10"],
  },
  {
    id: "q6",
    question: "제작 기간은 얼마나 걸리나요?",
    answer:
      "프로젝트 규모에 따라 다릅니다. 간단한 영상은 2~3일, 복잡한 프로젝트는 2~8주가 소요될 수 있습니다.",
    category: "프로젝트",
    nextIds: ["q8", "q9", "q10"],
  },
  {
    id: "q8",
    question: "영상 길이는 제한이 있나요?",
    answer:
      "없습니다. 15초 숏폼부터 5분 이상의 장편 다큐멘터리까지 모두 제작 가능합니다.",
    category: "프로젝트",
    nextIds: ["q6", "q9", "q5"],
  },
  {
    id: "q9",
    question: "수정/재작업은 가능한가요?",
    answer:
      "네, 계약 범위 내에서 합리적인 수정은 포함됩니다. 상담 시 구체적인 수정 횟수를 함께 정의합니다.",
    category: "프로젝트",
    nextIds: ["q5", "q10", "q12"],
  },
  {
    id: "q10",
    question: "견적은 어떻게 받나요?",
    answer:
      "문의하기를 통해 프로젝트 상세정보(목표·예산·기간·스타일)를 공유해 주시면 당일 내 견적을 드립니다. 챗봇에서 바로 상담을 시작하시거나 카카오 채널로 연락주셔도 됩니다.",
    category: "상담",
    nextIds: ["q12", "q13", "q5"],
  },
  {
    id: "q12",
    question: "야간/주말 상담도 가능한가요?",
    answer:
      "프로젝트 상황에 따라 협의 가능합니다. 카카오 채널로 연락주시면 일정을 조율해드립니다.",
    category: "상담",
    nextIds: ["q10", "q13", "q5"],
  },
  {
    id: "q13",
    question: "협력사/파트너십이 가능한가요?",
    answer:
      "네, 협력 가능한 프로젝트는 기꺼이 함께합니다. 카카오 채널이나 이메일로 편하게 연락주세요.",
    category: "상담",
    nextIds: ["q10", "q12", "q5"],
  },
];

const QNA: Record<string, QnAItem> = {};
for (const item of QNA_LIST) {
  QNA[item.id] = item;
}

const INITIAL_IDS: string[] = ["q1", "q2", "q5", "q10"];

// ─── Consult wizard ───────────────────────────────────────────────────────────

const SERVICE_OPTS: string[] = [
  "모션그래픽 / 타이틀",
  "기업 / 브랜드 홍보",
  "광고 / 상업영상",
  "AI 활용 영상",
  "공공기관 / 교육",
  "숏폼 / SNS 콘텐츠",
];

const DURATION_OPTS: string[] = ["15초 이하", "30초", "1분", "2~3분", "5분 이상", "미정"];

const BUDGET_OPTS: string[] = [
  "500만원 미만",
  "500만 ~ 1,500만원",
  "1,500만 ~ 5,000만원",
  "5,000만원 이상",
  "미정 · 협의 후 결정",
];

const DEADLINE_OPTS: string[] = [
  "1주 이내",
  "1개월 이내",
  "3개월 이내",
  "협의 후 결정",
];

// ─── Category badge styles ─────────────────────────────────────────────────────

const CAT_STYLE: Record<Category, string> = {
  서비스: "text-blue-400/70 border-blue-400/20 bg-blue-400/[0.07]",
  프로젝트: "text-emerald-400/70 border-emerald-400/20 bg-emerald-400/[0.07]",
  상담: "text-yellow-300/70 border-yellow-300/20 bg-yellow-300/[0.07]",
};

// ─── Icon components ──────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
      <path d="M15 5L5 15M5 5l10 10" strokeLinecap="round" />
    </svg>
  );
}

function ChevRight() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-3.5 w-3.5 flex-none text-white/25">
      <path d="M7 15l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-3.5 w-3.5">
      <path d="M4 10a6 6 0 1 1 1.8 4.3M4 6v4h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function KakaoIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 flex-none">
      <path d="M10 2C5.58 2 2 5.16 2 9.04c0 2.47 1.4 4.64 3.54 5.93l-.9 3.37a.3.3 0 0 0 .44.34L9.2 16.4c.26.03.53.05.8.05 4.42 0 8-3.16 8-7.04C18 5.16 14.42 2 10 2z" />
    </svg>
  );
}

function ChatBubbleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function BotAvatar() {
  return (
    <div className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-accent text-[9px] font-bold text-white">
      U
    </div>
  );
}

// ─── ChatBot ──────────────────────────────────────────────────────────────────

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const dragConstraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  // Consult wizard state
  const [screen, setScreen] = useState<"home" | "consult">("home");
  const [cStep, setCStep] = useState<number>(0);
  const [cService, setCService] = useState<string>("");
  const [cDuration, setCDuration] = useState<string>("");
  const [cBudget, setCBudget] = useState<string>("");
  const [cDeadline, setCDeadline] = useState<string>("");
  const [cReference, setCReference] = useState<string>("");
  const [cDescription, setCDescription] = useState<string>("");
  const [cName, setCName] = useState<string>("");
  const [cEmail, setCEmail] = useState<string>("");
  const [cCompany, setCCompany] = useState<string>("");
  const [cPosition, setCPosition] = useState<string>("");
  const [cPhone, setCPhone] = useState<string>("");
  const [cSubmitting, setCSubmitting] = useState<boolean>(false);
  const [cDone, setCDone] = useState<boolean>(false);
  const [cError, setCError] = useState<string>("");

  const currentOptions: string[] =
    history.length === 0
      ? INITIAL_IDS
      : (QNA[history[history.length - 1]]?.nextIds ?? INITIAL_IDS);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, screen, cStep, cDone, open]);

  function select(qid: string) {
    setHistory((h) => [...h, qid]);
  }

  function reset() {
    setHistory([]);
    setScreen("home");
    setCStep(0);
    setCService("");
    setCDuration("");
    setCBudget("");
    setCDeadline("");
    setCReference("");
    setCDescription("");
    setCName("");
    setCEmail("");
    setCCompany("");
    setCPosition("");
    setCPhone("");
    setCSubmitting(false);
    setCDone(false);
    setCError("");
  }

  function closeWidget() {
    setOpen(false);
    setTimeout(reset, 300);
  }

  function startConsult() {
    setScreen("consult");
    setCStep(0);
    setCDone(false);
    setCError("");
  }

  function consultBack() {
    if (cStep > 0) {
      setCStep(cStep - 1);
    } else {
      setScreen("home");
    }
  }

  async function submitConsult() {
    setCError("");
    if (!cName.trim()) {
      setCError("이름을 입력해주세요.");
      return;
    }
    if (!cEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cEmail)) {
      setCError("올바른 이메일을 입력해주세요.");
      return;
    }
    setCSubmitting(true);
    const message = [
      "[챗봇 프로젝트 상담]",
      `영상 유형: ${cService}`,
      `영상 길이: ${cDuration}`,
      `예산 범위: ${cBudget}`,
      `마감일: ${cDeadline}`,
      cReference ? `레퍼런스: ${cReference}` : "",
      "",
      "▣ 프로젝트 설명",
      cDescription || "(작성 안 함)",
    ]
      .filter((line) => line !== null && line !== undefined)
      .join("\n");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: cName,
          email: cEmail,
          company: cCompany,
          position: cPosition,
          phone: cPhone,
          service: cService,
          budget: cBudget,
          deadline: cDeadline,
          message,
        }),
      });
      if (!res.ok) {
        throw new Error("send failed");
      }
      setCDone(true);
    } catch {
      setCError("전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setCSubmitting(false);
    }
  }

  return (
    <>
      {/* Invisible viewport-sized container that bounds the chatbot drag */}
      <div ref={dragConstraintsRef} className="pointer-events-none fixed inset-0 z-[9988]" />

      <div className="fixed bottom-6 right-6 z-[9990] flex flex-col items-end">
      {/* Widget */}
      <AnimatePresence>
        {open && (
          <motion.div
            drag
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={dragConstraintsRef}
            dragElastic={0}
            dragMomentum={false}
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96, transition: { duration: 0.22, ease: "easeIn" } }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-3 flex h-[620px] max-h-[calc(100dvh-6rem)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-2xl"
          >
            {/* Header — drag handle */}
            <div
              onPointerDown={(e) => dragControls.start(e)}
              className="flex flex-none items-center justify-between border-b border-white/10 px-4 py-3.5 cursor-grab active:cursor-grabbing select-none touch-none"
            >
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                <span className="font-display text-[11px] uppercase tracking-[0.18em] text-white">
                  Unbound Studio
                </span>
              </div>
              <div
                onPointerDown={(e) => e.stopPropagation()}
                className="flex items-center gap-0.5"
              >
                {(history.length > 0 || screen === "consult") && (
                  <button
                    onClick={reset}
                    aria-label="처음으로"
                    title="처음으로"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition-colors hover:bg-white/5 hover:text-white/70 cursor-pointer"
                  >
                    <ResetIcon />
                  </button>
                )}
                <button
                  onClick={closeWidget}
                  aria-label="닫기"
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            {/* Chat body */}
            <div
              data-lenis-prevent
              className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-3 py-4"
            >
              {screen === "home" && (
              <>
              {/* Greeting */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                className="flex gap-2"
              >
                <BotAvatar />
                <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-white/[0.07] px-3.5 py-3">
                  <p className="whitespace-pre-line text-[13px] leading-relaxed text-white/85">
                    {"안녕하세요! 👋\nUnbound Studio입니다.\n\n프로젝트 상담을 시작하시거나,\n자주 묻는 질문을 살펴보세요."}
                  </p>
                </div>
              </motion.div>

              {/* Consult CTA — top, prominent */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.32, ease: "easeOut" }}
                onClick={startConsult}
                className="group flex w-full items-center justify-between rounded-2xl border border-brand-accent/30 bg-gradient-to-br from-brand-accent/[0.12] to-brand-accent/[0.04] px-4 py-3.5 text-left transition-all hover:border-brand-accent/55 hover:from-brand-accent/[0.18] hover:to-brand-accent/[0.06]"
              >
                <p className="text-[13px] font-semibold text-white">프로젝트 상담 시작하기</p>
                <ChevRight />
              </motion.button>

              {/* Conversation history */}
              {history.map((qid, i) => {
                const item = QNA[qid];
                if (!item) return null;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="space-y-2"
                  >
                    {/* User bubble */}
                    <div className="flex justify-end">
                      <div className="max-w-[82%] rounded-2xl rounded-tr-sm bg-brand-accent px-3.5 py-2.5 text-[13px] leading-snug text-white">
                        {item.question}
                      </div>
                    </div>

                    {/* Bot answer */}
                    <div className="flex gap-2">
                      <BotAvatar />
                      <div className="max-w-[82%] space-y-2">
                        <div className="rounded-2xl rounded-tl-sm bg-white/[0.07] px-3.5 py-3">
                          <p className="text-[13px] leading-relaxed text-white/85">
                            {item.answer}
                          </p>
                        </div>

                        {/* Category badge */}
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${CAT_STYLE[item.category]}`}
                        >
                          {item.category}
                        </span>

                        {/* 견적 받기 — q10에 챗봇 위자드 시작 버튼 */}
                        {item.id === "q10" && (
                          <button
                            onClick={startConsult}
                            className="flex items-center gap-2 rounded-xl border border-brand-accent/35 bg-brand-accent/[0.08] px-3 py-2.5 text-[12px] font-medium text-white/85 transition-all hover:border-brand-accent/60 hover:bg-brand-accent/[0.14]"
                          >
                            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-3.5 w-3.5">
                              <path d="M4 10l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            챗봇에서 견적 받기
                          </button>
                        )}

                        {/* Q&A에 지정된 CTA 링크 (q4 Works 등) */}
                        {item.cta && (
                          <Link
                            href={item.cta.href}
                            onClick={closeWidget}
                            className="flex items-center gap-2 rounded-xl border border-sky-400/30 bg-sky-400/[0.07] px-3 py-2.5 text-[12px] font-medium text-sky-300/85 transition-all hover:border-sky-400/55 hover:bg-sky-400/[0.12]"
                          >
                            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-3.5 w-3.5">
                              <path d="M7 4h9v9M16 4L4 16" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            {item.cta.label}
                          </Link>
                        )}

                        {/* Kakao CTA — 상담 카테고리 답변 후 자연스럽게 노출 */}
                        {item.category === "상담" && (
                          <a
                            href={KAKAO_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-xl border border-yellow-300/25 bg-yellow-300/[0.06] px-3 py-2.5 text-[12px] font-medium text-yellow-300/80 transition-all hover:border-yellow-300/40 hover:bg-yellow-300/10"
                          >
                            <KakaoIcon />
                            카카오 채널로 바로 문의하기
                          </a>
                        )}

                        {/* 처음으로 돌아가기 — 모든 답변 카드 마지막 */}
                        <button
                          onClick={reset}
                          className="flex items-center gap-1.5 self-start rounded-full border border-white/10 px-2.5 py-1 text-[10.5px] text-white/35 transition-colors hover:border-white/25 hover:text-white/65"
                        >
                          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-3 w-3">
                            <path d="M3 8a5 5 0 1 1 1.5 3.6M3 5v3h3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          처음으로
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Next question options */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                className="space-y-1.5"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/25">
                  {history.length === 0 ? "자주 묻는 질문" : "이런 것도 궁금하신가요?"}
                </p>
                {currentOptions.map((qid, idx) => {
                  const item = QNA[qid];
                  if (!item) return null;
                  return (
                    <motion.button
                      key={qid}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: 0.6 + idx * 0.07, ease: "easeOut" }}
                      onClick={() => select(qid)}
                      className="flex w-full items-center justify-between gap-2 rounded-xl border border-white/8 bg-white/[0.025] px-3.5 py-2.5 text-left transition-all hover:border-brand-accent/35 hover:bg-brand-accent/5"
                    >
                      <span className="text-[12px] leading-snug text-white/65">
                        {item.question}
                      </span>
                      <ChevRight />
                    </motion.button>
                  );
                })}
              </motion.div>
              </>
              )}

              {screen === "consult" && (
              <div className="flex h-full flex-col">
                {/* Progress + back */}
                <div className="mb-4 flex items-center gap-3">
                  <button
                    onClick={consultBack}
                    className="flex items-center gap-1 text-[11px] text-white/35 transition-colors hover:text-white/70"
                  >
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-3.5 w-3.5">
                      <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    이전
                  </button>
                  <div className="flex flex-1 gap-1">
                    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className={`h-0.5 flex-1 rounded-full transition-colors ${
                          i <= cStep ? "bg-brand-accent" : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[10px] text-white/30">
                    {cStep + 1}/7
                  </span>
                </div>

                {cDone ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-1 flex-col items-center justify-center px-2 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
                      className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/15 text-brand-accent"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
                      className="font-display text-[15px] uppercase tracking-[0.14em] text-white"
                    >
                      Thank you
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
                      className="mt-2 max-w-[260px] text-[12px] leading-relaxed text-white/55"
                    >
                      상담 신청이 접수되었습니다.
                      <br />
                      담당자가 빠른 시일 내에 이메일로 연락드리겠습니다.
                    </motion.p>
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.7, ease: "easeOut" }}
                      onClick={reset}
                      className="mt-5 rounded-full border border-white/15 px-4 py-2 text-[11px] text-white/60 transition-colors hover:border-white/35 hover:text-white"
                    >
                      처음으로
                    </motion.button>
                  </motion.div>
                ) : (
                  <AnimatePresence mode="wait">
                    {cStep === 0 && (
                      <motion.div
                        key="step-0"
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18, transition: { duration: 0.2, ease: "easeIn" } }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-accent/65">Step 01</p>
                        <p className="mb-4 mt-1 text-[14px] font-medium text-white">어떤 영상을 만들고 싶으신가요?</p>
                        <div className="grid grid-cols-2 gap-2">
                          {SERVICE_OPTS.map((o, idx) => (
                            <motion.button
                              key={o}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.32, delay: 0.15 + idx * 0.05, ease: "easeOut" }}
                              onClick={() => { setCService(o); setCStep(1); }}
                              className={`rounded-xl border px-3 py-3 text-left text-[12px] font-medium leading-snug transition-all ${
                                cService === o
                                  ? "border-brand-accent bg-brand-accent/12 text-white"
                                  : "border-white/10 bg-white/[0.025] text-white/55 hover:border-white/25 hover:text-white"
                              }`}
                            >
                              {o}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {cStep === 1 && (
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18, transition: { duration: 0.2, ease: "easeIn" } }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-accent/65">Step 02</p>
                        <p className="mb-4 mt-1 text-[14px] font-medium text-white">영상 길이는 얼마나 되나요?</p>
                        <div className="grid grid-cols-3 gap-2">
                          {DURATION_OPTS.map((o, idx) => (
                            <motion.button
                              key={o}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.32, delay: 0.15 + idx * 0.05, ease: "easeOut" }}
                              onClick={() => { setCDuration(o); setCStep(2); }}
                              className={`rounded-xl border px-3 py-3 text-center text-[12px] font-medium transition-all ${
                                cDuration === o
                                  ? "border-brand-accent bg-brand-accent/12 text-white"
                                  : "border-white/10 bg-white/[0.025] text-white/55 hover:border-white/25 hover:text-white"
                              }`}
                            >
                              {o}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {cStep === 2 && (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18, transition: { duration: 0.2, ease: "easeIn" } }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-accent/65">Step 03</p>
                        <p className="mb-4 mt-1 text-[14px] font-medium text-white">예산 범위는 어느 정도인가요?</p>
                        <div className="flex flex-col gap-2">
                          {BUDGET_OPTS.map((o, idx) => (
                            <motion.button
                              key={o}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.32, delay: 0.15 + idx * 0.06, ease: "easeOut" }}
                              onClick={() => { setCBudget(o); setCStep(3); }}
                              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left text-[12px] font-medium transition-all ${
                                cBudget === o
                                  ? "border-brand-accent bg-brand-accent/12 text-white"
                                  : "border-white/10 bg-white/[0.025] text-white/55 hover:border-white/25 hover:text-white"
                              }`}
                            >
                              <span>{o}</span>
                              <ChevRight />
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {cStep === 3 && (
                      <motion.div
                        key="step-3"
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18, transition: { duration: 0.2, ease: "easeIn" } }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-accent/65">Step 04</p>
                        <p className="mb-4 mt-1 text-[14px] font-medium text-white">희망하시는 마감일이 있나요?</p>
                        <div className="grid grid-cols-2 gap-2">
                          {DEADLINE_OPTS.map((o, idx) => (
                            <motion.button
                              key={o}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.32, delay: 0.15 + idx * 0.05, ease: "easeOut" }}
                              onClick={() => { setCDeadline(o); setCStep(4); }}
                              className={`rounded-xl border px-3 py-3 text-center text-[12px] font-medium transition-all ${
                                cDeadline === o
                                  ? "border-brand-accent bg-brand-accent/12 text-white"
                                  : "border-white/10 bg-white/[0.025] text-white/55 hover:border-white/25 hover:text-white"
                              }`}
                            >
                              {o}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {cStep === 4 && (
                      <motion.div
                        key="step-4"
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18, transition: { duration: 0.2, ease: "easeIn" } }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-accent/65">Step 05</p>
                        <p className="mt-1 text-[14px] font-medium text-white">참고할 만한 레퍼런스가 있나요?</p>
                        <p className="mb-4 mt-0.5 text-[11px] text-white/40">YouTube URL이나 키워드 — 선택사항입니다.</p>
                        <motion.input
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 0.2, ease: "easeOut" }}
                          type="text"
                          value={cReference}
                          onChange={(e) => setCReference(e.target.value)}
                          placeholder="https://youtu.be/... 또는 참고 키워드"
                          spellCheck={false}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[13px] text-white placeholder:text-white/25 transition-colors focus:border-brand-accent/55 focus:outline-none"
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 0.35, ease: "easeOut" }}
                          className="mt-4 flex gap-2"
                        >
                          <button
                            onClick={() => setCStep(5)}
                            className="flex-1 rounded-full bg-brand-accent py-2.5 font-display text-[11px] uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-85"
                          >
                            다음
                          </button>
                          <button
                            onClick={() => { setCReference(""); setCStep(5); }}
                            className="rounded-full border border-white/12 px-4 py-2.5 text-[11px] text-white/45 transition-colors hover:border-white/30 hover:text-white/75"
                          >
                            건너뛰기
                          </button>
                        </motion.div>
                      </motion.div>
                    )}

                    {cStep === 5 && (
                      <motion.div
                        key="step-5"
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18, transition: { duration: 0.2, ease: "easeIn" } }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-accent/65">Step 06</p>
                        <p className="mt-1 text-[14px] font-medium text-white">프로젝트에 대해 더 알려주세요.</p>
                        <p className="mb-4 mt-0.5 text-[11px] text-white/40">목적, 분위기, 타겟, 톤앤매너 등 자유롭게 작성해주세요.</p>
                        <motion.textarea
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 0.2, ease: "easeOut" }}
                          value={cDescription}
                          onChange={(e) => setCDescription(e.target.value)}
                          placeholder="예) 신제품 출시를 위한 3분 분량의 브랜드 영상이 필요합니다. 모던하고 미니멀한 톤..."
                          rows={6}
                          spellCheck={false}
                          className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[13px] leading-relaxed text-white placeholder:text-white/25 transition-colors focus:border-brand-accent/55 focus:outline-none"
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 0.35, ease: "easeOut" }}
                          className="mt-4 flex gap-2"
                        >
                          <button
                            onClick={() => setCStep(6)}
                            className="flex-1 rounded-full bg-brand-accent py-2.5 font-display text-[11px] uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-85"
                          >
                            다음
                          </button>
                          <button
                            onClick={() => { setCDescription(""); setCStep(6); }}
                            className="rounded-full border border-white/12 px-4 py-2.5 text-[11px] text-white/45 transition-colors hover:border-white/30 hover:text-white/75"
                          >
                            건너뛰기
                          </button>
                        </motion.div>
                      </motion.div>
                    )}

                    {cStep === 6 && (
                      <motion.div
                        key="step-6"
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18, transition: { duration: 0.2, ease: "easeIn" } }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-accent/65">Step 07</p>
                        <p className="mt-1 text-[14px] font-medium text-white">연락처를 남겨주세요.</p>
                        <p className="mb-5 mt-0.5 text-[11px] text-white/40">담당자가 검토 후 빠르게 답변드립니다.</p>
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.18, ease: "easeOut" }}
                          className="space-y-3"
                        >
                          <div>
                            <label className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/40">이름 *</label>
                            <input
                              type="text"
                              value={cName}
                              onChange={(e) => setCName(e.target.value)}
                              placeholder="홍길동"
                              spellCheck={false}
                              className="mt-1 w-full border-0 border-b border-white/15 bg-transparent py-2 text-[13px] text-white placeholder:text-white/25 transition-colors focus:border-brand-accent focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/40">회사명</label>
                            <input
                              type="text"
                              value={cCompany}
                              onChange={(e) => setCCompany(e.target.value)}
                              placeholder="회사명 (선택)"
                              spellCheck={false}
                              className="mt-1 w-full border-0 border-b border-white/15 bg-transparent py-2 text-[13px] text-white placeholder:text-white/25 transition-colors focus:border-brand-accent focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/40">직책 · 부서</label>
                            <input
                              type="text"
                              value={cPosition}
                              onChange={(e) => setCPosition(e.target.value)}
                              placeholder="마케팅팀 매니저 (선택)"
                              spellCheck={false}
                              className="mt-1 w-full border-0 border-b border-white/15 bg-transparent py-2 text-[13px] text-white placeholder:text-white/25 transition-colors focus:border-brand-accent focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/40">이메일 *</label>
                            <input
                              type="email"
                              value={cEmail}
                              onChange={(e) => setCEmail(e.target.value)}
                              placeholder="you@email.com"
                              spellCheck={false}
                              className="mt-1 w-full border-0 border-b border-white/15 bg-transparent py-2 text-[13px] text-white placeholder:text-white/25 transition-colors focus:border-brand-accent focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/40">연락처</label>
                            <input
                              type="tel"
                              value={cPhone}
                              onChange={(e) => setCPhone(e.target.value)}
                              placeholder="010-0000-0000 (선택)"
                              spellCheck={false}
                              className="mt-1 w-full border-0 border-b border-white/15 bg-transparent py-2 text-[13px] text-white placeholder:text-white/25 transition-colors focus:border-brand-accent focus:outline-none"
                            />
                          </div>
                        </motion.div>
                        {cError && (
                          <motion.p
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="mt-3 text-[11px] text-red-400"
                          >
                            {cError}
                          </motion.p>
                        )}
                        <motion.button
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.42, ease: "easeOut" }}
                          onClick={() => { void submitConsult(); }}
                          disabled={cSubmitting || !cName.trim() || !cEmail.trim()}
                          className="mt-5 w-full rounded-full bg-brand-accent py-2.5 font-display text-[11px] uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-85 disabled:opacity-30"
                        >
                          {cSubmitting ? "전송 중..." : "상담 신청하기"}
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
              )}

              {/* Scroll anchor */}
              <div ref={bottomRef} />
            </div>

            {/* Footer */}
            <div className="flex-none space-y-1.5 border-t border-white/8 px-3 py-3">
              <a
                href={KAKAO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-yellow-300/25 bg-yellow-300/[0.06] py-2.5 text-[12px] font-semibold text-yellow-300/80 transition-all hover:border-yellow-300/40 hover:bg-yellow-300/10"
              >
                <KakaoIcon />
                카카오톡으로 문의하기
              </a>
              <Link
                href="/contact"
                onClick={closeWidget}
                className="flex w-full items-center justify-center gap-1 py-1.5 text-[11px] text-white/25 transition-colors hover:text-white/50"
              >
                온라인 문의하기
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "닫기" : "FAQ · 문의"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent text-white shadow-xl"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <CloseIcon />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <ChatBubbleIcon />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
    </>
  );
}
