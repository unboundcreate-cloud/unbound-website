"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SpotlightText } from "@/components/ui/SpotlightText";
import { onIntroDone } from "@/lib/intro-signal";

export function HomeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.2);
  const [revealed, setRevealed] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const started = useRef(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // 마우스가 움직이면 컨트롤 표시, 1.5초간 멈추면 숨김
  function showControls() {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setControlsVisible(false), 1500);
  }

  // 초기 표시 후 자동 숨김
  useEffect(() => {
    hideTimer.current = setTimeout(() => setControlsVisible(false), 2000);
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  // 인트로("unbound.")가 끝난 뒤 영상을 처음부터 재생 — 앞부분이 안 잘리도록.
  // 소리 켜진 채 재생 시도, 브라우저가 막으면 무음으로 폴백.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;

    let fallback: ReturnType<typeof setTimeout> | undefined;

    const startPlayback = () => {
      if (started.current) return;
      started.current = true;
      if (fallback) clearTimeout(fallback);
      v.currentTime = 0;
      v.volume = 0.2;
      v.muted = false;
      setRevealed(true); // 부드러운 페이드인 시작
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.then(() => setMuted(false)).catch(() => {
          v.muted = true;
          setMuted(true);
          void v.play().catch(() => {});
        });
      }
    };

    const off = onIntroDone(startPlayback);
    // 안전 폴백: 신호가 4초 내 안 오면 그냥 재생
    fallback = setTimeout(startPlayback, 4000);

    return () => {
      off();
      if (fallback) clearTimeout(fallback);
    };
  }, []);

  function toggleSound() {
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    if (!next) {
      if (v.volume === 0) {
        v.volume = 0.2;
        setVolume(0.2);
      }
      void v.play().catch(() => {});
    }
    setMuted(next);
  }

  function changeVolume(value: number) {
    const v = videoRef.current;
    if (!v) return;
    v.volume = value;
    v.muted = value === 0;
    if (value > 0) void v.play().catch(() => {});
    setVolume(value);
    setMuted(value === 0);
  }

  return (
    <section className="bg-brand-black pt-28 md:pt-32">
      <div>
        <div
          onMouseMove={showControls}
          onPointerDown={showControls}
          className="relative h-[calc(100svh-7rem)] min-h-[480px] w-full overflow-hidden bg-brand-black md:h-[calc(100svh-8rem)]"
        >
          {/* 배경 영상 — 인트로 후 처음부터 페이드인 재생 · 루프 · 클릭 시 음소거 토글 */}
          <video
            ref={videoRef}
            onClick={toggleSound}
            className={`absolute inset-0 h-full w-full cursor-pointer object-cover transition-opacity duration-[1200ms] ease-out ${
              revealed ? "opacity-100" : "opacity-0"
            }`}
            src="/hero-reel.mp4"
            poster="/hero-reel-poster.jpg"
            muted
            loop
            playsInline
            preload="auto"
          />

          {/* 가독성용 어두운 오버레이 */}
          <div className="pointer-events-none absolute inset-0 bg-black/20" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* 사운드 컨트롤 — 마우스 움직임 시 표시, 멈추면 자동 숨김 */}
          <div
            className={`absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-2 py-1.5 backdrop-blur-sm transition-opacity duration-500 md:right-5 md:top-5 ${
              controlsVisible ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <button
              onClick={toggleSound}
              aria-label={muted ? "소리 켜기" : "소리 끄기"}
              className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-white transition-colors hover:bg-white/10"
            >
              {muted || volume === 0 ? (
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
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={(e) => changeVolume(Number(e.target.value))}
              aria-label="볼륨 조절"
              className="h-1 w-16 cursor-pointer appearance-none rounded-full bg-white/25 accent-white md:w-24"
            />
          </div>

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
