"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// 모바일 전용 하단 고정 CTA — 이탈 직전 문의/전화 전환을 잡아줌.
export function MobileCTABar() {
  const pathname = usePathname();
  if (
    pathname === "/contact" ||
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/sandbox")
  ) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[9985] flex items-center gap-2 border-t border-white/10 bg-brand-black/90 px-3 pt-2.5 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}
    >
      <a
        href="tel:07080802827"
        className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-white/25 text-sm font-medium text-white"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4">
          <path
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        전화
      </a>
      <Link
        href="/contact"
        className="flex h-11 flex-[1.5] items-center justify-center rounded-full bg-brand-accent text-sm font-semibold text-white"
      >
        프로젝트 문의
      </Link>
    </div>
  );
}
