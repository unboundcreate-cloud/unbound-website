export interface Service {
  number: string;
  title: string; // 영문 제목
  subtitle?: string; // 한글 보조표기
  slug: string;
  description: string;
  images?: string[]; // showcase 레이아웃용 이미지 (항목당 2장 세로 배치)
}

// Unbound Studio 제공 서비스 — 영상 분야별 6종
// 이미지는 실제 작업 스틸(works 썸네일)을 대표 비주얼로 사용. 추후 전용 이미지로 교체 가능.
export const services: Service[] = [
  {
    number: "01",
    title: "AI Content",
    subtitle: "AI 콘텐츠",
    slug: "ai-content",
    description:
      "Kling, Midjourney, Runway 등 최신 AI 도구로 기존 제작 방식의 한계를 넘습니다.\nAI 기반 이미지·영상 생성과 자동화 워크플로우로 제작 속도를 높이면서도 완성도는 그대로 유지합니다.\n기술과 크리에이티브의 균형으로 차별화된 비주얼과 새로운 표현을 제안합니다.",
    images: ["/works/channela-aizit-opening.jpg", "/works/kiss-sixth-sense.webp"],
  },
  {
    number: "02",
    title: "Broadcast & Drama",
    subtitle: "방송예능 · 드라마",
    slug: "broadcast-drama",
    description:
      "예능·드라마의 오프닝 타이틀과 OAP, 모션그래픽을 전문으로 제작합니다.\n프로그램의 정체성과 무드를 한눈에 각인시키는 타이틀 시퀀스로 시청자의 첫인상을 사로잡습니다.\nKBS, TvN, TV조선, 채널A 등 주요 방송사와 함께한 검증된 퀄리티를 제공합니다.",
    images: ["/works/tvn-please-stop-drinking-opening.jpg", "/works/good-detective-2.jpg"],
  },
  {
    number: "03",
    title: "Public & Institutional",
    subtitle: "공공 · 기관 영상",
    slug: "public-institutional",
    description:
      "공공기관·기업의 메시지를 신뢰감 있게 전달하는 영상을 제작합니다.\n채용·홍보·교육·캠페인 등 목적에 맞춰 정보를 명확하게 구조화하고, 보는 사람이 끝까지 따라오도록 설계합니다.\n딱딱해지기 쉬운 주제도 세련된 비주얼과 리듬으로 풀어냅니다.",
    images: ["/works/kbs-24h-healthclub-opening.jpg", "/works/night-blooming-flower.jpg"],
  },
  {
    number: "04",
    title: "Advertising & PR",
    subtitle: "광고 · 홍보",
    slug: "advertising-pr",
    description:
      "브랜드의 가치를 가장 강렬하게 전달하는 광고·홍보 영상을 만듭니다.\n타깃과 채널에 맞춰 메시지를 설계하고, 짧은 시간 안에 시선을 멈추게 하는 후킹과 완성도를 동시에 잡습니다.\nTVCF부터 디지털 캠페인, SNS 숏폼까지 폭넓게 대응합니다.",
    images: ["/works/tvchosun-runforyou-opening.webp", "/works/hellolife-flower-smile-opening.jpg"],
  },
  {
    number: "05",
    title: "B2B Film",
    subtitle: "B2B 영상",
    slug: "b2b-film",
    description:
      "복잡한 기술과 솔루션을 누구나 이해할 수 있게 풀어내는 B2B 영상을 제작합니다.\n제품·서비스의 핵심 가치를 명료하게 시각화하여 의사결정자를 설득하는 영상으로 완성합니다.\nSK Signet, Corning 등 국내외 기업과 협업한 경험을 바탕으로 합니다.",
    images: ["/works/trigger.jpg", "/works/seven-escape-2.png"],
  },
  {
    number: "06",
    title: "Motion Graphic",
    subtitle: "모션그래픽",
    slug: "motion-graphic",
    description:
      "2D 모션그래픽과 시각효과로 영상의 표현력을 한 단계 끌어올립니다.\n복잡한 정보를 직관적인 움직임으로 바꾸고, 브랜드 메시지에 생동감을 입혀 몰입도를 높입니다.\n타이틀, 인포그래픽, 애니메이션까지 모션의 모든 영역을 다룹니다.",
    images: ["/works/netflix-cyberhell-motiongraphics.jpg", "/works/chunhwa-romance.jpg"],
  },
];

// 홈 'What We Do' 미리보기용 — 원래 핵심 서비스 4종 (/services 페이지와 별개)
export const homeServices: Service[] = [
  {
    number: "01",
    title: "AI Video Solution",
    slug: "ai",
    description: "최신 AI 기술을 활용하여 효율적이고 창의적인 영상 솔루션을 제공합니다.",
  },
  {
    number: "02",
    title: "OAP Design",
    slug: "oap",
    description: "방송의 아이덴티티를 강화하는 감각적인 OAP 디자인을 제공합니다.",
  },
  {
    number: "03",
    title: "Motion Graphic",
    slug: "motion",
    description: "브랜드 메시지에 모션그래픽을 입혀 독보적인 시각 효과를 제공합니다.",
  },
  {
    number: "04",
    title: "Video Branding",
    slug: "branding",
    description: "비즈니스 파트너의 가치를 높이는 맞춤형 영상 브랜딩 서비스를 제공합니다.",
  },
];
