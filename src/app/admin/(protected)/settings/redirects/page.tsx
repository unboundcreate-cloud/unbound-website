import { getSetting } from "@/lib/settings-store";
import { RedirectsEditor } from "@/components/admin/RedirectsEditor";

export const dynamic = "force-dynamic";

export default async function RedirectsPage() {
  const rules = await getSetting("redirects");
  return <RedirectsEditor initialRules={rules} />;
}
