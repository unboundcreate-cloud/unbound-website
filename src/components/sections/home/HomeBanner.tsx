import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightText } from "@/components/ui/SpotlightText";

export function HomeBanner() {
  return (
    <section className="py-32 md:py-40">
      <FadeIn>
        <p
          className="section-padding text-center text-4xl leading-snug tracking-tight text-white md:text-6xl lg:text-7xl"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
        >
          <SpotlightText>
            언바운드 스튜디오는 첨단 AI 기술로 고객의 내일을 혁신하는
            <br />
            영상 제작 전문 스튜디오입니다.
          </SpotlightText>
        </p>
      </FadeIn>
    </section>
  );
}
