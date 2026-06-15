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

    // 로고 올라오기(~1.9s) + 잠시 대기(0.8s) → exit
    const exitTimer = setTimeout(() => setPhase("exit"), 2700);
    const doneTimer = setTimeout(() => setPhase("done"), 3600);
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
      {/*
        overflow-hidden 컨테이너가 클리핑 마스크 역할.
        내부 로고가 y: "100%"(아래 숨겨진 상태)에서 y: 0(제자리)으로 올라오며
        마치 커튼 뒤에서 나오듯 드러남.
      */}
      <div className="w-[min(62vw,580px)] overflow-hidden">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{
            duration: 1.5,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.4,
          }}
        >
          <Logo variant="white" height={92} className="h-auto w-full" />
        </motion.div>
      </div>
    </motion.div>
  );
}
