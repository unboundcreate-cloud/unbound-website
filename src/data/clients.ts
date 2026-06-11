// 회사소개서(v6.2) 기준 — Unbound Studio 주요 클라이언트
// logo: public 경로(예: "/clients/kbs.svg"). 비우면 이름 텍스트로 표시됨.
export interface Client {
  name: string;
  logo?: string;
  imgClass?: string; // 개별 로고 크기 조정용(없으면 기본 크기)
}

export const clients: Client[] = [
  { name: "KBS", logo: "/clients/kbs.png" },
  { name: "MBC", logo: "/clients/mbc-v2.png" },
  {
    name: "SBS",
    logo: "/clients/sbs.png",
    imgClass: "max-h-[32px] max-w-full md:max-h-[49px]",
  },
  {
    name: "TV조선",
    logo: "/clients/tvchosun-v3.png",
    imgClass: "max-h-[63px] max-w-full md:max-h-[98px]",
  },
  {
    name: "tvN",
    logo: "/clients/tvn.png",
    imgClass: "max-h-[32px] max-w-full md:max-h-[49px]",
  },
  { name: "채널A", logo: "/clients/channela.png" },
  {
    name: "Disney+",
    logo: "/clients/disney-plus.png",
    imgClass: "max-h-[59px] max-w-full md:max-h-[91px]",
  },
  {
    name: "Netflix",
    logo: "/clients/netflix.png",
    imgClass: "max-h-[59px] max-w-full md:max-h-[91px]",
  },
  {
    name: "SK Signet",
    logo: "/clients/sk-signet.png",
    imgClass: "max-h-[59px] max-w-full md:max-h-[91px]",
  },
  {
    name: "KT Enterprise",
    logo: "/clients/kt-enterprise.png",
    imgClass: "max-h-[59px] max-w-full md:max-h-[91px]",
  },
  {
    name: "한국지역난방공사",
    logo: "/clients/kdhc-v2.png",
    imgClass: "max-h-[59px] max-w-full md:max-h-[91px]",
  },
  {
    name: "Macrogen",
    logo: "/clients/macrogen.png",
    imgClass: "max-h-[59px] max-w-full md:max-h-[91px]",
  },
  { name: "Kärcher", logo: "/clients/karcher.png" },
  { name: "CONVERSE", logo: "/clients/converse.png" },
  { name: "Dassault Systèmes", logo: "/clients/dassault.png" },
  {
    name: "dsm-firmenich",
    logo: "/clients/dsm-firmenich.png",
    imgClass: "max-h-[96px] max-w-full md:max-h-[150px]",
  },
  { name: "한화 라이프플러스", logo: "/clients/lifeplus.png" },
  { name: "Dr.Jart+", logo: "/clients/drjart.png" },
  { name: "XERF", logo: "/clients/xerf.png" },
  { name: "봉명동네커피", logo: "/clients/bongmyeong.png" },
];

export interface Stat {
  value: number | null; // null = 무한대(∞)
  display?: string; // 숫자 대신 표시할 기호 (예: "∞")
  suffix: string;
  label: string;
  accent?: boolean; // 강조 컬러 적용 여부
}

// 핵심 지표
export const stats: Stat[] = [
  { value: 50, suffix: "+", label: "Projects Completed", accent: true },
  { value: 20, suffix: "+", label: "Brand Clients" },
  { value: null, display: "∞", suffix: "", label: "Creative Possibility" },
];

export const studio = {
  name: "UNBOUND STUDIO",
  shortName: "Unbound Studio",
  email: "create@unboundstudio.co.kr",
  site: "unboundstudio.co.kr",
  positioning: "Motion Graphics & Post-Production",
  tagline: [
    "최첨단 AI와 모션그래픽으로",
    "영상 제작의 새로운 기준을 만듭니다.",
  ],
  // 회사소개서 About us
  about:
    "Unbound Studio는 모션그래픽, 브랜드필름, 광고영상 전문 포스트프로덕션 스튜디오입니다. 기획·디자인·제작·납품까지 원스톱으로 제공하며, 클라이언트의 메시지를 가장 강렬하게 전달하는 영상을 만듭니다.",
  // Service 소개 (page 3)
  serviceIntro:
    "최첨단 AI 기술부터 감각적인 디자인까지, 영상 제작의 새로운 기준을 제시합니다. 단순한 영상 제작을 넘어 AI의 효율성과 트렌디한 디자인을 결합하여, 고객의 비즈니스에 최적화된 영상 경험을 설계합니다.",
  // Conclusion (page 26)
  conclusion: {
    headline: ["우리는 멈추지 않는", "도전으로 트렌드를 만듭니다."],
    body: "크리에이티브한 전문가들이 함께하는 Unbound에서 당신의 이야기를 완벽하게 완성하세요.",
  },
  social: {
    youtube: "https://www.youtube.com/@createunbound",
    instagram: "https://www.instagram.com/",
  },
};
