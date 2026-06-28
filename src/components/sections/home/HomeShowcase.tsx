"use client";

import { useRef } from "react";
import Link from "next/link";
import { useInView } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightText } from "@/components/ui/SpotlightText";

type Category = { label: string; sub: string; video: string };

// 6개 제작 분야 — hover 시 각 영상이 재생됨.
// 영상은 public/showcase/ 에 아래 파일명으로 넣으면 자동 연결됩니다.
const CATEGORIES: Category[] = [
  { label: "AI Content", sub: "AI 콘텐츠", video: "/showcase/ai-content.mp4" },
  { label: "Broadcast & Drama", sub: "방송·드라마", video: "/showcase/broadcast-drama.mp4" },
  { label: "Public & Institutional", sub: "공공·기관", video: "/showcase/public-institutional.mp4" },
  { label: "Advertising", sub: "광고", video: "/showcase/advertising.mp4" },
  { label: "B2B Film", sub: "B2B 필름", video: "/showcase/b2b-film.mp4" },
  { label: "Motion Graphic", sub: "모션그래픽", video: "/showcase/motion-graphic.mp4" },
];

export function HomeShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <section className="relative overflow-hidden bg-brand-black py-24 md:py-32">
      <div className="section-padding relative">
        <FadeIn>
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
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
            </div>
            <Link href="/works" className="group/link block shrink-0 md:mt-2">
              <p className="flex items-center gap-2 font-mono text-sm uppercase tracking-[0.25em] text-white transition-colors group-hover/link:text-brand-accent">
                View All Works
                <span className="transition-transform group-hover/link:translate-x-1">›</span>
              </p>
            </Link>
          </div>
        </FadeIn>

        <div
          ref={ref}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3 md:mt-16 md:gap-6"
        >
          {CATEGORIES.map((c, i) => (
            <div
              key={c.label}
              style={{
                opacity: inView ? 1 : 0,
                transition: "opacity 0.7s ease",
                transitionDelay: `${i * 0.11}s`,
              }}
            >
              <ShowcaseCategoryCard category={c} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ShowcaseCategoryCard({ category, index }: { category: Category; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    void v.play().catch(() => {});
  };
  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <div
      onMouseEnter={play}
      onMouseLeave={stop}
      className="group relative aspect-video w-full overflow-hidden rounded-lg bg-brand-gray"
    >
      {/* 기본 배경 — 영상이 없거나 로딩 전/터치 기기에서 보이는 그라디언트 */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-gray via-brand-black to-black" />

      {/* hover 시 재생되는 로컬 영상 (히어로와 동일한 방식) */}
      <video
        ref={videoRef}
        src={category.video}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* 가독성용 오버레이 + 라벨 */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-accent">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-1 font-display text-lg leading-tight text-white md:text-xl">
          {category.label}
        </h3>
        <p className="mt-0.5 text-xs text-white/55">{category.sub}</p>
      </div>
    </div>
  );
}
