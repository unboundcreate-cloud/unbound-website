import { getSetting } from "@/lib/settings-store";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

const FIELDS = [
  { key: "youtube", label: "YouTube", type: "url" as const },
  { key: "instagram", label: "Instagram", type: "url" as const },
  { key: "linkedin", label: "LinkedIn", type: "url" as const },
  { key: "vimeo", label: "Vimeo", type: "url" as const },
  { key: "kakao", label: "카카오 채널", type: "url" as const },
];

export default async function SocialSettingsPage() {
  const value = await getSetting("social");
  return <SettingsForm settingKey="social" title="소셜 / 외부 링크" fields={FIELDS} initialValue={value as unknown as Record<string, unknown>} />;
}
