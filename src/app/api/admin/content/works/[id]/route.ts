import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAuthenticated } from "@/lib/admin-auth";
import { getWorks, saveWorks } from "@/lib/content-store";
import type { Work } from "@/data/works";

function revalidateWorksPaths() {
  revalidatePath("/");
  revalidatePath("/works");
  revalidatePath("/works/[slug]", "page");
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const works = await getWorks();
  const work = works.find((w) => w.id === id);
  if (!work) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(work);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const updated: Work = await req.json();
  const works = await getWorks();
  const idx = works.findIndex((w) => w.id === id);
  if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
  works[idx] = { ...works[idx], ...updated, id };
  await saveWorks(works);
  revalidateWorksPaths();
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const works = await getWorks();
  const filtered = works.filter((w) => w.id !== id);
  if (filtered.length === works.length) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await saveWorks(filtered);
  revalidateWorksPaths();
  return NextResponse.json({ ok: true });
}
