// 거스트앤게일 스타일 중간 이미지 섹션 — 풀폭 + 패럴럭스(데스크톱).
// 이미지는 임시(작품 썸네일). 교체 시 backgroundImage 경로만 변경.
const IMAGE = "/image-break.webp";

export function HomeImageBreak() {
  return (
    <section
      aria-hidden
      className="relative h-[65vh] min-h-[420px] w-full bg-cover bg-center bg-no-repeat md:h-[75vh]"
      style={{ backgroundImage: `url(${IMAGE})` }}
    >
      <div className="absolute inset-0 bg-black/30" />
    </section>
  );
}
