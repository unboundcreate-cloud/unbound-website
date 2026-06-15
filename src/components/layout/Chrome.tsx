"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { IntroAnimation } from "@/components/ui/IntroAnimation";

// 사이트 공통 UI(헤더·푸터·커스텀커서·스무스스크롤).
// /admin 영역에서는 렌더하지 않아 관리자 UI와 겹치지 않게 함.
export function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/sandbox")) {
    return <>{children}</>;
  }

  return (
    <div className="has-custom-cursor">
      {/* 홈 인트로 (최초 방문) */}
      {pathname === "/" && <IntroAnimation />}

      {/* 페이지 전환 커튼 — pathname이 바뀔 때마다 key가 교체되어
          y:0(전체 덮음) → y:-100%(위로 슬라이드 아웃) 애니메이션이 실행됨 */}
      <motion.div
        key={pathname}
        className="pointer-events-none fixed inset-0 z-[9998] bg-brand-black"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
      />

      <CustomCursor />
      <SmoothScrollProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </SmoothScrollProvider>
    </div>
  );
}
