import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { ProjectConsultation } from "@/components/sections/ProjectConsultation";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightText } from "@/components/ui/SpotlightText";
import { studio } from "@/data/clients";

export const metadata: Metadata = {
  title: "Contact | Unbound Studio",
  description: "프로젝트 문의는 언제든지 환영합니다.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-black">
      {/* 헤더 */}
      <header className="section-padding pb-10 pt-36 md:pt-44">
        <FadeIn>
          <h1 className="font-display text-5xl uppercase leading-[0.85] text-white sm:text-6xl md:text-8xl lg:text-9xl">
            <SpotlightText>Contact us</SpotlightText>
          </h1>
        </FadeIn>
        <FadeIn delay={0.12}>
          <div className="mt-2 max-w-xl">
            <p className="text-sm text-brand-muted md:text-base">
              프로젝트 문의는 언제든지 환영합니다.
            </p>
            <p className="mt-1 text-sm text-brand-muted md:text-base">
              아래 가이드 상담을 따라가시면 빠르게 견적을 받으실 수 있습니다.
            </p>
          </div>
        </FadeIn>
      </header>

      {/* ── 가이드 상담 위자드 ───────────────────────────────── */}
      <section className="section-padding pb-24">
        <FadeIn delay={0.1}>
          <p className="label-text mb-8">프로젝트 상담 시작하기</p>
          <div className="max-w-2xl">
            <ProjectConsultation />
          </div>
        </FadeIn>
      </section>

      {/* ── 직접 작성하기 (기존 폼) ──────────────────────────── */}
      <section className="section-padding border-t border-white/8 pb-32">
        <FadeIn delay={0.08}>
          <p className="label-text mb-12">직접 작성하기</p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          {/* 연락처 정보 */}
          <div className="md:col-span-4">
            <div className="space-y-8">
              <FadeIn delay={0.14}>
                <div>
                  <p className="label-text mb-0.5">Email</p>
                  <a
                    href={`mailto:${studio.email}`}
                    className="text-lg text-white hover:text-brand-accent"
                  >
                    {studio.email}
                  </a>
                </div>
              </FadeIn>
              <FadeIn delay={0.22}>
                <div>
                  <p className="label-text mb-0.5">Hours</p>
                  <p className="text-lg text-white transition-colors hover:text-brand-accent">
                    월–금 10:00 – 19:00
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.30}>
                <div>
                  <p className="label-text mb-0.5">Social</p>
                  <SocialLinks className="flex gap-5" iconClassName="h-6 w-6" />
                </div>
              </FadeIn>
            </div>
          </div>

          {/* 폼 */}
          <FadeIn delay={0.18} className="md:col-span-8 md:pl-8">
            <ContactForm />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
