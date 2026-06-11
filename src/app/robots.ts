import type { MetadataRoute } from "next";

const SITE_URL = "https://www.unboundstudio.co.kr";

// /robots.txt 를 생성. 모든 검색 크롤러에 전체 공개 + 사이트맵 위치 안내.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
