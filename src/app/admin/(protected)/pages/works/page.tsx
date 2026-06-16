import { getPageContent } from "@/lib/pages-store";
import { PageEditor } from "@/components/admin/PageEditor";

export const dynamic = "force-dynamic";

const FIELDS = [
  { key: "heroTitle", label: "히어로 제목" },
  { key: "heroSubtitle", label: "히어로 부제목", multiline: true },
];

export default async function WorksPageEditor() {
  const content = await getPageContent("works");
  return <PageEditor slug="works" title="Works 페이지" fields={FIELDS} initialContent={content} />;
}
