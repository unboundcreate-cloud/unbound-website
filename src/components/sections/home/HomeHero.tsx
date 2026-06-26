"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SpotlightText } from "@/components/ui/SpotlightText";

export function HomeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  // 마운트 시 소리 켜진 채 자동재생 시도 → 브라우저가 막으면 무음으로 폴백
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    const p = v.play();
    if (p && typeof p.then === "function") {
      p.then(() => setMuted(false)).catch(() => {
        v.muted = true;
        setMuted(true);
        void v.play().catch(() => {});
      });
    }
  }, []);

  function toggleSound() {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    if (!next) void v.play().catch(() => {});
    setMuted(next);
  }

  return (
    <section className="bg-brand-black pt-28 md:pt-32">
      <div>
        <div className="relative h-[calc(100svh-7rem)] min-h-[480px] w-full overflow-hidden bg-brand-black md:h-[calc(100svh-8rem)]">
          {/* 배경 영상 — 자동재생 · 루프 · 클릭 시 음소거 토글 */}
          <video
            ref={videoRef}
            onClick={toggleSound}
            className="absolute inset-0 h-full w-full cursor-pointer object-cover"
            src="/hero-reel.mp4"
            poster="/hero-reel-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />

          {/* 가독성용 어두운 오버레이 */}
          <div className="pointer-events-none absolute inset-0 bg-black/20" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* 음소거 토글 버튼 */}
          <button
            onClick={toggleSound}
            aria-label={muted ? "소리 켜기" : "소리 끄기"}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 md:right-5 md:top-5 md:h-11 md:w-11"
          >
            {muted ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
                <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M23 9l-6 6M17 9l6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
                <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

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
