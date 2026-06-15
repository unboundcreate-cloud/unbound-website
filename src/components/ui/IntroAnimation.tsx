"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    if (phase !== "done") document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="intro-overlay"
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-black"
        animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
        transition={phase === "exit" ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] } : { duration: 0 }}
      >
        {/* 로고: 블러에서 선명하게 서서히 등장 */}
        <motion.div
          className="w-[min(62vw,580px)]"
          initial={{ opacity: 0, filter: "blur(48px)", scale: 1.08 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{
            duration: 2.0,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.25,
          }}
        >
          <Logo variant="white" height={92} className="h-auto w-full" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
