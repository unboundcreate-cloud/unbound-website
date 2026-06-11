"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1600,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: true });
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    let rafId = 0;
    let startTime: number | null = null;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setDisplay(Math.round(ease(progress) * value));
      if (progress < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="font-number tabular-nums">
      {display}
      <span className="text-brand-accent">{suffix}</span>
    </span>
  );
}
