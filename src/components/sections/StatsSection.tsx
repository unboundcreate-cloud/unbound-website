"use client";
import { FadeIn } from "@/components/ui/FadeIn";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const STATS = [
  { value: 50, suffix: "+", label: "프로젝트" },
  { value: 5, suffix: "년+", label: "업력" },
  { value: 3, suffix: "사", label: "방송사 납품" },
  { value: 26, suffix: "+", label: "클라이언트" },
];

export function StatsSection() {
  return (
    <section className="section-padding border-y border-white/10 py-20 md:py-28">
      <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="font-display text-5xl leading-none text-brand-accent md:text-6xl lg:text-7xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={1800} />
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-brand-muted">
                {stat.label}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
