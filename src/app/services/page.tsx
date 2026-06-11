import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ServicesSection } from "@/components/sections/ServicesSection";

export const metadata: Metadata = {
  title: "Services | Unbound Studio",
  description:
    "기획부터 디자인, 모션그래픽, 영상 브랜딩까지 — Unbound Studio가 제공하는 영상 제작 전문 서비스를 소개합니다.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-brand-black">
      <PageHero
        label="What We Do"
        title="Services"
        description="기획부터 디자인, 모션그래픽, 영상 브랜딩까지 — 영상 제작의 모든 단계를 책임지는 Unbound Studio의 전문 서비스입니다."
      />
      <ServicesSection hideLabel variant="showcase" />
    </div>
  );
}
