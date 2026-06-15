import { worksOrdered } from "@/data/works";
import { HomeShowcaseCard } from "./HomeShowcaseCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightText } from "@/components/ui/SpotlightText";

const SLUGS = [
  "night-blooming-flower",
  "trigger",
  "kiss-sixth-sense",
  "seven-escape-2",
  "good-detective-2",
  "chunhwa-romance",
];

export function HomeShowcase() {
  const items = SLUGS.map((s) =>
    worksOrdered.find((w) => w.slug === s),
  ).filter((w): w is NonNullable<typeof w> => Boolean(w));

  return (
    <section className="relative overflow-hidden bg-brand-black py-16 md:py-20">
      <div className="pointer-events-none absolute -top-1/4 right-0 h-[60vh] w-[70vw] bg-[radial-gradient(circle,rgba(230,50,38,0.16),transparent_70%)]" />

      <div className="section-padding relative">
        <FadeIn>
          <h2 className="font-display text-3xl leading-tight text-white md:text-5xl lg:text-6xl">
            <SpotlightText>
              Beyond Production —
              <br />
              Creative, Intelligent, Unbound.
            </SpotlightText>
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
            최첨단 AI와 모션그래픽으로 영상 제작의 새로운 기준을 제시합니다.
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
            단순한 제작을 넘어, 브랜드의 메시지를 가장 강렬하게 전달하는 한 편의 이야기를 완성합니다.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3 md:mt-16 md:gap-6">
            {items.map((w) => (
              <HomeShowcaseCard key={w.id} work={w} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
