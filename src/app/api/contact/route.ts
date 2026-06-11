// 문의 폼 → Resend 메일 발송 서버 라우트.
// RESEND_API_KEY 환경변수 필요(Vercel/로컬 .env.local). 도메인은 Resend에서 Verified 상태여야 함.

// 발신주소 = 인증된 도메인 주소. Resend에서 unboundstudio.co.kr 이 Verified 상태여야 동작.
const FROM = "Unbound Studio <noreply@unboundstudio.co.kr>";
const TO = "create@unboundstudio.co.kr"; // 문의 수신처 (네이버웍스 메일함)

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY 미설정");
    return Response.json(
      { error: "서버 설정 오류로 전송할 수 없습니다." },
      { status: 500 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const get = (k: string) => String(body[k] ?? "").trim();
  const name = get("name");
  const email = get("email");
  const message = get("message");
  const company = get("company");
  const position = get("position");
  const phone = get("phone");
  const service = get("service");
  const budget = get("budget");
  const deadline = get("deadline");

  // 서버측 검증 (클라이언트 우회 대비)
  if (!name || !email || !message) {
    return Response.json({ error: "필수 항목을 입력해주세요." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "올바른 이메일 형식이 아닙니다." }, { status: 400 });
  }

  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding:6px 16px 6px 0;color:#888;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;color:#111">${esc(value)}</td></tr>`
      : "";

  const html = `
    <div style="font-family:-apple-system,'Segoe UI',sans-serif;max-width:560px;margin:0 auto">
      <h2 style="font-size:18px;color:#111;border-bottom:2px solid #E63226;padding-bottom:8px">웹사이트 문의 접수</h2>
      <table style="font-size:14px;line-height:1.6;border-collapse:collapse;width:100%">
        ${row("이름", name)}
        ${row("회사명", company)}
        ${row("직책·부서", position)}
        ${row("이메일", email)}
        ${row("연락처", phone)}
        ${row("서비스 유형", service)}
        ${row("예산 범위", budget)}
        ${row("마감일", deadline)}
      </table>
      <div style="margin-top:16px;padding:16px;background:#f6f6f6;border-radius:8px;font-size:14px;line-height:1.7;color:#111">
        <strong style="color:#888;font-size:12px">프로젝트 설명</strong><br>${esc(message)}
      </div>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: email,
      subject: `[웹문의] ${name}${company ? ` · ${company}` : ""}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Resend 발송 실패:", await res.text());
    return Response.json(
      { error: "메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
