// 거스트앤게일 스타일 중간 이미지 섹션 — 풀폭 + 패럴럭스(데스크톱).
// 이미지 교체 시 image 경로만 변경(여러 곳에서 다른 이미지로 재사용 가능).
const DEFAULT_IMAGE = "/image-break-desk.webp";

export function HomeImageBreak({ image = DEFAULT_IMAGE }: { image?: string }) {
  return (
    <section
      aria-hidden
      className="relative h-[65vh] min-h-[420px] w-full bg-cover bg-center bg-no-repeat md:h-[75vh]"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/30" />
    </section>
  );
}
