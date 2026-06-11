"use client";

import { motion } from "framer-motion";
import { processSteps } from "@/data/process";

type Step = { korTitle: string; description: string };

export function ProcessSection({
  heading = "Process",
  description = "기획부터 납품까지 — 검증된 5단계 프로세스로 영상의 완성도를 높여갑니다.",
  steps = processSteps as Step[],
}: {
  heading?: string;
  description?: string;
  steps?: Step[];
} = {}) {
  return (
    <section id="process" className="bg-brand-black text-white">
      <div className="section-padding py-24 md:py-32">
        {/* 헤딩 */}
        <div className="mb-16 flex flex-col gap-4 md:mb-20">
          <h2 className="flex items-start gap-2 font-display text-5xl uppercase leading-none md:text-7xl">
            <span className="mt-2 h-2 w-2 rounded-full bg-brand-accent md:mt-3" />
            {heading}
          </h2>
          <p className="text-sm leading-relaxed text-white/45 md:whitespace-nowrap">
            {description}
          </p>
        </div>

        {/* 원형 스텝 */}
        <div className="flex flex-wrap justify-center gap-6 xl:flex-nowrap xl:gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={`${step.korTitle}-${i}`}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex aspect-square w-[82vw] max-w-[340px] flex-col items-center rounded-full px-6 text-center transition-transform duration-500 hover:scale-[1.04] sm:w-[44vw] sm:max-w-[290px] lg:w-[30%] lg:max-w-[300px] xl:w-[21%] xl:max-w-none xl:-ml-6 xl:first:ml-0"
              style={{
                background:
                  "radial-gradient(circle at center, #242424 0%, #181818 62%, rgba(12,12,12,0) 100%)",
              }}
            >
              {/* 위 절반: 제목을 정중앙선에 하단 정렬 → 모든 원에서 위치 통일 */}
              <div className="flex h-1/2 flex-col items-center justify-end pb-2">
                <h3 className="font-display text-3xl tracking-wide text-white transition-colors group-hover:text-brand-accent 2xl:text-4xl">
                  {step.korTitle}
                </h3>
                <span className="mt-2 block h-px w-8 bg-brand-accent/70" />
              </div>
              {/* 아래 절반: 설명을 문장 단위로 줄바꿈(마침표마다 새 줄), 원 폭에 맞춰 감김 */}
              <div className="flex h-1/2 w-full flex-col gap-2 pt-2">
                {step.description
                  .split(/(?<=[.!?])\s+/)
                  .filter(Boolean)
                  .map((sentence, j) => (
                    <p key={j} className="whitespace-normal text-balance text-[15px] leading-snug text-white/55 2xl:whitespace-pre-line 2xl:text-[17px]">
                      {sentence}
                    </p>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
