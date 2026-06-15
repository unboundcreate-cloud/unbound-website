export interface Service {
  number: string;
  title: string; // 영문 제목
  subtitle?: string; // 한글 보조표기
  slug: string;
  description: string;
  images?: string[]; // showcase 레이아웃용 이미지 (항목당 2장 세로 배치)
}

// Unbound Studio 제공 서비스 — 영상 제작 전 과정
// 이미지는 실제 작업 스틸(works 썸네일)을 대표 비주얼로 사용. 추후 전용 이미지로 교체 가능.
export const services: Service[] = [
  {
    number: "01",
    title: "Planning",
    subtitle: "기획",
    slug: "planning",
    description:
      "모든 프로젝트는 깊이 있는 이해에서 시작됩니다.\n브랜드의 목표와 타깃, 시장 환경을 분석하여 가장 효과적인 영상 전략을 설계합니다.\n핵심 메시지를 중심으로 스토리와 비주얼 콘셉트를 구체화하고, 명확한 레퍼런스를 통해 프로젝트의 방향성을 정립합니다.\n탄탄한 기획은 완성도 높은 결과물을 만드는 가장 중요한 출발점입니다.",
    images: ["/works/seven-escape-2.png", "/works/kbs-24h-healthclub-opening.jpg"],
  },
  {
    number: "02",
    title: "Production",
    subtitle: "촬영 · 제작",
    slug: "production",
    description:
      "기획된 아이디어를 실제 영상으로 구현하는 단계입니다.\n촬영 장비와 인력 구성부터 현장 운영, 일정 관리까지 체계적으로 진행하며 프로젝트의 완성도를 높입니다.\n장면 하나하나의 의도를 정확하게 담아내고, 현장의 다양한 변수에도 유연하게 대응하여 최적의 결과물을 만들어냅니다.",
    images: ["/works/tvn-please-stop-drinking-opening.jpg", "/works/tvchosun-runforyou-opening.webp"],
  },
  {
    number: "03",
    title: "VFX / Motion Graphic",
    subtitle: "2D · 모션그래픽",
    slug: "vfx",
    description:
      "2D 합성과 모션그래픽, 시각효과를 통해 영상의 표현력을 확장합니다.\n그래픽 요소를 자연스럽게 결합하고 필요한 장면을 새롭게 구현하여 더욱 몰입감 있는 화면을 완성합니다.\n실사와 그래픽의 경계를 넘나드는 정교한 작업으로 브랜드의 메시지를 더욱 강렬하게 전달합니다.",
    images: ["/works/netflix-cyberhell-motiongraphics.jpg", "/works/chunhwa-romance.jpg"],
  },
  {
    number: "04",
    title: "Color Grading",
    subtitle: "색보정",
    slug: "color-grading",
    description:
      "색은 영상의 분위기와 감정을 결정하는 중요한 요소입니다.\n기본적인 색 균형과 노출 보정부터 작품의 무드를 완성하는 크리에이티브 그레이딩까지 세밀하게 작업합니다.\n톤과 명암, 색감의 디테일까지 정교하게 조율하여 영상 전체에 일관된 퀄리티와 깊이를 더합니다.",
    images: ["/works/night-blooming-flower.jpg", "/works/mbc-she-killed-teaser.jpg"],
  },
  {
    number: "05",
    title: "Editing",
    subtitle: "편집 · 종합편집",
    slug: "editing",
    description:
      "촬영된 소스를 선별하고 재구성하여 하나의 완성된 스토리로 만들어냅니다.\n컷의 흐름과 템포, 자막, 그래픽, 사운드를 세밀하게 조율하여 메시지의 전달력을 극대화합니다.\n종합편집 단계에서는 모든 요소를 유기적으로 연결해 완성도 높은 결과물을 제공합니다.",
    images: ["/works/trigger.jpg", "/works/good-detective-2.jpg"],
  },
  {
    number: "06",
    title: "AI Production",
    subtitle: "AI 제작",
    slug: "ai-production",
    description:
      "최신 AI 기술을 활용하여 새로운 제작 방식과 창의적인 비주얼을 제안합니다.\nAI 기반 이미지 및 영상 생성, 자동화 워크플로우를 통해 제작 효율을 높이면서도 높은 완성도를 유지합니다.\n기술과 크리에이티브의 균형을 바탕으로 보다 빠르고 혁신적인 영상 솔루션을 제공합니다.",
    images: ["/works/channela-aizit-opening.jpg", "/works/kiss-sixth-sense.webp"],
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
