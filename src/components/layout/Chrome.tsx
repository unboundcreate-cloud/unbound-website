"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { IntroAnimation } from "@/components/ui/IntroAnimation";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ChatBot } from "@/components/ui/ChatBot";

export function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLeaving, setIsLeaving] = useState(false);
  const pendingHref = useRef<string | null>(null);

  // 페이지 이동 완료 시 — 커튼 상태 리셋 + 맨 위로 스크롤
  useEffect(() => {
    setIsLeaving(false);
    pendingHref.current = null;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  // 내부 링크 클릭 인터셉트 — 커튼 먼저 덮고 navigate
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (pendingHref.current) return; // 이미 이탈 중
      if (pathname?.startsWith("/admin") || pathname?.startsWith("/sandbox")) return;

      const anchor = (e.target as HTMLElement).closest(
        "a[href]"
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (
        href.startsWith("http") ||
        href.startsWith("mailto") ||
        href.startsWith("tel") ||
        href.startsWith("#")
      )
        return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (anchor.target === "_blank") return;
      if (href === pathname) return;

      e.preventDefault();
      pendingHref.current = href;
      setIsLeaving(true);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/sandbox")) {
    return <>{children}</>;
  }

  return (
    <div className="has-custom-cursor">
      <ScrollProgress />
      {pathname === "/" && <IntroAnimation />}

      {/* 이탈 커튼 — 위에서 내려와 덮은 뒤 navigate */}
      {isLeaving && (
        <motion.div
          className="fixed inset-0 z-[9997] bg-brand-black"
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={() => {
            const href = pendingHref.current;
            if (href) {
              pendingHref.current = null;
              router.push(href);
            }
          }}
        />
      )}

      {/* 진입 커튼 — pathname 바뀔 때마다 위로 슬라이드 아웃 */}
      <motion.div
        key={pathname}
        className="pointer-events-none fixed inset-0 z-[9998] bg-brand-black"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
      />

      <CustomCursor />
      <ChatBot />
      <SmoothScrollProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </SmoothScrollProvider>
    </div>
  );
}
