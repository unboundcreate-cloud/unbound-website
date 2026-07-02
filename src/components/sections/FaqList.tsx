"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { faqs } from "@/data/faq";
import { FadeIn } from "@/components/ui/FadeIn";

// 클릭 시 답변이 높이+페이드로 부드럽게 펼쳐지는 FAQ 아코디언.
export function FaqList() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="border-t border-white/10">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <FadeIn key={i} delay={Math.min(i * 0.05, 0.3)}>
            <div className="border-b border-white/10">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left text-base font-medium text-white transition-colors hover:text-brand-accent md:text-lg"
              >
                <span>{f.q}</span>
                <span
                  className={`flex-shrink-0 text-xl text-brand-accent transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      initial={{ y: 8 }}
                      animate={{ y: 0 }}
                      exit={{ y: 8 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      className="max-w-3xl pb-6 text-sm leading-relaxed text-white/60 md:text-base"
                    >
                      {f.a}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}
