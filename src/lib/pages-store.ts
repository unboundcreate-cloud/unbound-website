import { Redis } from "@upstash/redis";

function getRedis() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export type PageSlug = "main" | "about" | "services" | "works" | "contact" | "404";

const PAGE_DEFAULTS: Record<PageSlug, Record<string, string>> = {
  main: {
    heroTitle1: "MOVE WITHOUT",
    heroTitle2: "LIMITS",
    tagline1: "최첨단 AI와 모션그래픽으로",
    tagline2: "영상 제작의 새로운 기준을 만듭니다.",
    ctaText: "VIEW WORKS",
    ctaHref: "/works",
    bannerLine1: "경계 없는 창의성, 무한한 가능성.",
    bannerLine2: "이야기를 살리는 영상제작스튜디오 Unbound Studio.",
  },
  about: {
    heroTitle: "Creative Studio",
    heroSubtitle: "Unbound Studio는 모션그래픽, 브랜드필름, 광고영상 전문 포스트프로덕션 스튜디오입니다.",
    headlineLine1: "Story in",
    headlineLine2: "every frame",
    body: "Unbound Studio는 모션그래픽, 브랜드필름, 광고영상 전문 포스트프로덕션 스튜디오입니다. 기획·디자인·제작·납품까지 원스톱으로 제공하며, 클라이언트의 메시지를 가장 강렬하게 전달하는 영상을 만듭니다.",
    learnMoreText: "Learn More",
  },
  services: {
    heroTitle: "Services",
    heroSubtitle: "최첨단 AI 기술부터 감각적인 디자인까지, 영상 제작의 새로운 기준을 제시합니다.",
    introText: "최첨단 AI 기술부터 감각적인 디자인까지, 영상 제작의 새로운 기준을 제시합니다. 단순한 영상 제작을 넘어 AI의 효율성과 트렌디한 디자인을 결합하여, 고객의 비즈니스에 최적화된 영상 경험을 설계합니다.",
  },
  works: {
    heroTitle: "Works",
    heroSubtitle: "Unbound Studio의 포트폴리오를 확인하세요.",
  },
  contact: {
    heroTitle: "Contact",
    heroSubtitle: "프로젝트 문의 및 상담은 언제든지 환영합니다.",
    email: "create@unboundstudio.co.kr",
    address: "",
    phone: "",
    hours: "월–금 10:00–18:00",
    formTitle: "프로젝트 문의하기",
    formSubmitText: "문의 보내기",
    formSuccessMessage: "문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.",
  },
  "404": {
    title: "404",
    subtitle: "페이지를 찾을 수 없습니다.",
    body: "요청하신 페이지가 존재하지 않거나 이동되었습니다.",
    buttonText: "홈으로 돌아가기",
    buttonHref: "/",
  },
};

export async function getPageContent(slug: PageSlug): Promise<Record<string, string>> {
  const redis = getRedis();
  if (!redis) return PAGE_DEFAULTS[slug] ?? {};
  try {
    const stored = await redis.get<Record<string, string>>(`pages:${slug}`);
    return stored ?? PAGE_DEFAULTS[slug] ?? {};
  } catch { return PAGE_DEFAULTS[slug] ?? {}; }
}

export async function savePageContent(slug: PageSlug, content: Record<string, string>): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis가 연결되지 않았습니다.");
  await redis.set(`pages:${slug}`, content);
}

export function getPageDefaults(slug: PageSlug): Record<string, string> {
  return PAGE_DEFAULTS[slug] ?? {};
}
