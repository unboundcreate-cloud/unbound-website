import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightText } from "@/components/ui/SpotlightText";

export function HomeIntro() {
  return (
    <section className="section-padding bg-brand-black py-28 md:py-40">
      <FadeIn>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-16">
          <SpotlightText className="shrink-0 font-display text-3xl uppercase leading-[0.95] tracking-tight text-white md:text-4xl lg:text-5xl">
            Unbound
            <br />
            Studio
          </SpotlightText>
          <div className="space-y-2 text-2xl leading-snug text-white/70 md:text-3xl">
            <p className="text-white">
              Unbound Studio는 모션 그래픽과 포스트 프로덕션을 중심으로 최고의 영상 콘텐츠를 제작하는 크리에이티브 영상 스튜디오입니다.
            </p>
            <p>
              방송, OTT 드라마 타이틀부터 브랜드 필름, 광고, AI 기반 영상까지 —
            </p>
            <p>
              기획, 촬영, 편집, VFX, 색보정, 납품의 전 과정을 원스톱으로 책임집니다.
            </p>
            <p>
              우리만의 감각과 새로운 문법으로 영상의 기준을 만들어 갑니다.
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
