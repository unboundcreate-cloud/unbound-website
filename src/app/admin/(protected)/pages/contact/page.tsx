import { getPageContent } from "@/lib/pages-store";
import { PageEditor } from "@/components/admin/PageEditor";

export const dynamic = "force-dynamic";

const FIELDS = [
  { key: "heroTitle", label: "히어로 제목" },
  { key: "heroSubtitle", label: "히어로 부제목", multiline: true },
  { key: "email", label: "이메일" },
  { key: "address", label: "주소" },
  { key: "phone", label: "전화번호" },
  { key: "hours", label: "운영 시간" },
  { key: "formTitle", label: "폼 제목" },
  { key: "formSubmitText", label: "폼 전송 버튼 텍스트" },
  { key: "formSuccessMessage", label: "전송 완료 메시지", multiline: true },
];

export default async function ContactPageEditor() {
  const content = await getPageContent("contact");
  return <PageEditor slug="contact" title="Contact 페이지" fields={FIELDS} initialContent={content} />;
}
