import Link from "next/link";
import { studio } from "@/data/clients";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Footer() {
  return (
    <footer className="bg-brand-black">
      <div className="section-padding border-t border-white/10 py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* 로고 + 연락처 */}
          <div>
            <Link href="/" aria-label="Unbound Studio 홈">
              <Logo variant="white" height={20} />
            </Link>
            <div className="mt-3 space-y-1 font-mono text-[14px] tracking-[0.1em] text-brand-muted">
              <p>
                <a href={`mailto:${studio.email}`} className="hover:text-white">
                  {studio.email}
                </a>
              </p>
              <p>{studio.positioning}</p>
            </div>
          </div>

          {/* SNS */}
          <SocialLinks className="flex gap-5" iconClassName="h-6 w-6" />
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-4 font-mono text-[12px] uppercase tracking-[0.2em] text-brand-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} UNBOUND STUDIO. ALL RIGHTS RESERVED.</p>
          <p>Motion · Branding · Post Production</p>
        </div>
      </div>
    </footer>
  );
}
