"use client";
import { useRef, useEffect } from "react";

/**
 * 커서가 텍스트에 가까워질수록 작은 원형 스포트라이트가 자라나며 나타나고,
 * 멀어지면 줄어들며 사라지는 효과.
 * 텍스트를 두 번 렌더링하지 않아 아웃라인 번짐이 없음.
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
    const PROXIMITY = 160; // 텍스트에서 이 거리부터 원이 자라기 시작
    const MAX_RADIUS = 26; // 커서 기본 크기(~20px)보다 살짝 큰 반지름

    const handleMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = e.clientX;
      const cy = e.clientY;

      // 커서에서 텍스트 박스 가장 가까운 점까지 거리
      const dx = Math.max(rect.left - cx, 0, cx - rect.right);
      const dy = Math.max(rect.top - cy, 0, cy - rect.bottom);
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > PROXIMITY) {
        el.style.removeProperty("background-image");
        el.style.removeProperty("-webkit-background-clip");
        el.style.removeProperty("background-clip");
        el.style.removeProperty("-webkit-text-fill-color");
        el.style.removeProperty("color");
        return;
      }

      // 가까울수록 커짐 (0~1)
      const t = 1 - dist / PROXIMITY;
      const radius = Math.round(MAX_RADIUS * t);
      const relX = Math.round(cx - rect.left);
      const relY = Math.round(cy - rect.top);

      // 빨간 점 → 흰색으로 자연스럽게 페이드, background-clip으로 텍스트에만 적용
      el.style.setProperty(
        "background-image",
        `radial-gradient(circle ${radius}px at ${relX}px ${relY}px, #e63226 0%, #ffffff ${radius + 14}px)`
      );
      el.style.setProperty("-webkit-background-clip", "text");
      el.style.setProperty("background-clip", "text");
      el.style.setProperty("-webkit-text-fill-color", "transparent");
      el.style.color = "transparent";
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      // 언마운트 시 스타일 초기화
      const el = ref.current;
      if (!el) return;
      el.style.removeProperty("background-image");
      el.style.removeProperty("-webkit-background-clip");
      el.style.removeProperty("background-clip");
      el.style.removeProperty("-webkit-text-fill-color");
      el.style.removeProperty("color");
    };
  }, []);

  return (
    <span ref={ref} className={className} style={{ display: "block" }}>
      {children}
    </span>
  );
}
