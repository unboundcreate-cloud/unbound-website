"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

// ─── Constants ────────────────────────────────────────────────────────────────

const KAKAO_URL = "http://pf.kakao.com/_humXX";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "서비스" | "프로젝트" | "상담";

interface QnAItem {
  id: string;
  question: string;
  answer: string;
  category: Category;
  nextIds: string[];
}

// ─── Q&A data ─────────────────────────────────────────────────────────────────

const QNA_LIST: QnAItem[] = [
  {
    id: "q1",
    question: "Unbound Studio는 어떤 회사인가요?",
    answer:
      "경계 없는 창의성, 무한한 가능성으로 이야기를 살리는 영상제작스튜디오입니다. 모션그래픽스, 4K/8K 영상 제작, AI 기술을 활용한 차별화된 콘텐츠를 제공합니다.",
    category: "서비스",
    nextIds: ["q2", "q3", "q7"],
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
    nextIds: ["q6", "q7", "q10"],
  },
  {
    id: "q4",
    question: "포트폴리오를 볼 수 있나요?",
    answer:
      "네, 웹사이트의 포트폴리오 메뉴에서 KT Enterprise, Corning, SK Signet 등 주요 프로젝트를 확인하실 수 있습니다.",
    category: "서비스",
    nextIds: ["q7", "q5", "q10"],
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
    id: "q7",
    question: "어떤 기업들과 일했나요?",
    answer:
      "KT Enterprise, Corning, SK Signet, GS Caltex, Karcher, dsm-firmenich, Macrogen 등 국내외 주요 B2B 기업들과 협력해왔습니다.",
    category: "프로젝트",
    nextIds: ["q4", "q2", "q13"],
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
    nextIds: ["q5", "q10", "q11"],
  },
  {
    id: "q10",
    question: "견적은 어떻게 받나요?",
    answer:
      "문의하기를 통해 프로젝트 상세정보(목표·예산·기간·스타일)를 공유해 주시면 당일 내 견적을 드립니다. 카카오 채널로 연락주셔도 됩니다.",
    category: "상담",
    nextIds: ["q11", "q12", "q13"],
  },
  {
    id: "q11",
    question: "상담은 무료인가요?",
    answer: "네, 초기 상담은 완전 무료입니다. 커피 한 잔 마시며 편하게 대화해요 ☕",
    category: "상담",
    nextIds: ["q10", "q12", "q13"],
  },
  {
    id: "q12",
    question: "야간/주말 상담도 가능한가요?",
    answer:
      "프로젝트 상황에 따라 협의 가능합니다. 카카오 채널로 연락주시면 일정을 조율해드립니다.",
    category: "상담",
    nextIds: ["q11", "q10", "q13"],
  },
  {
    id: "q13",
    question: "협력사/파트너십이 가능한가요?",
    answer:
      "네, 협력 가능한 프로젝트는 기꺼이 함께합니다. 카카오 채널이나 이메일로 편하게 연락주세요.",
    category: "상담",
    nextIds: ["q10", "q11", "q12"],
  },
];

const QNA: Record<string, QnAItem> = {};
for (const item of QNA_LIST) {
  QNA[item.id] = item;
}

const INITIAL_IDS: string[] = ["q1", "q2", "q5", "q10"];

// ─── Category badge styles ─────────────────────────────────────────────────────

const CAT_STYLE: Record<Category, string> = {
  서비스:    "text-sky-400/70 border-sky-400/20 bg-sky-400/[0.06]",
  프로젝트:  "text-emerald-400/70 border-emerald-400/20 bg-emerald-400/[0.06]",
  상담:      "text-amber-300/70 border-amber-300/20 bg-amber-300/[0.06]",
};

// ─── Typing text ─────────────────────────────────────────────────────────────

function TypingText({
  text,
  onDone,
}: {
  text: string;
  onDone?: () => void;
}) {
  const [count, setCount] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  // Reset when text changes (new message mounted)
  useEffect(() => {
    setCount(0);
  }, [text]);

  useEffect(() => {
    if (count >= text.length) {
      doneRef.current?.();
      return;
    }
    // Target ~900ms total; clamp 8–22ms per character
    const ms = Math.max(8, Math.min(22, 900 / text.length));
    const t = setTimeout(
      () => setCount((n) => Math.min(n + 1, text.length)),
      ms,
    );
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

// ─── Framer-motion variants ───────────────────────────────────────────────────

const msgVariants = {
  hidden: { opacity: 0, y: 8 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.075, delayChildren: 0.12 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 7 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] } },
};

// ─── ChatBot ──────────────────────────────────────────────────────────────────

export function ChatBot() {
  const [open, setOpen]             = useState(false);
  const [history, setHistory]       = useState<string[]>([]);
  const [typingDone, setTypingDone] = useState(true);
  const bottomRef                   = useRef<HTMLDivElement>(null);

  const currentOptions: string[] =
    history.length === 0
      ? INITIAL_IDS
      : (QNA[history[history.length - 1]]?.nextIds ?? INITIAL_IDS);

  // Smooth-scroll to bottom when new message or typing finishes
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, typingDone, open]);

  function select(qid: string) {
    setTypingDone(false);
    setHistory((h) => [...h, qid]);
  }

  function reset() {
    setHistory([]);
    setTypingDone(true);
  }

  function closeWidget() {
    setOpen(false);
    setTimeout(reset, 400);
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9990] flex flex-col items-end">
      {/* ── Widget ──────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1     }}
            exit={{    opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 flex h-[600px] w-[368px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d0d] shadow-[0_24px_72px_rgba(0,0,0,0.85)]"
          >
            {/* Header */}
            <div className="flex flex-none items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <div className="flex items-center gap-3">
                {/* Avatar with online indicator */}
                <div className="relative">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-accent text-[9px] font-bold tracking-wide text-white">
                    U
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-[1.5px] border-[#0d0d0d] bg-emerald-400" />
                </div>
                <div>
                  <p className="font-display text-[11px] uppercase tracking-[0.2em] text-white">
                    Unbound Studio
                  </p>
                  <p className="mt-0.5 text-[9px] leading-none text-white/30">
                    온라인 · 지금 바로 답변 가능
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-0.5">
                {history.length > 0 && (
                  <button
                    onClick={reset}
                    aria-label="처음으로"
                    title="처음으로"
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-white/25 transition-colors hover:bg-white/5 hover:text-white/60"
                  >
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-3.5 w-3.5">
                      <path d="M4 10a6 6 0 1 1 1.8 4.3M4 6v4h4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
                <button
                  onClick={closeWidget}
                  aria-label="닫기"
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition-colors hover:bg-white/5 hover:text-white/80"
                >
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                    <path d="M15 5L5 15M5 5l10 10" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chat body — overscroll-contain prevents page scroll chaining */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 space-y-5">

              {/* Greeting */}
              <motion.div
                initial="hidden"
                animate="show"
                variants={msgVariants}
                className="flex gap-3"
              >
                <BotDot />
                <p className="pt-0.5 text-[13px] leading-[1.8] text-white/70">
                  안녕하세요! 👋&nbsp;&nbsp;Unbound Studio입니다.
                  <br />무엇을 도와드릴까요?
                </p>
              </motion.div>

              {/* Conversation history */}
              {history.map((qid, i) => {
                const item = QNA[qid];
                if (!item) return null;
                const isLatest = i === history.length - 1;

                return (
                  <motion.div
                    key={i}
                    initial="hidden"
                    animate="show"
                    variants={msgVariants}
                    className="space-y-4"
                  >
                    {/* User bubble */}
                    <div className="flex justify-end">
                      <div className="max-w-[78%] rounded-2xl rounded-tr-sm bg-white/[0.07] px-4 py-2.5 text-[13px] leading-snug text-white/80 ring-1 ring-white/[0.06]">
                        {item.question}
                      </div>
                    </div>

                    {/* Bot answer */}
                    <div className="flex gap-3">
                      <BotDot />
                      <div className="flex-1 space-y-3 pt-0.5">
                        <p className="text-[13px] leading-[1.8] text-white/70">
                          {isLatest ? (
                            <TypingText
                              text={item.answer}
                              onDone={() => setTypingDone(true)}
                            />
                          ) : (
                            item.answer
                          )}
                        </p>

                        {/* Category + Kakao CTA — visible after typing */}
                        {(!isLatest || typingDone) && (
                          <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col gap-2"
                          >
                            <span className={`inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${CAT_STYLE[item.category]}`}>
                              {item.category}
                            </span>

                            {item.category === "상담" && (
                              <a
                                href={KAKAO_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-fit items-center gap-2 rounded-lg border border-amber-300/20 bg-amber-300/[0.05] px-3 py-2 text-[11px] font-medium text-amber-300/65 transition-all hover:border-amber-300/35 hover:bg-amber-300/[0.09]"
                              >
                                <KakaoIcon />
                                카카오 채널로 바로 문의하기 →
                              </a>
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Next question options — stagger in when typing done */}
              <AnimatePresence>
                {typingDone && (
                  <motion.div
                    key="opts"
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    variants={listVariants}
                    className="pt-1"
                  >
                    {/* Label */}
                    <motion.p
                      variants={listItemVariants}
                      className="mb-2.5 text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/22"
                    >
                      {history.length === 0
                        ? "궁금한 것을 선택해 주세요"
                        : "이런 것도 궁금하신가요?"}
                    </motion.p>

                    {/* Options */}
                    {currentOptions.map((qid) => {
                      const item = QNA[qid];
                      if (!item) return null;
                      return (
                        <motion.button
                          key={qid}
                          variants={listItemVariants}
                          onClick={() => select(qid)}
                          className="group flex w-full items-center justify-between gap-3 border-b border-white/[0.06] py-3 text-left last:border-0"
                        >
                          <span className="text-[12px] leading-snug text-white/42 transition-colors duration-200 group-hover:text-white/80">
                            {item.question}
                          </span>
                          <svg
                            viewBox="0 0 16 16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.7}
                            className="h-3.5 w-3.5 flex-none text-white/15 transition-colors duration-200 group-hover:text-white/45"
                          >
                            <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </motion.button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scroll anchor */}
              <div ref={bottomRef} />
            </div>

            {/* Footer */}
            <div className="flex-none border-t border-white/[0.07] px-4 py-3.5 space-y-1.5">
              <a
                href={KAKAO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-300/20 bg-amber-300/[0.05] py-2.5 text-[11px] font-semibold text-amber-300/65 transition-all hover:border-amber-300/35 hover:bg-amber-300/[0.09]"
              >
                <KakaoIcon />
                카카오톡으로 문의하기
              </a>
              <Link
                href="/contact"
                onClick={closeWidget}
                className="flex w-full items-center justify-center py-1.5 text-[10.5px] text-white/22 transition-colors hover:text-white/50"
              >
                온라인 문의하기 →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle button ─────────────────────────────────────── */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        aria-label={open ? "닫기" : "FAQ · 문의"}
        className="relative flex h-[54px] w-[54px] items-center justify-center rounded-full bg-brand-accent text-white shadow-[0_8px_28px_rgba(230,50,38,0.4)]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0,   opacity: 1 }}
              exit={{    rotate:  45, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
                <path d="M15 5L5 15M5 5l10 10" strokeLinecap="round" />
              </svg>
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0,  opacity: 1 }}
              exit={{    rotate: -45, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth={1.9} className="h-5 w-5">
                <path d="M20 14a2 2 0 0 1-2 2H6l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>

        {/* Notification pulse when closed */}
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

// ─── Micro-components ─────────────────────────────────────────────────────────

function BotDot() {
  return (
    <div className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-accent/90 text-[8px] font-bold tracking-wide text-white">
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
