import { DropZone, type Config } from "@measured/puck";
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedWorksSection } from "@/components/sections/FeaturedWorksSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CTASection } from "@/components/sections/CTASection";
import { DEFAULT_CONFIG, type Align, type StatItem } from "@/lib/site-config";
import { processSteps } from "@/data/process";
import { homeServices } from "@/data/services";
import { studio } from "@/data/clients";

// 폰트 선택 → 실제 CSS font-family 매핑 (사이트에 로드된 폰트들)
const FONTS: Record<string, string> = {
  Montserrat: "var(--font-montserrat), sans-serif",
  Roboto: "var(--font-roboto), sans-serif",
  Paperlogy: "Paperlogy, sans-serif",
};

const ALIGN_OPTIONS = [
  { label: "왼쪽", value: "left" },
  { label: "가운데", value: "center" },
  { label: "오른쪽", value: "right" },
];
const FONT_OPTIONS = [
  { label: "Montserrat", value: "Montserrat" },
  { label: "Roboto (숫자)", value: "Roboto" },
  { label: "Paperlogy (한글)", value: "Paperlogy" },
];

type Components = {
  Heading: {
    text: string;
    size: number;
    color: string;
    align: "left" | "center" | "right";
    font: string;
    weight: number;
  };
  Text: {
    text: string;
    size: number;
    color: string;
    align: "left" | "center" | "right";
    font: string;
    lineHeight: number;
  };
  Button: { label: string; href: string; bg: string; color: string };
  Image: { src: string; alt: string; maxWidth: number; radius: number };
  Spacer: { height: number };
  Columns: { count: number; gap: number };
  Section: { bg: string; paddingY: number; maxWidth: number };
  Video: { url: string };
  // 기존 사이트 섹션(고유 디자인) 블록
  HeroBlock: {
    lines: { value: string }[];
    taglineLine1: string;
    taglineLine2: string;
    buttonText: string;
    buttonHref: string;
  };
  FeaturedWorksBlock: { label: string; viewAllText: string; viewAllHref: string };
  AboutBlock: {
    headlineLine1: string;
    headlineLine2: string;
    body: string;
    bodyPosition: "right" | "below";
    headlineAlign: Align;
    bodyAlign: Align;
    statsAlign: Align;
    learnMoreAlign: Align;
    bodyFontPx: number;
    bodyLineHeight: number;
    statFontPx: number;
    paddingTop: number;
    paddingBottom: number;
    learnMoreText: string;
    showLearnMore: boolean;
    stats: StatItem[];
  };
  ServicesBlock: {
    label: string;
    services: { number: string; title: string; description: string }[];
  };
  ProcessBlock: {
    heading: string;
    description: string;
    steps: { korTitle: string; description: string }[];
  };
  CTABlock: {
    headlineLine1: string;
    headlineLine2: string;
    body: string;
    buttonText: string;
    buttonHref: string;
  };
};

// YouTube URL/ID → 임베드 URL
function youtubeEmbed(url: string): string {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  const id = m ? m[1] : url.trim();
  return `https://www.youtube.com/embed/${id}`;
}

export const config: Config<Components> = {
  components: {
    Heading: {
      label: "제목",
      fields: {
        text: { type: "textarea" },
        size: { type: "number", label: "크기(px)" },
        weight: { type: "number", label: "굵기(100~900)" },
        color: { type: "text", label: "색상" },
        align: { type: "select", label: "정렬", options: ALIGN_OPTIONS },
        font: { type: "select", label: "폰트", options: FONT_OPTIONS },
      },
      defaultProps: {
        text: "제목을 입력하세요",
        size: 56,
        weight: 800,
        color: "#ffffff",
        align: "left",
        font: "Montserrat",
      },
      render: ({ text, size, weight, color, align, font }) => (
        <h2
          style={{
            fontSize: size,
            fontWeight: weight,
            color,
            textAlign: align,
            fontFamily: FONTS[font],
            lineHeight: 1.05,
            margin: 0,
            whiteSpace: "pre-wrap",
          }}
        >
          {text}
        </h2>
      ),
    },
    Text: {
      label: "본문",
      fields: {
        text: { type: "textarea" },
        size: { type: "number", label: "크기(px)" },
        lineHeight: { type: "number", label: "줄간격(배수)" },
        color: { type: "text", label: "색상" },
        align: { type: "select", label: "정렬", options: ALIGN_OPTIONS },
        font: { type: "select", label: "폰트", options: FONT_OPTIONS },
      },
      defaultProps: {
        text: "본문 텍스트를 입력하세요.",
        size: 18,
        lineHeight: 1.6,
        color: "#b3b3b3",
        align: "left",
        font: "Paperlogy",
      },
      render: ({ text, size, lineHeight, color, align, font }) => (
        <p
          style={{
            fontSize: size,
            lineHeight,
            color,
            textAlign: align,
            fontFamily: FONTS[font],
            margin: 0,
            whiteSpace: "pre-wrap",
          }}
        >
          {text}
        </p>
      ),
    },
    Button: {
      label: "버튼",
      fields: {
        label: { type: "text", label: "문구" },
        href: { type: "text", label: "링크" },
        bg: { type: "text", label: "배경색" },
        color: { type: "text", label: "글자색" },
      },
      defaultProps: { label: "View Works", href: "/works", bg: "#e63226", color: "#ffffff" },
      render: ({ label, href, bg, color }) => (
        <a
          href={href}
          style={{
            display: "inline-block",
            background: bg,
            color,
            padding: "14px 36px",
            fontFamily: FONTS.Montserrat,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            fontSize: 13,
            textDecoration: "none",
          }}
        >
          {label}
        </a>
      ),
    },
    Image: {
      label: "이미지",
      fields: {
        src: { type: "text", label: "이미지 URL" },
        alt: { type: "text", label: "대체텍스트" },
        maxWidth: { type: "number", label: "최대 너비(px)" },
        radius: { type: "number", label: "모서리(px)" },
      },
      defaultProps: { src: "", alt: "", maxWidth: 600, radius: 0 },
      // eslint-disable-next-line @next/next/no-img-element
      render: ({ src, alt, maxWidth, radius }) =>
        src ? (
          <img src={src} alt={alt} style={{ maxWidth, width: "100%", borderRadius: radius, display: "block" }} />
        ) : (
          <div style={{ padding: 24, border: "1px dashed #555", color: "#888", textAlign: "center" }}>
            이미지 URL을 입력하세요
          </div>
        ),
    },
    Spacer: {
      label: "여백",
      fields: { height: { type: "number", label: "높이(px)" } },
      defaultProps: { height: 48 },
      render: ({ height }) => <div style={{ height }} />,
    },
    Columns: {
      label: "컬럼 (다단)",
      fields: {
        count: {
          type: "select",
          label: "단 수",
          options: [
            { label: "2단", value: 2 },
            { label: "3단", value: 3 },
            { label: "4단", value: 4 },
          ],
        },
        gap: { type: "number", label: "간격(px)" },
      },
      defaultProps: { count: 2, gap: 32 },
      render: ({ count, gap }) => (
        <div style={{ display: "flex", flexWrap: "wrap", gap }}>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} style={{ flex: `1 1 calc(${100 / count}% - ${gap}px)`, minWidth: 240 }}>
              <DropZone zone={`col-${i}`} />
            </div>
          ))}
        </div>
      ),
    },
    Section: {
      label: "섹션 (배경/여백)",
      fields: {
        bg: { type: "text", label: "배경색 (예: #0a0a0a)" },
        paddingY: { type: "number", label: "상하 여백(px)" },
        maxWidth: { type: "number", label: "콘텐츠 최대폭(px, 0=전체)" },
      },
      defaultProps: { bg: "#0a0a0a", paddingY: 96, maxWidth: 1200 },
      render: ({ bg, paddingY, maxWidth }) => (
        <div style={{ background: bg, paddingTop: paddingY, paddingBottom: paddingY }}>
          <div
            style={{
              maxWidth: maxWidth > 0 ? maxWidth : "100%",
              margin: "0 auto",
              paddingLeft: 24,
              paddingRight: 24,
            }}
          >
            <DropZone zone="content" />
          </div>
        </div>
      ),
    },
    Video: {
      label: "영상 (YouTube)",
      fields: { url: { type: "text", label: "YouTube 링크 또는 ID" } },
      defaultProps: { url: "" },
      render: ({ url }) =>
        url ? (
          <div style={{ position: "relative", paddingTop: "56.25%", width: "100%" }}>
            <iframe
              src={youtubeEmbed(url)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
            />
          </div>
        ) : (
          <div style={{ padding: 24, border: "1px dashed #555", color: "#888", textAlign: "center" }}>
            YouTube 링크를 입력하세요
          </div>
        ),
    },

    /* ===== 기존 사이트 섹션(고유 디자인) — 현재 사이트를 빌더에 표시 ===== */
    HeroBlock: {
      label: "[섹션] Hero",
      fields: {
        lines: {
          type: "array",
          label: "헤드라인 (줄)",
          arrayFields: { value: { type: "text", label: "줄" } },
          getItemSummary: (item) => item.value || "줄",
        },
        taglineLine1: { type: "text", label: "태그라인 1줄" },
        taglineLine2: { type: "text", label: "태그라인 2줄" },
        buttonText: { type: "text", label: "버튼 문구(비우면 숨김)" },
        buttonHref: { type: "text", label: "버튼 링크" },
      },
      defaultProps: {
        lines: DEFAULT_CONFIG.home.hero.lines.map((value) => ({ value })),
        taglineLine1: DEFAULT_CONFIG.home.hero.taglineLine1,
        taglineLine2: DEFAULT_CONFIG.home.hero.taglineLine2,
        buttonText: DEFAULT_CONFIG.home.hero.buttonText,
        buttonHref: DEFAULT_CONFIG.home.hero.buttonHref,
      },
      render: (p) => {
        const d = DEFAULT_CONFIG.home.hero;
        return (
          <HeroSection
            hero={{
              lines: (p.lines ?? d.lines.map((value) => ({ value }))).map((l) => l.value),
              taglineLine1: p.taglineLine1 ?? d.taglineLine1,
              taglineLine2: p.taglineLine2 ?? d.taglineLine2,
              buttonText: p.buttonText ?? d.buttonText,
              buttonHref: p.buttonHref ?? d.buttonHref,
            }}
          />
        );
      },
    },
    FeaturedWorksBlock: {
      label: "[섹션] Featured Works",
      fields: {
        label: { type: "text", label: "라벨" },
        viewAllText: { type: "text", label: "전체보기 문구" },
        viewAllHref: { type: "text", label: "전체보기 링크" },
      },
      defaultProps: { label: "Featured Works", viewAllText: "View All", viewAllHref: "/works" },
      render: ({ label, viewAllText, viewAllHref }) => (
        <FeaturedWorksSection label={label} viewAllText={viewAllText} viewAllHref={viewAllHref} />
      ),
    },
    AboutBlock: {
      label: "[섹션] About",
      fields: {
        headlineLine1: { type: "text", label: "제목 1줄" },
        headlineLine2: { type: "text", label: "제목 2줄" },
        body: { type: "textarea", label: "본문" },
        bodyPosition: {
          type: "select",
          label: "레이아웃",
          options: [
            { label: "제목 옆(2열)", value: "right" },
            { label: "제목 아래(쌓기)", value: "below" },
          ],
        },
        headlineAlign: { type: "select", label: "제목 정렬", options: ALIGN_OPTIONS },
        bodyAlign: { type: "select", label: "본문 정렬", options: ALIGN_OPTIONS },
        statsAlign: { type: "select", label: "통계 정렬", options: ALIGN_OPTIONS },
        learnMoreAlign: { type: "select", label: "버튼 정렬", options: ALIGN_OPTIONS },
        bodyFontPx: { type: "number", label: "본문 크기(px)" },
        bodyLineHeight: { type: "number", label: "본문 줄간격" },
        statFontPx: { type: "number", label: "통계 숫자 크기(px)" },
        paddingTop: { type: "number", label: "위 여백(px)" },
        paddingBottom: { type: "number", label: "아래 여백(px)" },
        learnMoreText: { type: "text", label: "버튼 문구" },
        showLearnMore: {
          type: "radio",
          label: "버튼 표시",
          options: [
            { label: "표시", value: true },
            { label: "숨김", value: false },
          ],
        },
        stats: {
          type: "array",
          label: "통계 항목",
          arrayFields: {
            label: { type: "text", label: "라벨" },
            useSymbol: {
              type: "radio",
              label: "표시 방식",
              options: [
                { label: "숫자", value: false },
                { label: "기호", value: true },
              ],
            },
            value: { type: "number", label: "숫자" },
            suffix: { type: "text", label: "접미(+)" },
            display: { type: "text", label: "기호(∞)" },
          },
          getItemSummary: (item) => item.label || "통계",
        },
      },
      defaultProps: {
        headlineLine1: DEFAULT_CONFIG.home.about.headlineLine1,
        headlineLine2: DEFAULT_CONFIG.home.about.headlineLine2,
        body: DEFAULT_CONFIG.home.about.body,
        bodyPosition: DEFAULT_CONFIG.home.about.bodyPosition,
        headlineAlign: DEFAULT_CONFIG.home.about.headlineAlign,
        bodyAlign: DEFAULT_CONFIG.home.about.bodyAlign,
        statsAlign: DEFAULT_CONFIG.home.about.statsAlign,
        learnMoreAlign: DEFAULT_CONFIG.home.about.learnMoreAlign,
        bodyFontPx: DEFAULT_CONFIG.home.about.bodyFontPx,
        bodyLineHeight: DEFAULT_CONFIG.home.about.bodyLineHeight,
        statFontPx: DEFAULT_CONFIG.home.about.statFontPx,
        paddingTop: DEFAULT_CONFIG.home.about.paddingTop,
        paddingBottom: DEFAULT_CONFIG.home.about.paddingBottom,
        learnMoreText: DEFAULT_CONFIG.home.about.learnMoreText,
        showLearnMore: DEFAULT_CONFIG.home.about.showLearnMore,
        stats: DEFAULT_CONFIG.home.about.stats,
      },
      render: (p) => {
        const d = DEFAULT_CONFIG.home.about;
        return (
          <AboutSection
            about={{
              headlineLine1: p.headlineLine1 ?? d.headlineLine1,
              headlineLine2: p.headlineLine2 ?? d.headlineLine2,
              body: p.body ?? d.body,
              bodyPosition: p.bodyPosition ?? d.bodyPosition,
              headlineAlign: p.headlineAlign ?? d.headlineAlign,
              bodyAlign: p.bodyAlign ?? d.bodyAlign,
              statsAlign: p.statsAlign ?? d.statsAlign,
              learnMoreAlign: p.learnMoreAlign ?? d.learnMoreAlign,
              blockOrder: ["body", "stats", "learnMore"],
              paddingTop: p.paddingTop ?? d.paddingTop,
              paddingBottom: p.paddingBottom ?? d.paddingBottom,
              bodyFontPx: p.bodyFontPx ?? d.bodyFontPx,
              bodyLineHeight: p.bodyLineHeight ?? d.bodyLineHeight,
              statFontPx: p.statFontPx ?? d.statFontPx,
              stats: p.stats ?? d.stats,
              learnMoreText: p.learnMoreText ?? d.learnMoreText,
              showLearnMore: p.showLearnMore ?? d.showLearnMore,
            }}
          />
        );
      },
    },
    ServicesBlock: {
      label: "[섹션] Services",
      fields: {
        label: { type: "text", label: "라벨" },
        services: {
          type: "array",
          label: "서비스 항목",
          arrayFields: {
            number: { type: "text", label: "번호" },
            title: { type: "text", label: "제목" },
            description: { type: "textarea", label: "설명" },
          },
          getItemSummary: (item) => item.title || "서비스",
        },
      },
      defaultProps: {
        label: "What We Do",
        services: homeServices.map(({ number, title, description }) => ({ number, title, description })),
      },
      render: ({ label, services }) => (
        <ServicesSection label={label} services={services ?? homeServices} />
      ),
    },
    ProcessBlock: {
      label: "[섹션] Process",
      fields: {
        heading: { type: "text", label: "제목" },
        description: { type: "textarea", label: "설명" },
        steps: {
          type: "array",
          label: "단계",
          arrayFields: {
            korTitle: { type: "text", label: "단계명" },
            description: { type: "textarea", label: "설명" },
          },
          getItemSummary: (item) => item.korTitle || "단계",
        },
      },
      defaultProps: {
        heading: "Process",
        description: "기획부터 납품까지 — 검증된 5단계 프로세스로 영상의 완성도를 높여갑니다.",
        steps: processSteps.map(({ korTitle, description }) => ({ korTitle, description })),
      },
      render: ({ heading, description, steps }) => (
        <ProcessSection heading={heading} description={description} steps={steps} />
      ),
    },
    CTABlock: {
      label: "[섹션] CTA",
      fields: {
        headlineLine1: { type: "text", label: "제목 1줄" },
        headlineLine2: { type: "text", label: "제목 2줄" },
        body: { type: "textarea", label: "본문" },
        buttonText: { type: "text", label: "버튼 문구" },
        buttonHref: { type: "text", label: "버튼 링크" },
      },
      defaultProps: {
        headlineLine1: "경계 없는 상상을,",
        headlineLine2: "영상으로 완성합니다.",
        body: "기획부터 디자인·제작·납품까지, Unbound의 크리에이티브 전문가들이 당신의 브랜드를 가장 강렬한 한 편의 영상으로 만들어드립니다.",
        buttonText: "프로젝트 문의하기",
        buttonHref: "/contact",
      },
      // 저장된 빌더 문서가 옛 문구를 덮어쓰므로, 텍스트는 코드에서 확정 적용.
      render: ({ buttonText, buttonHref }) => (
        <CTASection
          headlineLine1="경계 없는 상상을,"
          headlineLine2="영상으로 완성합니다."
          body="기획부터 디자인·제작·납품까지, Unbound의 크리에이티브 전문가들이 당신의 브랜드를 가장 강렬한 한 편의 영상으로 만들어드립니다."
          buttonText={buttonText ?? "프로젝트 문의하기"}
          buttonHref={buttonHref ?? "/contact"}
        />
      ),
    },
  },
};

