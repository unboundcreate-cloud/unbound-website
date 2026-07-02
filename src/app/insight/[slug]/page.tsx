import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { insights, getInsight } from "@/data/insights";
import { Tag } from "@/components/ui/Tag";
import { FadeIn } from "@/components/ui/FadeIn";
import { TrackOnMount } from "@/components/ui/TrackOnMount";

export function generateStaticParams() {
  return insights.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return { title: "Insight | Unbound Studio" };
  return {
    title: `${post.title} | Unbound Studio`,
    description: post.summary,
    keywords: post.tags,
    openGraph: {
      title: `${post.title} | Unbound Studio`,
      description: post.summary,
      type: "article",
      images: [{ url: post.coverImage }],
    },
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  const index = insights.findIndex((p) => p.slug === slug);
  const prev = insights[(index - 1 + insights.length) % insights.length];
  const next = insights[(index + 1) % insights.length];

  return (
    <article className="min-h-screen bg-brand-black">
      <TrackOnMount
        event="insight_view"
        params={{ item_id: post.slug, item_name: post.title, item_category: post.category }}
      />
      {/* 헤더 */}
      <header className="section-padding pb-10 pt-36 md:pt-44">
        <FadeIn>
          <Link
            href="/insight"
            className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-muted transition-colors hover:text-white"
          >
            ← Insight
          </Link>
          <p className="label-text mb-5">
            {post.category} · {post.date} · {post.readingTime}
          </p>
          <h1 className="max-w-4xl font-display text-3xl uppercase leading-[1.05] text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-muted md:text-lg">
            {post.summary}
          </p>
          <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.2em] text-white/40">
            {post.client}
          </p>
        </FadeIn>
      </header>

      {/* 표지 */}
      <FadeIn delay={0.1}>
        <div className="section-padding">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-brand-gray">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </FadeIn>

      {/* 본문 */}
      <div className="section-padding py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          {/* 리드 */}
          <FadeIn>
            <p className="border-l-2 border-brand-accent pl-6 text-lg leading-relaxed text-white/85 md:text-xl">
              {post.lead}
            </p>
          </FadeIn>

          {/* 성과 지표 */}
          {post.outcome && post.outcome.length > 0 && (
            <FadeIn delay={0.05}>
              <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
                {post.outcome.map((o) => (
                  <div key={o.label} className="bg-brand-black p-6 text-center">
                    <p className="font-display text-2xl text-brand-accent md:text-3xl">
                      {o.value}
                    </p>
                    <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-white/45">
                      {o.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          )}

          {/* 섹션 */}
          <div className="mt-14 space-y-12">
            {post.sections.map((s) => (
              <FadeIn key={s.heading}>
                <section>
                  <h2 className="font-display text-xl leading-snug text-white md:text-2xl">
                    {s.heading}
                  </h2>
                  {/* 모바일 가독성 — \n\n 기준으로 문단을 분리해 문단 간 여백을 확보(문단 내 줄바꿈은 유지) */}
                  <div className="mt-5 space-y-5 text-[15px] leading-[1.85] text-white/70 md:mt-4 md:text-base md:leading-[1.9]">
                    {s.body.split(/\n{2,}/).map((para, pi) => (
                      <p key={pi} className="whitespace-pre-line">
                        {para}
                      </p>
                    ))}
                  </div>
                </section>
              </FadeIn>
            ))}
          </div>

          {/* 마무리 한 줄 */}
          {post.takeaway && (
            <FadeIn>
              <p className="mt-16 font-display text-2xl leading-snug text-white md:text-3xl">
                “{post.takeaway}”
              </p>
            </FadeIn>
          )}

          {/* 태그 */}
          <FadeIn>
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn>
            <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center md:p-12">
              <p className="font-display text-2xl uppercase leading-tight text-white md:text-3xl">
                다음 프로젝트, 함께 만들까요?
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-brand-muted">
                기획부터 납품까지, 머리 쓰며 효율적으로 일하는 팀과 함께하세요.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-accent px-7 py-3 font-display text-xs uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-85"
              >
                프로젝트 문의하기
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* PREV / NEXT */}
      <nav className="section-padding flex items-center justify-between border-t border-white/10 py-10">
        <Link
          href={`/insight/${prev.slug}`}
          className="group max-w-[45%] font-display text-sm uppercase tracking-[0.15em] text-white/80 hover:text-brand-accent"
        >
          <span className="inline-block transition-transform group-hover:-translate-x-1">←</span>{" "}
          Prev
        </Link>
        <Link
          href="/insight"
          className="font-mono text-[13px] uppercase tracking-[0.2em] text-brand-muted hover:text-white"
        >
          All
        </Link>
        <Link
          href={`/insight/${next.slug}`}
          className="group max-w-[45%] text-right font-display text-sm uppercase tracking-[0.15em] text-white/80 hover:text-brand-accent"
        >
          Next{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </nav>
    </article>
  );
}
