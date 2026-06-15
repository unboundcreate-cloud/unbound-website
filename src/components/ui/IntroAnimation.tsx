"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

export function IntroAnimation() {
  const [phase, setPhase] = useState<"show" | "exit" | "done">("show");
  const ran = useRef(false);

  useEffect(() => {
    // React 18 Strict Mode의 이중 실행 방지
    if (ran.current) return;
    ran.current = true;

    if (sessionStorage.getItem("intro-done")) {
      setPhase("done");
      return;
    }
    sessionStorage.setItem("intro-done", "1");

    const t1 = setTimeout(() => setPhase("exit"), 1800);
    const t2 = setTimeout(() => setPhase("done"), 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = phase === "done" ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-black"
      animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
      transition={phase === "exit" ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] } : { duration: 0 }}
    >
      <div className="w-[min(62vw,580px)]">
        <div className="relative">
          {/* 항상 보이는 희미한 레이어 — 컴포넌트 렌더 즉시 표시 */}
          <div style={{ opacity: 0.1 }}>
            <Logo variant="white" height={92} className="h-auto w-full" />
          </div>

          {/* 메인 로고: 페이드인 + 살짝 줌인 */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <Logo variant="white" height={92} className="h-auto w-full" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
