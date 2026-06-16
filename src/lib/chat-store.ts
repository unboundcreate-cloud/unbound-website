import { Redis } from "@upstash/redis";

const KEY = "chat:log";
const MAX = 500;

function getRedis() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export interface ChatEntry {
  id: string;
  ts: number;
  user: string;
  ai: string;
}

export async function appendChatLog(user: string, ai: string): Promise<void> {
  const redis = getRedis();
  if (!redis) return;
  const entry: ChatEntry = { id: crypto.randomUUID(), ts: Date.now(), user, ai };
  await redis.lpush(KEY, JSON.stringify(entry));
  await redis.ltrim(KEY, 0, MAX - 1);
}

export async function getChatLogs(limit = 200): Promise<ChatEntry[]> {
  const redis = getRedis();
  if (!redis) return [];
  const raw = await redis.lrange(KEY, 0, limit - 1);
  return raw
    .map((item) => {
      try {
        return (typeof item === "string" ? JSON.parse(item) : item) as ChatEntry;
      } catch {
        return null;
      }
    })
    .filter((x): x is ChatEntry => x !== null);
}

export async function clearChatLogs(): Promise<void> {
  const redis = getRedis();
  if (redis) await redis.del(KEY);
}

export function isChatStoreReady(): boolean {
  return getRedis() !== null;
}
