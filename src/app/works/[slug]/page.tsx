import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { works, getWork } from "@/data/works";
import { Tag } from "@/components/ui/Tag";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return { title: "Works | Unbound Studio" };
  return {
    title: `${work.title} | Unbound Studio`,
    description: work.description,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const index = works.findIndex((w) => w.slug === slug);
  const prev = works[(index - 1 + works.length) % works.length];
  const next = works[(index + 1) % works.length];

  return (
    <article className="min-h-screen bg-brand-black pt-16 md:pt-20">
      {/* 풀화면 비주얼 — YouTube 임베드 또는 썸네일+링크 */}
      {work.embedUrl ? (
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={work.embedUrl}
            title={work.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      ) : (
        <a
          href={work.videoUrl}
          target="_blank"
          rel="noreferrer"
          data-cursor="play"
          className="group relative block h-[60vh] min-h-[420px] w-full overflow-hidden md:h-[70vh]"
        >
          <Image
            src={work.thumbnailUrl}
            alt={work.title}
            fill
            priority
            sizes="100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40" />
          <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 text-white backdrop-blur-sm transition-transform group-hover:scale-110">
            <span className="ml-1">▶</span>
          </div>
        </a>
      )}

      {/* 정보 */}
      <div className="section-padding py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand-accent">
              {work.categoryLabel} · {work.year}
            </p>
            <h1 className="mt-4 font-display text-5xl uppercase leading-[0.9] md:text-6xl">
              {work.title}
            </h1>
            {/* 프로젝트 스펙 */}
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-8">
              {[
                ["Client", work.client],
                ["Category", work.categoryLabel],
                ["Duration", work.duration],
                ["Period", work.period],
                ["Role", work.role],
                ["Year", work.year],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[12px] uppercase tracking-[0.2em] text-brand-muted">
                    {k}
                  </dt>
                  <dd className="mt-1 text-sm text-white">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-wrap gap-2">
              {work.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 md:pl-8">
            <p className="text-base leading-relaxed text-white/75 md:text-lg">
              {work.description}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-brand-muted">
              기획·디자인·제작·납품까지 원스톱으로 진행한 프로젝트입니다. 최신 AI
              기술과 모션그래픽을 결합하여 클라이언트의 메시지를 가장 강렬하게
              전달하는 영상을 완성했습니다.
            </p>
            <a
              href={work.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex items-center gap-2 font-display text-sm uppercase tracking-[0.2em] text-white hover:text-brand-accent"
            >
              영상 보기
              <span className="transition-transform group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </div>
        </div>

      </div>

      {/* PREV / NEXT */}
      <nav className="section-padding flex items-center justify-between border-t border-white/10 py-10">
        <Link
          href={`/works/${prev.slug}`}
          className="group font-display text-sm uppercase tracking-[0.2em] text-white/80 hover:text-brand-accent"
        >
          <span className="inline-block transition-transform group-hover:-translate-x-1">
            ←
          </span>{" "}
          Prev Project
        </Link>
        <Link
          href="/works"
          className="font-mono text-[13px] uppercase tracking-[0.2em] text-brand-muted hover:text-white"
        >
          All Works
        </Link>
        <Link
          href={`/works/${next.slug}`}
          className="group font-display text-sm uppercase tracking-[0.2em] text-white/80 hover:text-brand-accent"
        >
          Next Project
        </Link>
      </nav>
    </article>
  );
}
