"use client";
import { useRef, useState } from "react";

const POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function ScrambleText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const [text, setText] = useState(children);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    if (timer.current) clearInterval(timer.current);
    let tick = 0;
    timer.current = setInterval(() => {
      const settled = Math.floor(tick / 1.5);
      if (settled >= children.length) {
        setText(children);
        clearInterval(timer.current!);
        timer.current = null;
        return;
      }
      setText(
        children
          .split("")
          .map((char, i) => {
            if (i < settled) return char;
            if (char === " ") return " ";
            return POOL[Math.floor(Math.random() * POOL.length)];
          })
          .join("")
      );
      tick++;
    }, 30);
  };

  const stop = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    setText(children);
  };

  return (
    <span
      aria-label={children}
      className={className}
      onMouseEnter={start}
      onMouseLeave={stop}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {text}
    </span>
  );
}
