"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SpotlightText } from "@/components/ui/SpotlightText";

export function HomeHero() {
  return (
    <section className="bg-brand-black pt-28 md:pt-32">
      <div>
        <div className="relative h-[calc(100dvh-7rem)] min-h-[560px] w-full overflow-hidden bg-brand-black md:h-[calc(100dvh-8rem)]">
          {/* 배경 영상 — 자동재생 · 무음 · 루프 */}
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src="/hero-reel.mp4"
            poster="/hero-reel-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
          />

          {/* 가독성용 어두운 오버레이 */}
          <div className="pointer-events-none absolute inset-0 bg-black/20" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          <div className="section-padding absolute inset-x-0 bottom-0 flex flex-col gap-6 pb-8 md:flex-row md:items-end md:justify-between md:pb-12">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="font-display text-[8vw] uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl lg:text-7xl"
              >
                <SpotlightText>
                  Move Without Limits
                  <br />
                  Creative Studio
                </SpotlightText>
              </motion.h1>
            </div>

            <Button href="/works" className="self-start text-white md:self-end">
              View Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
