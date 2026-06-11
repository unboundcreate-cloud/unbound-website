import { revalidatePath } from "next/cache";
import { getConfig, saveConfig } from "@/lib/config-store";
import { isAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  return Response.json(await getConfig());
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "잘못된 요청" }, { status: 400 });
  }
  try {
    await saveConfig(body as Parameters<typeof saveConfig>[0]);
    // 공개 페이지 캐시 무효화 → 변경 즉시 반영
    revalidatePath("/", "layout");
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "저장 실패 — DB(KV)가 연결됐는지 확인하세요." },
      { status: 500 },
    );
  }
}
