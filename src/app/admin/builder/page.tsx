import { redirect } from "next/navigation";
import type { Data } from "@measured/puck";
import { isAuthenticated } from "@/lib/admin-auth";
import { getPuckPage } from "@/lib/config-store";
import { BuilderClient } from "@/components/admin/BuilderClient";

export const dynamic = "force-dynamic";

export default async function BuilderPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
  const data = (await getPuckPage("home")) as Data;
  return <BuilderClient data={data} />;
}
