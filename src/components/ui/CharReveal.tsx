"use client";
import { useEffect, useRef, useState } from "react";

interface CharRevealProps {
  text: string;
  className?: string;
  delay?: number;      // 첫 글자 시작 딜레이 (ms)
  charDelay?: number;  // 글자 간 간격 (ms)
}

/** 스크롤 진입 시 글자 하나씩 부드럽게 나타나는 텍스트 */
export function CharReveal({ text, className, delay = 0, charDelay = 40 }: CharRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={className} style={{ display: "block" }} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            display: "inline-block",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: visible
              ? `opacity 0.5s ease ${delay + i * charDelay}ms, transform 0.5s ease ${delay + i * charDelay}ms`
              : "none",
            whiteSpace: char === " " ? "pre" : undefined,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
