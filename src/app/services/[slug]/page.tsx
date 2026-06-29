import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import { PageHero } from "@/components/ui/PageHero";
import { FadeIn } from "@/components/ui/FadeIn";

const SITE_URL = "https://www.unboundstudio.co.kr";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

// 서비스별 SEO 메타 — 한글 키워드 중심
const SEO: Record<string, { title: string; keywords: string[] }> = {
  "ai-content": {
    title: "AI 영상 제작·AI 콘텐츠 외주",
    keywords: ["AI 영상 제작", "AI 콘텐츠 외주", "AI 영상 외주", "생성형 AI 영상"],
  },
  "broadcast-drama": {
    title: "방송·드라마 타이틀 제작 외주",
    keywords: ["방송 타이틀 제작", "드라마 오프닝 외주", "예능 타이틀 외주", "OAP 제작", "타이틀 시퀀스"],
  },
  "public-institutional": {
    title: "공공기관·기업 홍보영상 제작",
    keywords: ["공공기관 영상 제작", "기관 홍보영상 외주", "채용영상 제작", "캠페인 영상"],
  },
  "advertising-pr": {
    title: "광고·홍보영상 제작 외주",
    keywords: ["광고영상 제작", "홍보영상 외주", "브랜드필름 제작", "TVCF 제작", "디지털 광고"],
  },
  "b2b-film": {
    title: "B2B 기업영상 제작 외주",
    keywords: ["B2B 영상 제작", "기업 홍보영상 외주", "제품 소개영상 제작", "솔루션 영상"],
  },
  "motion-graphic": {
    title: "모션그래픽 외주 제작",
    keywords: ["모션그래픽 외주", "모션그래픽 제작", "인포그래픽 영상 제작", "2D 애니메이션"],
  },
};

// 서비스 → Works 카테고리 필터
const WORKS_CAT: Record<string, string> = {
  "ai-content": "ai",
  "broadcast-drama": "drama",
  "public-institutional": "public",
  "advertising-pr": "promo",
  "b2b-film": "b2b",
  "motion-graphic": "",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return { title: "Services | Unbound Studio" };
  const seo = SEO[slug];
  const title = `${seo?.title ?? s.subtitle ?? s.title} | Unbound Studio`;
  const description = s.description.replace(/\n/g, " ");
  return {
    title,
    description,
    keywords: seo?.keywords,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/services/${slug}`,
      type: "website",
      images: s.images?.[0] ? [{ url: s.images[0] }] : undefined,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) notFound();

  const cat = WORKS_CAT[slug];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.subtitle ?? s.title,
    serviceType: s.title,
    url: `${SITE_URL}/services/${slug}`,
    description: s.description.replace(/\n/g, " "),
    areaServed: { "@type": "Country", name: "대한민국" },
    provider: {
      "@type": "Organization",
      name: "Unbound Studio",
      url: SITE_URL,
    },
  };

  return (
    <div className="min-h-screen bg-brand-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero label={`Service ${s.number}`} title={s.title} description={s.subtitle} />

      <section className="section-padding pb-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <FadeIn>
            <p className="whitespace-pre-line text-base leading-relaxed text-white/75 md:text-lg">
              {s.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-brand-accent px-7 py-3 font-display text-xs uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-85"
              >
                프로젝트 문의
              </Link>
              <Link
                href={cat ? `/works?category=${cat}` : "/works"}
                className="inline-flex items-center rounded-full border border-white/25 px-7 py-3 font-display text-xs uppercase tracking-[0.18em] text-white transition-colors hover:border-brand-accent hover:text-brand-accent"
              >
                관련 작품 보기
              </Link>
            </div>
          </FadeIn>

          {s.images && s.images.length > 0 && (
            <FadeIn delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {s.images.slice(0, 2).map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-[3/4] overflow-hidden rounded-lg bg-brand-gray"
                  >
                    <Image
                      src={img}
                      alt={`${s.subtitle ?? s.title} 영상 제작 예시 ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </FadeIn>
          )}
        </div>

        <FadeIn>
          <Link
            href="/services"
            className="mt-20 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] text-brand-muted transition-colors hover:text-white"
          >
            ← 전체 서비스
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
