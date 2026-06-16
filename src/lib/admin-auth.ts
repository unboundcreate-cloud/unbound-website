import { cookies } from "next/headers";
import crypto from "crypto";
import { Redis } from "@upstash/redis";

export const COOKIE_NAME = "us_admin";
const PW_KEY = "admin:pw";

function getRedis() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

// Redis 저장 비밀번호 우선, 없으면 환경변수 fallback
async function getPassword(): Promise<string> {
  const redis = getRedis();
  if (redis) {
    try {
      const stored = await redis.get<string>(PW_KEY);
      if (stored) return stored;
    } catch {}
  }
  return process.env.ADMIN_PASSWORD ?? "";
}

export async function sessionToken(): Promise<string> {
  const pw = await getPassword();
  const secret = process.env.ADMIN_SESSION_SECRET ?? pw;
  return crypto.createHash("sha256").update(`${pw}:${secret}`).digest("hex");
}

export async function checkPassword(input: string): Promise<boolean> {
  const pw = await getPassword();
  if (!pw) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(pw);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === (await sessionToken());
}

export async function savePassword(newPw: string): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis가 연결되지 않았습니다.");
  await redis.set(PW_KEY, newPw);
}
