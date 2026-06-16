import { Redis } from "@upstash/redis";

function getRedis() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export interface GeneralSettings {
  studioName: string;
  email: string;
  positioning: string;
  footerCopyright: string;
  navItems: { label: string; href: string; visible: boolean }[];
}

export interface SeoSettings {
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string;
  ogImageUrl: string;
  googleVerification: string;
  naverVerification: string;
  robotsTxt: string;
}

export interface BrandSettings {
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  logoWhiteUrl: string;
  logoDarkUrl: string;
  faviconUrl: string;
  fontEn: string;
  fontKo: string;
}

export interface SocialSettings {
  youtube: string;
  instagram: string;
  linkedin: string;
  vimeo: string;
  kakao: string;
}

export interface AnalyticsSettings {
  ga4Id: string;
  gtmId: string;
  naverAnalyticsId: string;
  metaPixelId: string;
  kakaoPixelId: string;
}

export interface RedirectRule {
  from: string;
  to: string;
  type: "301" | "302";
}

const DEFAULTS = {
  general: {
    studioName: "UNBOUND STUDIO",
    email: "create@unboundstudio.co.kr",
    positioning: "Motion Graphics & Post-Production",
    footerCopyright: "© 2026 UNBOUND STUDIO. ALL RIGHTS RESERVED.",
    navItems: [
      { label: "Works", href: "/works", visible: true },
      { label: "Services", href: "/services", visible: true },
      { label: "About", href: "/about", visible: true },
      { label: "Contact", href: "/contact", visible: true },
    ],
  } as GeneralSettings,
  seo: {
    siteTitle: "Unbound Studio | 모션그래픽 크리에이티브 스튜디오",
    siteDescription: "Unbound Studio는 모션그래픽, 브랜드필름, 광고영상 전문 포스트프로덕션 스튜디오입니다.",
    siteKeywords: "모션그래픽, 브랜드필름, 광고영상, 영상제작, 포스트프로덕션",
    ogImageUrl: "",
    googleVerification: "",
    naverVerification: "",
    robotsTxt: "User-agent: *\nAllow: /",
  } as SeoSettings,
  brand: {
    primaryColor: "#0a0a0a",
    accentColor: "#E85D24",
    backgroundColor: "#0a0a0a",
    textColor: "#ffffff",
    logoWhiteUrl: "",
    logoDarkUrl: "",
    faviconUrl: "",
    fontEn: "Syne",
    fontKo: "Noto Sans KR",
  } as BrandSettings,
  social: {
    youtube: "https://www.youtube.com/@createunbound",
    instagram: "https://www.instagram.com/",
    linkedin: "",
    vimeo: "",
    kakao: "",
  } as SocialSettings,
  analytics: {
    ga4Id: "",
    gtmId: "",
    naverAnalyticsId: "",
    metaPixelId: "",
    kakaoPixelId: "",
  } as AnalyticsSettings,
  redirects: [] as RedirectRule[],
};

type SettingKey = keyof typeof DEFAULTS;

export async function getSetting<K extends SettingKey>(key: K): Promise<typeof DEFAULTS[K]> {
  const redis = getRedis();
  if (!redis) return DEFAULTS[key];
  try {
    const stored = await redis.get<typeof DEFAULTS[K]>(`settings:${key}`);
    return stored ?? DEFAULTS[key];
  } catch { return DEFAULTS[key]; }
}

export async function saveSetting<K extends SettingKey>(key: K, value: typeof DEFAULTS[K]): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error("Redis가 연결되지 않았습니다.");
  await redis.set(`settings:${key}`, value);
}

export function getSettingDefault<K extends SettingKey>(key: K): typeof DEFAULTS[K] {
  return DEFAULTS[key];
}
