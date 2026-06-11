import { Redis } from "@upstash/redis";
import { DEFAULT_CONFIG, type SiteConfig } from "./site-config";

const KEY = "site-config";

// Vercel KV(Upstash) 또는 Upstash 직접 연동 — 둘 중 존재하는 env 사용.
function getRedis(): Redis | null {
  const url =
    process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

// 기본값 위에 저장값을 깊게 덮어쓰기(저장 안 된 필드는 기본값 유지).
function deepMerge<T>(base: T, override: unknown): T {
  if (override == null) return base;
  if (typeof base !== "object" || Array.isArray(base)) return override as T;
  const out = { ...(base as Record<string, unknown>) };
  for (const k of Object.keys(out)) {
    out[k] = deepMerge(
      out[k],
      (override as Record<string, unknown>)?.[k],
    );
  }
  return out as T;
}

export async function getConfig(): Promise<SiteConfig> {
  const redis = getRedis();
  if (!redis) return DEFAULT_CONFIG;
  try {
    const stored = await redis.get<SiteConfig>(KEY);
    return deepMerge(DEFAULT_CONFIG, stored);
  } catch {
    return DEFAULT_CONFIG;
  }
}

export async function saveConfig(cfg: SiteConfig): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("DB(KV)가 설정되지 않았습니다.");
  await redis.set(KEY, cfg);
}

export function isStoreConfigured(): boolean {
  return getRedis() !== null;
}

// ===== Puck 비주얼 빌더 문서 저장 =====
const EMPTY_PUCK = { content: [], root: {} };

// 저장된 문서가 없을 때 보여줄 기본 홈 구성(현재 사이트와 동일한 섹션 순서).
const DEFAULT_HOME_DOC = {
  root: {},
  content: [
    { type: "HeroBlock", props: { id: "hero-1" } },
    { type: "FeaturedWorksBlock", props: { id: "featured-1" } },
    { type: "AboutBlock", props: { id: "about-1" } },
    { type: "ServicesBlock", props: { id: "services-1" } },
    { type: "ProcessBlock", props: { id: "process-1" } },
    { type: "CTABlock", props: { id: "cta-1" } },
  ],
};

function defaultDoc(slug: string): unknown {
  return slug === "home" ? DEFAULT_HOME_DOC : EMPTY_PUCK;
}

export async function getPuckPage(slug: string): Promise<unknown> {
  const redis = getRedis();
  if (!redis) return defaultDoc(slug);
  try {
    const data = await redis.get(`puck:${slug}`);
    return data ?? defaultDoc(slug);
  } catch {
    return defaultDoc(slug);
  }
}

export async function savePuckPage(slug: string, data: unknown): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("DB(KV)가 설정되지 않았습니다.");
  await redis.set(`puck:${slug}`, data);
}
