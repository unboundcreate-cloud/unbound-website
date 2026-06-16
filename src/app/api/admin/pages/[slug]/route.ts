import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { getPageContent, savePageContent, getPageDefaults, type PageSlug } from "@/lib/pages-store";

const VALID_SLUGS: PageSlug[] = ["main", "about", "services", "works", "contact", "404"];

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug as PageSlug)) return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  const [content, defaults] = await Promise.all([
    getPageContent(slug as PageSlug),
    Promise.resolve(getPageDefaults(slug as PageSlug)),
  ]);
  return NextResponse.json({ content, defaults });
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug as PageSlug)) return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  const content: Record<string, string> = await req.json();
  await savePageContent(slug as PageSlug, content);
  return NextResponse.json({ ok: true });
}
