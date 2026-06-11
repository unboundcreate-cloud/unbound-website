import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import { getConfig, isStoreConfigured } from "@/lib/config-store";
import { AdminEditor } from "@/components/admin/Editor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
  const config = await getConfig();
  return <AdminEditor initialConfig={config} storeReady={isStoreConfigured()} />;
}
