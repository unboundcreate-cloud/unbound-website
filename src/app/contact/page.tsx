import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { studio } from "@/data/clients";

export const metadata: Metadata = {
  title: "Contact | Unbound Studio",
  description: "프로젝트 문의는 언제든지 환영합니다.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-black">
      <PageHero
        title="Contact us"
        description="프로젝트 문의는 언제든지 환영합니다.
아래 정보로 연락 주시거나 폼을 작성해주세요."
      />

      <div className="section-padding grid grid-cols-1 gap-16 pb-32 md:grid-cols-12">
        {/* 연락처 정보 */}
        <div className="md:col-span-4">
          <div className="space-y-10">
            <div>
              <p className="label-text mb-3">Email</p>
              <a
                href={`mailto:${studio.email}`}
                className="text-lg text-white hover:text-brand-accent"
              >
                {studio.email}
              </a>
            </div>
            <div>
              <p className="label-text mb-3">Hours</p>
              <p className="text-lg text-white">월–금 10:00 – 19:00</p>
            </div>
            <div>
              <p className="label-text mb-3">Social</p>
              <SocialLinks className="flex gap-5" iconClassName="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* 폼 */}
        <div className="md:col-span-8 md:pl-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
