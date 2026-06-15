import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
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
      {/* 헤더 — PageHero 대신 인라인으로 간격 직접 제어 */}
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
              아래 정보로 연락 주시거나 폼을 작성해주세요.
            </p>
          </div>
        </FadeIn>
      </header>

      <div className="section-padding grid grid-cols-1 gap-16 pb-32 md:grid-cols-12">
        {/* 연락처 정보 */}
        <div className="md:col-span-4">
          <div className="space-y-8">
            <FadeIn delay={0.18}>
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
            <FadeIn delay={0.26}>
              <div>
                <p className="label-text mb-0.5">Hours</p>
                <p className="text-lg text-white">월–금 10:00 – 19:00</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.34}>
              <div>
                <p className="label-text mb-0.5">Social</p>
                <SocialLinks className="flex gap-5" iconClassName="h-6 w-6" />
              </div>
            </FadeIn>
          </div>
        </div>

        {/* 폼 */}
        <FadeIn delay={0.22} className="md:col-span-8 md:pl-8">
          <ContactForm />
        </FadeIn>
      </div>
    </div>
  );
}
