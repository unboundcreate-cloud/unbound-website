import { getPageContent } from "@/lib/pages-store";
import { PageEditor } from "@/components/admin/PageEditor";

export const dynamic = "force-dynamic";

const FIELDS = [
  { key: "heroTitle", label: "히어로 제목" },
  { key: "heroSubtitle", label: "히어로 부제목", multiline: true },
  { key: "introText", label: "소개 텍스트", multiline: true },
];

export default async function ServicesPageEditor() {
  const content = await getPageContent("services");
  return <PageEditor slug="services" title="Services 페이지" fields={FIELDS} initialContent={content} />;
}
