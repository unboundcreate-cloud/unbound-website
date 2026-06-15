// gustngale의 "GUST N' GALE + 소개 문단" 레이아웃 → Unbound 소개로
export function HomeIntro() {
  return (
    <section className="section-padding bg-brand-black py-28 md:py-56">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 md:flex-row md:items-start md:gap-10">
        <p className="shrink-0 font-display text-2xl uppercase leading-tight tracking-tight text-white md:text-3xl">
          Unbound
          <br />
          Studio
        </p>
        <div className="space-y-5 text-base leading-relaxed text-white/70 md:text-lg">
          <p className="text-white">
            Unbound Studio는 모션 그래픽과 포스트 프로덕션을 중심으로 최고의 영상 콘텐츠를 제작하는 크리에이티브 영상 스튜디오입니다.
          </p>
          <p>
            방송, OTT 드라마 타이틀부터 브랜드 필름, 광고, AI 기반 영상까지 — 기획, 촬영, 편집, VFX, 색보정, 납품의 전 과정을 원스톱으로 책임집니다.
          </p>
          <p>
            우리만의 감각과 새로운 문법으로 영상의 기준을 만들어 갑니다.
          </p>
        </div>
      </div>
    </section>
  );
}
