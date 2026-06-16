import { NextResponse } from "next/server";
import { revalidateTag, revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/admin-auth";

export async function POST(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const tag = url.searchParams.get("tag");

  if (tag) {
    revalidateTag(tag);
    return NextResponse.json({ ok: true, message: `'${tag}' 태그 재검증 완료` });
  } else {
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, message: "전체 레이아웃 재검증 완료" });
  }
}
