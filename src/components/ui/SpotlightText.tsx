"use client";
import { useRef, useEffect } from "react";

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

    const s = {
      cx: 0, cy: 0,
      tx: 0, ty: 0,
      size: 0, targetSize: 0,
      rafId: 0,
      entered: false,
      enterTime: 0,
    };

    const LERP_POS   = 0.11;
    const LERP_SIZE  = 0.08;
    const BASE_R     = 120;   // 기본 원 반지름(px)
    const PULSE_AMP  = 22;    // 숨쉬기 진폭(px)
    const PULSE_HZ   = 0.0018; // 숨쉬기 주파수

    const applyStyle = (r: number) => {
      const x = Math.round(s.cx);
      const y = Math.round(s.cy);
      el.style.setProperty(
        "background-image",
        // 선명한 원: 중심 레드 → 테두리에서 화이트로 빠르게 전환
        `radial-gradient(circle ${r}px at ${x}px ${y}px, #e63226 0%, #e63226 52%, #ffffff 84%)`
      );
      el.style.setProperty("-webkit-background-clip", "text");
      el.style.setProperty("background-clip", "text");
      el.style.setProperty("-webkit-text-fill-color", "transparent");
      el.style.color = "transparent";
    };

    const clearStyle = () => {
      ["background-image", "-webkit-background-clip", "background-clip",
        "-webkit-text-fill-color", "color"].forEach(p => el.style.removeProperty(p));
    };

    const tick = () => {
      s.cx += (s.tx - s.cx) * LERP_POS;
      s.cy += (s.ty - s.cy) * LERP_POS;
      s.size += (s.targetSize - s.size) * LERP_SIZE;

      if (s.size > 0.003) {
        // 호버 중일 때 원이 천천히 숨쉬듯 커졌다 작아짐
        const pulse = s.entered
          ? Math.sin((Date.now() - s.enterTime) * PULSE_HZ) * PULSE_AMP
          : 0;
        const r = Math.max(4, Math.round(s.size * (BASE_R + pulse)));
        applyStyle(r);
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
        s.cx = x; s.cy = y;
        s.entered = true;
        s.enterTime = Date.now();
      }
      s.tx = x; s.ty = y;
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
