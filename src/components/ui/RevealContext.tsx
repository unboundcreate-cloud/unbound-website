"use client";

import { createContext, useContext } from "react";

// 스크롤 리빌 동작 — 기본 false = 스크롤을 다시 올리면 사라졌다가, 내리면 다시 나타남(양방향).
// contact처럼 한 번만 나타나야 하는 영역은 <RevealScope>로 감싸 once=true로 고정.
export const RevealOnceContext = createContext(false);

export function useRevealOnce() {
  return useContext(RevealOnceContext);
}

export function RevealScope({
  once = true,
  children,
}: {
  once?: boolean;
  children: React.ReactNode;
}) {
  return (
    <RevealOnceContext.Provider value={once}>
      {children}
    </RevealOnceContext.Provider>
  );
}
