// GA4 커스텀 이벤트 전송 헬퍼. gtag가 없으면(차단/미로딩) 조용히 무시.
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", name, params ?? {});
}
