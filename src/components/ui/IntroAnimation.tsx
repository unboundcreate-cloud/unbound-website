"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const LETTERS = "UNBOUND".split("");

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
        <div className="relative mb-7 h-px w-[min(360px,60vw)] bg-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 h-full bg-brand-accent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
          />
        </div>

        {/* UNBOUND — 글자 한 자씩 아래서 위로 슬라이드 */}
        <div className="flex">
          {LETTERS.map((char, i) => (
            <div key={i} className="overflow-hidden">
              <motion.span
                className="block font-display text-[clamp(2.8rem,9vw,7.5rem)] uppercase leading-none tracking-[-0.02em] text-white"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.72,
                  ease: [0.76, 0, 0.24, 1],
                  delay: 0.16 + i * 0.055,
                }}
              >
                {char}
              </motion.span>
            </div>
          ))}
        </div>

        {/* STUDIO 서브타이틀 */}
        <motion.p
          className="mt-3 font-mono text-[clamp(0.5rem,1.6vw,0.75rem)] uppercase tracking-[0.5em] text-white/35"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
        >
          Studio
        </motion.p>

        {/* 하단 레드 라인 */}
        <div className="relative mt-7 h-px w-[min(360px,60vw)] bg-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 h-full bg-brand-accent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: 0.76 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
