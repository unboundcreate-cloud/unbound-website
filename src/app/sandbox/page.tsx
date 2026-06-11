import type { Data } from "@measured/puck";
import { getPuckPage } from "@/lib/config-store";
import { RenderClient } from "@/components/RenderClient";

export const dynamic = "force-dynamic";

// Puck 빌더로 만든 페이지의 공개 렌더 결과.
export default async function SandboxPage() {
  const data = (await getPuckPage("home")) as Data;
  return (
    <main className="min-h-screen bg-brand-black">
      <RenderClient data={data} />
    </main>
  );
}
