import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { getSetting, saveSetting } from "@/lib/settings-store";

const VALID_KEYS = ["general", "seo", "brand", "social", "analytics", "redirects"] as const;
type SettingKey = (typeof VALID_KEYS)[number];

export async function GET(_req: Request, { params }: { params: Promise<{ key: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { key } = await params;
  if (!VALID_KEYS.includes(key as SettingKey)) return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  const value = await getSetting(key as SettingKey);
  return NextResponse.json(value);
}

export async function PUT(req: Request, { params }: { params: Promise<{ key: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { key } = await params;
  if (!VALID_KEYS.includes(key as SettingKey)) return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  const value = await req.json();
  await saveSetting(key as SettingKey, value);
  return NextResponse.json({ ok: true });
}
