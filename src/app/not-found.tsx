import Link from "next/link";
import { SpotlightText } from "@/components/ui/SpotlightText";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-black section-padding text-center">
      <p className="label-text mb-6">404</p>
      <h1 className="font-display text-6xl uppercase leading-[0.85] text-white sm:text-7xl md:text-9xl">
        <SpotlightText>Not Found</SpotlightText>
      </h1>
      <p className="mt-8 text-sm text-brand-muted md:text-base">
        찾으시는 페이지가 존재하지 않습니다.
      </p>
      <Link
        href="/"
        className="group mt-10 inline-flex items-center gap-2 font-display text-sm uppercase tracking-[0.2em] text-white transition-colors hover:text-brand-accent"
      >
        <span className="transition-transform group-hover:-translate-x-1">←</span>
        홈으로 돌아가기
      </Link>
    </div>
  );
}
