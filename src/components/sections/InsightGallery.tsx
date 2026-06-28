"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { insights, type InsightCategory, type InsightPost } from "@/data/insights";

const CAT_STYLE: Record<InsightCategory, string> = {
  "Case Study": "text-sky-300/90 border-sky-400/30 bg-sky-400/10",
  Process: "text-emerald-300/90 border-emerald-400/30 bg-emerald-400/10",
  Insight: "text-amber-300/90 border-amber-300/30 bg-amber-300/10",
};

export function InsightGallery() {
  const [featured, setFeatured] = useState(0);
  const [search, setSearch] = useState("");

  // 피처드 캐러셀 자동 전환
  useEffect(() => {
    const id = setInterval(
      () => setFeatured((f) => (f + 1) % insights.length),
      6000,
    );
    return () => clearInterval(id);
  }, []);

  const featuredPost = insights[featured];
  const goPrev = () => setFeatured((f) => (f - 1 + insights.length) % insights.length);
  const goNext = () => setFeatured((f) => (f + 1) % insights.length);

  const q = search.trim().toLowerCase();
  const filtered = q
    ? insights.filter((p) =>
        [p.title, p.client, p.summary, ...p.tags]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
    : insights;

  return (
    <section className="section-padding pb-32">
      {/* ── 피처드 캐러셀 ─────────────────────────────── */}
      <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-12">
        {/* 이미지 */}
        <Link
          href={`/insight/${featuredPost.slug}`}
          className="group relative block aspect-video w-full overflow-hidden rounded-2xl bg-brand-gray"
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={featuredPost.slug}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span
                className={`absolute left-5 top-5 inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wide backdrop-blur-sm ${CAT_STYLE[featuredPost.category]}`}
              >
                {featuredPost.category}
              </span>
              <p className="absolute bottom-5 left-6 font-display text-2xl uppercase tracking-wide text-white/90 drop-shadow md:text-3xl">
                {featuredPost.client.split(" · ")[0]}
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

          {/* 가변 텍스트 — 상·하단 고정을 위해 가운데 영역에 배치 */}
          <div className="min-h-0 flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={featuredPost.slug}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-brand-accent">
                {featuredPost.category} · {featuredPost.date}
              </p>
              <Link href={`/insight/${featuredPost.slug}`}>
                <h2 className="mt-4 whitespace-pre-line font-display text-4xl leading-[1.1] text-white transition-colors hover:text-brand-accent md:text-5xl lg:text-[3.25rem]">
                  {featuredPost.title}
                </h2>
              </Link>
              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/65 md:text-base">
                {featuredPost.lead}
              </p>
            </motion.div>
          </AnimatePresence>
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

      {/* ── Total + 검색 ─────────────────────────────── */}
      <div className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
        <p className="font-mono text-sm uppercase tracking-[0.15em] text-white/50">
          Total <span className="text-white">| {filtered.length}</span>
        </p>
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="검색어를 입력해주세요"
            spellCheck={false}
            className="w-full rounded-full border border-white/15 bg-white/[0.03] py-2.5 pl-5 pr-12 text-sm text-white placeholder:text-white/30 focus:border-brand-accent/60 focus:outline-none"
          />
          <span className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-brand-accent text-white">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
              <circle cx="9" cy="9" r="6" />
              <path d="M14 14l3.5 3.5" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>

      {/* ── 3열 카드 그리드 ─────────────────────────────── */}
      {filtered.length === 0 ? (
        <p className="py-20 text-center text-sm text-white/40">검색 결과가 없습니다.</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <InsightCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}

function InsightCard({ post, index }: { post: InsightPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/insight/${post.slug}`} className="group block">
        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-brand-gray">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover brightness-[0.85] transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <span
            className={`absolute left-4 top-4 inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide backdrop-blur-sm ${CAT_STYLE[post.category]}`}
          >
            {post.category}
          </span>
        </div>

        <div className="mt-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-muted">
            {post.client.split(" · ")[0]} · {post.date}
          </p>
          <h3 className="mt-2 font-display text-xl leading-snug text-white transition-colors group-hover:text-brand-accent md:text-2xl">
            {post.title}
          </h3>
          <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-white/55">
            {post.summary}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
