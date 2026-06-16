import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  redirect("/admin/chats");
}
