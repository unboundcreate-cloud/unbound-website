import Link from "next/link";
import { getWorks } from "@/lib/content-store";

export const dynamic = "force-dynamic";

const CATEGORY_LABELS: Record<string, string> = {
  drama: "드라마 & 예능",
  promo: "광고 & 홍보",
  b2b: "B2B",
  ai: "AI",
  public: "공공 / 기관",
};

export default async function WorksPage() {
  const works = await getWorks();

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-white">작업물 (Works)</h1>
          <p className="mt-0.5 text-sm text-white/40">{works.length}개</p>
        </div>
        <Link
          href="/admin/content/works/new"
          className="rounded-lg bg-brand-accent px-4 py-2 text-sm font-medium text-white hover:opacity-85 transition-opacity"
        >
          + 작업물 추가
        </Link>
      </div>

      <div className="rounded-xl border border-white/8 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 bg-white/[0.02]">
              <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/30">썸네일</th>
              <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/30">제목</th>
              <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/30">클라이언트</th>
              <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/30">카테고리</th>
              <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/30">연도</th>
              <th className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-white/30">Featured</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {works.map((work, i) => (
              <tr key={work.id} className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                <td className="px-4 py-3">
                  {work.thumbnailUrl ? (
                    <img
                      src={work.thumbnailUrl}
                      alt={work.title}
                      className="h-10 w-16 rounded object-cover bg-white/10"
                    />
                  ) : (
                    <div className="h-10 w-16 rounded bg-white/10" />
                  )}
                </td>
                <td className="px-4 py-3 text-white">{work.title}</td>
                <td className="px-4 py-3 text-white/60">{work.client}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/60">
                    {CATEGORY_LABELS[work.category] ?? work.category}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/60">{work.year || "—"}</td>
                <td className="px-4 py-3">
                  {work.featured && (
                    <span className="rounded-full bg-brand-accent/20 px-2 py-0.5 text-xs text-brand-accent">Featured</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/content/works/${work.id}`}
                    className="text-xs text-white/40 hover:text-white transition-colors"
                  >
                    편집
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
