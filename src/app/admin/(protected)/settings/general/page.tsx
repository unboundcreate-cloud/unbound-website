import { getSetting } from "@/lib/settings-store";
import { SettingsForm } from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

const FIELDS = [
  { key: "studioName", label: "스튜디오 이름" },
  { key: "email", label: "이메일" },
  { key: "positioning", label: "포지셔닝 슬로건", hint: "메인 설명 문구" },
  { key: "footerCopyright", label: "Footer 저작권", hint: "예: © 2026 UNBOUND STUDIO." },
];

export default async function GeneralSettingsPage() {
  const value = await getSetting("general");
  return <SettingsForm settingKey="general" title="공통 텍스트" fields={FIELDS} initialValue={value as unknown as Record<string, unknown>} />;
}
