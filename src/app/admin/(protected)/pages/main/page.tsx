import { getPageContent } from "@/lib/pages-store";
import { PageEditor } from "@/components/admin/PageEditor";

export const dynamic = "force-dynamic";

const FIELDS = [
  { key: "heroTitle1", label: "히어로 제목 1줄" },
  { key: "heroTitle2", label: "히어로 제목 2줄" },
  { key: "tagline1", label: "태그라인 1줄" },
  { key: "tagline2", label: "태그라인 2줄" },
  { key: "ctaText", label: "CTA 버튼 텍스트" },
  { key: "ctaHref", label: "CTA 링크", hint: "예: /works" },
  { key: "bannerLine1", label: "배너 텍스트 1줄" },
  { key: "bannerLine2", label: "배너 텍스트 2줄" },
];

export default async function MainPageEditor() {
  const content = await getPageContent("main");
  return <PageEditor slug="main" title="메인 페이지" fields={FIELDS} initialContent={content} />;
}
