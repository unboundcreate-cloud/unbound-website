// 관리자(/admin)에서 편집하는 사이트 설정 스키마 + 기본값.
// 저장소(Redis)에 저장된 값이 있으면 기본값 위에 덮어써짐(deep merge).

export type Align = "left" | "center" | "right";

export interface HeroConfig {
  lines: string[]; // 헤드라인 줄 (추가/삭제 가능)
  taglineLine1: string;
  taglineLine2: string;
  buttonText: string;
  buttonHref: string;
}

export interface StatItem {
  useSymbol: boolean; // true면 숫자 대신 기호(display) 표시
  value: number;
  display: string; // 기호 (예: "∞")
  suffix: string; // 예: "+"
  label: string;
}

export type AboutBlock = "body" | "stats" | "learnMore";

export interface AboutConfig {
  headlineLine1: string;
  headlineLine2: string;
  body: string;
  bodyPosition: "right" | "below"; // 제목 옆(2열) / 제목 아래(쌓기)
  // 요소별 독립 정렬
  headlineAlign: Align;
  bodyAlign: Align;
  statsAlign: Align;
  learnMoreAlign: Align;
  // 블록 표시 순서(드래그로 변경)
  blockOrder: AboutBlock[];
  paddingTop: number; // px
  paddingBottom: number; // px
  bodyFontPx: number; // 본문 글자 크기(px)
  bodyLineHeight: number; // 본문 줄 간격(배수)
  statFontPx: number; // 통계 숫자 크기(px)
  stats: StatItem[]; // 통계 항목 (추가/삭제 가능)
  learnMoreText: string;
  showLearnMore: boolean;
}

export interface SiteConfig {
  home: {
    hero: HeroConfig;
    about: AboutConfig;
  };
}

export const DEFAULT_CONFIG: SiteConfig = {
  home: {
    hero: {
      lines: ["Move", "Without", "Limits"],
      taglineLine1: "최첨단 AI와 모션그래픽으로",
      taglineLine2: "영상 제작의 새로운 기준을 만듭니다.",
      buttonText: "View Works",
      buttonHref: "/works",
    },
    about: {
      headlineLine1: "Story in",
      headlineLine2: "every frame",
      body: "Unbound Studio는 모션그래픽, 브랜드필름, 광고영상 전문 포스트프로덕션 스튜디오입니다. 기획·디자인·제작·납품까지 원스톱으로 제공하며, 클라이언트의 메시지를 가장 강렬하게 전달하는 영상을 만듭니다.",
      bodyPosition: "right",
      headlineAlign: "left",
      bodyAlign: "right",
      statsAlign: "right",
      learnMoreAlign: "right",
      blockOrder: ["body", "stats", "learnMore"],
      paddingTop: 128,
      paddingBottom: 128,
      bodyFontPx: 20,
      bodyLineHeight: 1.65,
      statFontPx: 141,
      stats: [
        { useSymbol: false, value: 50, display: "", suffix: "+", label: "Projects Completed" },
        { useSymbol: false, value: 20, display: "", suffix: "+", label: "Brand Clients" },
        { useSymbol: true, value: 0, display: "∞", suffix: "", label: "Creative Possibility" },
      ],
      learnMoreText: "Learn More",
      showLearnMore: true,
    },
  },
};
