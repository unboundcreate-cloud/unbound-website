"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

type Phase = "show" | "exit" | "done";

export function IntroAnimation() {
  const [phase, setPhase] = useState<Phase>("show");

  // 0 → 110 으로 증가. 30% 소프트 존으로 경계 완전히 흐림
  const r = useMotionValue(0);
  const mask = useTransform(
    r,
    (v) => `radial-gradient(circle at 50% 50%, black ${v}%, transparent ${v + 30}%)`
  );

  useEffect(() => {
    if (sessionStorage.getItem("intro-done")) { setPhase("done"); return; }
    sessionStorage.setItem("intro-done", "1");

    const t = setTimeout(() => {
      animate(r, 110, {
        duration: 2.2,
        ease: [0.25, 0.1, 0.25, 1], // cubic ease-in-out — 유기적인 느낌
      });
    }, 250);

    const exitTimer = setTimeout(() => setPhase("exit"), 3200);
    const doneTimer = setTimeout(() => setPhase("done"), 4100);

    return () => { clearTimeout(t); clearTimeout(exitTimer); clearTimeout(doneTimer); };
  }, [r]);

  useEffect(() => {
    if (phase !== "done") document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
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
          {/* 배경 아웃라인 — 로고 위치 암시 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.07 }}
            transition={{ duration: 0.3 }}
          >
            <Logo variant="white" height={92} className="h-auto w-full" />
          </motion.div>

          {/* 소프트 원형 마스크로 로고를 드러냄 */}
          <div
            className="absolute inset-0"
            style={{
              WebkitMaskImage: mask as unknown as string,
              maskImage: mask as unknown as string,
            }}
          >
            <Logo variant="white" height={92} className="h-auto w-full" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
