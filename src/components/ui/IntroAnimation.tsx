"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

type Phase = "show" | "exit" | "done";

export function IntroAnimation() {
  const [phase, setPhase] = useState<Phase>("show");

  useEffect(() => {
    if (sessionStorage.getItem("intro-done")) { setPhase("done"); return; }
    sessionStorage.setItem("intro-done", "1");
    const exitTimer = setTimeout(() => setPhase("exit"), 2800);
    const doneTimer = setTimeout(() => setPhase("done"), 3700);
    return () => { clearTimeout(exitTimer); clearTimeout(doneTimer); };
  }, []);

  useEffect(() => {
    if (phase !== "done") { document.body.style.overflow = "hidden"; }
    else { document.body.style.overflow = ""; }
    return () => { document.body.style.overflow = ""; };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <motion.div
      key="intro"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-black"
      animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
      transition={phase === "exit" ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] } : { duration: 0 }}
    >
      <div className="w-[min(62vw,580px)]">
        <div className="relative">
          {/* 아웃라인 레이어 — 아주 희미하게 보여 "선만 있는" 느낌 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Logo variant="white" height={92} className="h-auto w-full" />
          </motion.div>

          {/* 채움 레이어 — 좌에서 우로 부드럽게 스윕 */}
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
          >
            <Logo variant="white" height={92} className="h-auto w-full" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
