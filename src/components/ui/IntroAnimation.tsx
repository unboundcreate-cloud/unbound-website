"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

type Phase = "show" | "exit" | "done";

export function IntroAnimation() {
  const [phase, setPhase] = useState<Phase>("show");

  useEffect(() => {
    if (sessionStorage.getItem("intro-done")) {
      setPhase("done");
      return;
    }
    sessionStorage.setItem("intro-done", "1");

    const exitTimer = setTimeout(() => setPhase("exit"), 3000);
    const doneTimer = setTimeout(() => setPhase("done"), 3900);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  useEffect(() => {
    if (phase !== "done") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <motion.div
      key="intro"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-black"
      animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
      transition={
        phase === "exit"
          ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
          : { duration: 0 }
      }
    >
      <div className="relative flex items-center justify-center">
        {/* 로고 중심에서 빛이 둥글게 퍼지는 bloom */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute rounded-full bg-white"
          style={{ width: "min(62vw, 580px)", height: "6rem", filter: "blur(72px)" }}
          initial={{ opacity: 0, scaleX: 0.2, scaleY: 0.5 }}
          animate={{
            opacity: [0, 0.35, 0.18, 0],
            scaleX: [0.2, 1.1, 1.6, 2.2],
            scaleY: [0.5, 1.0, 1.4, 2.0],
          }}
          transition={{
            duration: 2.6,
            times: [0, 0.25, 0.6, 1],
            ease: "easeOut",
            delay: 0.3,
          }}
        />

        {/* 로고 — blur 녹아들듯 서서히 선명하게 */}
        <motion.div
          className="relative w-[min(62vw,580px)]"
          initial={{ opacity: 0, filter: "blur(18px)", scale: 1.07 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          transition={{
            duration: 2.0,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.35,
          }}
        >
          <Logo variant="white" height={92} className="h-auto w-full" />
        </motion.div>
      </div>
    </motion.div>
  );
}
