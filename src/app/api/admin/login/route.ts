import { cookies } from "next/headers";
import { checkPassword, sessionToken, COOKIE_NAME } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  if (!checkPassword(String(password ?? ""))) {
    return Response.json(
      { error: "비밀번호가 올바르지 않습니다." },
      { status: 401 },
    );
  }
  const store = await cookies();
  store.set(COOKIE_NAME, sessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7일
  });
  return Response.json({ ok: true });
}
