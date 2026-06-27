"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  insights,
  insightCategories,
  type InsightCategory,
  type InsightPost,
} from "@/data/insights";

type FilterValue = InsightCategory | "All";

const FILTERS: FilterValue[] = ["All", ...insightCategories];

const CAT_STYLE: Record<InsightCategory, string> = {
  "Case Study": "text-sky-300/80 border-sky-400/25 bg-sky-400/[0.06]",
  Process: "text-emerald-300/80 border-emerald-400/25 bg-emerald-400/[0.06]",
  Insight: "text-amber-300/80 border-amber-300/25 bg-amber-300/[0.06]",
};

export function InsightGallery() {
  const [active, setActive] = useState<FilterValue>("All");

  const filtered =
    active === "All" ? insights : insights.filter((p) => p.category === active);

  return (
    <section className="section-padding pb-32">
      {/* 카테고리 필터 */}
      <div className="mb-12 flex flex-wrap gap-2.5">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`rounded-full border px-5 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${
              active === f
                ? "border-brand-accent bg-brand-accent text-white"
                : "border-white/20 text-brand-muted hover:border-white/40 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 카드 그리드 */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((post, i) => (
            <InsightCard key={post.slug} post={post} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function InsightCard({ post, index }: { post: InsightPost; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/insight/${post.slug}`} className="group block">
        {/* 표지 */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-brand-gray">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover brightness-[0.85] transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span
            className={`absolute left-4 top-4 inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide backdrop-blur-sm ${CAT_STYLE[post.category]}`}
          >
            {post.category}
          </span>
        </div>

        {/* 텍스트 */}
        <div className="mt-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-muted">
            {post.client} · {post.date}
          </p>
          <h3 className="mt-2 font-display text-xl leading-snug text-white transition-colors group-hover:text-brand-accent md:text-2xl">
            {post.title}
          </h3>
          <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-white/55">
            {post.summary}
          </p>
          <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 transition-colors group-hover:text-white">
            Read
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
