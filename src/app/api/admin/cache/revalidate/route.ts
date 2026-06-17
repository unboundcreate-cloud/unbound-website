import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/admin-auth";

export async function POST(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const tag = url.searchParams.get("tag");

  revalidatePath("/", "layout");
  return NextResponse.json({
    ok: true,
    message: tag ? `'${tag}' 태그 재검증 완료` : "전체 레이아웃 재검증 완료",
  });
}
