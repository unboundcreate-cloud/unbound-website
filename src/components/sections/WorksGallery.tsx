"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WorkCard } from "@/components/ui/WorkCard";
import { worksOrdered, type Work, type WorkCategory } from "@/data/works";

type FilterValue = WorkCategory | "all";

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: "ALL", value: "all" },
  { label: "AI", value: "ai" },
  { label: "공공/기관", value: "public" },
  { label: "B2B", value: "b2b" },
  { label: "광고 & 홍보", value: "promo" },
  { label: "드라마 & 예능", value: "drama" },
];

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  const circleRef = useRef<HTMLSpanElement>(null);

  const setPos = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const c = circleRef.current;
    if (!c) return;
    c.style.left = `${e.clientX - rect.left}px`;
    c.style.top = `${e.clientY - rect.top}px`;
  };

  const onEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPos(e);
    circleRef.current?.style.setProperty("transform", "translate(-50%,-50%) scale(1)");
  };
  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => setPos(e);
  const onLeave = () =>
    circleRef.current?.style.setProperty("transform", "translate(-50%,-50%) scale(0)");

  return (
    <button
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative overflow-hidden rounded-full border px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] ${
        active
          ? "border-brand-accent bg-brand-accent text-white"
          : "border-white/25 text-brand-muted"
      }`}
    >
      <span
        ref={circleRef}
        aria-hidden
        className={`pointer-events-none absolute h-[240px] w-[240px] rounded-full ${
          active ? "bg-white" : "bg-brand-accent"
        }`}
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%) scale(0)",
          transition: "transform 0.75s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      <span
        className={`relative z-10 transition-colors duration-700 ${
          active ? "group-hover:text-brand-accent" : "group-hover:text-white"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

export function WorksGallery({
  initialCategory = "all",
  works,
}: {
  initialCategory?: FilterValue;
  works?: Work[];
}) {
  const [active, setActive] = useState<FilterValue>(initialCategory);
  const source = works ?? worksOrdered;

  const filtered =
    active === "all"
      ? source
      : source.filter((w) => w.category === active);

  return (
    <>
      <div className="section-padding mb-12 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-3 min-w-max sm:flex-wrap sm:min-w-0">
        {FILTERS.map((f) => (
          <FilterButton
            key={f.value}
            label={f.label}
            active={active === f.value}
            onClick={() => setActive(f.value)}
          />
        ))}
        </div>
      </div>

      <div className="section-padding">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3"
            exit={{ opacity: 0, y: 50, transition: { duration: 0.45, ease: [0.4, 0, 1, 1] } }}
          >
            {filtered.map((work, i) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  ease: [0.25, 1, 0.25, 1],
                  delay: Math.min(i * 0.07, 0.42),
                }}
              >
                <WorkCard work={work} ratio="aspect-[16/9]" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
