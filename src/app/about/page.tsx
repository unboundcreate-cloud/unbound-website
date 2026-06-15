import type { Metadata } from "next";
import { FadeIn } from "@/components/ui/FadeIn";
import { clients } from "@/data/clients";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";

export const metadata: Metadata = {
  title: "About | Unbound Studio",
  description:
    "Unbound Studio는 모션그래픽, 브랜드필름, 광고영상을 전문으로 제작하는 크리에이티브 포스트프로덕션 스튜디오입니다.",
};

const STRENGTHS = [
  {
    num: "01",
    title: "원스톱 제작 시스템",
    desc: "기획부터 디자인, 제작, 납품까지 하나의 프로세스로 진행하여 효율성과 완성도를 높입니다.",
  },
  {
    num: "02",
    title: "크리에이티브 중심 접근",
    desc: "브랜드의 목적과 타깃을 고려한 전략적인 크리에이티브를 제공합니다.",
  },
  {
    num: "03",
    title: "빠르고 유연한 대응",
    desc: "프로젝트 상황에 맞춰 신속하고 유연하게 대응합니다.",
  },
  {
    num: "04",
    title: "디테일 중심 제작",
    desc: "프레임 하나, 움직임 하나까지 세심하게 완성합니다.",
  },
];

const SERVICES = [
  "모션그래픽",
  "브랜드필름",
  "광고영상",
  "기업홍보영상",
  "디지털 콘텐츠",
  "제품 홍보영상",
  "행사 및 전시 영상",
  "SNS 콘텐츠",
];


function RedDot() {
  return (
    <span className="inline-block h-2.5 w-2.5 flex-shrink-0 rounded-full bg-brand-accent" />
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-black">

      {/* ─── 01 Hero ─── */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <div className="w-full section-padding pb-20 pt-48 md:pb-28">
          <FadeIn>
            <p className="label-text mb-6 text-brand-accent">
              Creative Post-Production Studio
            </p>
            <h1 className="font-display text-5xl uppercase leading-[0.9] text-white sm:text-6xl md:text-8xl lg:text-9xl xl:text-[10rem]">
              Unbound
              <br />
              Studio
            </h1>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
              모션그래픽, 브랜드필름, 광고영상을 전문으로 제작하는
              크리에이티브 포스트프로덕션 스튜디오입니다.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/40">
              기획부터 디자인, 제작, 납품까지 전 과정을 원스톱으로 제공하며,
              브랜드의 메시지를 가장 효과적으로 전달하는 영상 콘텐츠를 만듭니다.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── 02 Philosophy ─── */}
      <section className="section-padding py-28 md:py-40">
        <FadeIn>
          <p className="label-text mb-14 text-brand-accent">Our Philosophy</p>
        </FadeIn>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-20 lg:gap-32">
          <FadeIn>
            <h2 className="flex items-center gap-3 font-display text-4xl uppercase leading-tight text-white md:text-5xl lg:text-6xl">
              <RedDot />
              We Start with the Message.
            </h2>
          </FadeIn>
          <FadeIn delay={0.12}>
            <div className="space-y-6 text-[15px] leading-loose text-white/60 md:text-base">
              <p>좋은 영상은 화려한 연출보다 명확한 메시지에서 시작된다고 믿습니다.</p>
              <p>
                언바운드 스튜디오는 브랜드의 이야기와 목적을 깊이 이해하고,
                이를 가장 효과적인 시각 언어로 구현합니다.
              </p>
              <p>
                우리는 단순히 영상을 제작하는 것이 아니라 브랜드와 사람을
                연결하는 경험을 만듭니다.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="section-padding">
        <div className="h-px bg-white/10" />
      </div>

      {/* ─── 03 Strengths ─── */}
      <section className="section-padding py-28 md:py-40">
        <FadeIn>
          <p className="label-text mb-4 text-brand-accent">Our Strengths</p>
          <h2 className="mb-16 flex items-center gap-3 font-display text-4xl uppercase leading-tight text-white md:text-5xl">
            <RedDot />
            Why Unbound Studio
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
          {STRENGTHS.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.07}>
              <div className="border border-white/10 p-8 transition-colors duration-500 hover:border-white/25 md:p-10">
                <p className="mb-5 font-mono text-[11px] tracking-[0.25em] text-brand-accent">
                  {s.num}
                </p>
                <h3 className="mb-4 font-display text-xl uppercase text-white md:text-2xl">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/50">{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="section-padding">
        <div className="h-px bg-white/10" />
      </div>

      {/* ─── 04 Services ─── */}
      <section className="section-padding py-28 md:py-40">
        <FadeIn>
          <p className="label-text mb-4 text-brand-accent">Services</p>
          <h2 className="mb-16 flex items-center gap-3 font-display text-4xl uppercase leading-tight text-white md:text-5xl">
            <RedDot />
            What We Create
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4">
          {SERVICES.map((s, i) => (
            <FadeIn key={s} delay={Math.min(i * 0.06, 0.35)}>
              <div className="group border border-white/10 px-5 py-8 text-center transition-all duration-300 hover:border-white/25 hover:bg-white/5 md:py-10">
                <p className="text-sm font-medium text-white/55 transition-colors duration-300 group-hover:text-white md:text-base">
                  {s}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="section-padding">
        <div className="h-px bg-white/10" />
      </div>

      {/* ─── 05 Process ─── */}
      <section className="section-padding py-28 md:py-40">
        <FadeIn>
          <p className="label-text mb-4 text-brand-accent">Process</p>
          <h2 className="mb-20 flex items-center gap-3 font-display text-4xl uppercase leading-tight text-white md:text-5xl">
            <RedDot />
            Production Process
          </h2>
        </FadeIn>

        <ProcessTimeline />
      </section>

      {/* ─── 06 Closing ─── */}
      <section className="relative overflow-hidden py-36 text-center md:py-52">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(230,50,38,0.07),transparent)]" />
        <div className="section-padding relative">
          <FadeIn>
            <h2 className="mx-auto max-w-4xl font-display text-4xl uppercase leading-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
              모든 브랜드에는 전하고 싶은
              <br />
              자신만의 이야기가 있습니다.
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-white/50 md:text-base">
              언바운드 스튜디오는 그 이야기를 가장 강력한 영상으로 완성합니다.
            </p>
          </FadeIn>
        </div>
      </section>

      <div className="section-padding">
        <div className="h-px bg-white/10" />
      </div>

      {/* ─── 07 Our Client (기존 유지) ─── */}
      <section className="section-padding pb-56 pt-28">
        <FadeIn>
          <div className="mb-32 md:mb-48">
            <h2 className="flex items-center gap-3 font-display text-4xl uppercase leading-none text-white md:text-5xl">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-accent" />
              Our Client
            </h2>
            <p className="mt-3 text-sm text-brand-muted md:text-base">
              Unbound Studio와 인연을 이어가는 주요 클라이언트입니다.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-16 xl:grid-cols-6 xl:gap-x-10 xl:gap-y-20">
          {clients.map((c, i) => (
            <FadeIn key={c.name} delay={Math.min(i * 0.05, 0.4)}>
              <div className="flex h-24 items-center justify-center md:h-32 xl:h-36">
                {c.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.logo}
                    alt={c.name}
                    className={`${c.imgClass ?? "max-h-[45px] max-w-full md:max-h-[70px]"} object-contain opacity-80 brightness-0 invert transition-opacity duration-300 hover:opacity-100`}
                  />
                ) : (
                  <span className="text-center font-display text-base uppercase tracking-[0.1em] text-brand-muted transition-colors hover:text-white md:text-lg">
                    {c.name}
                  </span>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}
