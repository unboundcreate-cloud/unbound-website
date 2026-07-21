"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

// 제목이 마스크(overflow:hidden) 뒤에서 밀려 올라오며 등장. 스크롤 진입 시 1회 재생.
// prefers-reduced-motion 사용자는 즉시 표시.
export function MaskReveal({
  children,
  className,
  delay = 0,
  once = true,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          if (once) io.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const inner = createElement(
    "div",
    {
      style: {
        transform: shown ? "translateY(0)" : "translateY(118%)",
        transition: `transform 0.95s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        willChange: "transform",
      },
    },
    children,
  );

  return createElement(
    as,
    { ref, className, style: { display: "block", overflow: "hidden" } },
    inner,
  );
}
