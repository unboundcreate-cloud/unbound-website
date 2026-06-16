"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}
interface NavGroup {
  label: string;
  prefix?: string;
  items: NavItem[];
}

const NAV: NavGroup[] = [
  {
    label: "콘텐츠 관리",
    prefix: "/admin/content",
    items: [
      { label: "작업물 (Works)", href: "/admin/content/works" },
      { label: "서비스", href: "/admin/content/services" },
      { label: "클라이언트 로고", href: "/admin/content/logos" },
    ],
  },
  {
    label: "페이지 관리",
    prefix: "/admin/pages",
    items: [
      { label: "메인", href: "/admin/pages/main" },
      { label: "About", href: "/admin/pages/about" },
      { label: "Services", href: "/admin/pages/services" },
      { label: "Works", href: "/admin/pages/works" },
      { label: "Contact", href: "/admin/pages/contact" },
      { label: "404", href: "/admin/pages/404" },
    ],
  },
  {
    label: "사이트 설정",
    prefix: "/admin/settings",
    items: [
      { label: "공통 텍스트", href: "/admin/settings/general" },
      { label: "SEO / 사이트맵", href: "/admin/settings/seo" },
      { label: "브랜드 시스템", href: "/admin/settings/brand" },
      { label: "소셜 / 외부 링크", href: "/admin/settings/social" },
      { label: "분석 도구", href: "/admin/settings/analytics" },
      { label: "리다이렉트", href: "/admin/settings/redirects" },
      { label: "캐시", href: "/admin/settings/cache" },
    ],
  },
  {
    label: "기타",
    items: [
      { label: "AI 대화 기록", href: "/admin/chats" },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="flex h-screen w-56 flex-none flex-col border-r border-white/8 bg-[#111]">
      {/* 로고 */}
      <div className="border-b border-white/8 px-5 py-5">
        <a
          href="https://www.unboundstudio.co.kr"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 group"
        >
          <span className="h-2 w-2 rounded-full bg-brand-accent" />
          <span className="font-display text-xs uppercase tracking-widest text-white group-hover:text-brand-accent transition-colors">
            Unbound Admin
          </span>
        </a>
      </div>

      {/* 네비게이션 */}
      <nav className="flex-1 overflow-y-auto py-4">
        {NAV.map((group) => (
          <div key={group.label} className="mb-5">
            <div className="px-4 pb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
              {group.label}
            </div>
            {group.items.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-2 text-[13px] transition-colors ${
                    isActive
                      ? "bg-brand-accent/15 text-brand-accent"
                      : "text-white/55 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <span className="mr-2 h-1 w-1 rounded-full bg-brand-accent" />
                  )}
                  {!isActive && <span className="mr-3" />}
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* 하단 */}
      <div className="border-t border-white/8 px-4 py-4">
        <button
          onClick={logout}
          className="w-full text-left text-[12px] text-white/30 transition-colors hover:text-white"
        >
          로그아웃
        </button>
      </div>
    </aside>
  );
}
