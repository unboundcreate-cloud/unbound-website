import { getSetting } from "@/lib/settings-store";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

const FIELDS = [
  { key: "siteTitle", label: "사이트 제목", hint: "브라우저 탭 제목" },
  { key: "siteDescription", label: "사이트 설명", hint: "meta description", multiline: true },
  { key: "siteKeywords", label: "키워드", hint: "쉼표로 구분" },
  { key: "ogImageUrl", label: "OG 이미지 URL", hint: "1200×630px 권장" },
  { key: "googleVerification", label: "Google Search Console", hint: "meta content 값" },
  { key: "naverVerification", label: "Naver Search Advisor", hint: "meta content 값" },
  { key: "robotsTxt", label: "robots.txt", multiline: true },
];

export default async function SeoSettingsPage() {
  const value = await getSetting("seo");
  return <SettingsForm settingKey="seo" title="SEO / 사이트맵" fields={FIELDS} initialValue={value as unknown as Record<string, unknown>} />;
}
