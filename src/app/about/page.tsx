import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { FadeIn } from "@/components/ui/FadeIn";
import { clients, studio } from "@/data/clients";

export const metadata: Metadata = {
  title: "About | Unbound Studio",
  description: studio.about,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-black">
      <PageHero
        label={studio.positioning}
        title={
          <>
            Story in
            <br />
            every frame
          </>
        }
      />

      {/* 스토리 */}
      <section className="section-padding py-24 md:py-32">
        <FadeIn>
          <p className="label-text mb-6">About Us</p>
          <p className="text-2xl leading-snug text-white md:text-3xl">
            {studio.shortName}(언바운드 스튜디오)는 모션그래픽·브랜드필름·광고영상 전문
            포스트프로덕션 스튜디오입니다.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-brand-muted">
            기획·디자인·제작·납품까지 원스톱으로 제공하며, 클라이언트의 메시지를 가장
            강렬하게 전달하는 영상을 만듭니다.
          </p>
        </FadeIn>
      </section>

      {/* WHO WE ARE */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/works/night-blooming-flower.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-brand-black/80 to-brand-black" />
        </div>

        <div className="relative section-padding py-28 md:py-40">
          <FadeIn>
            <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <h2 className="font-display text-5xl uppercase leading-[0.95] text-white md:text-7xl">
                Creative
                <br />
                Video Studio
              </h2>
              <p className="font-display text-5xl uppercase leading-none text-white md:text-7xl">
                Unbound
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="label-text mb-5">Who We Are</p>
            <div className="mb-12 h-px w-full bg-white/15" />
          </FadeIn>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
            <FadeIn delay={0.15}>
              <div className="space-y-10">
                <h3 className="font-display text-2xl uppercase leading-tight text-white/85 md:text-3xl">
                  Motion Graphics &amp;
                  <br />
                  Post-Production
                </h3>
                <h3 className="font-display text-2xl uppercase leading-tight text-white/85 md:text-3xl">
                  One-Stop,
                  <br />
                  Planning to Delivery
                </h3>
              </div>
            </FadeIn>
            <FadeIn delay={0.25}>
              <div className="space-y-6 text-base leading-relaxed text-white/70">
                <p>
                  Unbound Studio(언바운드 스튜디오)는 모션그래픽과 포스트프로덕션을
                  중심으로 최고의 영상 콘텐츠를 제작하는 크리에이티브 영상
                  스튜디오입니다.
                </p>
                <p>
                  우리는 테크와 크리에이티브가 만나는 지점에서 새로운 가능성을
                  실험합니다. 최첨단 AI 기반 영상 제작부터 모션그래픽, 브랜드필름,
                  광고 및 영상 VFX, 방송·OTT 드라마 타이틀에 이르기까지 — 우리만의
                  감각과 새로운 문법으로 영상의 기준을 만들어 갑니다.
                </p>
                <p>
                  우리는 영상의 혁신으로 브랜드와 더 큰 세상을 연결하고, 보는 이의
                  마음을 움직이는 새로운 경험을 설계합니다.
                </p>
                <p>
                  Unbound Studio는 방송, 엔터테인먼트, 브랜드, 광고 등 다양한
                  분야에서 기획부터 납품까지 원스톱으로 영상 콘텐츠의 변화를
                  선도합니다.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Our Client */}
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
