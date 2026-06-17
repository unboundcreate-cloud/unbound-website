"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface FaqItem {
  q: string;
  a: string;
}

interface Category {
  label: string;
  icon: React.ReactNode;
  items: FaqItem[];
}

const IconProcess = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
    <path d="M3 5h14M3 10h14M3 15h8" strokeLinecap="round" />
  </svg>
);
const IconEdit = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
    <path d="M13.5 2.5l4 4L6 18H2v-4L13.5 2.5z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconContract = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
    <rect x="3" y="2" width="14" height="16" rx="2" />
    <path d="M7 7h6M7 11h6M7 15h3" strokeLinecap="round" />
  </svg>
);
const IconCopyright = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-5 w-5">
    <circle cx="10" cy="10" r="8" />
    <path d="M12.5 8a3 3 0 1 0 0 4" strokeLinecap="round" />
  </svg>
);

const CATEGORIES: Category[] = [
  {
    label: "진행 방식",
    icon: <IconProcess />,
    items: [
      {
        q: "소재(로고, 이미지, 영상 등)는 어떻게 전달하나요?",
        a: "구글 드라이브 링크나 이메일 create@unboundstudio.co.kr 로 전달해 주시면 됩니다.",
      },
      {
        q: "작업 진행 상황은 어떻게 확인하나요?",
        a: "단계별로 중간 공유를 진행합니다. 방향을 함께 확인하며 진행하기 때문에 결과물에서 크게 벗어나는 경우가 없습니다.",
      },
      {
        q: "레퍼런스가 없어도 진행 가능한가요?",
        a: "네, 상담 시 방향성을 함께 잡아드립니다. 레퍼런스가 없어도 충분히 진행 가능합니다.",
      },
    ],
  },
  {
    label: "수정 · 촬영",
    icon: <IconEdit />,
    items: [
      {
        q: "수정은 몇 번 가능한가요?",
        a: "프로젝트당 3회 기준으로 진행됩니다. 범위를 벗어난 추가 수정은 별도 협의합니다.",
      },
      {
        q: "촬영도 함께 진행 가능한가요?",
        a: "올인원 서비스가 가능한 프로덕션으로, 촬영이 필요한 프로젝트도 진행합니다.",
      },
      {
        q: "급한 일정도 가능한가요?",
        a: "일정에 따라 협의 가능합니다. 먼저 문의 주시면 검토 후 안내드립니다.",
      },
    ],
  },
  {
    label: "계약 · 결제",
    icon: <IconContract />,
    items: [
      {
        q: "계약금은 언제 입금하나요?",
        a: "기획 확정 후 착수금 30%를 입금해 주시면 제작을 시작합니다. 잔금은 납품 후 익월 말일 기준으로 정산하는 것을 기본으로 합니다.",
      },
      {
        q: "세금계산서 발행이 가능한가요?",
        a: "네, 사업자 등록 업체로 세금계산서 발행 가능합니다.",
      },
      {
        q: "작업 취소 시 환불은 어떻게 되나요?",
        a: "착수 전 취소 시 전액 환불, 기획 확정 후에는 진행 단계에 따라 부분 환불됩니다.",
      },
    ],
  },
  {
    label: "저작권",
    icon: <IconCopyright />,
    items: [
      {
        q: "작업 결과물의 저작권은 누구에게 있나요?",
        a: "납품 완료 및 최종 정산 후 저작권은 클라이언트에게 귀속됩니다.",
      },
    ],
  },
];

type Screen =
  | { type: "home" }
  | { type: "list"; catIdx: number }
  | { type: "answer"; catIdx: number; faqIdx: number };

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4 flex-none text-white/25">
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
    <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>({ type: "home" });

  const goHome = () => setScreen({ type: "home" });

  const handleClose = () => {
    setOpen(false);
    setTimeout(goHome, 300);
  };

  const back = () => {
    if (screen.type === "answer") setScreen({ type: "list", catIdx: screen.catIdx });
    else goHome();
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9990] flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 flex h-[520px] w-[340px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-2xl"
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2">
                {screen.type !== "home" && (
                  <button
                    onClick={back}
                    className="mr-0.5 text-white/40 transition-colors hover:text-white"
                    aria-label="뒤로"
                  >
                    <ChevronLeft />
                  </button>
                )}
                <span className="h-2 w-2 rounded-full bg-brand-accent" />
                <span className="font-display text-xs uppercase tracking-[0.18em] text-white">
                  {screen.type === "home"
                    ? "Unbound Studio"
                    : CATEGORIES[screen.catIdx].label}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="text-white/40 transition-colors hover:text-white"
                aria-label="닫기"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* 본문 */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait" initial={false}>
                {/* 홈: 카테고리 선택 */}
                {screen.type === "home" && (
                  <motion.div
                    key="home"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.15 }}
                    className="p-5"
                  >
                    <p className="mb-4 text-sm text-white/45">궁금한 항목을 선택해 주세요</p>
                    <div className="space-y-2">
                      {CATEGORIES.map((cat, i) => (
                        <button
                          key={cat.label}
                          onClick={() => setScreen({ type: "list", catIdx: i })}
                          className="flex w-full items-center justify-between rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3.5 text-left transition-all hover:border-brand-accent/35 hover:bg-brand-accent/5"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-white/50">{cat.icon}</span>
                            <div>
                              <p className="text-sm font-medium text-white">{cat.label}</p>
                              <p className="text-[11px] text-white/30">{cat.items.length}개 질문</p>
                            </div>
                          </div>
                          <ChevronRight />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 질문 목록 */}
                {screen.type === "list" && (
                  <motion.div
                    key={`list-${screen.catIdx}`}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.15 }}
                    className="p-5"
                  >
                    <p className="mb-4 text-sm text-white/45">질문을 선택해 주세요</p>
                    <div className="space-y-2">
                      {CATEGORIES[screen.catIdx].items.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => setScreen({ type: "answer", catIdx: screen.catIdx, faqIdx: i })}
                          className="flex w-full items-start justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.025] px-4 py-3.5 text-left transition-all hover:border-brand-accent/35 hover:bg-brand-accent/5"
                        >
                          <span className="text-sm leading-snug text-white/80">{item.q}</span>
                          <ChevronRight />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 답변 */}
                {screen.type === "answer" && (
                  <motion.div
                    key={`answer-${screen.catIdx}-${screen.faqIdx}`}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.15 }}
                    className="p-5 space-y-3"
                  >
                    {/* Q */}
                    <div className="flex justify-end">
                      <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-brand-accent px-4 py-3 text-sm leading-relaxed text-white">
                        {CATEGORIES[screen.catIdx].items[screen.faqIdx].q}
                      </div>
                    </div>
                    {/* A */}
                    <div className="flex justify-start">
                      <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white/[0.08] px-4 py-3 text-sm leading-relaxed text-white/85">
                        {CATEGORIES[screen.catIdx].items[screen.faqIdx].a}
                      </div>
                    </div>
                    {/* 다른 질문 */}
                    <div className="pt-1">
                      <button
                        onClick={() => setScreen({ type: "list", catIdx: screen.catIdx })}
                        className="w-full rounded-xl border border-white/10 py-3 text-xs text-white/40 transition-colors hover:border-white/20 hover:text-white/70"
                      >
                        다른 질문 보기
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 하단: 직접 문의 */}
            <div className="border-t border-white/8 px-5 py-3.5">
              <a
                href="/contact"
                onClick={handleClose}
                className="flex items-center justify-center gap-1.5 text-xs text-white/35 transition-colors hover:text-white/70"
              >
                <span>직접 문의하기</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3">
                  <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 토글 버튼 */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent text-white shadow-xl"
        aria-label="자주 묻는 질문"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-5 w-5"
            >
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </motion.svg>
          ) : (
            <motion.svg
              key="faq"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-5 w-5"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2.5-2.5 2.5M12 16.5h.01" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
