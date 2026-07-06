"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { insights, type InsightCategory } from "@/data/insights";

const CAT_STYLE: Record<InsightCategory, string> = {
  "Case Study": "text-sky-300/90 border-sky-400/30 bg-sky-400/10",
  Process: "text-emerald-300/90 border-emerald-400/30 bg-emerald-400/10",
  Insight: "text-amber-300/90 border-amber-300/30 bg-amber-300/10",
};

// 메인 인사이트 — 인사이트 페이지의 피처드 캐러셀을 그대로 가져옴(자동 전환).
export function HomeInsight() {
  const [featured, setFeatured] = useState(0);

  // 피처드 캐러셀 자동 전환
  useEffect(() => {
    const id = setInterval(
      () => setFeatured((f) => (f + 1) % insights.length),
      6000,
    );
    return () => clearInterval(id);
  }, []);

  const post = insights[featured];
  const goPrev = () => setFeatured((f) => (f - 1 + insights.length) % insights.length);
  const goNext = () => setFeatured((f) => (f + 1) % insights.length);

  return (
    <section className="relative overflow-hidden bg-brand-black pt-24 pb-32 md:pt-32 md:pb-44">
      <div className="section-padding relative">
        {/* 섹션 라벨 + 전체 보기 */}
        <div className="mb-12 flex items-end justify-between gap-4">
          <p className="font-mono text-[12px] uppercase tracking-[0.25em] text-brand-accent">
            Insight
          </p>
          <Link href="/insight" className="group/link block shrink-0">
            <p className="flex items-center gap-2 font-mono text-sm uppercase tracking-[0.25em] text-white transition-colors group-hover/link:text-brand-accent">
              View All Insights
              <span className="transition-transform group-hover/link:translate-x-1">›</span>
            </p>
          </Link>
        </div>

        {/* ── 피처드 캐러셀 ─────────────────────────────── */}
        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-12">
          {/* 이미지 */}
          <Link
            href={`/insight/${post.slug}`}
            className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-brand-gray"
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span
                  className={`absolute left-5 top-5 inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide backdrop-blur-sm ${CAT_STYLE[post.category]}`}
                >
                  {post.category}
                </span>
                <p className="absolute bottom-5 left-6 font-display text-2xl uppercase tracking-wide text-white/90 drop-shadow md:text-3xl">
                  {post.client.split(" · ")[0]}
                </p>
              </motion.div>
            </AnimatePresence>
          </Link>

          {/* 내용 */}
          <div className="flex h-full flex-col">
            {/* 점 인디케이터 (상단 고정) */}
            <div className="mb-7 flex gap-2">
              {insights.map((p, i) => (
                <button
                  key={p.slug}
                  onClick={() => setFeatured(i)}
                  aria-label={`${i + 1}번째 글`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === featured ? "w-6 bg-brand-accent" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* 가변 텍스트 — 모든 슬라이드를 겹쳐 렌더해 높이를 '가장 긴 슬라이드' 기준으로 고정(전환 시 흔들림 방지) */}
            <div className="relative grid min-h-0 flex-1">
              {insights.map((p, i) => (
                <motion.div
                  key={p.slug}
                  className="col-start-1 row-start-1"
                  initial={false}
                  animate={{ opacity: i === featured ? 1 : 0, y: i === featured ? 0 : 12 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  aria-hidden={i !== featured}
                  style={{ pointerEvents: i === featured ? "auto" : "none" }}
                >
                  <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-brand-accent">
                    {p.category} · {p.date}
                  </p>
                  <Link href={`/insight/${p.slug}`} tabIndex={i === featured ? 0 : -1}>
                    <h2 className="mt-4 whitespace-pre-line font-display text-4xl leading-[1.1] text-white transition-colors hover:text-brand-accent md:text-5xl lg:text-[3.25rem]">
                      {p.title}
                    </h2>
                  </Link>
                  <p className="mt-6 max-w-xl whitespace-pre-line text-base leading-relaxed text-white/70 md:text-lg">
                    {p.lead}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* 화살표 (하단 고정) */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={goPrev}
                aria-label="이전"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-brand-accent hover:text-white"
              >
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-4 w-4">
                  <path d="M12 5l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={goNext}
                aria-label="다음"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-brand-accent hover:text-white"
              >
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-4 w-4">
                  <path d="M8 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
