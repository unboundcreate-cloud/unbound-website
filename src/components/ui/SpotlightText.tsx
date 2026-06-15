"use client";
import { useRef, useState } from "react";

/** 마우스 올린 영역만 브랜드 컬러 원형 스포트라이트로 강조하는 텍스트 래퍼 */
export function SpotlightText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "block", position: "relative" }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {children}
      {active && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 text-brand-accent"
          style={{ clipPath: `circle(130px at ${pos.x}px ${pos.y}px)` }}
        >
          {children}
        </span>
      )}
    </span>
  );
}
