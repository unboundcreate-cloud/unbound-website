import { getChatLogs, isChatStoreReady } from "@/lib/chat-store";
import { ChatLogsView } from "@/components/admin/ChatLogsView";

export const dynamic = "force-dynamic";

export default async function ChatsPage() {
  const [logs, ready] = await Promise.all([getChatLogs(), isChatStoreReady()]);
  return <ChatLogsView logs={logs} ready={ready} />;
}
