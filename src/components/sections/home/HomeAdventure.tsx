import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightText } from "@/components/ui/SpotlightText";

const ITEMS = [
  {
    heading: ["Take the", "First Step"],
    label: "About",
    desc: "우리가 만드는 영상에는 이유가 있습니다.\n언바운드 스튜디오의 철학과 제작 방식, 그리고 우리가 추구하는 가치를 소개합니다.",
    href: "/about",
  },
  {
    heading: ["In Your", "Adventure"],
    label: "Services",
    desc: "기획부터 제작, 후반 작업까지 언바운드 스튜디오의 전문적인 제작 과정을 확인해 보세요.",
    href: "/services",
  },
];

export function HomeAdventure() {
  return (
    <section className="bg-brand-black">
      <div className="section-padding grid grid-cols-1 gap-14 py-32 md:grid-cols-2 md:gap-24 md:py-52">
        {ITEMS.map((it, i) => (
          <FadeIn key={it.label} delay={i * 0.15}>
            <div className="group/card">
              <h2 className="font-display text-3xl uppercase leading-[0.95] text-white md:text-4xl lg:text-5xl">
                <SpotlightText>
                  {it.heading[0]}
                  <br />
                  {it.heading[1]}
                </SpotlightText>
              </h2>
              <div className="relative mt-8 h-px w-full bg-white/25">
                <div className="absolute inset-y-0 left-0 w-0 bg-brand-accent transition-[width] duration-[1200ms] ease-[cubic-bezier(0.37,0,0.63,1)] [@media(hover:hover)]:group-hover/card:w-full" />
              </div>
              <Link href={it.href} className="group/link mt-6 block">
                <p className="flex items-center gap-2 font-mono text-sm uppercase tracking-[0.25em] text-white transition-colors group-hover/link:text-brand-accent">
                  {it.label}
                  <span className="transition-transform group-hover/link:translate-x-1">›</span>
                </p>
                <p className="mt-3 max-w-sm whitespace-pre-line text-sm leading-relaxed text-white/70">
                  {it.desc}
                </p>
              </Link>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
