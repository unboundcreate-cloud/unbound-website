import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightText } from "@/components/ui/SpotlightText";

const ITEMS = [
  {
    heading: ["Take the", "First Step"],
    label: "Project",
    desc: "당신의 이야기를 가장 강렬한 영상으로 담아냅니다.\n프로젝트 문의를 기다립니다.",
    href: "/contact",
  },
  {
    heading: ["In Your", "Adventure"],
    label: "Works",
    desc: "Unbound Studio가 만들어온 작품들을 만나보세요.",
    href: "/works",
  },
];

export function HomeAdventure() {
  return (
    <section className="bg-brand-black">
      <div className="section-padding grid grid-cols-1 gap-14 py-32 md:grid-cols-2 md:gap-24 md:py-52">
        {ITEMS.map((it, i) => (
          <FadeIn key={it.label} delay={i * 0.15}>
            <div>
              <h2 className="font-display text-3xl uppercase leading-[0.95] text-white md:text-4xl lg:text-5xl">
                <SpotlightText>
                  {it.heading[0]}
                  <br />
                  {it.heading[1]}
                </SpotlightText>
              </h2>
              <div className="mt-8 h-px w-full bg-white/25" />
              <Link href={it.href} className="group mt-6 block">
                <p className="flex items-center gap-2 font-mono text-sm uppercase tracking-[0.25em] text-white transition-colors group-hover:text-brand-accent">
                  {it.label}
                  <span className="transition-transform group-hover:translate-x-1">›</span>
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
