import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { InsightGallery } from "@/components/sections/InsightGallery";

export const metadata: Metadata = {
  title: "Insight | 영상 제작 과정·인사이트 — Unbound Studio",
  description:
    "Unbound Studio가 프로젝트를 풀어가는 방식과 제작 과정을 기록합니다. 모션그래픽·영상제작의 기획부터 협업, 효율화까지 — 우리가 어떻게 일하는지 보여드립니다.",
  keywords: [
    "영상 제작 과정",
    "모션그래픽 케이스 스터디",
    "영상 제작 인사이트",
    "영상 제작 협업",
    "프로젝트 사례",
  ],
};

export default function InsightPage() {
  return (
    <div className="min-h-screen bg-brand-black">
      <PageHero
        label="Process · Case Study"
        title="Insight"
        description={"우리가 어떤 프로젝트를, 어떻게, 어떤 생각으로 만들었는지 —\n완성된 영상 뒤의 과정과 일하는 방식을 기록합니다."}
      />
      <InsightGallery />
    </div>
  );
}
