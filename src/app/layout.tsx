import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import { Chrome } from "@/components/layout/Chrome";
import { studio } from "@/data/clients";

// 영문 폰트 = Montserrat. 제목은 ExtraBold(800), 본문은 Medium(500)으로 사용.
const montserrat = Montserrat({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

// 숫자 폰트 = Roboto.
const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const SITE_URL = "https://www.unboundstudio.co.kr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Unbound Studio 언바운드 스튜디오 | 모션그래픽 크리에이티브 스튜디오",
  description:
    "Unbound Studio(언바운드 스튜디오)는 모션그래픽과 포스트프로덕션에 특화된 크리에이티브 스튜디오입니다. 기획부터 편집, 모션그래픽, 색보정, 사운드까지 — 영상의 모든 단계에서 경계 없는 창의성을 발휘합니다.",
  keywords: [
    "Unbound Studio",
    "언바운드 스튜디오",
    "모션그래픽",
    "영상 제작",
    "포스트프로덕션",
    "광고 영상",
    "방송 영상",
    "모션 디자인",
    "영상 편집",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Unbound Studio 언바운드 스튜디오 | 모션그래픽 크리에이티브 스튜디오",
    description: "경계를 넘는 모션과 영상으로 브랜드의 이야기를 움직입니다.",
    url: SITE_URL,
    siteName: "Unbound Studio",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unbound Studio | 모션그래픽 크리에이티브 스튜디오",
    description: "경계를 넘는 모션과 영상으로 브랜드의 이야기를 움직입니다.",
  },
  // 검색엔진 소유확인 (HTML 태그 방식 content 값)
  verification: {
    google: "qyXj9JYwW-lW4VzR-66zIKgkTTzoP5LyV7fKq_x0xns",
    other: {
      "naver-site-verification": "8f5dc370fdfb65116fa0f64d1125217f115cab09",
    },
  },
};

// 구조화 데이터 — 검색엔진에 "이 사이트 = Unbound Studio = 언바운드 스튜디오"임을 명시.
// 브랜드명 검색·구글 지식패널 인식에 도움.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Unbound Studio",
  alternateName: "언바운드 스튜디오",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: studio.email,
  description:
    "Unbound Studio(언바운드 스튜디오)는 모션그래픽·브랜드필름·광고영상 전문 포스트프로덕션 스튜디오입니다.",
  sameAs: [studio.social.youtube],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${montserrat.variable} ${roboto.variable}`}>
      <head>
        {/* Paperlogy(한글 폰트) — 메인 CSS 번들과 분리해 비차단 로드.
            로드 지연/실패해도 한글은 시스템 폰트로 자연스럽게 폴백됨. */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/fonts-archive/Paperlogy/Paperlogy.css"
        />
      </head>
      <body className="font-body antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
