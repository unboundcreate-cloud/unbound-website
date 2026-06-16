import { getSetting } from "@/lib/settings-store";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

const FIELDS = [
  { key: "primaryColor", label: "Primary Color", type: "color" as const },
  { key: "accentColor", label: "Accent Color", type: "color" as const },
  { key: "backgroundColor", label: "Background Color", type: "color" as const },
  { key: "textColor", label: "Text Color", type: "color" as const },
  { key: "logoWhiteUrl", label: "로고 (흰색)", hint: "흰 배경용 로고 경로" },
  { key: "logoDarkUrl", label: "로고 (다크)", hint: "다크 배경용 로고 경로" },
  { key: "faviconUrl", label: "Favicon URL" },
  { key: "fontEn", label: "영문 폰트", hint: "예: Syne" },
  { key: "fontKo", label: "한글 폰트", hint: "예: Noto Sans KR" },
];

export default async function BrandSettingsPage() {
  const value = await getSetting("brand");
  return <SettingsForm settingKey="brand" title="브랜드 시스템" fields={FIELDS} initialValue={value as unknown as Record<string, unknown>} />;
}
