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

// PATCH: 정렬된 ID 배열을 받아 works 순서를 재배치
export async function PATCH(req: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body: { orderedIds?: unknown } = await req.json();
  const orderedIds = body.orderedIds;
  if (!Array.isArray(orderedIds) || !orderedIds.every((x) => typeof x === "string")) {
    return NextResponse.json({ error: "orderedIds(string[]) 필요" }, { status: 400 });
  }
  const works = await getWorks();
  const byId = new Map(works.map((w) => [w.id, w]));
  const reordered: Work[] = [];
  for (const id of orderedIds) {
    const w = byId.get(id);
    if (w) {
      reordered.push(w);
      byId.delete(id);
    }
  }
  // 정렬 목록에 없는 항목은 뒤에 보존
  for (const w of byId.values()) reordered.push(w);
  await saveWorks(reordered);
  return NextResponse.json({ ok: true });
}
