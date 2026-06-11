import { cookies } from "next/headers";
import crypto from "crypto";

export const COOKIE_NAME = "us_admin";

// 세션 토큰 = sha256(password:secret). 비밀번호가 바뀌면 기존 세션 자동 무효화.
export function sessionToken(): string {
  const pw = process.env.ADMIN_PASSWORD ?? "";
  const secret = process.env.ADMIN_SESSION_SECRET ?? pw;
  return crypto.createHash("sha256").update(`${pw}:${secret}`).digest("hex");
}

export function checkPassword(input: string): boolean {
  const pw = process.env.ADMIN_PASSWORD ?? "";
  if (!pw) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(pw);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === sessionToken();
}
