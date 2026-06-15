"use client";
import { useRef, useEffect } from "react";

/**
 * 마우스 위치에 부드러운 타원형 글로우가 따라오며
 * 브랜드 컬러가 녹아드는 효과. RAF lerp로 스프링 물리감 구현.
 */
export function SpotlightText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 상태를 ref 객체 하나로 관리 (React re-render 없음)
    const s = {
      cx: 0, cy: 0,      // 현재(lerped) 위치
      tx: 0, ty: 0,      // 목표 위치
      size: 0,           // 현재 글로우 크기 비율 (0~1)
      targetSize: 0,
      rafId: 0,
      entered: false,
    };

    const LERP_POS  = 0.09;   // 위치 추적 속도 (낮을수록 부드럽고 느림)
    const LERP_SIZE = 0.07;   // 크기 변화 속도
    const MAX_W = 320;         // 글로우 최대 가로 반지름(px)
    const MAX_H = 240;         // 글로우 최대 세로 반지름(px)

    const applyStyle = () => {
      const w = Math.round(s.size * MAX_W);
      const h = Math.round(s.size * MAX_H);
      const x = Math.round(s.cx);
      const y = Math.round(s.cy);
      // 중심→ 브랜드 레드, 가장자리→ 흰색으로 부드럽게 페이드
      el.style.setProperty(
        "background-image",
        `radial-gradient(ellipse ${w}px ${h}px at ${x}px ${y}px, #e63226 0%, #ffffff 72%)`
      );
      el.style.setProperty("-webkit-background-clip", "text");
      el.style.setProperty("background-clip", "text");
      el.style.setProperty("-webkit-text-fill-color", "transparent");
      el.style.color = "transparent";
    };

    const clearStyle = () => {
      el.style.removeProperty("background-image");
      el.style.removeProperty("-webkit-background-clip");
      el.style.removeProperty("background-clip");
      el.style.removeProperty("-webkit-text-fill-color");
      el.style.removeProperty("color");
    };

    const tick = () => {
      // 위치 lerp
      s.cx += (s.tx - s.cx) * LERP_POS;
      s.cy += (s.ty - s.cy) * LERP_POS;
      // 크기 lerp
      s.size += (s.targetSize - s.size) * LERP_SIZE;

      if (s.size > 0.003) {
        applyStyle();
        s.rafId = requestAnimationFrame(tick);
      } else {
        clearStyle();
        s.rafId = 0;
      }
    };

    const startRaf = () => {
      if (!s.rafId) s.rafId = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (!s.entered) {
        // 처음 진입 시 위치 스냅 (왼쪽 상단에서 슬라이드되는 이상한 시작 방지)
        s.cx = x; s.cy = y;
        s.entered = true;
      }
      s.tx = x;
      s.ty = y;
      s.targetSize = 1;
      startRaf();
    };

    const onLeave = () => {
      s.targetSize = 0;
      s.entered = false;
      startRaf();
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(s.rafId);
      clearStyle();
    };
  }, []);

  return (
    <span ref={ref} className={className} style={{ display: "block" }}>
      {children}
    </span>
  );
}
