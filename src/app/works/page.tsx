import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { WorksGallery } from "@/components/sections/WorksGallery";
import type { WorkCategory } from "@/data/works";

export const metadata: Metadata = {
  title: "Works | Unbound Studio",
  description: "Unbound Studio의 모션그래픽, 방송, 광고 영상 포트폴리오.",
};

const VALID = ["drama", "promo", "b2b"];

export default async function WorksPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const initial = (
    category && VALID.includes(category) ? category : "all"
  ) as WorkCategory | "all";

  return (
    <div className="min-h-screen bg-brand-black pb-32">
      <PageHero
        label="Portfolio"
        title="Works"
        description="브랜드의 본질을 꿰뚫는 영상 콘텐츠. 모션그래픽부터 방송, 광고까지 — Unbound Studio가 만들어온 프로젝트를 소개합니다."
      />
      <WorksGallery initialCategory={initial} />
    </div>
  );
}
