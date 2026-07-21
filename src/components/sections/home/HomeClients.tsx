"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  wrap,
} from "framer-motion";

// 클라이언트 로고 마퀴 — 기본 속도로 흐르되, 스크롤 속도에 따라 가속/방향 반응(관성 느낌).
const REPEAT = 8;

export function HomeClients() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], {
    clamp: false,
  });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * -1.6 * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) directionFactor.current = -1;
    else if (vf > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <section className="bg-transparent py-12 md:py-16">
      <div className="marquee-fade relative overflow-hidden">
        <motion.div className="flex w-max items-center will-change-transform" style={{ x }}>
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
        </motion.div>
      </div>
    </section>
  );
}
