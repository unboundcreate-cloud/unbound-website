"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { insights, type InsightCategory, type InsightPost } from "@/data/insights";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightText } from "@/components/ui/SpotlightText";

const CAT_STYLE: Record<InsightCategory, string> = {
  "Case Study": "text-sky-300/90 border-sky-400/30 bg-sky-400/10",
  Process: "text-emerald-300/90 border-emerald-400/30 bg-emerald-400/10",
  Insight: "text-amber-300/90 border-amber-300/30 bg-amber-300/10",
};

// 메인 인사이트 티저 — 최신 3개만 카드 그리드로 노출, 전체는 /insight 로 연결.
const LATEST = insights.slice(0, 3);

export function HomeInsight() {
  return (
    <section className="relative overflow-hidden bg-brand-black py-24 md:py-32">
      <div className="section-padding relative">
        <FadeIn>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-3xl leading-tight text-white md:text-4xl lg:text-5xl">
                <SpotlightText>
                  Insight —
                  <br />
                  The Thinking Behind Our Work.
                </SpotlightText>
              </h2>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
                완성된 영상 뒤의 과정과 일하는 방식을 기록합니다.
              </p>
            </div>
            <Link href="/insight" className="group/link block shrink-0">
              <p className="flex items-center gap-2 font-mono text-sm uppercase tracking-[0.25em] text-white transition-colors group-hover/link:text-brand-accent">
                View All Insights
                <span className="transition-transform group-hover/link:translate-x-1">›</span>
              </p>
            </Link>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-x-7 gap-y-12 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {LATEST.map((post, i) => (
            <InsightCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </div>
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
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-brand-gray">
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
