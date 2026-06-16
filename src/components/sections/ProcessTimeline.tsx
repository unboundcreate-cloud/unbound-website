"use client";

import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";

const PROCESS = [
  { num: "01", title: "기획", desc: "브랜드와 프로젝트 목표를 분석합니다." },
  { num: "02", title: "디자인", desc: "콘셉트와 비주얼 방향을 설계합니다." },
  { num: "03", title: "제작", desc: "모션그래픽, 영상 편집, 후반 작업을 진행합니다." },
  { num: "04", title: "납품", desc: "최종 검수 후 최적화하여 전달합니다." },
];

export function ProcessTimeline() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const fillPct =
    hoveredIdx !== null
      ? Math.round(((hoveredIdx + 1) / PROCESS.length) * 100)
      : 0;

  return (
    <>
      {/* Desktop: horizontal timeline */}
      <div className="hidden sm:block">
        {/* 번호 행 */}
        <div className="mb-3 grid grid-cols-4">
          {PROCESS.map((p) => (
            <p key={p.num} className="font-mono text-[11px] tracking-[0.25em] text-brand-accent">
              {p.num}
            </p>
          ))}
        </div>

        {/* 라인 + 점 */}
        <div className="relative mb-10">
          {/* 기본 라인 (흰색) */}
          <div className="absolute inset-x-0 top-[5px] h-px bg-white/15" />
          {/* 호버 시 왼쪽부터 누적 채움 */}
          <div
            className="absolute left-0 top-[5px] h-px bg-brand-accent"
            style={{
              width: `${fillPct}%`,
              transition: "width 0.45s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
          {/* 점 */}
          <div className="relative grid grid-cols-4">
            {PROCESS.map((p, i) => (
              <div key={p.num} className="relative z-10">
                <div
                  className="h-2.5 w-2.5 rounded-full transition-colors duration-300"
                  style={{
                    backgroundColor:
                      hoveredIdx !== null && i === hoveredIdx
                        ? "var(--color-brand-accent)"
                        : "rgba(255,255,255,0.25)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 텍스트 행 */}
        <div className="grid grid-cols-4 gap-8">
          {PROCESS.map((p, i) => (
            <FadeIn key={p.num} delay={i * 0.1}>
              <div
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-default"
              >
                <h3
                  className="mb-3 font-display text-2xl uppercase transition-colors duration-300"
                  style={{
                    color:
                      hoveredIdx !== null && i === hoveredIdx
                        ? "var(--color-brand-accent)"
                        : "#ffffff",
                  }}
                >
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50">{p.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Mobile: vertical list */}
      <div className="sm:hidden">
        {PROCESS.map((p, i) => (
          <FadeIn key={p.num} delay={i * 0.1}>
            <div className="border-b border-white/10 py-8 last:border-0">
              <p className="mb-3 font-mono text-[11px] tracking-[0.25em] text-brand-accent">
                {p.num}
              </p>
              <h3 className="mb-2 font-display text-2xl uppercase text-white">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/50">{p.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </>
  );
}
