import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin-auth";
import { getChatLogs, isChatStoreReady } from "@/lib/chat-store";
import { ChatLogsView } from "@/components/admin/ChatLogsView";

export const dynamic = "force-dynamic";

export default async function ChatsPage() {
  if (!(await isAuthenticated())) redirect("/admin/login");
  const [logs, ready] = await Promise.all([getChatLogs(), isChatStoreReady()]);
  return <ChatLogsView logs={logs} ready={ready} />;
}
