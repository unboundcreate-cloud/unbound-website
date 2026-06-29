"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightText } from "@/components/ui/SpotlightText";
import { trackEvent } from "@/lib/gtag";

type Category = { label: string; sub: string; video: string; poster: string; href: string };

// 6개 제작 분야 — 기본은 썸네일, hover 시 영상이 부드럽게 페이드인. 클릭 시 해당 분야 Works로.
// 영상은 public/showcase/<slug>.mp4, 썸네일은 public/showcase/<slug>.webp.
const CATEGORIES: Category[] = [
  { label: "AI Content", sub: "AI 콘텐츠", video: "/showcase/ai-content.mp4", poster: "/showcase/ai-content.webp", href: "/works?category=ai" },
  { label: "Broadcast & Drama", sub: "방송·드라마", video: "/showcase/broadcast-drama.mp4", poster: "/showcase/broadcast-drama.webp", href: "/works?category=drama" },
  { label: "Public & Institutional", sub: "공공·기관", video: "/showcase/public-institutional.mp4", poster: "/showcase/public-institutional.webp", href: "/works?category=public" },
  { label: "Advertising", sub: "광고", video: "/showcase/advertising.mp4", poster: "/showcase/advertising.webp", href: "/works?category=promo" },
  { label: "B2B Film", sub: "B2B 필름", video: "/showcase/b2b-film.mp4", poster: "/showcase/b2b-film.webp", href: "/works?category=b2b" },
  { label: "Motion Graphic", sub: "모션그래픽", video: "/showcase/motion-graphic.mp4", poster: "/showcase/motion-graphic.webp", href: "/works" },
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
  const cardRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);

  const onEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    void v.play().catch(() => {});
  };
  const onLeave = () => {
    // 먼저 부드럽게 페이드아웃 → 그 뒤 일시정지(프레임 고정)
    setShowVideo(false);
    const v = videoRef.current;
    if (v) v.pause();
  };

  // 터치 기기(hover 없음): 카드가 화면에 들어오면 음소거 자동재생, 벗어나면 정지.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: none)").matches) return; // 데스크톱은 hover 사용
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        const v = videoRef.current;
        if (!v) return;
        if (e.isIntersecting && e.intersectionRatio >= 0.6) {
          void v.play().catch(() => {});
        } else {
          v.pause();
          setShowVideo(false);
        }
      },
      { threshold: [0, 0.6] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Link
      ref={cardRef}
      href={category.href}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={() => trackEvent("select_content", { content_type: "showcase_category", item_id: category.label })}
      className="group relative block aspect-video w-full overflow-hidden rounded-lg bg-brand-gray"
    >
      {/* 기본 썸네일 — 항상 표시(영상이 그 위로 페이드인) */}
      <Image
        src={category.poster}
        alt={category.label}
        fill
        sizes="(max-width: 640px) 100vw, 33vw"
        className="object-cover"
      />

      {/* hover 시 재생되는 영상 — 실제 재생이 시작되면 부드럽게 페이드인 */}
      <video
        ref={videoRef}
        src={category.video}
        muted
        loop
        playsInline
        preload="none"
        onPlaying={() => setShowVideo(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
          showVideo ? "opacity-100" : "opacity-0"
        }`}
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
    </Link>
  );
}
