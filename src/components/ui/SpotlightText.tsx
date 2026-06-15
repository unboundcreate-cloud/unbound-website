"use client";
import { useRef, useCallback } from "react";

/** 마우스 위치에 작은 원형 스포트라이트로 브랜드 컬러가 부드럽게 드러나는 텍스트 래퍼 */
export function SpotlightText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLSpanElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    const overlay = overlayRef.current;
    if (!rect || !overlay) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // DOM 직접 조작 → React re-render 없이 매 프레임 부드럽게 추적
    overlay.style.clipPath = `circle(55px at ${x}px ${y}px)`;
  }, []);

  const onMouseEnter = useCallback(() => {
    if (overlayRef.current) overlayRef.current.style.opacity = "1";
  }, []);

  const onMouseLeave = useCallback(() => {
    if (overlayRef.current) overlayRef.current.style.opacity = "0";
  }, []);

  return (
    <span
      ref={containerRef}
      className={className}
      style={{ display: "block", position: "relative" }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
      <span
        ref={overlayRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 text-brand-accent"
        style={{
          opacity: 0,
          clipPath: "circle(0px at 0px 0px)",
          transition: "opacity 0.25s ease",
        }}
      >
        {children}
      </span>
    </span>
  );
}
