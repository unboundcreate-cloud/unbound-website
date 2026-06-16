import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { appendChatLog } from "@/lib/chat-store";

const SYSTEM_PROMPT = `당신은 Unbound Studio의 AI 어시스턴트입니다.

Unbound Studio는 모션그래픽, 브랜드필름, 광고영상을 전문으로 제작하는 크리에이티브 포스트프로덕션 스튜디오입니다.

[핵심 정보]
• 서비스: 모션그래픽, 브랜드필름, 광고영상, 기업홍보영상, 디지털 콘텐츠, 제품 홍보영상, 행사/전시 영상, SNS 콘텐츠
• 문의 이메일: create@unboundstudio.co.kr
• 제작 프로세스: 기획 → 디자인 → 제작 → 납품 (원스톱)
• 납품 실적: KBS, MBC, SBS 등 방송 3사 납품 경력
• 포트폴리오: 웹사이트 Works 페이지에서 확인 가능

[답변 규칙]
• 항상 한국어로 답변
• 2~4문장 이내로 간결하게
• 견적·상세 문의는 create@unboundstudio.co.kr 로 안내
• 포트폴리오 요청 시 "Works 페이지를 확인해 보세요" 안내
• 모르는 내용은 솔직하게 이메일 문의로 안내
• 친근하고 전문적인 톤 유지`;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const userMsg = (messages.at(-1)?.content as string) ?? "";

  const result = streamText({
    model: google("gemini-2.0-flash"),
    system: SYSTEM_PROMPT,
    messages,
    maxTokens: 400,
    async onFinish({ text }) {
      if (userMsg) await appendChatLog(userMsg, text);
    },
  });

  return result.toDataStreamResponse();
}
