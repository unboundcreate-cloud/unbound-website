export interface ProcessStep {
  number: string;
  title: string;
  korTitle: string;
  description: string;
}

// 회사소개서(v6.2) Production Process 기준 — 5단계
export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Plan",
    korTitle: "기획",
    description:
      "목적과 타겟을 심도 있게 분석하여 가장 효과적인 영상 전략을 수립합니다. 예술적 감각이 결합된 독창적인 스토리텔링과 비주얼 콘셉트를 설계합니다.",
  },
  {
    number: "02",
    title: "StoryBoard",
    korTitle: "스토리보드",
    description:
      "확정된 시나리오를 바탕으로\n씬별 구성, 카메라 워킹, 아트 디렉션을 상세히 설계하여\n제작의 완성도를 극대화합니다.",
  },
  {
    number: "03",
    title: "Design",
    korTitle: "디자인",
    description:
      "디자인 시안을 바탕으로 고퀄리티 그래픽을 제작합니다. 제작 과정에서 클라이언트의 피드백을 유연하게 반영하여 최상의 시각적 결과물을 도출합니다.",
  },
  {
    number: "04",
    title: "Motion",
    korTitle: "모션",
    description:
      "최신 AI 기술과 모션그래픽 기술로 디자인 에셋에 생명력을 불어넣습니다. 섬세한 이펙트와 정교한 종합 편집으로 시선을 사로잡는 결과물을 완성합니다.",
  },
  {
    number: "05",
    title: "Delivery",
    korTitle: "납품",
    description:
      "최종 검수와 최적화를 거쳐 비즈니스 목적에 부합하는 완성된 영상 파일을 제공합니다. 필요 시 다양한 포맷으로 변환하여 납품합니다.",
  },
];
