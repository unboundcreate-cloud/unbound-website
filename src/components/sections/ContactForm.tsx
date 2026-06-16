"use client";

import { useEffect, useState } from "react";
import { LiquidButton } from "@/components/ui/LiquidButton";

const SERVICE_TYPES = [
  "Motion Graphic",
  "Broadcasting",
  "Commercial",
  "Branding Film",
  "Post Production",
  "기타",
];

type Status = "idle" | "submitting" | "done";

type PolicyItem = {
  level?: "section";
  title?: string | null;
  body?: string | null;
  list?: string[];
  separator?: boolean;
};

const PRIVACY_TEXT: PolicyItem[] = [
  {
    body: `Unbound Studio(이하 "회사")는 「개인정보 보호법」 등 관련 법령에 따라 이용자의 개인정보를 보호하고, 개인정보와 관련한 고충을 신속하고 원활하게 처리하기 위하여 다음과 같은 개인정보처리방침을 수립·공개합니다.`,
  },
  { separator: true },
  { level: "section", title: "제1조 (개인정보의 처리 목적)" },
  { body: "회사는 다음의 목적을 위하여 개인정보를 처리하며, 아래 목적 이외의 용도로는 이용하지 않습니다." },
  { title: "1. 문의 접수 및 상담" },
  { list: ["프로젝트 문의 및 상담 응대", "견적 요청 확인 및 회신", "서비스 제공 가능 여부 검토", "계약 진행을 위한 연락 및 안내"] },
  { title: "2. 고객 관리" },
  { list: ["문의 내역 관리", "고객 요청사항 처리", "서비스 개선 및 운영 관리"] },
  { separator: true },
  { level: "section", title: "제2조 (처리하는 개인정보 항목)" },
  { body: "회사는 문의 접수 시 다음의 개인정보를 수집할 수 있습니다." },
  { title: "필수항목" },
  { list: ["성명", "회사명(또는 브랜드명)", "이메일 주소", "연락처", "문의 내용"] },
  { title: "자동 수집 항목" },
  { body: "웹사이트 이용 과정에서 다음 정보가 자동으로 수집될 수 있습니다." },
  { list: ["IP 주소", "쿠키(Cookie)", "방문 일시", "브라우저 정보", "서비스 이용 기록"] },
  { separator: true },
  { level: "section", title: "제3조 (개인정보의 보유 및 이용 기간)" },
  { body: "회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.\n\n다만, 관계 법령에 따라 보존이 필요한 경우에는 해당 법령에서 정한 기간 동안 보관합니다." },
  { list: ["문의 및 상담 기록: 접수일로부터 3년", "소비자 불만 및 분쟁처리 기록: 3년", "기타 관련 법령에 따른 보존 기간"] },
  { separator: true },
  { level: "section", title: "제4조 (개인정보의 제3자 제공)" },
  { body: "회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.\n\n다만, 다음의 경우에는 예외로 합니다." },
  { list: ["이용자가 사전에 동의한 경우", "법령에 특별한 규정이 있는 경우", "수사기관 등 관계기관의 적법한 요청이 있는 경우"] },
  { separator: true },
  { level: "section", title: "제5조 (개인정보의 파기)" },
  { body: "회사는 개인정보 보유기간의 경과 또는 처리목적 달성 시 지체 없이 개인정보를 파기합니다." },
  { title: "파기 방법" },
  { list: ["전자적 파일: 복구 및 재생이 불가능한 방법으로 영구 삭제", "종이 문서: 분쇄 또는 소각"] },
  { separator: true },
  { level: "section", title: "제6조 (개인정보의 안전성 확보 조치)" },
  { body: "회사는 개인정보 보호를 위하여 다음과 같은 조치를 시행하고 있습니다." },
  { title: "관리적 조치" },
  { list: ["개인정보 취급자 최소화", "내부 관리계획 수립 및 운영"] },
  { title: "기술적 조치" },
  { list: ["접근 권한 관리", "보안 프로그램 운영", "개인정보 저장 및 전송 시 보호 조치"] },
  { title: "물리적 조치" },
  { list: ["개인정보 보관 장소 접근 통제"] },
  { separator: true },
  { level: "section", title: "제7조 (쿠키의 사용)" },
  { body: "회사는 웹사이트 이용 환경 개선을 위해 쿠키를 사용할 수 있습니다.\n\n이용자는 웹 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 일부 서비스 이용에 제한이 있을 수 있습니다." },
  { separator: true },
  { level: "section", title: "제8조 (이용자의 권리)" },
  { body: "이용자는 언제든지 자신의 개인정보에 대해 다음 권리를 행사할 수 있습니다." },
  { list: ["개인정보 열람", "개인정보 정정", "개인정보 삭제", "개인정보 처리정지 요청"] },
  { body: "관련 요청은 아래 연락처를 통해 접수할 수 있으며, 회사는 지체 없이 조치합니다." },
  { separator: true },
  { level: "section", title: "제9조 (개인정보 보호 문의)" },
  { body: "회사는 개인정보 처리와 관련한 문의, 불만 처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호 관련 연락처를 운영합니다." },
  { title: "개인정보 보호 문의" },
  { list: ["상호 : Unbound Studio", "이메일 : create@unboundstudio.co.kr", "연락처 : 070-8080-2827"] },
  { body: "정보주체는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만 처리, 피해구제 등에 관한 사항을 위 연락처로 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체 없이 답변 및 처리하겠습니다." },
  { separator: true },
  { level: "section", title: "제10조 (권익침해 구제 방법)" },
  { body: "정보주체는 개인정보 침해에 대한 신고나 상담이 필요한 경우 아래 기관에 문의할 수 있습니다." },
  { title: "개인정보침해신고센터" },
  { list: ["홈페이지 : privacy.kisa.or.kr", "전화 : (국번없이) 118"] },
  { title: "개인정보분쟁조정위원회" },
  { list: ["홈페이지 : www.kopico.go.kr", "전화 : (국번없이) 1833-6972"] },
  { title: "대검찰청" },
  { list: ["홈페이지 : www.spo.go.kr"] },
  { title: "경찰청 사이버범죄 신고시스템" },
  { list: ["홈페이지 : ecrm.police.go.kr"] },
  { separator: true },
  { level: "section", title: "제11조 (개인정보처리방침 시행일)" },
  { body: "본 개인정보처리방침은 2025년 6월 16일부터 시행됩니다." },
];

const MARKETING_TEXT: PolicyItem[] = [
  {
    body: `Unbound Studio는 서비스, 이벤트, 프로모션, 뉴스레터 및 다양한 혜택 정보를 제공하기 위하여 아래와 같이 광고성 정보를 발송할 수 있습니다.`,
  },
  { separator: true },
  { level: "section", title: "1. 수집 및 이용 항목" },
  { list: ["성명", "이메일 주소", "연락처"] },
  { separator: true },
  { level: "section", title: "2. 이용 목적" },
  {
    list: [
      "Unbound Studio의 서비스 및 프로젝트 소식 안내",
      "이벤트, 프로모션 및 혜택 정보 제공",
      "뉴스레터 발송",
      "신규 서비스 및 콘텐츠 안내",
      "고객 맞춤형 마케팅 정보 제공",
    ],
  },
  { separator: true },
  { level: "section", title: "3. 전송 방법" },
  { list: ["이메일(E-mail)", "문자메시지(SMS/LMS)", "전화", "기타 전자적 전송매체"] },
  { separator: true },
  { level: "section", title: "4. 보유 및 이용 기간" },
  { body: "동의일로부터 동의 철회 시까지" },
  { separator: true },
  { level: "section", title: "5. 동의 거부 권리 및 불이익" },
  {
    body: "귀하는 홍보 및 마케팅 정보 수신에 대한 동의를 거부할 권리가 있습니다.\n\n다만, 동의를 거부하더라도 프로젝트 문의, 상담, 견적 요청 등 기본적인 서비스 이용에는 어떠한 제한도 없습니다.",
  },
  { separator: true },
  { level: "section", title: "6. 동의 철회" },
  { body: "수신 동의 후에도 언제든지 아래 연락처를 통해 동의를 철회할 수 있습니다." },
  { list: ["이메일 : create@unboundstudio.co.kr", "연락처 : 070-8080-2827"] },
  { separator: true },
  { body: "※ 본 동의는 선택 사항이며, 동의하지 않아도 서비스 이용에는 제한이 없습니다." },
];

function PolicyModal({
  title,
  content,
  onClose,
  onConfirm,
}: {
  title: string;
  content: PolicyItem[];
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
    >
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* 모달 본체 */}
      <div
        className="relative z-10 flex max-h-[80vh] w-full max-w-lg flex-col rounded-lg border border-white/10 bg-[#111] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h3 className="text-sm font-medium tracking-wide text-white">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded text-white/40 transition-colors hover:text-white"
            aria-label="닫기"
          >
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>

        {/* 본문 */}
        <div className="overflow-y-auto px-6 py-5 text-xs leading-relaxed text-white/50">
          {content.map((item, i) => {
            if (item.separator) {
              return <hr key={i} className="my-4 border-white/10" />;
            }
            return (
              <div key={i} className="mb-3">
                {item.level === "section" && item.title && (
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.06em] text-white/80">
                    {item.title}
                  </p>
                )}
                {!item.level && item.title && (
                  <p className="mb-1 font-semibold text-white/65">{item.title}</p>
                )}
                {item.body && (
                  <p className="whitespace-pre-line">{item.body}</p>
                )}
                {item.list && (
                  <ul className="mt-1 space-y-0.5 pl-3">
                    {item.list.map((li, j) => (
                      <li key={j} className="before:mr-1 before:content-['·']">{li}</li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {/* 푸터 */}
        <div className="border-t border-white/10 px-6 py-4">
          <button
            type="button"
            onClick={() => { onConfirm(); onClose(); }}
            className="w-full rounded bg-white/5 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckboxRow({
  name,
  label,
  badge,
  checked,
  onChange,
  onViewFull,
}: {
  name: string;
  label: string;
  badge: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  onViewFull: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <span className="relative mt-0.5 inline-flex h-5 w-5 flex-shrink-0">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
        />
        <span className="h-5 w-5 rounded-sm border border-white/30 transition-all duration-300 peer-checked:border-brand-accent peer-checked:bg-brand-accent" />
        <svg
          className="pointer-events-none absolute inset-0 m-auto h-3 w-3 scale-50 text-white opacity-0 transition-all duration-200 peer-checked:scale-100 peer-checked:opacity-100"
          viewBox="0 0 12 12" fill="none" stroke="currentColor"
          strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M2 6l3 3 5-5" />
        </svg>
      </span>
      <span className="text-sm leading-relaxed text-brand-muted">
        <span className="mr-1 text-white/60">{badge}</span>
        {label}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); onViewFull(); }}
          className="ml-2 text-xs text-white/40 underline underline-offset-2 transition-colors hover:text-brand-accent"
        >
          전문보기
        </button>
      </span>
    </label>
  );
}

function FieldWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative border-b border-white/20">
      {children}
      <span className="pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-brand-accent transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] peer-focus:w-full" />
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [modal, setModal] = useState<"privacy" | "marketing" | null>(null);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [marketingChecked, setMarketingChecked] = useState(false);

  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};

    if (!String(data.get("name") || "").trim()) next.name = "이름을 입력해주세요.";
    const email = String(data.get("email") || "").trim();
    if (!email) next.email = "이메일을 입력해주세요.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "올바른 이메일 형식이 아닙니다.";
    if (!String(data.get("message") || "").trim())
      next.message = "프로젝트 내용을 입력해주세요.";
    if (!privacyChecked) next.privacy = "개인정보 수집 및 이용에 동의해주세요.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("submitting");
    try {
      const payload = Object.fromEntries(data.entries());
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const { error } = await res.json().catch(() => ({}));
        throw new Error(error || "전송에 실패했습니다.");
      }
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setErrors({
        submit:
          err instanceof Error
            ? err.message
            : "전송에 실패했습니다. 잠시 후 다시 시도해주세요.",
      });
    }
  };

  const fieldClass =
    "peer w-full bg-transparent py-3 text-white placeholder:text-brand-muted/60 focus:outline-none";
  const labelClass =
    "font-mono text-[12px] uppercase tracking-[0.2em] text-brand-muted";

  if (status === "done") {
    return (
      <div className="flex min-h-[300px] flex-col items-start justify-center">
        <p className="font-display text-4xl uppercase text-brand-accent">
          Thank you
        </p>
        <p className="mt-4 text-white/80">
          문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.
        </p>
      </div>
    );
  }

  return (
    <>
      {modal === "privacy" && (
        <PolicyModal
          title="개인정보처리방침"
          content={PRIVACY_TEXT}
          onClose={() => setModal(null)}
          onConfirm={() => setPrivacyChecked(true)}
        />
      )}
      {modal === "marketing" && (
        <PolicyModal
          title="홍보 및 마케팅 정보 수신 동의 (선택)"
          content={MARKETING_TEXT}
          onClose={() => setModal(null)}
          onConfirm={() => setMarketingChecked(true)}
        />
      )}

      <form onSubmit={onSubmit} noValidate className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="name">이름 *</label>
            <FieldWrap>
              <input id="name" name="name" className={fieldClass} placeholder="Name" />
            </FieldWrap>
            {errors.name && <p className="mt-1 text-xs text-brand-accent">{errors.name}</p>}
          </div>
          <div>
            <label className={labelClass} htmlFor="company">회사명</label>
            <FieldWrap>
              <input id="company" name="company" className={fieldClass} placeholder="Company" />
            </FieldWrap>
          </div>
          <div>
            <label className={labelClass} htmlFor="position">직책 및 부서명</label>
            <FieldWrap>
              <input id="position" name="position" className={fieldClass} placeholder="Organization Name / Position" />
            </FieldWrap>
          </div>
          <div>
            <label className={labelClass} htmlFor="email">이메일 *</label>
            <FieldWrap>
              <input id="email" name="email" type="email" className={fieldClass} placeholder="you@email.com" />
            </FieldWrap>
            {errors.email && <p className="mt-1 text-xs text-brand-accent">{errors.email}</p>}
          </div>
          <div>
            <label className={labelClass} htmlFor="phone">연락처</label>
            <FieldWrap>
              <input id="phone" name="phone" className={fieldClass} placeholder="Phone number" />
            </FieldWrap>
          </div>
          <div>
            <label className={labelClass} htmlFor="service">서비스 유형</label>
            <FieldWrap>
              <select id="service" name="service" className={`${fieldClass} [&>option]:bg-brand-dark`}>
                {SERVICE_TYPES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </FieldWrap>
          </div>
          <div>
            <label className={labelClass} htmlFor="budget">예산</label>
            <FieldWrap>
              <input id="budget" name="budget" className={fieldClass} placeholder="Budget" />
            </FieldWrap>
          </div>
          <div>
            <label className={labelClass} htmlFor="deadline">마감일</label>
            <FieldWrap>
              <input
                id="deadline" name="deadline" type="date"
                defaultValue={new Date().toLocaleDateString("en-CA")}
                onClick={(e) => { try { (e.currentTarget as HTMLInputElement).showPicker(); } catch {} }}
                className={`${fieldClass} cursor-pointer [color-scheme:dark]`}
              />
            </FieldWrap>
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="message">프로젝트 설명 *</label>
          <FieldWrap>
            <textarea
              id="message" name="message" rows={4}
              className={`${fieldClass} resize-none`}
              placeholder="Tell us about your project."
            />
          </FieldWrap>
          {errors.message && <p className="mt-1 text-xs text-brand-accent">{errors.message}</p>}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
          <CheckboxRow
            name="privacy"
            badge="(필수)"
            label="개인정보 수집 및 이용 동의"
            checked={privacyChecked}
            onChange={setPrivacyChecked}
            onViewFull={() => setModal("privacy")}
          />
          {errors.privacy && (
            <p className="-mt-2 text-xs text-brand-accent">{errors.privacy}</p>
          )}
          <CheckboxRow
            name="marketing"
            badge="(선택)"
            label="홍보 및 마케팅 정보 수신 동의"
            checked={marketingChecked}
            onChange={setMarketingChecked}
            onViewFull={() => setModal("marketing")}
          />
        </div>

        <div className="flex flex-col items-start gap-3">
          <LiquidButton type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "전송 중..." : "Send Message"}
          </LiquidButton>
          {errors.submit && (
            <p className="text-xs text-brand-accent">{errors.submit}</p>
          )}
        </div>
      </form>
    </>
  );
}
