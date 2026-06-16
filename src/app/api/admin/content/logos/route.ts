import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { getLogos, saveLogos } from "@/lib/content-store";
import type { Client } from "@/data/clients";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getLogos());
}

export async function PUT(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const logos: Client[] = await req.json();
  await saveLogos(logos);
  return NextResponse.json({ ok: true });
}
