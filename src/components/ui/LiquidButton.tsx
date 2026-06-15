"use client";
import Link from "next/link";
import { useRef } from "react";

interface LiquidButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function LiquidButton({ href, children, className = "" }: LiquidButtonProps) {
  const circleRef = useRef<HTMLSpanElement>(null);

  const setPos = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const c = circleRef.current;
    if (!c) return;
    c.style.left = `${e.clientX - rect.left}px`;
    c.style.top  = `${e.clientY - rect.top}px`;
  };

  const onEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setPos(e);
    circleRef.current?.style.setProperty("transform", "translate(-50%,-50%) scale(1)");
  };
  const onMove  = (e: React.MouseEvent<HTMLAnchorElement>) => setPos(e);
  const onLeave = () =>
    circleRef.current?.style.setProperty("transform", "translate(-50%,-50%) scale(0)");

  return (
    <Link
      href={href}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-brand-accent px-10 py-4 font-display text-sm uppercase tracking-[0.2em] text-white ${className}`}
    >
      {/* 마우스 위치에서 확장되는 흰 원 */}
      <span
        ref={circleRef}
        aria-hidden
        className="pointer-events-none absolute h-[480px] w-[480px] rounded-full bg-white"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%) scale(0)",
          transition: "transform 0.55s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      <span className="relative z-10 transition-colors duration-300 group-hover:text-brand-accent">
        {children}
      </span>
    </Link>
  );
}
