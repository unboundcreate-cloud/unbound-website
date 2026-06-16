"use client";
import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? scrolled / total : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9996] h-[2px] bg-brand-accent"
      style={{ width: `${pct * 100}%`, transition: "width 80ms linear" }}
    />
  );
}
