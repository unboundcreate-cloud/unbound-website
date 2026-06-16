import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { getChatLogs, clearChatLogs } from "@/lib/chat-store";

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const logs = await getChatLogs();
  return NextResponse.json({ logs });
}

export async function DELETE() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await clearChatLogs();
  return NextResponse.json({ ok: true });
}
