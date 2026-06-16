import { getLogos } from "@/lib/content-store";
import { LogosEditor } from "@/components/admin/LogosEditor";

export const dynamic = "force-dynamic";

export default async function LogosPage() {
  const logos = await getLogos();
  return <LogosEditor initialLogos={logos} />;
}
