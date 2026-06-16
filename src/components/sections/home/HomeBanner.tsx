import { CharReveal } from "@/components/ui/CharReveal";

const LINE1 = "경계 없는 창의성, 무한한 가능성.";
const LINE2 = "이야기를 살리는 영상제작스튜디오 Unbound Studio.";

export function HomeBanner() {
  return (
    <section className="section-padding py-20 md:py-36">
      <div
        className="text-center text-white"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(2rem, 4.5vw, 5rem)",
          lineHeight: 1.1,
          letterSpacing: "-0.025em",
        }}
      >
        <CharReveal text={LINE1} charDelay={30} />
        <CharReveal
          text={LINE2}
          className="mt-10 md:mt-16"
          charDelay={30}
          delay={LINE1.length * 30 * 0.55}
        />
      </div>
    </section>
  );
}
