"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { heroLineVariants } from "@/lib/animations";
import type { HeroConfig } from "@/lib/site-config";

// 레퍼런스 히어로 배경 — 컬러 3D 도형 렌더링
const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663245851071/HCdyqQ8UTV4D8pRsYNSWb9/portfolio-1-27ajKmqYELxzsPJqYgxNbV.webp";
const HERO_VIDEO =
  "https://cdn.pixabay.com/video/2020/05/31/40074-426958498_large.mp4";

export function HeroSection({ hero }: { hero: HeroConfig }) {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
      {/* 배경 영상 + 3D 이미지 */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={HERO_BG}
        preload="none"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <Image
        src={HERO_BG}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* 그라디언트 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      {/* 헤드라인 (좌하단) */}
      <div className="section-padding relative z-10 flex h-full flex-col justify-end pb-28 md:pb-32">
        <h1 className="font-display text-white">
          {hero.lines.map((line, i) => (
            <span
              key={`${line}-${i}`}
              className="-my-[0.12em] block overflow-hidden py-[0.12em] text-[18vw] leading-[0.82] md:text-[12vw] lg:text-[9.5rem] xl:text-[11rem]"
            >
              <motion.span
                custom={i}
                variants={heroLineVariants}
                initial="hidden"
                animate="visible"
                className="block"
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-6 max-w-md text-sm leading-relaxed text-white/70 md:text-base"
        >
          {hero.taglineLine1}
          <br />
          {hero.taglineLine2}
        </motion.p>

        {hero.buttonText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-8"
          >
            <Button href={hero.buttonHref}>{hero.buttonText}</Button>
          </motion.div>
        )}
      </div>

      {/* 스크롤 인디케이터 */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  );
}
