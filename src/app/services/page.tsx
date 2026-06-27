import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ServicesSection } from "@/components/sections/ServicesSection";

export const metadata: Metadata = {
  title: "영상제작·모션그래픽 외주 서비스 | Unbound Studio",
  description:
    "모션그래픽, 영상편집, 홍보영상, 광고영상 외주제작 서비스. 기획부터 디자인, 모션그래픽, 영상 브랜딩까지 — Unbound Studio가 제공하는 영상 제작 전문 서비스를 소개합니다.",
  keywords: [
    "영상제작 외주 서비스",
    "모션그래픽 외주",
    "영상편집 외주",
    "홍보영상 제작",
    "광고영상 제작",
    "기업 영상 제작",
  ],
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-brand-black">
      <PageHero
        label="What We Do"
        title="Services"
        description={"기획부터 디자인, 모션그래픽, 영상 브랜딩까지 —\n영상 제작의 모든 단계를 책임지는 Unbound Studio의 전문 서비스입니다."}
      />
      <ServicesSection hideLabel variant="showcase" />
    </div>
  );
}
