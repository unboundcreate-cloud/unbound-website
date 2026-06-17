"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FaqItem {
  q: string;
  a: string;
  related?: Array<[number, number]>;
}

interface FaqCategory {
  label: string;
  icon: React.ReactNode;
  items: FaqItem[];
}

type Screen =
  | { type: "home" }
  | { type: "faq-list"; catIdx: number }
  | { type: "faq-answer"; catIdx: number; faqIdx: number }
  | { type: "works" }
  | { type: "services" }
  | { type: "estimator"; step: number; answers: string[] }
  | { type: "estimator-result"; answers: string[] };

// ─── Icons ────────────────────────────────────────────────────────────────────

const I = {
  Process: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-[17px] w-[17px]">
      <path d="M3 5h14M3 10h10M3 15h7" strokeLinecap="round" />
    </svg>
  ),
  Edit: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-[17px] w-[17px]">
      <path d="M13.5 2.5l4 4L6 18H2v-4L13.5 2.5z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Contract: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-[17px] w-[17px]">
      <rect x="3" y="2" width="14" height="16" rx="2" />
      <path d="M7 7h6M7 11h6M7 15h3" strokeLinecap="round" />
    </svg>
  ),
  Copyright: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-[17px] w-[17px]">
      <circle cx="10" cy="10" r="8" />
      <path d="M12.5 8a3 3 0 1 0 0 4" strokeLinecap="round" />
    </svg>
  ),
  Works: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-[17px] w-[17px]">
      <rect x="2" y="2" width="7" height="7" rx="1.5" />
      <rect x="11" y="2" width="7" height="7" rx="1.5" />
      <rect x="2" y="11" width="7" height="7" rx="1.5" />
      <rect x="11" y="11" width="7" height="7" rx="1.5" />
    </svg>
  ),
  Service: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-[17px] w-[17px]">
      <path d="M10 2L2 6v8l8 4 8-4V6L10 2zM10 2v12M2 6l8 4 8-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Calc: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-[17px] w-[17px]">
      <rect x="3" y="2" width="14" height="16" rx="2" />
      <path d="M7 6h6M7 10h2M11 10h2M7 14h2M11 14h2" strokeLinecap="round" />
    </svg>
  ),
  ChevR: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 flex-none">
      <path d="M7 15l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ChevL: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
      <path d="M13 5l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Close: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
      <path d="M15 5L5 15M5 5l10 10" strokeLinecap="round" />
    </svg>
  ),
  Arrow: () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-3.5 w-3.5">
      <path d="M4 16L16 4M16 4H8M16 4v8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Question: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-5 w-5">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2.5-2.5 2.5M12 16.5h.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const FAQ: FaqCategory[] = [
  {
    label: "진행 방식",
    icon: <I.Process />,
    items: [
      {
        q: "소재(로고, 이미지, 영상 등)는 어떻게 전달하나요?",
        a: "구글 드라이브 링크나 이메일 create@unboundstudio.co.kr 로 전달해 주시면 됩니다.",
        related: [[0, 1], [0, 2]],
      },
      {
        q: "작업 진행 상황은 어떻게 확인하나요?",
        a: "단계별로 중간 공유를 진행합니다. 방향을 함께 확인하며 진행하기 때문에 결과물에서 크게 벗어나는 경우가 없습니다.",
        related: [[0, 0], [1, 2]],
      },
      {
        q: "레퍼런스가 없어도 진행 가능한가요?",
        a: "네, 상담 시 방향성을 함께 잡아드립니다. 레퍼런스가 없어도 충분히 진행 가능합니다.",
        related: [[1, 1], [2, 0]],
      },
    ],
  },
  {
    label: "수정 · 촬영",
    icon: <I.Edit />,
    items: [
      {
        q: "수정은 몇 번 가능한가요?",
        a: "프로젝트당 3회 기준으로 진행됩니다. 범위를 벗어난 추가 수정은 별도 협의합니다.",
        related: [[2, 0], [2, 2]],
      },
      {
        q: "촬영도 함께 진행 가능한가요?",
        a: "올인원 서비스가 가능한 프로덕션으로, 촬영이 필요한 프로젝트도 진행합니다.",
        related: [[0, 2], [1, 2]],
      },
      {
        q: "급한 일정도 가능한가요?",
        a: "일정에 따라 협의 가능합니다. 먼저 문의 주시면 검토 후 안내드립니다.",
        related: [[2, 0], [0, 1]],
      },
    ],
  },
  {
    label: "계약 · 결제",
    icon: <I.Contract />,
    items: [
      {
        q: "계약금은 언제 입금하나요?",
        a: "기획 확정 후 착수금 30%를 입금해 주시면 제작을 시작합니다. 잔금은 납품 후 익월 말일 기준으로 정산하는 것을 기본으로 합니다.",
        related: [[2, 1], [3, 0]],
      },
      {
        q: "세금계산서 발행이 가능한가요?",
        a: "네, 사업자 등록 업체로 세금계산서 발행 가능합니다.",
        related: [[2, 0], [2, 2]],
      },
      {
        q: "작업 취소 시 환불은 어떻게 되나요?",
        a: "착수 전 취소 시 전액 환불, 기획 확정 후에는 진행 단계에 따라 부분 환불됩니다.",
        related: [[2, 0], [1, 0]],
      },
    ],
  },
  {
    label: "저작권",
    icon: <I.Copyright />,
    items: [
      {
        q: "작업 결과물의 저작권은 누구에게 있나요?",
        a: "납품 완료 및 최종 정산 후 저작권은 클라이언트에게 귀속됩니다.",
        related: [[2, 0], [0, 0]],
      },
    ],
  },
];

const POPULAR: Array<{ catIdx: number; faqIdx: number; label: string }> = [
  { catIdx: 1, faqIdx: 0, label: "수정 횟수" },
  { catIdx: 2, faqIdx: 0, label: "계약금 안내" },
  { catIdx: 3, faqIdx: 0, label: "저작권 귀속" },
];

const WORKS_CATS = [
  { label: "드라마 & 예능", value: "drama", note: "Netflix · TvN · KBS · MBC · 디즈니+", count: 15 },
  { label: "광고 & 홍보", value: "promo", note: "한화 · 봉명동네커피", count: 3 },
  { label: "AI 제작", value: "ai", note: "채널A · 마크로젠", count: 2 },
  { label: "B2B", value: "b2b", note: "SK Signet", count: 1 },
  { label: "공공 / 기관", value: "public", note: "한국지역난방공사 · 국방홍보원", count: 2 },
];

const SERVICES = [
  { no: "01", sub: "기획", desc: "브랜드 분석부터 스토리 콘셉트까지", slug: "planning" },
  { no: "02", sub: "촬영 · 제작", desc: "올인원 촬영 및 현장 운영", slug: "production" },
  { no: "03", sub: "모션그래픽", desc: "2D 합성, 시각효과, 애니메이션", slug: "vfx" },
  { no: "04", sub: "색보정", desc: "톤 & 무드 완성 크리에이티브 그레이딩", slug: "color-grading" },
  { no: "05", sub: "편집 · 종합편집", desc: "스토리 재구성부터 최종 납품", slug: "editing" },
  { no: "06", sub: "AI 제작", desc: "AI 기반 영상 생성 & 자동화 워크플로우", slug: "ai-production" },
];

interface EstQ { question: string; options: { label: string; value: string }[] }
const EST_STEPS: EstQ[] = [
  {
    question: "어떤 종류의 영상인가요?",
    options: [
      { label: "드라마 / 예능 오프닝", value: "broadcast" },
      { label: "브랜드 필름", value: "brand" },
      { label: "광고 영상", value: "ad" },
      { label: "AI 제작 콘텐츠", value: "ai" },
      { label: "B2B / 기관 홍보", value: "b2b" },
    ],
  },
  {
    question: "영상 분량은 어느 정도인가요?",
    options: [
      { label: "15초 이하 (숏폼)", value: "15s" },
      { label: "15초 ~ 1분", value: "1min" },
      { label: "1분 ~ 3분", value: "3min" },
      { label: "3분 이상", value: "3min+" },
    ],
  },
  {
    question: "희망 납품 일정은?",
    options: [
      { label: "1주 이내 (긴급)", value: "urgent" },
      { label: "2 ~ 4주", value: "normal" },
      { label: "1 ~ 2개월", value: "comfortable" },
      { label: "미정 / 협의 가능", value: "flexible" },
    ],
  },
];

function calcEstimate(answers: string[]): { period: string; level: string; note: string } {
  const [type, scale, timeline] = answers;
  let period = "2 ~ 4주";
  let level = "중규모 프로젝트";

  if (type === "broadcast" && (scale === "3min" || scale === "3min+")) {
    period = "2 ~ 3개월"; level = "대규모 프로젝트";
  } else if (scale === "15s" || type === "ai") {
    period = "1 ~ 2주"; level = "소규모 프로젝트";
  } else if (scale === "3min+" || type === "brand") {
    period = "1 ~ 2개월"; level = "중~대규모 프로젝트";
  } else if (type === "broadcast") {
    period = "3주 ~ 2개월"; level = "중규모 프로젝트";
  }

  const note = timeline === "urgent"
    ? "긴급 납기는 추가 협의가 필요합니다. 가능 여부를 먼저 확인해 드립니다."
    : "최종 견적은 상세 브리핑 미팅 후 확정됩니다.";

  return { period, level, note };
}

// ─── Animation ────────────────────────────────────────────────────────────────

const slideV = {
  initial: (d: number) => ({ x: d * 18, opacity: 0 }),
  animate: { x: 0, opacity: 1, transition: { duration: 0.17, ease: [0.16, 1, 0.3, 1] } },
  exit: (d: number) => ({ x: d * -18, opacity: 0, transition: { duration: 0.13 } }),
};

const staggerItem = (i: number) => ({
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.045, duration: 0.18 },
});

// ─── Shared button style ──────────────────────────────────────────────────────

const ROW = "flex w-full items-center justify-between rounded-xl border border-white/8 bg-white/[0.025] px-3.5 py-3 text-left transition-all hover:border-brand-accent/35 hover:bg-brand-accent/5";
const ROW_ACCENT = "flex w-full items-center justify-between rounded-xl border border-brand-accent/20 bg-brand-accent/5 px-3.5 py-3 text-left transition-all hover:border-brand-accent/40 hover:bg-brand-accent/10";

// ─── ChatBot ──────────────────────────────────────────────────────────────────

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>({ type: "home" });
  const [dir, setDir] = useState(1);

  function go(next: Screen, d = 1) {
    setDir(d);
    setScreen(next);
  }

  function back() {
    if (screen.type === "faq-answer") {
      go({ type: "faq-list", catIdx: screen.catIdx }, -1);
    } else if (
      screen.type === "faq-list" ||
      screen.type === "works" ||
      screen.type === "services"
    ) {
      go({ type: "home" }, -1);
    } else if (screen.type === "estimator") {
      if (screen.step === 0) go({ type: "home" }, -1);
      else go({ type: "estimator", step: screen.step - 1, answers: screen.answers.slice(0, screen.step - 1) }, -1);
    } else if (screen.type === "estimator-result") {
      go({ type: "estimator", step: 2, answers: screen.answers.slice(0, 2) }, -1);
    } else {
      go({ type: "home" }, -1);
    }
  }

  function closeWidget() {
    setOpen(false);
    setTimeout(() => go({ type: "home" }), 300);
  }

  const title = ((): string => {
    switch (screen.type) {
      case "home": return "Unbound Studio";
      case "faq-list": return FAQ[screen.catIdx].label;
      case "faq-answer": return FAQ[screen.catIdx].label;
      case "works": return "포트폴리오";
      case "services": return "서비스 안내";
      case "estimator": return `견적 가이드 ${screen.step + 1} / 3`;
      case "estimator-result": return "예상 견적";
    }
  })();

  const screenKey = ((): string => {
    switch (screen.type) {
      case "home": return "home";
      case "faq-list": return `fl-${screen.catIdx}`;
      case "faq-answer": return `fa-${screen.catIdx}-${screen.faqIdx}`;
      case "works": return "works";
      case "services": return "services";
      case "estimator": return `est-${screen.step}`;
      case "estimator-result": return "result";
    }
  })();

  return (
    <div className="fixed bottom-6 right-6 z-[9990] flex flex-col items-end">
      {/* ── Widget ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 flex h-[540px] w-[340px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-2xl"
          >
            {/* Header */}
            <div className="flex flex-none items-center justify-between border-b border-white/10 px-4 py-3.5">
              <div className="flex items-center gap-2">
                {screen.type !== "home" && (
                  <button
                    onClick={back}
                    aria-label="뒤로"
                    className="mr-0.5 flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <I.ChevL />
                  </button>
                )}
                <span className="h-1.5 w-1.5 rounded-full bg-brand-accent" />
                <span className="font-display text-[11px] uppercase tracking-[0.18em] text-white">
                  {title}
                </span>
              </div>
              <button
                onClick={closeWidget}
                aria-label="닫기"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/5 hover:text-white"
              >
                <I.Close />
              </button>
            </div>

            {/* Body */}
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={screenKey}
                  custom={dir}
                  variants={slideV}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0 overflow-y-auto"
                >

                  {/* ── HOME ─────────────────────────────────────────────── */}
                  {screen.type === "home" && (
                    <div className="p-4 space-y-4">
                      {/* Popular chips */}
                      <div>
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25">인기 질문</p>
                        <div className="flex flex-wrap gap-1.5">
                          {POPULAR.map((pq) => (
                            <button
                              key={pq.label}
                              onClick={() => go({ type: "faq-answer", catIdx: pq.catIdx, faqIdx: pq.faqIdx })}
                              className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/50 transition-all hover:border-brand-accent/50 hover:text-brand-accent"
                            >
                              {pq.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* FAQ categories */}
                      <div>
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25">자주 묻는 질문</p>
                        <div className="space-y-1.5">
                          {FAQ.map((cat, i) => (
                            <button key={cat.label} onClick={() => go({ type: "faq-list", catIdx: i })} className={ROW}>
                              <div className="flex items-center gap-2.5">
                                <span className="text-white/40">{cat.icon}</span>
                                <div>
                                  <p className="text-[13px] font-medium text-white">{cat.label}</p>
                                  <p className="text-[11px] text-white/30">{cat.items.length}개 질문</p>
                                </div>
                              </div>
                              <span className="text-white/20"><I.ChevR /></span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Extra navigation */}
                      <div>
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25">더 알아보기</p>
                        <div className="space-y-1.5">
                          <button onClick={() => go({ type: "works" })} className={ROW}>
                            <div className="flex items-center gap-2.5">
                              <span className="text-white/40"><I.Works /></span>
                              <span className="text-[13px] font-medium text-white">포트폴리오 보기</span>
                            </div>
                            <span className="text-white/20"><I.ChevR /></span>
                          </button>
                          <button onClick={() => go({ type: "services" })} className={ROW}>
                            <div className="flex items-center gap-2.5">
                              <span className="text-white/40"><I.Service /></span>
                              <span className="text-[13px] font-medium text-white">서비스 안내</span>
                            </div>
                            <span className="text-white/20"><I.ChevR /></span>
                          </button>
                          <button
                            onClick={() => go({ type: "estimator", step: 0, answers: [] })}
                            className={ROW_ACCENT}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-brand-accent/70"><I.Calc /></span>
                              <div>
                                <p className="text-[13px] font-medium text-white">프로젝트 견적 가이드</p>
                                <p className="text-[11px] text-white/35">예상 기간 · 규모 안내</p>
                              </div>
                            </div>
                            <span className="text-brand-accent/50"><I.ChevR /></span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── FAQ LIST ─────────────────────────────────────────── */}
                  {screen.type === "faq-list" && (
                    <div className="p-4 space-y-1.5">
                      <p className="mb-3 text-[11px] text-white/35">질문을 선택해 주세요</p>
                      {FAQ[screen.catIdx].items.map((item, i) => {
                        const ci = screen.catIdx;
                        return (
                          <motion.button
                            key={i}
                            {...staggerItem(i)}
                            onClick={() => go({ type: "faq-answer", catIdx: ci, faqIdx: i })}
                            className={ROW + " items-start gap-3"}
                          >
                            <span className="text-[13px] leading-snug text-white/75">{item.q}</span>
                            <span className="mt-0.5 text-white/20"><I.ChevR /></span>
                          </motion.button>
                        );
                      })}
                    </div>
                  )}

                  {/* ── FAQ ANSWER ───────────────────────────────────────── */}
                  {screen.type === "faq-answer" && (
                    <div className="p-4 space-y-3">
                      <div className="flex justify-end">
                        <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-brand-accent px-3.5 py-3 text-[13px] leading-relaxed text-white">
                          {FAQ[screen.catIdx].items[screen.faqIdx].q}
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.07] px-3.5 py-3 text-[13px] leading-relaxed text-white/85">
                          {FAQ[screen.catIdx].items[screen.faqIdx].a}
                        </div>
                      </div>

                      {/* Related questions */}
                      {(FAQ[screen.catIdx].items[screen.faqIdx].related ?? []).length > 0 && (
                        <div className="pt-1">
                          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25">관련 질문</p>
                          <div className="space-y-1.5">
                            {(FAQ[screen.catIdx].items[screen.faqIdx].related ?? []).map(([ci, fi], idx) => (
                              <button
                                key={idx}
                                onClick={() => go({ type: "faq-answer", catIdx: ci, faqIdx: fi })}
                                className="flex w-full items-start gap-2 rounded-xl border border-white/8 px-3 py-2.5 text-left transition-all hover:border-white/15 hover:bg-white/[0.02]"
                              >
                                <span className="mt-px text-[11px] font-semibold text-brand-accent/60 flex-none">Q</span>
                                <span className="text-[12px] leading-snug text-white/50">{FAQ[ci].items[fi].q}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => go({ type: "faq-list", catIdx: screen.catIdx }, -1)}
                        className="w-full rounded-xl border border-white/10 py-2.5 text-[12px] text-white/35 transition-all hover:border-white/20 hover:text-white/55"
                      >
                        다른 질문 보기
                      </button>
                    </div>
                  )}

                  {/* ── WORKS ────────────────────────────────────────────── */}
                  {screen.type === "works" && (
                    <div className="p-4">
                      <p className="mb-3 text-[11px] text-white/35">카테고리를 선택해 주세요</p>
                      <div className="space-y-1.5">
                        {WORKS_CATS.map((cat, i) => (
                          <motion.a
                            key={cat.value}
                            href={`/works?category=${cat.value}`}
                            onClick={closeWidget}
                            {...staggerItem(i)}
                            className={ROW}
                          >
                            <div>
                              <p className="text-[13px] font-medium text-white">{cat.label}</p>
                              <p className="mt-0.5 text-[11px] text-white/30">{cat.note}</p>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="rounded-md bg-white/8 px-2 py-0.5 text-[11px] text-white/40">{cat.count}</span>
                              <span className="text-white/25"><I.Arrow /></span>
                            </div>
                          </motion.a>
                        ))}
                      </div>
                      <a
                        href="/works"
                        onClick={closeWidget}
                        className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 py-2.5 text-[12px] text-white/35 transition-all hover:border-white/20 hover:text-white/60"
                      >
                        전체 포트폴리오 보기
                        <I.Arrow />
                      </a>
                    </div>
                  )}

                  {/* ── SERVICES ─────────────────────────────────────────── */}
                  {screen.type === "services" && (
                    <div className="p-4">
                      <p className="mb-3 text-[11px] text-white/35">Unbound Studio 제작 서비스</p>
                      <div className="space-y-1.5">
                        {SERVICES.map((svc, i) => (
                          <motion.a
                            key={svc.slug}
                            href={`/services#${svc.slug}`}
                            onClick={closeWidget}
                            {...staggerItem(i)}
                            className={ROW + " gap-3"}
                          >
                            <span className="font-display text-[11px] tracking-wider text-brand-accent/60 flex-none">{svc.no}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-[13px] font-medium text-white">{svc.sub}</p>
                              <p className="text-[11px] text-white/35">{svc.desc}</p>
                            </div>
                            <span className="text-white/20 flex-none"><I.Arrow /></span>
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── ESTIMATOR ────────────────────────────────────────── */}
                  {screen.type === "estimator" && (
                    <div className="p-4">
                      {/* Progress bar */}
                      <div className="mb-4 flex gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              i <= screen.step ? "bg-brand-accent" : "bg-white/10"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="mb-4 text-[14px] font-medium leading-snug text-white">
                        {EST_STEPS[screen.step].question}
                      </p>

                      <div className="space-y-1.5">
                        {EST_STEPS[screen.step].options.map((opt, i) => {
                          const currentStep = screen.step;
                          const currentAnswers = screen.answers;
                          return (
                            <motion.button
                              key={opt.value}
                              {...staggerItem(i)}
                              onClick={() => {
                                const next = [...currentAnswers, opt.value];
                                if (currentStep < 2) {
                                  go({ type: "estimator", step: currentStep + 1, answers: next });
                                } else {
                                  go({ type: "estimator-result", answers: next });
                                }
                              }}
                              className={ROW}
                            >
                              <span className="text-[13px] text-white/75">{opt.label}</span>
                              <span className="text-white/20"><I.ChevR /></span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ── ESTIMATOR RESULT ─────────────────────────────────── */}
                  {screen.type === "estimator-result" && (
                    <div className="p-4 space-y-3">
                      <div className="rounded-xl border border-brand-accent/20 bg-brand-accent/5 p-4 space-y-2.5">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-brand-accent/70">예상 결과</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] text-white/45">프로젝트 유형</span>
                          <span className="text-[12px] font-medium text-white">
                            {EST_STEPS[0].options.find((o) => o.value === screen.answers[0])?.label ?? ""}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] text-white/45">분량</span>
                          <span className="text-[12px] font-medium text-white">
                            {EST_STEPS[1].options.find((o) => o.value === screen.answers[1])?.label ?? ""}
                          </span>
                        </div>
                        <div className="h-px bg-white/10" />
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] text-white/45">예상 제작 기간</span>
                          <span className="text-[14px] font-semibold text-brand-accent">
                            {calcEstimate(screen.answers).period}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[12px] text-white/45">규모</span>
                          <span className="text-[12px] font-medium text-white">
                            {calcEstimate(screen.answers).level}
                          </span>
                        </div>
                      </div>

                      <p className="text-[12px] leading-relaxed text-white/40">
                        {calcEstimate(screen.answers).note}
                      </p>

                      <a
                        href="/contact"
                        onClick={closeWidget}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-accent py-3 text-[13px] font-medium text-white transition-opacity hover:opacity-85"
                      >
                        지금 상담 문의하기
                        <I.Arrow />
                      </a>
                      <button
                        onClick={() => go({ type: "estimator", step: 0, answers: [] })}
                        className="w-full rounded-xl border border-white/10 py-2.5 text-[12px] text-white/35 transition-all hover:border-white/20 hover:text-white/55"
                      >
                        다시 계산하기
                      </button>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex-none border-t border-white/8 px-4 py-3">
              <a
                href="/contact"
                onClick={closeWidget}
                className="flex items-center justify-center gap-1.5 text-[11px] text-white/30 transition-colors hover:text-white/60"
              >
                직접 문의하기
                <I.Arrow />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Toggle Button ───────────────────────────────────────────────────── */}
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
              <I.Close />
            </motion.div>
          ) : (
            <motion.div
              key="faq"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <I.Question />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
