"use client";

import { usePathname } from "next/navigation";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

// 사이트 공통 UI(헤더·푸터·커스텀커서·스무스스크롤).
// /admin 영역에서는 렌더하지 않아 관리자 UI와 겹치지 않게 함.
export function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/sandbox")) {
    return <>{children}</>;
  }

  return (
    <div className="has-custom-cursor">
      <CustomCursor />
      <SmoothScrollProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </SmoothScrollProvider>
    </div>
  );
}
