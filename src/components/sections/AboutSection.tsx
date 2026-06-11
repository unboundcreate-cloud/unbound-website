"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Button } from "@/components/ui/Button";
import { fadeUpVariants } from "@/lib/animations";
import type { AboutConfig, Align, AboutBlock } from "@/lib/site-config";

const ALIGN_MAP: Record<Align, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
};

export function AboutSection({ about }: { about: AboutConfig }) {
  const headline = (
    <motion.h2
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="font-display text-[12vw] leading-[0.85] sm:text-6xl md:text-7xl lg:text-8xl"
    >
      {about.headlineLine1}
      <br />
      {about.headlineLine2}
    </motion.h2>
  );

  // 블록별 요소
  const blocks: Record<AboutBlock, React.ReactNode> = {
    body: (
      <motion.p
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="max-w-3xl text-white/70"
        style={{ fontSize: about.bodyFontPx, lineHeight: about.bodyLineHeight }}
      >
        {about.body}
      </motion.p>
    ),
    stats:
      about.stats.length > 0 ? (
        <div className="flex flex-wrap gap-12 md:gap-20">
          {about.stats.map((s, i) => (
            <motion.div
              key={`${s.label}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p
                className="font-display leading-none"
                style={{ fontSize: `clamp(2.75rem, 9vw, ${about.statFontPx}px)` }}
              >
                {s.useSymbol ? (
                  <span className="font-number">{s.display}</span>
                ) : (
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                )}
              </p>
              <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.25em] text-white/40">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      ) : null,
    learnMore:
      about.showLearnMore && about.learnMoreText ? (
        <Button href="/about" className="text-white hover:text-brand-accent">
          {about.learnMoreText}
        </Button>
      ) : null,
  };

  const alignOf: Record<AboutBlock, Align> = {
    body: about.bodyAlign,
    stats: about.statsAlign,
    learnMore: about.learnMoreAlign,
  };

  // 순서대로, 각 블록을 자기 정렬로 감싸 렌더
  const orderedBlocks = about.blockOrder
    .filter((key) => blocks[key])
    .map((key) => (
      <div key={key} className={`flex w-full flex-col ${ALIGN_MAP[alignOf[key]]}`}>
        {blocks[key]}
      </div>
    ));

  const headlineWrapped = (
    <div className={`flex w-full flex-col ${ALIGN_MAP[about.headlineAlign]}`}>
      {headline}
    </div>
  );

  return (
    <section id="about" className="bg-brand-black text-white">
      <div
        className="section-padding"
        style={{ paddingTop: about.paddingTop, paddingBottom: about.paddingBottom }}
      >
        {about.bodyPosition === "below" ? (
          <div className="flex flex-col gap-10">
            {headlineWrapped}
            {orderedBlocks}
          </div>
        ) : (
          // 좌측 = 헤드라인 + 본문(헤드라인 아래), 우측 = 통계 + Learn More
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-12 md:gap-y-0">
            <div className="flex flex-col gap-10 md:col-span-6">
              {headlineWrapped}
              {/* 본문: 헤드라인 바로 아래, 좌측 여백 라인에 맞춰 좌측정렬 */}
              <div className="flex w-full flex-col items-start text-left">
                {blocks.body}
              </div>
            </div>
            <div className="flex flex-col gap-10 md:col-span-6 md:pl-8 md:justify-center">
              <div className={`flex w-full flex-col ${ALIGN_MAP[about.statsAlign]}`}>
                {blocks.stats}
              </div>
              <div className={`flex w-full flex-col ${ALIGN_MAP[about.learnMoreAlign]}`}>
                {blocks.learnMore}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
