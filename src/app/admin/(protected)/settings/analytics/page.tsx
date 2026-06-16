import { getSetting } from "@/lib/settings-store";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

const FIELDS = [
  { key: "ga4Id", label: "GA4 측정 ID", hint: "예: G-XXXXXXXXXX" },
  { key: "gtmId", label: "GTM 컨테이너 ID", hint: "예: GTM-XXXXXXX" },
  { key: "naverAnalyticsId", label: "네이버 애널리틱스", hint: "사이트 로그 분석 추적 ID" },
  { key: "metaPixelId", label: "Meta Pixel ID" },
  { key: "kakaoPixelId", label: "카카오 픽셀 ID" },
];

export default async function AnalyticsSettingsPage() {
  const value = await getSetting("analytics");
  return <SettingsForm settingKey="analytics" title="분석 도구" fields={FIELDS} initialValue={value as unknown as Record<string, unknown>} />;
}
