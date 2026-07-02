export type WorkCategory = "drama" | "promo" | "b2b" | "ai" | "public";

export interface Work {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: WorkCategory;
  categoryLabel: string;
  year: string;
  duration: string; // 영상 길이
  period: string; // 제작 기간
  role: string; // 담당
  thumbnailUrl: string;
  videoUrl: string; // YouTube / Instagram 링크
  embedUrl?: string; // iframe 임베드용
  description: string;
  tags: string[];
  featured: boolean;
  size?: "large" | "medium" | "small";
}

// YouTube 썸네일/임베드 헬퍼
const yt = (id: string) => ({
  thumbnailUrl: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
  videoUrl: `https://youtu.be/${id}`,
  embedUrl: `https://www.youtube.com/embed/${id}`,
});

// 코드에서 추가하는 신규 작품 — getWorks()가 KV 목록 뒤에 병합(관리자 목록은 보존).
// 썸네일은 로컬 webp(public/works/), 영상/임베드는 yt() 헬퍼.
export const extraWorks: Work[] = [
  { id: "yt-macrogen-ai-myeonghwa", slug: "macrogen-ai-myeonghwa-content", title: "마크로젠 'AI 명화 콘텐츠'", client: "마크로젠 (Macrogen)", category: "ai", categoryLabel: "AI", year: "2026", duration: "", period: "", role: "기획 / 제작", ...yt("C-GtTwa2yvM"), thumbnailUrl: "/works/macrogen-ai-myeonghwa.webp", description: "AI로 재해석한 명화로 브랜드의 메시지를 전한 콘텐츠. 예술적 감성과 AI 기술을 결합했습니다.", tags: ["AI", "브랜드 콘텐츠"], featured: false, size: "medium" },
  { id: "yt-coding-ai-news-ep02", slug: "coding-ai-news-ep02", title: "'코딩 AI 뉴스' ep.02", client: "코딩", category: "ai", categoryLabel: "AI", year: "2026", duration: "", period: "", role: "기획 / 제작", ...yt("lt-6FvhoVFQ"), thumbnailUrl: "/works/coding-ai-news-ep02.webp", description: "AI 기반으로 제작한 뉴스형 콘텐츠 시리즈. 정보 전달과 AI 비주얼을 결합했습니다.", tags: ["AI", "뉴스 콘텐츠"], featured: false, size: "medium" },
  { id: "yt-kt-enterprise-quantum", slug: "kt-enterprise-quantum", title: "KT Enterprise '양자암호통신'", client: "KT Enterprise", category: "b2b", categoryLabel: "B2B", year: "2026", duration: "", period: "", role: "기획 / 제작", ...yt("BFzKHeMhY_0"), thumbnailUrl: "/works/kt-quantum-network.webp", description: "복잡한 양자암호통신 기술을 그래픽과 모션으로 명료하게 풀어낸 B2B 영상.", tags: ["B2B", "양자암호통신"], featured: false, size: "medium" },
  { id: "yt-kdhc-recruitment", slug: "kdhc-recruitment-video", title: "한국지역난방공사 채용 영상", client: "한국지역난방공사", category: "public", categoryLabel: "공공·기관", year: "2026", duration: "", period: "", role: "기획 / 제작", ...yt("1uWsTdBU4Ac"), thumbnailUrl: "/works/kdhc-recruitment-video.webp", description: "브랜드 캐릭터를 중심으로 채용 정보를 따뜻하게 전달한 공공기관 영상.", tags: ["공공", "채용영상"], featured: false, size: "medium" },
  { id: "yt-small-business-audition", slug: "small-business-audition", title: "소상공인 통합오디션", client: "소상공인", category: "public", categoryLabel: "공공·기관", year: "2026", duration: "", period: "", role: "기획 / 제작", ...yt("QL5Ll85d61c"), thumbnailUrl: "/works/small-business-audition.webp", description: "소상공인 지원 프로그램을 알리는 공공 캠페인 영상.", tags: ["공공", "캠페인"], featured: false, size: "medium" },
  { id: "yt-snk-forum-opening", slug: "snk-2026-forum-opening", title: "SNK 2026 포럼 오프닝", client: "SNK", category: "b2b", categoryLabel: "B2B", year: "2026", duration: "", period: "", role: "기획 / 제작", ...yt("-aru0YhlzOo"), thumbnailUrl: "/works/snk-2026-forum-opening.webp", description: "기업 포럼의 무드를 각인시키는 오프닝 타이틀.", tags: ["B2B", "포럼", "오프닝"], featured: false, size: "medium" },
  { id: "yt-katcher-interview-ep03", slug: "katcher-interview-ep03", title: "카쳐 인터뷰 ep.03", client: "카쳐", category: "b2b", categoryLabel: "B2B", year: "2026", duration: "", period: "", role: "기획 / 제작", ...yt("l_KMQowsjHU"), thumbnailUrl: "/works/katcher-interview-ep03.webp", description: "브랜드의 이야기를 인터뷰 형식으로 담은 B2B 콘텐츠 시리즈.", tags: ["B2B", "인터뷰"], featured: false, size: "medium" },
  { id: "yt-nunshullang-guide", slug: "nunshullang-guide", title: "눈슐랭 가이드", client: "Unbound Studio", category: "promo", categoryLabel: "광고·홍보", year: "2024", duration: "", period: "", role: "기획 / 제작", ...yt("J9K2Senatw8"), thumbnailUrl: "/works/nunshullang-guide.webp", description: "위트 있는 콘셉트로 시선을 사로잡는 홍보 콘텐츠.", tags: ["광고", "콘텐츠"], featured: false, size: "medium" },
  { id: "yt-koroad-alcohol-lock", slug: "koroad-alcohol-lock", title: "한국도로교통공단 '음주운전 방지장치'", client: "한국도로교통공단", category: "public", categoryLabel: "공공·기관", year: "2025", duration: "", period: "", role: "기획 / 제작", ...yt("wxe3NqfdfJQ"), thumbnailUrl: "/works/koroad-alcohol-lock.webp", description: "교통안전 메시지를 명료한 모션그래픽으로 전달한 공공 영상.", tags: ["공공", "교통안전"], featured: false, size: "medium" },
  { id: "yt-rmtech-promo", slug: "rmtech-promo", title: "RM테크 홍보영상", client: "RM테크", category: "b2b", categoryLabel: "B2B", year: "2026", duration: "", period: "", role: "기획 / 제작", ...yt("Z32OyvYzujM"), thumbnailUrl: "/works/rmtech-promo.webp", description: "기업의 기술과 비전을 인포그래픽으로 풀어낸 B2B 홍보영상.", tags: ["B2B", "홍보", "인포그래픽"], featured: false, size: "medium" },
  { id: "yt-police-remember-112", slug: "police-remember-112", title: "경찰청 '기억해요 112'", client: "경찰청", category: "public", categoryLabel: "공공·기관", year: "2022", duration: "", period: "", role: "기획 / 제작", ...yt("z6gvNHuHoIU"), thumbnailUrl: "/works/police-remember-112.webp", description: "112 신고를 알리는 공공기관 캠페인 영상.", tags: ["공공", "캠페인"], featured: false, size: "medium" },
  { id: "yt-runforyou-opening", slug: "runforyou-opening-title", title: "예능 '런포유' Opening Title", client: "TV조선", category: "drama", categoryLabel: "드라마 & 예능", year: "2024", duration: "", period: "", role: "기획 / 제작", ...yt("_LYRMtM27Hs"), thumbnailUrl: "/works/runforyou-opening-title.webp", description: "예능 프로그램의 색을 응축한 오프닝 타이틀 시퀀스.", tags: ["예능", "Opening Title"], featured: false, size: "medium" },
  { id: "yt-ds-job-posting-week", slug: "ds-job-posting-week", title: "DS 잡포스팅 위크", client: "삼성 DS", category: "b2b", categoryLabel: "B2B", year: "2022", duration: "", period: "", role: "기획 / 제작", ...yt("F6QVO4hcuNI"), thumbnailUrl: "/works/ds-job-posting-week.webp", description: "기업 채용 캠페인을 감각적으로 전달한 B2B 영상.", tags: ["B2B", "채용"], featured: false, size: "medium" },
  { id: "yt-aranta-promo", slug: "aranta-promo", title: "ARANTA 홍보영상", client: "ARANTA", category: "b2b", categoryLabel: "B2B", year: "2025", duration: "", period: "", role: "기획 / 제작", ...yt("odEGBSN3pZE"), thumbnailUrl: "/works/aranta-promo.webp", description: "보안 솔루션을 도형의 언어로 명료하게 전달한 B2B 홍보영상.", tags: ["B2B", "보안", "홍보"], featured: false, size: "medium" },
  { id: "yt-apt-shortform", slug: "apt-shortform", title: "APT 숏폼", client: "APT", category: "b2b", categoryLabel: "B2B", year: "2026", duration: "", period: "", role: "기획 / 제작", ...yt("He8zDuJpJVc"), thumbnailUrl: "/works/apt-shortform.webp", description: "핵심 메시지를 짧고 강하게 담은 숏폼 콘텐츠.", tags: ["B2B", "숏폼"], featured: false, size: "medium" },
  { id: "yt-katcher-shortform", slug: "katcher-shortform", title: "카쳐 '프로들의 이유 있는 선택'", client: "카쳐", category: "b2b", categoryLabel: "B2B", year: "2026", duration: "", period: "", role: "기획 / 제작", ...yt("okHNS4L0GSM"), thumbnailUrl: "/works/katcher-shortform.webp", description: "브랜드의 강점을 숏폼으로 압축해 전달한 B2B 콘텐츠.", tags: ["B2B", "숏폼"], featured: false, size: "medium" },
  { id: "yt-vividbrain", slug: "vividbrain", title: "Vividbrain", client: "Vividbrain", category: "b2b", categoryLabel: "B2B", year: "2025", duration: "", period: "", role: "기획 / 제작", ...yt("g6aNsLB6oZo"), thumbnailUrl: "/works/vividbrain.webp", description: "기업의 서비스 가치를 명료하게 시각화한 B2B 영상.", tags: ["B2B", "브랜드"], featured: false, size: "medium" },
  { id: "yt-samsung-sds", slug: "samsung-sds", title: "삼성SDS", client: "삼성SDS", category: "b2b", categoryLabel: "B2B", year: "2025", duration: "", period: "", role: "기획 / 제작", ...yt("ayroOAZVQH0"), thumbnailUrl: "/works/samsung-sds.webp", description: "IT 솔루션 기업의 메시지를 신뢰감 있게 전달한 B2B 영상.", tags: ["B2B", "IT"], featured: false, size: "medium" },
  { id: "yt-pyeongtaek-public", slug: "pyeongtaek-public-service", title: "평택시 공공서비스", client: "평택시", category: "public", categoryLabel: "공공·기관", year: "2022", duration: "", period: "", role: "기획 / 제작", ...yt("EOLDBINIMiI"), thumbnailUrl: "/works/pyeongtaek-public-service.webp", description: "지자체의 공공서비스를 알기 쉽게 안내한 공공 영상.", tags: ["공공", "지자체"], featured: false, size: "medium" },
  { id: "yt-samsung-wetalk", slug: "samsung-electronics-wetalk", title: "삼성전자 WeTalk", client: "삼성전자", category: "b2b", categoryLabel: "B2B", year: "2022", duration: "", period: "", role: "기획 / 제작", ...yt("xjUb8K2Iq64"), thumbnailUrl: "/works/samsung-electronics-wetalk.webp", description: "기업 내부 커뮤니케이션 캠페인을 담은 B2B 영상.", tags: ["B2B", "캠페인"], featured: false, size: "medium" },
  { id: "yt-samsung-ds-jobposting", slug: "samsung-ds-job-posting-week", title: "삼성 DS 잡포스팅 위크", client: "삼성 DS", category: "b2b", categoryLabel: "B2B", year: "2022", duration: "", period: "", role: "기획 / 제작", ...yt("PC7Gugc9azM"), thumbnailUrl: "/works/samsung-ds-job-posting-week.webp", description: "삼성 DS 채용 캠페인 영상.", tags: ["B2B", "채용"], featured: false, size: "medium" },
  { id: "yt-jinsnap-instore", slug: "jinsnap-instore", title: "진스냅 인스토어", client: "진스냅", category: "promo", categoryLabel: "광고·홍보", year: "2022", duration: "", period: "", role: "기획 / 제작", ...yt("EtN40i77sQs"), thumbnailUrl: "/works/jinsnap-instore.webp", description: "브랜드의 인스토어 경험을 감각적으로 담은 홍보 영상.", tags: ["광고", "브랜드"], featured: false, size: "medium" },
  { id: "yt-hanwha-lifeplus", slug: "hanwha-lifeplus-newyork", title: "한화 라이프플러스 뉴욕 아티스트 초청행사", client: "한화 라이프플러스", category: "promo", categoryLabel: "광고·홍보", year: "2024", duration: "", period: "", role: "기획 / 제작", ...yt("tiuzEH4c1xE"), thumbnailUrl: "/works/hanwha-lifeplus-newyork.webp", description: "브랜드 초청행사의 무드를 담은 홍보 숏폼.", tags: ["광고", "행사"], featured: false, size: "medium" },
];

// 회사소개서(v6.2) Portfolio 페이지 기준 — 실제 프로젝트
export const works: Work[] = [
  {
    id: "1",
    slug: "channela-aizit-opening",
    title: "예능 'Ai지트' Opening Title",
    client: "채널A",
    category: "ai",
    categoryLabel: "AI",
    year: "2025",
    duration: "15s",
    period: "1주",
    role: "기획 / 제작",
    ...yt("Slzjq1nUrn0"),
    thumbnailUrl: "/works/channela-aizit-opening.jpg",
    description:
      "채널A 예능 'Ai지트'의 오프닝 타이틀. 프로그램의 색을 응축한 감각적인 모션그래픽으로 시청자의 시선을 사로잡습니다.",
    tags: ["예능", "Opening Title", "모션그래픽"],
    featured: true,
    size: "large",
  },
  {
    id: "2",
    slug: "macrogen-myeonghwa-ai",
    title: "명화 Ai편 '들판에서 찾은 작은 순간들'",
    client: "마크로젠 (Macrogen)",
    category: "ai",
    categoryLabel: "AI",
    year: "2025",
    duration: "30s",
    period: "1주 미만",
    role: "기획 / 제작",
    ...yt("9HYl-iimCgA"),
    description:
      "AI로 재해석한 명화를 통해 브랜드의 따뜻한 메시지를 전달한 홍보 영상. 예술적 감성과 AI 기술을 결합했습니다.",
    tags: ["AI", "광고", "브랜드필름"],
    featured: true,
    size: "medium",
  },
  {
    id: "3",
    slug: "hellolife-flower-smile-opening",
    title: "예능 '꽃보다 미소' Opening Title",
    client: "헬로라이프",
    category: "drama",
    categoryLabel: "드라마 & 예능",
    year: "2025",
    duration: "30s",
    period: "2주",
    role: "기획 / 제작",
    ...yt("R1rn1MbcLtU"),
    thumbnailUrl: "/works/hellolife-flower-smile-opening.jpg",
    description:
      "따뜻한 분위기의 예능 오프닝 타이틀. 밝고 경쾌한 모션으로 프로그램의 정체성을 시각화했습니다.",
    tags: ["예능", "Opening Title"],
    featured: true,
    size: "small",
  },
  {
    id: "4",
    slug: "kdhc-recruit-2026",
    title: "한국지역난방공사 2026 신입사원 모집 Recruitment Video",
    client: "한국지역난방공사",
    category: "public",
    categoryLabel: "공공 / 기관",
    year: "2025",
    duration: "1m 30s",
    period: "2주",
    role: "기획 / 제작",
    ...yt("JpoxrfVeWzI"),
    description:
      "공기업의 신뢰감을 담아낸 채용 홍보 영상. 정보 전달과 브랜드 이미지를 균형 있게 설계했습니다.",
    tags: ["채용", "홍보", "인포그래픽"],
    featured: false,
  },
  {
    id: "5",
    slug: "sk-signet-400kw",
    title: "B2B '400kW Charge out' Promotion",
    client: "SK Signet",
    category: "b2b",
    categoryLabel: "B2B",
    year: "2025",
    duration: "30s",
    period: "1주 미만",
    role: "기획 / 제작",
    ...yt("_hQsaD5YoUk"),
    description:
      "초급속 충전 기술을 강조한 B2B 프로모션 숏폼. 제품의 핵심 가치를 빠르고 임팩트 있게 전달합니다.",
    tags: ["B2B", "숏폼", "제품"],
    featured: false,
  },
  {
    id: "6",
    slug: "kbs-24h-healthclub-opening",
    title: "드라마 '24시 헬스클럽' Opening Title",
    client: "KBS",
    category: "drama",
    categoryLabel: "드라마 & 예능",
    year: "2024",
    duration: "40s",
    period: "2달",
    role: "기획 / 제작",
    ...yt("y7Pqr0RDfL8"),
    thumbnailUrl: "/works/kbs-24h-healthclub-opening.jpg",
    description:
      "드라마의 분위기를 압축한 오프닝 타이틀 시퀀스. 타이포그래피와 모션으로 서사의 긴장감을 설계했습니다.",
    tags: ["드라마", "Opening Title"],
    featured: false,
  },
  {
    id: "7",
    slug: "tvn-please-stop-drinking-opening",
    title: "드라마 '금주를 부탁해' Opening Title",
    client: "TvN",
    category: "drama",
    categoryLabel: "드라마 & 예능",
    year: "2024",
    duration: "30s",
    period: "3달 미만",
    role: "기획 / 제작",
    ...yt("CUT9S5T4hoI"),
    thumbnailUrl: "/works/tvn-please-stop-drinking-opening.jpg",
    description:
      "드라마의 톤을 담은 오프닝 타이틀. 감각적인 비주얼과 모션으로 작품의 인상을 각인시킵니다.",
    tags: ["드라마", "Opening Title"],
    featured: false,
  },
  {
    id: "8",
    slug: "netflix-cyberhell-motiongraphics",
    title: "다큐 '사이버지옥' MotionGraphics Animation",
    client: "Netflix",
    category: "drama",
    categoryLabel: "드라마 & 예능",
    year: "2024",
    duration: "30s",
    period: "1주일 미만",
    role: "제작, 리깅",
    ...yt("fZ80ar7w4lY"),
    thumbnailUrl: "/works/netflix-cyberhell-motiongraphics.jpg",
    description:
      "Netflix 다큐멘터리에 삽입된 모션그래픽 애니메이션. 리깅 기반의 정교한 모션으로 정보를 시각화했습니다.",
    tags: ["다큐", "애니메이션", "리깅"],
    featured: false,
  },
  {
    id: "9",
    slug: "tvchosun-runforyou-opening",
    title: "예능 '런포유' Opening Title",
    client: "TV조선",
    category: "drama",
    categoryLabel: "드라마 & 예능",
    year: "2024",
    duration: "20s",
    period: "2주",
    role: "기획 / 제작",
    ...yt("_LYRMtM27Hs"),
    thumbnailUrl: "/works/tvchosun-runforyou-opening.webp",
    description:
      "역동적인 예능 오프닝 타이틀. 빠른 템포의 모션으로 프로그램의 에너지를 전달합니다.",
    tags: ["예능", "Opening Title"],
    featured: false,
  },
  {
    id: "10",
    slug: "mbc-she-killed-teaser",
    title: "다큐 '그녀가 죽였다' Teaser",
    client: "MBC",
    category: "drama",
    categoryLabel: "드라마 & 예능",
    year: "2024",
    duration: "20s",
    period: "1주일 미만",
    role: "기획 / 제작",
    ...yt("bViv-StvaeY"),
    thumbnailUrl: "/works/mbc-she-killed-teaser.jpg",
    description:
      "미스터리 다큐멘터리의 티저. 긴장감 있는 편집과 모션으로 몰입감을 극대화했습니다.",
    tags: ["다큐", "Teaser"],
    featured: false,
  },
  {
    id: "11",
    slug: "bongmyeong-coffee-couple",
    title: "광고 '봉명동네커피' 커플편",
    client: "봉명동네커피",
    category: "promo",
    categoryLabel: "광고 & 홍보",
    year: "2024",
    duration: "30s",
    period: "2주",
    role: "기획 / 제작",
    ...yt("rb4wx2q7DEo"),
    description:
      "로컬 카페 브랜드의 감성을 담은 광고. 일상의 따뜻한 순간을 영상으로 풀어냈습니다.",
    tags: ["광고", "브랜드"],
    featured: false,
  },
  {
    id: "13",
    slug: "hanwha-lifeplus-nyc",
    title: "숏폼 한화 라이프플러스 뉴욕 'Artist Invitation Event'",
    client: "한화 라이프플러스",
    category: "promo",
    categoryLabel: "광고 & 홍보",
    year: "2024",
    duration: "30s",
    period: "1주",
    role: "기획 / 제작",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=800&fit=crop&q=80",
    videoUrl: "https://www.instagram.com/p/DA2YG84q1hh/",
    description:
      "뉴욕에서 진행된 한화 라이프플러스 아티스트 초청 이벤트 숏폼. 현장의 감각을 생동감 있게 담았습니다.",
    tags: ["숏폼", "이벤트", "B2C"],
    featured: false,
  },
  // ===== 신규 추가(초안) — client/year/videoUrl 정보 입력 필요 =====
  {
    id: "14",
    slug: "seven-escape-2",
    title: "드라마 '7인의 탈출 2'",
    client: "SBS",
    category: "drama",
    categoryLabel: "드라마 & 예능",
    year: "",
    duration: "",
    period: "",
    role: "기획 / 제작",
    thumbnailUrl: "/works/seven-escape-2.png",
    videoUrl: "https://youtu.be/YSlaJG3eUOk",
    embedUrl: "https://www.youtube.com/embed/YSlaJG3eUOk",
    description: "Unbound Studio가 참여한 '7인의 탈출 2' 영상 프로젝트입니다.",
    tags: ["드라마"],
    featured: false,
  },
  {
    id: "15",
    slug: "kiss-sixth-sense",
    title: "드라마 '키스 식스 센스'",
    client: "디즈니+",
    category: "drama",
    categoryLabel: "드라마 & 예능",
    year: "",
    duration: "",
    period: "",
    role: "기획 / 제작",
    thumbnailUrl: "/works/kiss-sixth-sense.webp",
    videoUrl: "https://youtu.be/EmAxlcXw_M0",
    embedUrl: "https://www.youtube.com/embed/EmAxlcXw_M0",
    description: "Unbound Studio가 참여한 '키스 식스 센스' 영상 프로젝트입니다.",
    tags: ["드라마"],
    featured: false,
  },
  {
    id: "16",
    slug: "trigger",
    title: "드라마 '트리거'",
    client: "디즈니+",
    category: "drama",
    categoryLabel: "드라마 & 예능",
    year: "",
    duration: "",
    period: "",
    role: "기획 / 제작",
    thumbnailUrl: "/works/trigger.jpg",
    videoUrl: "https://youtu.be/TMvCDyl1upc",
    embedUrl: "https://www.youtube.com/embed/TMvCDyl1upc",
    description: "Unbound Studio가 참여한 '트리거' 영상 프로젝트입니다.",
    tags: ["드라마"],
    featured: false,
  },
  {
    id: "18",
    slug: "chunhwa-romance",
    title: "드라마 '춘화연애담'",
    client: "티빙",
    category: "drama",
    categoryLabel: "드라마 & 예능",
    year: "",
    duration: "",
    period: "",
    role: "기획 / 제작",
    thumbnailUrl: "/works/chunhwa-romance.jpg",
    videoUrl: "https://youtu.be/kyYBelSkZFo",
    embedUrl: "https://www.youtube.com/embed/kyYBelSkZFo",
    description: "Unbound Studio가 참여한 '춘화연애담' 영상 프로젝트입니다.",
    tags: ["드라마"],
    featured: false,
  },
  {
    id: "19",
    slug: "good-detective-2",
    title: "드라마 '모범형사 2'",
    client: "JTBC",
    category: "drama",
    categoryLabel: "드라마 & 예능",
    year: "",
    duration: "",
    period: "",
    role: "기획 / 제작",
    thumbnailUrl: "/works/good-detective-2.jpg",
    videoUrl: "https://youtu.be/PtblCLm6B-0",
    embedUrl: "https://www.youtube.com/embed/PtblCLm6B-0",
    description: "Unbound Studio가 참여한 '모범형사 2' 영상 프로젝트입니다.",
    tags: ["드라마"],
    featured: false,
  },
  {
    id: "20",
    slug: "night-blooming-flower",
    title: "드라마 '밤에 피는 꽃'",
    client: "MBC",
    category: "drama",
    categoryLabel: "드라마 & 예능",
    year: "",
    duration: "",
    period: "",
    role: "기획 / 제작",
    thumbnailUrl: "/works/night-blooming-flower.jpg",
    videoUrl: "https://youtu.be/v7m0EV3SNDw",
    embedUrl: "https://www.youtube.com/embed/v7m0EV3SNDw",
    description: "Unbound Studio가 참여한 '밤에 피는 꽃' 영상 프로젝트입니다.",
    tags: ["드라마"],
    featured: false,
  },
  {
    id: "21",
    slug: "mildangbaek",
    title: "예능 '밀당백'",
    client: "국방홍보원",
    category: "public",
    categoryLabel: "공공 / 기관",
    year: "",
    duration: "",
    period: "",
    role: "기획 / 제작",
    thumbnailUrl: "/works/mildangbaek.png",
    videoUrl: "https://youtu.be/FGiocXqMy2Q",
    embedUrl: "https://www.youtube.com/embed/FGiocXqMy2Q",
    description: "Unbound Studio가 참여한 '밀당백' 예능 영상 프로젝트입니다.",
    tags: ["예능"],
    featured: false,
  },
  {
    id: "22",
    slug: "kingdom",
    title: "드라마 '킹덤'",
    client: "Netflix",
    category: "drama",
    categoryLabel: "드라마 & 예능",
    year: "",
    duration: "",
    period: "",
    role: "기획 / 제작",
    thumbnailUrl: "/works/kingdom.png",
    videoUrl: "",
    description: "Unbound Studio가 참여한 '킹덤' 영상 프로젝트입니다.",
    tags: ["드라마"],
    featured: false,
  },
  {
    id: "23",
    slug: "parasyte-the-grey",
    title: "드라마 '기생수: 더 그레이'",
    client: "Netflix",
    category: "drama",
    categoryLabel: "드라마 & 예능",
    year: "",
    duration: "",
    period: "",
    role: "기획 / 제작",
    thumbnailUrl: "/works/parasyte-the-grey.png",
    videoUrl: "",
    description: "Unbound Studio가 참여한 '기생수: 더 그레이' 영상 프로젝트입니다.",
    tags: ["드라마"],
    featured: false,
  },
  {
    id: "24",
    slug: "bargain",
    title: "드라마 '바겐'",
    client: "TVING",
    category: "drama",
    categoryLabel: "드라마 & 예능",
    year: "",
    duration: "",
    period: "",
    role: "기획 / 제작",
    thumbnailUrl: "/works/bargain.png",
    videoUrl: "",
    description: "Unbound Studio가 참여한 '바겐' 영상 프로젝트입니다.",
    tags: ["드라마"],
    featured: false,
  },
  {
    id: "25",
    slug: "parasite",
    title: "영화 '기생충'",
    client: "CJ ENM",
    category: "drama",
    categoryLabel: "영화",
    year: "",
    duration: "",
    period: "",
    role: "기획 / 제작",
    thumbnailUrl: "/works/parasite.png",
    videoUrl: "",
    description: "Unbound Studio가 참여한 영화 '기생충' 영상 프로젝트입니다.",
    tags: ["영화"],
    featured: false,
  },
  {
    id: "26",
    slug: "alienoid",
    title: "영화 '외계+인 1부'",
    client: "CJ ENM",
    category: "drama",
    categoryLabel: "영화",
    year: "",
    duration: "",
    period: "",
    role: "기획 / 제작",
    thumbnailUrl: "/works/alienoid.png",
    videoUrl: "",
    description: "Unbound Studio가 참여한 영화 '외계+인 1부' 영상 프로젝트입니다.",
    tags: ["영화"],
    featured: false,
  },
];

export const worksByCategory = (cat: WorkCategory | "all") =>
  cat === "all" ? works : works.filter((w) => w.category === cat);

export const featuredWorks = works.filter((w) => w.featured);

// ===== 드라마/영화 우선 + 인기순 정렬 (홈 Featured / Works 갤러리 공통) =====
// 드라마 인기 순서(시청률·화제성·OTT 순위 기준)
const DRAMA_POPULARITY = [
  "night-blooming-flower", // 밤에 피는 꽃 (18.4%)
  "trigger", // 트리거 (넷플릭스 글로벌 2위)
  "kiss-sixth-sense", // 키스 식스 센스 (Disney+)
  "seven-escape-2", // 7인의 탈출 2
  "good-detective-2", // 모범형사 2
  "chunhwa-romance", // 춘화연애담
  "kbs-24h-healthclub-opening", // 24시 헬스클럽
  "tvn-please-stop-drinking-opening", // 금주를 부탁해
];
// 실제 드라마/영화(제목 '드라마 …'/'영화 …') → 예능·다큐 → 광고 → B2B
const orderRank = (w: Work) =>
  w.title.startsWith("드라마") || w.title.startsWith("영화")
    ? 0
    : w.category === "drama"
      ? 1
      : w.category === "promo"
        ? 2
        : 3;
const popIndex = (w: Work) => {
  const i = DRAMA_POPULARITY.indexOf(w.slug);
  return i === -1 ? 999 : i;
};
export const worksOrdered = [...works].sort(
  (a, b) => orderRank(a) - orderRank(b) || popIndex(a) - popIndex(b),
);

export const getWork = (slug: string) => works.find((w) => w.slug === slug);
