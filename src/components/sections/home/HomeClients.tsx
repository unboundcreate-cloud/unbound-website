// 클라이언트 로고 — 한 장짜리 가로 스트립 이미지를 무한 마퀴로 흐르게.
// 끊김 없는 루프: 동일 이미지를 충분히 반복(짝수)하고 translateX(-50%) 애니메이션.
const REPEAT = 6;

export function HomeClients() {
  return (
    <section className="bg-transparent py-12 md:py-16">
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-[marquee_90s_linear_infinite] items-center">
          {Array.from({ length: REPEAT }).map((_, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src="/clients/clients-strip-v2.png"
              alt={i === 0 ? "Unbound Studio 클라이언트" : ""}
              aria-hidden={i !== 0}
              className="h-28 w-auto max-w-none shrink-0 opacity-75 md:h-[144px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
