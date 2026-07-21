"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SpotlightText } from "@/components/ui/SpotlightText";
import { Magnetic } from "@/components/ui/Magnetic";
import { onIntroDone } from "@/lib/intro-signal";

export function HomeHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.1);
  const [revealed, setRevealed] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [src, setSrc] = useState<string>();
  const [hintDismissed, setHintDismissed] = useState(false);
  const started = useRef(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const darken = useTransform(scrollYProgress, [0, 1], [0, 0.7]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const loopCount = useRef(0); // 완료된 재생 횟수
  const autoMuted = useRef(false); // 2회 후 자동 음소거 했는지

  // 영상이 끝날 때마다: 횟수 세고, 2회째면 자동 음소거 후 무음 루프 지속
  function handleEnded() {
    const v = videoRef.current;
    if (!v) return;
    loopCount.current += 1;
    v.currentTime = 0;
    if (loopCount.current >= 2 && !autoMuted.current) {
      autoMuted.current = true;
      v.muted = true;
      v.volume = volume; // 다음에 사용자가 소리 켤 때를 위해 기본 볼륨 복원
      setMuted(true);
    }
    void v.play().catch(() => {});
  }

  // 2회째 재생의 마지막 ~1.2초 동안 볼륨을 부드럽게 줄여 자연스럽게 음소거 전환
  function handleTimeUpdate() {
    const v = videoRef.current;
    if (!v || autoMuted.current || v.muted) return;
    if (loopCount.current === 1 && v.duration) {
      const remaining = v.duration - v.currentTime;
      if (remaining <= 1.2) {
        v.volume = Math.max(0, volume * (remaining / 1.2));
      }
    }
  }

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

  // 디바이스별 소스 선택 — 모바일은 경량본(4MB), 데스크톱은 원본(16MB).
  // SSR HTML엔 src가 없어 초기 로드 시 영상을 미리 받지 않음(LCP는 포스터).
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    setSrc(mobile ? "/hero-reel-mobile.mp4" : "/hero-reel.mp4");
  }, []);

  // 소리 켜기 힌트는 9초 뒤 자동으로 사라짐(계속 거슬리지 않게)
  useEffect(() => {
    const t = setTimeout(() => setHintDismissed(true), 9000);
    return () => clearTimeout(t);
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
      v.volume = 0.1;
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
    setHintDismissed(true);
    const v = videoRef.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    if (!next) {
      if (v.volume === 0) {
        v.volume = 0.1;
        setVolume(0.1);
      }
      void v.play().catch(() => {});
    }
    setMuted(next);
  }

  function changeVolume(value: number) {
    setHintDismissed(true);
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
          ref={heroRef}
          onMouseMove={showControls}
          onPointerDown={showControls}
          className="relative h-[calc(100svh-7rem)] min-h-[480px] w-full overflow-hidden bg-brand-black md:h-[calc(100svh-8rem)]"
        >
          {/* 배경 영상 — 스크롤 시 살짝 줌 + 어두워지며 다음 섹션으로 연결 */}
          <motion.video
            ref={videoRef}
            onClick={toggleSound}
            onEnded={handleEnded}
            onTimeUpdate={handleTimeUpdate}
            style={{ scale: heroScale }}
            className={`absolute inset-0 h-full w-full cursor-pointer object-cover transition-opacity duration-[1200ms] ease-out ${
              revealed ? "opacity-100" : "opacity-0"
            }`}
            src={src}
            poster="/hero-reel-poster.jpg"
            muted
            playsInline
            preload="auto"
          />
          {/* 스크롤 시 어두워지는 오버레이 */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-brand-black"
            style={{ opacity: darken }}
          />

          {/* 스크롤 다운 인디케이터 (데스크톱) */}
          <motion.div
            aria-hidden
            style={{ opacity: hintOpacity }}
            className="pointer-events-none absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 md:flex"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <span className="relative block h-9 w-px overflow-hidden bg-white/20">
              <span className="absolute left-0 top-0 block h-3 w-px animate-[scrolldown_1.7s_ease-in-out_infinite] bg-brand-accent" />
            </span>
          </motion.div>

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

          {/* 소리 켜기 힌트 — 음소거 상태 + 미해제 시에만 (자동 음소거 후 재등장 방지) */}
          {muted && !hintDismissed && (
            <button
              onClick={toggleSound}
              aria-label="소리 켜기"
              className="absolute left-1/2 top-24 z-20 flex -translate-x-1/2 animate-pulse items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-sm transition-colors hover:bg-black/60 md:top-28"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
                <path d="M11 5L6 9H2v6h4l5 4V5z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              탭하여 소리 켜기
            </button>
          )}

          <div className="section-padding absolute inset-x-0 bottom-0 flex flex-col gap-6 pb-8 md:flex-row md:items-end md:justify-between md:pb-12">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="font-display text-[24vw] uppercase leading-[0.95] text-white sm:text-[9rem] md:text-[11.25rem] lg:text-[13.5rem]"
              >
                <SpotlightText>
                  Move Without Limits
                  <br />
                  Creative Studio
                </SpotlightText>
              </motion.h1>
            </div>

            <Magnetic strength={0.4} className="self-start md:self-end">
              <Button href="/works" className="text-white">
                View Works
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
