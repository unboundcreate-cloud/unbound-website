import { NextResponse } from "next/server";
import { isAuthenticated, savePassword } from "@/lib/admin-auth";

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { password } = await req.json().catch(() => ({}));
  if (!password || typeof password !== "string" || password.length < 6) {
    return NextResponse.json(
      { error: "비밀번호는 6자 이상이어야 합니다." },
      { status: 400 },
    );
  }
  await savePassword(password);
  return NextResponse.json({ ok: true });
}
