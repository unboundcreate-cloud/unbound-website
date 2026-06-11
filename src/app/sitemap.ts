import type { MetadataRoute } from "next";
import { works } from "@/data/works";

const SITE_URL = "https://www.unboundstudio.co.kr";

// /sitemap.xml 을 생성. 정적 페이지 + 포트폴리오 상세(works) 전체를 나열.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/works`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const workRoutes: MetadataRoute.Sitemap = works.map((w) => ({
    url: `${SITE_URL}/works/${w.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...workRoutes];
}
