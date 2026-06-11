"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: "underline" | "outline" | "solid";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

/** 밑줄이 왼쪽→오른쪽으로 슬라이드되는 텍스트 링크 버튼 */
export function Button({
  href,
  children,
  variant = "underline",
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  const base =
    "group inline-flex items-center gap-2 font-display text-sm uppercase tracking-[0.2em] transition-colors";

  const content =
    variant === "underline" ? (
      <span className="relative inline-flex items-center gap-2">
        <span className="relative">
          {children}
          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
        </span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </span>
    ) : (
      children
    );

  const styles = cn(
    base,
    variant === "underline" && "text-current hover:text-brand-accent",
    variant === "outline" &&
      "border border-white px-8 py-4 hover:bg-white hover:text-brand-black",
    variant === "solid" &&
      "bg-brand-accent px-8 py-4 text-white hover:bg-white hover:text-brand-black",
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={styles}>
      {content}
    </button>
  );
}
