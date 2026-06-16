import { getPageContent } from "@/lib/pages-store";
import { PageEditor } from "@/components/admin/PageEditor";

export const dynamic = "force-dynamic";

const FIELDS = [
  { key: "title", label: "제목" },
  { key: "subtitle", label: "부제목" },
  { key: "body", label: "본문", multiline: true },
  { key: "buttonText", label: "버튼 텍스트" },
  { key: "buttonHref", label: "버튼 링크", hint: "예: /" },
];

export default async function NotFoundPageEditor() {
  const content = await getPageContent("404");
  return <PageEditor slug="404" title="404 페이지" fields={FIELDS} initialContent={content} />;
}
