"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

type Phase = "show" | "exit" | "done";

export function IntroAnimation() {
  const [phase, setPhase] = useState<Phase>("show");

  useEffect(() => {
    // 세션 당 1회만 표시
    if (sessionStorage.getItem("intro-done")) {
      setPhase("done");
      return;
    }
    sessionStorage.setItem("intro-done", "1");

    // 로고 등장(0.3s) + 텍스트 필 완료(~2.1s) + 잠시 대기 → exit
    const exitTimer = setTimeout(() => setPhase("exit"), 2800);
    const doneTimer = setTimeout(() => setPhase("done"), 3700);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  // 스크롤 잠금
  useEffect(() => {
    if (phase === "show" || phase === "exit") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro"
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-black"
        animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
        transition={
          phase === "exit"
            ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
            : { duration: 0 }
        }
      >
        {/* 로고 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="mb-10"
        >
          <Logo variant="white" height={36} />
        </motion.div>

        {/* 텍스트 색 채워지는 애니메이션 */}
        <div className="relative select-none">
          {/* 배경 텍스트 (어둡게) */}
          <span className="font-display text-lg uppercase tracking-[0.4em] text-white/15 md:text-xl lg:text-2xl">
            UNBOUND STUDIO
          </span>

          {/* 흰색으로 왼쪽→오른쪽 채워짐 */}
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden whitespace-nowrap font-display text-lg uppercase tracking-[0.4em] text-white md:text-xl lg:text-2xl"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
          >
            UNBOUND STUDIO
          </motion.span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
