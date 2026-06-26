"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { worksOrdered, type Work } from "@/data/works";
import { HomeShowcaseCard } from "./HomeShowcaseCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightText } from "@/components/ui/SpotlightText";

const SLUGS = [
  "night-blooming-flower",
  "trigger",
  "kiss-sixth-sense",
  "seven-escape-2",
  "good-detective-2",
  "chunhwa-romance",
];

export function HomeShowcase({ works }: { works?: Work[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  const source = works ?? worksOrdered;
  const bySlug = new Map(source.map((w) => [w.slug, w] as const));
  const matched = SLUGS.map((s) => bySlug.get(s)).filter(
    (w): w is Work => Boolean(w),
  );
  // 선택된 슬러그가 모두 사라진 경우 source의 앞 6개로 fallback
  const items = matched.length > 0 ? matched : source.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-brand-black py-24 md:py-32">
      <div className="section-padding relative">
        <FadeIn>
          <h2 className="font-display text-3xl leading-tight text-white md:text-4xl lg:text-5xl">
            <SpotlightText>
              Beyond Production —
              <br />
              Creative, Intelligent, Unbound.
            </SpotlightText>
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
            최첨단 AI와 모션그래픽으로 영상 제작의 새로운 기준을 제시합니다.
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
            단순한 제작을 넘어, 브랜드의 메시지를 가장 강렬하게 전달하는 한 편의 이야기를 완성합니다.
          </p>
        </FadeIn>

        <div
          ref={ref}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3 md:mt-16 md:gap-6"
        >
          {items.map((w, i) => (
            <div
              key={w.id}
              style={{
                opacity: inView ? 1 : 0,
                transition: "opacity 0.7s ease",
                transitionDelay: `${i * 0.11}s`,
              }}
            >
              <HomeShowcaseCard work={w} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
