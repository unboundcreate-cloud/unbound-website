import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { getWorks, saveWorks } from "@/lib/content-store";
import type { Work } from "@/data/works";

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const works = await getWorks();
  return NextResponse.json(works);
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const newWork: Work = await req.json();
  if (!newWork.id || !newWork.title) return NextResponse.json({ error: "id와 title은 필수입니다." }, { status: 400 });
  const works = await getWorks();
  if (works.find((w) => w.id === newWork.id)) return NextResponse.json({ error: "이미 존재하는 ID입니다." }, { status: 409 });
  await saveWorks([...works, newWork]);
  return NextResponse.json({ ok: true });
}
