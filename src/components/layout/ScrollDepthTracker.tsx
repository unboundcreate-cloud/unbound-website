"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/gtag";

// 스크롤 깊이(25/50/75/100%)를 GA4로 전송. 페이지마다 한 번씩만.
export function ScrollDepthTracker() {
  const pathname = usePathname();
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    fired.current = new Set();
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 80) return;
      const pct = (window.scrollY / scrollable) * 100;
      for (const t of [25, 50, 75, 100]) {
        if (pct >= t && !fired.current.has(t)) {
          fired.current.add(t);
          trackEvent("scroll", { percent_scrolled: t, page_path: pathname });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return null;
}
