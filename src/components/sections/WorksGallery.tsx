"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WorkCard } from "@/components/ui/WorkCard";
import { worksOrdered, type WorkCategory } from "@/data/works";

const FILTERS: { label: string; value: WorkCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "드라마 & 예능", value: "drama" },
  { label: "광고 & 홍보", value: "promo" },
  { label: "B2B", value: "b2b" },
];

export function WorksGallery({
  initialCategory = "all",
}: {
  initialCategory?: WorkCategory | "all";
}) {
  const [active, setActive] = useState<WorkCategory | "all">(initialCategory);

  // 드라마/영화 우선 + 인기순 정렬은 worksOrdered(@/data/works)에서 공통 적용
  const filtered =
    active === "all"
      ? worksOrdered
      : worksOrdered.filter((w) => w.category === active);

  return (
    <>
      {/* 필터 탭 (알약형) */}
      <div className="section-padding mb-12 flex flex-wrap gap-3">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`rounded-full border px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors ${
              active === f.value
                ? "border-brand-accent bg-brand-accent text-white"
                : "border-white/25 text-brand-muted hover:border-white hover:text-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 그리드 */}
      <div className="section-padding">
        <motion.div
          layout
          className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((work, i) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: (i % 3) * 0.09,
                }}
              >
                <WorkCard work={work} ratio="aspect-[16/9]" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </>
  );
}
