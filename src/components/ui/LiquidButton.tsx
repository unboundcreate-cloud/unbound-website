"use client";
import Link from "next/link";
import { useRef } from "react";
import { motion, useSpring } from "framer-motion";

interface LiquidButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}

export function LiquidButton({
  href,
  children,
  className = "",
  type = "button",
  disabled,
  onClick,
}: LiquidButtonProps) {
  const circleRef = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 25, mass: 0.15 });
  const y = useSpring(0, { stiffness: 200, damping: 25, mass: 0.15 });

  const setPos = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const c = circleRef.current;
    if (!c) return;
    c.style.left = `${e.clientX - rect.left}px`;
    c.style.top  = `${e.clientY - rect.top}px`;
  };

  const setMag = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };

  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    setPos(e);
    circleRef.current?.style.setProperty("transform", "translate(-50%,-50%) scale(1)");
    setMag(e);
  };
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    setPos(e);
    setMag(e);
  };
  const onLeave = () => {
    circleRef.current?.style.setProperty("transform", "translate(-50%,-50%) scale(0)");
    x.set(0);
    y.set(0);
  };

  const inner = (
    <>
      <span
        ref={circleRef}
        aria-hidden
        className="pointer-events-none absolute h-[480px] w-[480px] rounded-full bg-white"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%) scale(0)",
          transition: "transform 0.75s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      <span className="relative z-10 transition-colors duration-700 group-hover:text-brand-accent">
        {children}
      </span>
    </>
  );

  const baseClass = `group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-brand-accent px-10 py-4 font-display text-sm uppercase tracking-[0.2em] text-white ${className}`;

  if (href) {
    return (
      <motion.div style={{ x, y, display: "inline-flex" }}>
        <Link
          href={href}
          onMouseEnter={onEnter}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className={baseClass}
        >
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div style={{ x, y, display: "inline-flex" }}>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={onEnter}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`${baseClass} disabled:cursor-not-allowed disabled:opacity-50`}
      >
        {inner}
      </button>
    </motion.div>
  );
}
