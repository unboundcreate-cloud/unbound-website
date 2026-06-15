import { CharReveal } from "@/components/ui/CharReveal";

const LINE1 = "Unboundstudio는 첨단 AI 기술로 고객의 내일을 혁신하는";
const LINE2 = "영상 제작 전문 스튜디오입니다.";

export function HomeBanner() {
  return (
    <section className="py-16 md:py-24">
      <p
        className="section-padding text-center text-[clamp(3rem,14vw,22rem)] leading-[1.08] tracking-tight text-white"
        style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
      >
        <CharReveal text={LINE1} charDelay={35} />
        <CharReveal text={LINE2} charDelay={35} delay={LINE1.length * 35 * 0.6} />
      </p>
    </section>
  );
}
