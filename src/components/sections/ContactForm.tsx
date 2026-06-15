"use client";

import { useState } from "react";
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
    if (!data.get("privacy")) next.privacy = "개인정보 수집 및 이용에 동의해주세요.";

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
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            이름 *
          </label>
          <FieldWrap>
            <input id="name" name="name" className={fieldClass} placeholder="Name" />
          </FieldWrap>
          {errors.name && (
            <p className="mt-1 text-xs text-brand-accent">{errors.name}</p>
          )}
        </div>
        <div>
          <label className={labelClass} htmlFor="company">
            회사명
          </label>
          <FieldWrap>
            <input id="company" name="company" className={fieldClass} placeholder="Company" />
          </FieldWrap>
        </div>
        <div>
          <label className={labelClass} htmlFor="position">
            직책 및 부서명
          </label>
          <FieldWrap>
            <input id="position" name="position" className={fieldClass} placeholder="Organization Name / Position" />
          </FieldWrap>
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            이메일 *
          </label>
          <FieldWrap>
            <input id="email" name="email" type="email" className={fieldClass} placeholder="you@email.com" />
          </FieldWrap>
          {errors.email && (
            <p className="mt-1 text-xs text-brand-accent">{errors.email}</p>
          )}
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            연락처
          </label>
          <FieldWrap>
            <input id="phone" name="phone" className={fieldClass} placeholder="Phone number" />
          </FieldWrap>
        </div>
        <div>
          <label className={labelClass} htmlFor="service">
            서비스 유형
          </label>
          <FieldWrap>
            <select id="service" name="service" className={`${fieldClass} [&>option]:bg-brand-dark`}>
              {SERVICE_TYPES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </FieldWrap>
        </div>
        <div>
          <label className={labelClass} htmlFor="budget">
            예산
          </label>
          <FieldWrap>
            <input
              id="budget"
              name="budget"
              className={fieldClass}
              placeholder="Budget"
            />
          </FieldWrap>
        </div>
        <div>
          <label className={labelClass} htmlFor="deadline">
            마감일
          </label>
          <FieldWrap>
            <input
              id="deadline"
              name="deadline"
              type="date"
              className={`${fieldClass} [color-scheme:dark]`}
            />
          </FieldWrap>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          프로젝트 설명 *
        </label>
        <FieldWrap>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={`${fieldClass} resize-none`}
            placeholder="Tell us about your project."
          />
        </FieldWrap>
        {errors.message && (
          <p className="mt-1 text-xs text-brand-accent">{errors.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
        <label className="flex cursor-pointer items-start gap-3">
          <span className="relative mt-0.5 inline-flex h-5 w-5 flex-shrink-0">
            <input
              type="checkbox"
              name="privacy"
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
            <span className="mr-1 text-white/60">(필수)</span>
            개인정보 수집 및 이용 동의
            <a href="/privacy" target="_blank" rel="noreferrer"
              className="ml-2 text-xs text-white/40 underline underline-offset-2 transition-colors hover:text-brand-accent">
              전문보기
            </a>
          </span>
        </label>
        {errors.privacy && (
          <p className="-mt-2 text-xs text-brand-accent">{errors.privacy}</p>
        )}
        <label className="flex cursor-pointer items-start gap-3">
          <span className="relative mt-0.5 inline-flex h-5 w-5 flex-shrink-0">
            <input
              type="checkbox"
              name="marketing"
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
            <span className="mr-1 text-white/60">(선택)</span>
            홍보 및 마케팅 정보 수신 동의
            <a href="/privacy" target="_blank" rel="noreferrer"
              className="ml-2 text-xs text-white/40 underline underline-offset-2 transition-colors hover:text-brand-accent">
              전문보기
            </a>
          </span>
        </label>
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
  );
}
