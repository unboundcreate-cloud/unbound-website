import { revalidatePath } from "next/cache";
import { getPuckPage, savePuckPage } from "@/lib/config-store";
import { isAuthenticated } from "@/lib/admin-auth";

const SLUG = "home";

export async function GET() {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  return Response.json(await getPuckPage(SLUG));
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return Response.json({ error: "잘못된 요청" }, { status: 400 });
  }
  try {
    await savePuckPage(SLUG, data);
    revalidatePath("/sandbox");
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "저장 실패 — DB(KV) 연결을 확인하세요." },
      { status: 500 },
    );
  }
}
