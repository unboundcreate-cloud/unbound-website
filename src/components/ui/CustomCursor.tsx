"use client";

import { useEffect, useRef, useState } from "react";

type CursorMode = "default" | "hover" | "play";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 터치/모바일 디바이스에서는 커스텀 커서 비활성화
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const pos = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
    };

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
    const render = () => {
      ring.x = lerp(ring.x, pos.x, 0.18);
      ring.y = lerp(ring.y, pos.y, 0.18);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement)?.closest(
        "a, button, [data-cursor]"
      ) as HTMLElement | null;
      if (!t) {
        setMode("default");
        return;
      }
      const c = t.getAttribute("data-cursor");
      setMode(c === "play" ? "play" : "hover");
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* 작은 점 */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-brand-accent transition-opacity"
        style={{ opacity: mode === "default" ? 1 : 0 }}
      />
      {/* 큰 링 */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-white text-[11px] font-mono uppercase tracking-[0.2em] text-white transition-[width,height,margin,background-color] duration-300 ease-out"
        style={{
          width: mode === "default" ? 36 : 64,
          height: mode === "default" ? 36 : 64,
          marginLeft: mode === "default" ? -18 : -32,
          marginTop: mode === "default" ? -18 : -32,
          backgroundColor:
            mode === "play" ? "rgba(255,255,255,0.95)" : "transparent",
          color: mode === "play" ? "#000" : "#fff",
        }}
      >
        {mode === "play" ? "PLAY" : ""}
      </div>
    </div>
  );
}
