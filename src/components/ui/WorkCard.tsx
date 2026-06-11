"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Work } from "@/data/works";

const ratioMap: Record<NonNullable<Work["size"]>, string> = {
  large: "aspect-[4/5] md:aspect-[3/4]",
  medium: "aspect-[4/5] md:aspect-[3/4]",
  small: "aspect-[4/5] md:aspect-[3/4]",
};

export function WorkCard({
  work,
  index = 0,
  className = "",
  ratio,
}: {
  work: Work;
  index?: number;
  className?: string;
  ratio?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <Link
        href={`/works/${work.slug}`}
        data-cursor="play"
        className={`group relative block w-full overflow-hidden ${
          ratio ?? ratioMap[work.size ?? "medium"]
        } bg-brand-gray`}
      >
        <Image
          src={work.thumbnailUrl}
          alt={work.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover brightness-90 transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-50"
        />

        {/* Play 버튼 */}
        <div className="absolute right-5 top-5 flex h-12 w-12 translate-y-2 items-center justify-center rounded-full border border-white/70 text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="ml-0.5 text-xs">▶</span>
        </div>

        {/* 하단 정보 */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 pt-16 opacity-100 transition-all duration-500 ease-out md:translate-y-4 md:bg-none md:pt-6 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <p className="mb-2 font-mono text-[12px] uppercase tracking-[0.25em] text-brand-accent">
            {work.categoryLabel} · {work.year}
          </p>
          <h3 className="font-display text-2xl leading-none text-white">
            {work.title}
          </h3>
          <p className="mt-1 font-mono text-[13px] uppercase tracking-[0.15em] text-white/60">
            {work.client}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
