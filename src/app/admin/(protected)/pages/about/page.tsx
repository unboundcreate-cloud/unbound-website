import { getPageContent } from "@/lib/pages-store";
import { PageEditor } from "@/components/admin/PageEditor";

export const dynamic = "force-dynamic";

const FIELDS = [
  { key: "heroTitle", label: "히어로 제목" },
  { key: "heroSubtitle", label: "히어로 부제목", multiline: true },
  { key: "headlineLine1", label: "헤드라인 1줄" },
  { key: "headlineLine2", label: "헤드라인 2줄" },
  { key: "body", label: "본문", multiline: true },
  { key: "learnMoreText", label: "더 보기 버튼 텍스트" },
];

export default async function AboutPageEditor() {
  const content = await getPageContent("about");
  return <PageEditor slug="about" title="About 페이지" fields={FIELDS} initialContent={content} />;
}
