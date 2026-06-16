import { Redis } from "@upstash/redis";
import { works as defaultWorks, type Work } from "@/data/works";
import { services as defaultServices, type Service } from "@/data/services";
import { clients as defaultLogos, type Client } from "@/data/clients";

function getRedis() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function getWorks(): Promise<Work[]> {
  const redis = getRedis();
  if (!redis) return defaultWorks;
  try {
    const stored = await redis.get<Work[]>("content:works");
    return stored ?? defaultWorks;
  } catch { return defaultWorks; }
}

export async function saveWorks(works: Work[]): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis가 연결되지 않았습니다.");
  await redis.set("content:works", works);
}

export async function getServices(): Promise<Service[]> {
  const redis = getRedis();
  if (!redis) return defaultServices;
  try {
    const stored = await redis.get<Service[]>("content:services");
    return stored ?? defaultServices;
  } catch { return defaultServices; }
}

export async function saveServices(services: Service[]): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis가 연결되지 않았습니다.");
  await redis.set("content:services", services);
}

export async function getLogos(): Promise<Client[]> {
  const redis = getRedis();
  if (!redis) return defaultLogos;
  try {
    const stored = await redis.get<Client[]>("content:logos");
    return stored ?? defaultLogos;
  } catch { return defaultLogos; }
}

export async function saveLogos(logos: Client[]): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis가 연결되지 않았습니다.");
  await redis.set("content:logos", logos);
}

export function isContentStoreReady(): boolean {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return !!(url && token);
}
