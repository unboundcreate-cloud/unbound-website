import { CharReveal } from "@/components/ui/CharReveal";

const LINE1 = "경계 없는 창의성, 무한한 가능성.";
const LINE2 = "이야기를 살리는 영상제작스튜디오 Unbound Studio.";

export function HomeBanner() {
  return (
    <section className="section-padding py-24 md:py-32">
      <div className="text-center font-display text-xl text-white md:text-2xl">
        <CharReveal text={LINE1} charDelay={30} />
        <CharReveal
          text={LINE2}
          className="mt-3 md:mt-4"
          charDelay={30}
          delay={LINE1.length * 30 * 0.55}
        />
      </div>
    </section>
  );
}
