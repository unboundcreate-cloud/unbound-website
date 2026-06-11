"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/data/works";

// YouTube ID 추출
function ytId(url?: string): string {
  if (!url) return "";
  const m = url.match(/(?:embed\/|v=|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : "";
}

export function HomeShowcaseCard({ work }: { work: Work }) {
  const [hover, setHover] = useState(false);
  const id = ytId(work.embedUrl || work.videoUrl);

  return (
    <Link
      href={`/works/${work.slug}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative aspect-video w-full overflow-hidden rounded-lg bg-brand-gray"
    >
      <Image
        src={work.thumbnailUrl}
        alt={work.title}
        fill
        sizes="(max-width: 640px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* hover 시 음소거 자동재생 미리보기 (클릭은 통과 → 상세 이동) */}
      {hover && id && (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&modestbranding=1&playsinline=1&rel=0`}
          title={work.title}
          allow="autoplay; encrypted-media"
          className="pointer-events-none absolute inset-0 h-full w-full border-0"
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-accent">
          {work.categoryLabel}
        </p>
        <h3 className="mt-1 line-clamp-2 font-display text-lg leading-tight text-white md:text-xl">
          {work.title}
        </h3>
      </div>
    </Link>
  );
}
