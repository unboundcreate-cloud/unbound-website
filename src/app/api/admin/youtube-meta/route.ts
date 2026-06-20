import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";

// YouTube 링크 → 제목·썸네일·embed URL 자동 추출.
// YOUTUBE_API_KEY 가 설정되어 있으면 설명·길이까지 함께 반환.

function extractVideoId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  );
  if (m) return m[1];
  // 순수 ID만 들어온 경우
  if (/^[A-Za-z0-9_-]{11}$/.test(url.trim())) return url.trim();
  return null;
}

// 가장 큰 썸네일이 존재하면 그걸, 없으면 hqdefault 로 폴백
async function bestThumbnail(id: string): Promise<string> {
  const maxres = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  try {
    const res = await fetch(maxres, { method: "HEAD" });
    if (res.ok) return maxres;
  } catch {
    // 무시하고 폴백
  }
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

// ISO8601 (PT1M30S) → "1:30"
function formatDuration(iso: string): string {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return "";
  const h = Number(m[1] ?? 0);
  const min = Number(m[2] ?? 0);
  const sec = Number(m[3] ?? 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(min)}:${pad(sec)}` : `${min}:${pad(sec)}`;
}

export async function GET(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url).searchParams.get("url") ?? "";
  if (!url.trim()) {
    return NextResponse.json({ error: "url 파라미터가 필요합니다." }, { status: 400 });
  }

  const id = extractVideoId(url);
  if (!id) {
    return NextResponse.json({ error: "유효한 YouTube 링크가 아닙니다." }, { status: 400 });
  }

  const result: {
    videoId: string;
    title?: string;
    thumbnailUrl: string;
    videoUrl: string;
    embedUrl: string;
    description?: string;
    duration?: string;
  } = {
    videoId: id,
    thumbnailUrl: await bestThumbnail(id),
    videoUrl: `https://youtu.be/${id}`,
    embedUrl: `https://www.youtube.com/embed/${id}`,
  };

  // 1) oEmbed — 키 없이 제목 확보
  try {
    const oe = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`,
    );
    if (oe.ok) {
      const data: { title?: string } = await oe.json();
      if (data.title) result.title = data.title;
    }
  } catch {
    // 제목은 선택사항 — 실패해도 진행
  }

  // 2) YOUTUBE_API_KEY 있으면 설명·길이 추가
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (apiKey) {
    try {
      const api = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${id}&key=${apiKey}`,
      );
      if (api.ok) {
        const data: {
          items?: {
            snippet?: { title?: string; description?: string };
            contentDetails?: { duration?: string };
          }[];
        } = await api.json();
        const item = data.items?.[0];
        if (item?.snippet?.title) result.title = item.snippet.title;
        if (item?.snippet?.description) result.description = item.snippet.description;
        if (item?.contentDetails?.duration) {
          result.duration = formatDuration(item.contentDetails.duration);
        }
      }
    } catch {
      // Data API 실패해도 oEmbed 결과로 진행
    }
  }

  return NextResponse.json(result);
}
