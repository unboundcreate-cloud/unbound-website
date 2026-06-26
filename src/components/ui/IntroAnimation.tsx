"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { markIntroDone } from "@/lib/intro-signal";

const CHARS = ["U", "n", "b", "o", "u", "n", "d", "."];

export function IntroAnimation() {
  const [phase, setPhase] = useState<"show" | "exit" | "done">("show");
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    if (sessionStorage.getItem("intro-done")) {
      setPhase("done");
      markIntroDone();
      return;
    }
    sessionStorage.setItem("intro-done", "1");

    const t1 = setTimeout(() => setPhase("exit"), 1800);
    const t2 = setTimeout(() => { setPhase("done"); markIntroDone(); }, 2700);
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
      <div className="flex items-baseline">
        {CHARS.map((char, i) => (
          <div key={i} className="overflow-hidden">
            <motion.span
              className={`block font-display text-[clamp(3.5rem,11vw,9rem)] leading-none ${
                char === "." ? "text-brand-accent" : "text-white"
              }`}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.1 + i * 0.065,
              }}
            >
              {char}
            </motion.span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
