"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

export function IntroAnimation() {
  const [phase, setPhase] = useState<"show" | "exit" | "done">("show");
  const ran = useRef(false);

  useEffect(() => {
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
      transition={
        phase === "exit"
          ? { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
          : { duration: 0 }
      }
    >
      <div className="flex flex-col items-center">
        {/* 상단 레드 라인 */}
        <div className="relative mb-8 h-px w-[min(380px,62vw)] bg-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 h-full bg-brand-accent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          />
        </div>

        {/* 로고 */}
        <div className="w-[min(380px,62vw)]">
          <div className="relative">
            <div style={{ opacity: 0.08 }}>
              <Logo variant="white" height={92} className="h-auto w-full" />
            </div>
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <Logo variant="white" height={92} className="h-auto w-full" />
            </motion.div>
          </div>
        </div>

        {/* 하단 레드 라인 */}
        <div className="relative mt-8 h-px w-[min(380px,62vw)] bg-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 h-full bg-brand-accent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: 0.7 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
