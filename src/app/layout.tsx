import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Chrome } from "@/components/layout/Chrome";
import { studio } from "@/data/clients";

// 영문 폰트 = Inter. 현대적·기하학적 sans-serif, 모션그래픽 스튜디오 분위기에 최적.
const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://www.unboundstudio.co.kr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Unbound Studio 언바운드 스튜디오 | 모션그래픽·영상제작 외주 스튜디오",
  description:
    "Unbound Studio(언바운드 스튜디오)는 모션그래픽·영상편집·홍보영상 외주제작 전문 크리에이티브 스튜디오입니다. 기획부터 촬영, 편집, 모션그래픽, 색보정, 사운드까지 영상 제작 전 과정을 원스톱으로 진행합니다. 기업 홍보영상, 광고영상, 브랜드필름 외주는 Unbound Studio.",
  keywords: [
    "Unbound Studio",
    "언바운드 스튜디오",
    "영상외주",
    "영상 외주제작",
    "영상제작 외주",
    "모션그래픽",
    "모션그래픽 외주",
    "영상 편집",
    "영상편집 외주",
    "홍보영상 제작",
    "기업 홍보영상",
    "광고 영상",
    "브랜드 필름",
    "영상 제작 업체",
    "영상 프로덕션",
    "포스트프로덕션",
    "모션 디자인",
    "방송 영상",
    "AI 영상 제작",
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
    title: "Unbound Studio 언바운드 스튜디오 | 모션그래픽·영상제작 외주 스튜디오",
    description: "모션그래픽·영상편집·홍보영상 외주제작 전문. 경계를 넘는 모션과 영상으로 브랜드의 이야기를 움직입니다.",
    url: SITE_URL,
    siteName: "Unbound Studio",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: `${SITE_URL}/hero-reel-poster.jpg`,
        width: 1920,
        height: 880,
        alt: "Unbound Studio — 모션그래픽·영상제작 스튜디오",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unbound Studio | 모션그래픽·영상제작 외주 스튜디오",
    description: "모션그래픽·영상편집·홍보영상 외주제작 전문 크리에이티브 스튜디오.",
    images: [`${SITE_URL}/hero-reel-poster.jpg`],
  },
  verification: {
    google: "qyXj9JYwW-lW4VzR-66zIKgkTTzoP5LyV7fKq_x0xns",
    other: {
      "naver-site-verification": [
        "8f5dc370fdfb65116fa0f64d1125217f115cab09",
        "9aa9905b0c5e118487932790d7fc0c88faeb2173",
      ],
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "Unbound Studio",
  alternateName: "언바운드 스튜디오",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/hero-reel-poster.jpg`,
  email: studio.email,
  description:
    "Unbound Studio(언바운드 스튜디오)는 모션그래픽·영상편집·홍보영상 외주제작 전문 포스트프로덕션 스튜디오입니다. 기업 홍보영상, 광고영상, 브랜드필름을 기획부터 납품까지 원스톱으로 제작합니다.",
  areaServed: { "@type": "Country", name: "대한민국" },
  knowsAbout: [
    "영상 외주제작",
    "모션그래픽",
    "영상 편집",
    "홍보영상 제작",
    "기업 홍보영상",
    "광고영상",
    "브랜드 필름",
    "포스트프로덕션",
    "AI 영상 제작",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "영상 제작 서비스",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "모션그래픽 제작" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "영상 편집·포스트프로덕션" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "기업 홍보영상 제작" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "광고영상·브랜드필름 제작" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI 영상 제작" } },
    ],
  },
  sameAs: [studio.social.youtube, studio.social.instagram].filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={inter.variable}>
      <head>
        {/* Pretendard(한글 폰트) — 메인 CSS 번들과 분리해 비차단 로드 */}
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css"
        />
        {/* Google Analytics (GA4) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-NRGQMTSCK3"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-NRGQMTSCK3');",
          }}
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
