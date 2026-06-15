"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Logo } from "@/components/ui/Logo";

type Phase = "show" | "exit" | "done";

export function IntroAnimation() {
  const [phase, setPhase] = useState<Phase>("show");

  // 0 → 120 으로 애니메이션, gradient stop에 직접 사용
  const radius = useMotionValue(0);
  const maskImage = useTransform(
    radius,
    (v) =>
      `radial-gradient(circle at 50% 50%, black ${Math.max(0, v - 14)}%, transparent ${v + 14}%)`
  );

  useEffect(() => {
    if (sessionStorage.getItem("intro-done")) { setPhase("done"); return; }
    sessionStorage.setItem("intro-done", "1");

    // 딜레이 후 원을 서서히 확장
    const t = setTimeout(() => {
      animate(radius, 120, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
    }, 300);

    const exitTimer = setTimeout(() => setPhase("exit"), 2800);
    const doneTimer = setTimeout(() => setPhase("done"), 3700);

    return () => { clearTimeout(t); clearTimeout(exitTimer); clearTimeout(doneTimer); };
  }, [radius]);

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
          {/* 희미한 아웃라인 레이어 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Logo variant="white" height={92} className="h-auto w-full" />
          </motion.div>

          {/* 경계가 부드러운 원형 마스크로 로고 드러냄 */}
          <motion.div
            className="absolute inset-0"
            style={{
              WebkitMaskImage: maskImage,
              maskImage: maskImage,
            } as React.CSSProperties}
          >
            <Logo variant="white" height={92} className="h-auto w-full" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
