"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// 중간 이미지 섹션 — 스크롤에 따라 이미지가 스케일/밝기/패럴랙스로 스크럽된다.
// 스티키 구간 위로 콘텐츠가 밀려오는 느낌을 강화.
const DEFAULT_IMAGE = "/image-break-desk.webp";

export function HomeImageBreak({ image = DEFAULT_IMAGE }: { image?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1.02]);
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const brightness = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.55]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  return (
    <section
      ref={ref}
      aria-hidden
      className="relative h-[65vh] min-h-[420px] w-full overflow-hidden bg-brand-black md:h-[75vh]"
    >
      <motion.div
        className="absolute inset-[-9%] bg-cover bg-center bg-no-repeat will-change-transform"
        style={{ backgroundImage: `url(${image})`, scale, y, filter }}
      />
      <div className="absolute inset-0 bg-black/25" />
    </section>
  );
}
