import Image from "next/image";
import logoWhite from "@/logo/Unbound_white_color.png";
import logoBlack from "@/logo/Unbound_black_color.png";

/**
 * Unbound 워드마크 로고.
 * - variant="white": 다크 배경용 (흰 텍스트 + 액센트 점)
 * - variant="black": 밝은 배경용 (검은 텍스트 + 액센트 점)
 * 원본 비율 576×92 (≈6.26:1)
 */
export function Logo({
  variant = "white",
  className = "",
  height = 22,
}: {
  variant?: "white" | "black";
  className?: string;
  height?: number;
}) {
  const src = variant === "white" ? logoWhite : logoBlack;
  return (
    <Image
      src={src}
      alt="Unbound Studio"
      height={height}
      width={Math.round((576 / 92) * height)}
      priority
      className={className}
    />
  );
}
