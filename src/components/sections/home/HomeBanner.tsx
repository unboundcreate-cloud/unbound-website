import { CharReveal } from "@/components/ui/CharReveal";

const LINE1 = "언바운드 스튜디오는 첨단 AI 기술로 고객의 내일을 혁신하는";
const LINE2 = "영상 제작 전문 스튜디오입니다.";

export function HomeBanner() {
  return (
    <section className="py-28 md:py-40">
      <p
        className="section-padding text-center text-6xl leading-snug tracking-tight text-white md:text-8xl lg:text-9xl"
        style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
      >
        <CharReveal text={LINE1} charDelay={35} />
        <CharReveal text={LINE2} charDelay={35} delay={LINE1.length * 35 * 0.6} />
      </p>
    </section>
  );
}
