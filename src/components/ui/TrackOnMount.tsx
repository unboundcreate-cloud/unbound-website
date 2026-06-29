"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/gtag";

// 마운트 시 GA4 이벤트 1회 전송(예: 인사이트 글 조회). 화면엔 아무것도 렌더 안 함.
export function TrackOnMount({
  event,
  params,
}: {
  event: string;
  params?: Record<string, unknown>;
}) {
  useEffect(() => {
    trackEvent(event, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
