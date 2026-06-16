import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { getServices, saveServices } from "@/lib/content-store";
import type { Service } from "@/data/services";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getServices());
}

export async function PUT(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const services: Service[] = await req.json();
  await saveServices(services);
  return NextResponse.json({ ok: true });
}
