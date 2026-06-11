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
      "모든 프로젝트는 깊이 있는 분석에서 출발합니다. 브랜드의 목적과 타겟, 시장 환경을 면밀히 살펴 가장 효과적인 영상 전략을 수립합니다. 핵심 메시지를 중심으로 차별화된 스토리텔링과 비주얼 콘셉트, 구성안을 설계하고 레퍼런스로 방향성을 명확히 합니다. 탄탄한 기획은 이후 모든 제작 단계의 완성도를 결정합니다.",
    images: ["/works/seven-escape-2.png", "/works/kbs-24h-healthclub-opening.jpg"],
  },
  {
    number: "02",
    title: "Production",
    subtitle: "촬영 · 제작",
    slug: "production",
    description:
      "기획 의도를 실제 영상으로 옮기는 촬영·제작 전 과정을 책임집니다. 장비와 인력 구성부터 현장 디렉팅, 일정 관리까지 체계적인 프로덕션 운영으로 진행됩니다. 한 장면 한 장면 의도한 그림을 안정적으로 담아내며 현장 변수에도 유연하게 대응합니다. 규모와 형식에 구애받지 않고 어떤 콘셉트든 설득력 있는 화면으로 구현합니다.",
    images: ["/works/tvn-please-stop-drinking-opening.jpg", "/works/tvchosun-runforyou-opening.webp"],
  },
  {
    number: "03",
    title: "Editing",
    subtitle: "편집 · 종편",
    slug: "editing",
    description:
      "방대한 촬영 소스를 선별하고 리듬감 있게 재구성해 하나의 완성된 영상으로 만듭니다. 컷의 호흡과 전환, 자막, 사운드까지 세밀하게 조율해 메시지의 임팩트를 극대화합니다. 종합 편집(종편) 단계에서 그래픽과 효과, 음향을 통합해 최종 톤을 완성합니다. 끝까지 시선을 붙드는 흐름으로 영상의 몰입감을 끌어올립니다.",
    images: ["/works/trigger.jpg", "/works/good-detective-2.jpg"],
  },
  {
    number: "04",
    title: "VFX",
    subtitle: "2D · Motion Graphic 등",
    slug: "vfx",
    description:
      "2D 합성과 모션그래픽부터 고난도 시각효과까지 폭넓은 VFX를 구현합니다. 실사 푸티지에 그래픽 요소를 자연스럽게 결합하고, 불필요한 요소를 제거하거나 새로운 장면을 더합니다. 실사와 그래픽의 경계를 넘나드는 정교한 작업으로 장면에 생동감과 깊이를 부여합니다. 상상 속 이미지도 설득력 있는 비주얼로 현실화합니다.",
    images: ["/works/netflix-cyberhell-motiongraphics.jpg", "/works/chunhwa-romance.jpg"],
  },
  {
    number: "05",
    title: "Color Grading",
    subtitle: "색보정",
    slug: "color-grading",
    description:
      "전문 컬러 그레이딩으로 장면마다의 분위기와 감정을 정교하게 조율합니다. 노출과 화이트밸런스를 정리하는 1차 보정부터 작품의 무드를 결정하는 크리에이티브 그레이딩까지 단계적으로 진행합니다. 톤과 명암, 색의 미세한 차이까지 다듬어 영상 전반에 일관된 룩을 부여합니다. 색은 영상의 완성도와 깊이를 좌우하는 마지막 디테일입니다.",
    images: ["/works/night-blooming-flower.jpg", "/works/mbc-she-killed-teaser.jpg"],
  },
  {
    number: "06",
    title: "AI Production",
    subtitle: "AI 제작",
    slug: "ai-production",
    description:
      "최신 AI 기술을 제작 전 과정에 접목해 빠른 속도와 새로운 표현을 동시에 실현합니다. AI 기반 이미지·영상 생성과 자동화된 워크플로우로 기존 방식의 한계를 넘어섭니다. 시간과 비용은 줄이면서도 사람의 창의적 디렉션을 더해 완성도를 지킵니다. AI의 효율성과 크리에이티브를 결합한 차세대 영상 솔루션을 제공합니다.",
    images: ["/works/channela-aizit-opening.jpg", "/works/kiss-sixth-sense.webp"],
  },
  {
    number: "07",
    title: "QC & Publish",
    subtitle: "납품",
    slug: "delivery",
    description:
      "최종 품질 검수(QC)로 색·사운드·자막·싱크의 오류를 꼼꼼히 점검합니다. 방송·디지털·SNS 등 채널별 규격과 코덱에 맞춰 포맷을 최적화해 안정적으로 납품합니다. 필요에 따라 다양한 해상도·비율·길이의 버전으로 변환해 콘텐츠 활용도를 높입니다. 마지막 순간까지 완성도를 책임지고 전달합니다.",
    images: ["/works/hellolife-flower-smile-opening.jpg", "/works/mildangbaek.png"],
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
