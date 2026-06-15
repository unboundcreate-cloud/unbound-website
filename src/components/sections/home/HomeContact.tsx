import { LiquidButton } from "@/components/ui/LiquidButton";
import { FadeIn } from "@/components/ui/FadeIn";

export function HomeContact() {
  return (
    <section className="py-28 md:py-40">
      <FadeIn>
        <div className="section-padding flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-5xl uppercase leading-none text-white md:text-7xl lg:text-8xl">
              Contact Us
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-white/60 md:whitespace-nowrap md:text-base">
              프로젝트의 시작부터 완성까지, UNBOUND STUDIO가 함께합니다.
            </p>
            <div className="mt-8">
              <LiquidButton href="/contact">
                문의하기
              </LiquidButton>
            </div>
          </div>
          <div className="text-right font-display text-lg uppercase leading-snug text-white/80 sm:text-2xl md:text-3xl lg:text-4xl">
            <p>당신의 브랜드를 움직이는 영상,</p>
            <p>지금 Unbound Studio와 시작하세요.</p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
