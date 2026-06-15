"use client";
import { useRouter } from "next/navigation";

export function CloseButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      aria-label="닫기"
      className="fixed right-6 top-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-brand-black/80 text-white/60 backdrop-blur-sm transition-colors hover:border-white/60 hover:text-white md:right-10 md:top-8"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="2" y1="2" x2="14" y2="14" />
        <line x1="14" y1="2" x2="2" y2="14" />
      </svg>
    </button>
  );
}
