"use client";

import { useState } from "react";

const SERVICE_TYPES = [
  "Motion Graphic",
  "Broadcasting",
  "Commercial",
  "Branding Film",
  "Post Production",
  "기타",
];

type Status = "idle" | "submitting" | "done";

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
    "w-full border-b border-white/20 bg-transparent py-3 text-white placeholder:text-brand-muted/60 focus:border-brand-accent focus:outline-none transition-colors";
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
          <input id="name" name="name" className={fieldClass} placeholder="Name" />
          {errors.name && (
            <p className="mt-1 text-xs text-brand-accent">{errors.name}</p>
          )}
        </div>
        <div>
          <label className={labelClass} htmlFor="company">
            회사명
          </label>
          <input id="company" name="company" className={fieldClass} placeholder="Company" />
        </div>
        <div>
          <label className={labelClass} htmlFor="position">
            직책 및 부서명
          </label>
          <input id="position" name="position" className={fieldClass} placeholder="Organization Name / Position" />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            이메일 *
          </label>
          <input id="email" name="email" type="email" className={fieldClass} placeholder="you@email.com" />
          {errors.email && (
            <p className="mt-1 text-xs text-brand-accent">{errors.email}</p>
          )}
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">
            연락처
          </label>
          <input id="phone" name="phone" className={fieldClass} placeholder="Phone number" />
        </div>
        <div>
          <label className={labelClass} htmlFor="service">
            서비스 유형
          </label>
          <select id="service" name="service" className={`${fieldClass} [&>option]:bg-brand-dark`}>
            {SERVICE_TYPES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass} htmlFor="budget">
            Budget
          </label>
          <input
            id="budget"
            name="budget"
            className={fieldClass}
            placeholder="Budget"
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="deadline">
            Deadline
          </label>
          <input
            id="deadline"
            name="deadline"
            type="text"
            placeholder="YYYY-MM-DD"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          Project Description *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${fieldClass} resize-none`}
          placeholder="Tell us about your project."
        />
        {errors.message && (
          <p className="mt-1 text-xs text-brand-accent">{errors.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="privacy"
            className="mt-0.5 h-4 w-4 flex-shrink-0 accent-brand-accent cursor-pointer"
          />
          <span className="text-sm text-brand-muted leading-relaxed">
            <span className="text-white/60 mr-1">(필수)</span>
            개인정보 수집 및 이용 동의
            <a
              href="/privacy"
              target="_blank"
              rel="noreferrer"
              className="ml-2 underline underline-offset-2 text-white/40 hover:text-brand-accent transition-colors text-xs"
            >
              전문보기
            </a>
          </span>
        </label>
        {errors.privacy && (
          <p className="-mt-2 text-xs text-brand-accent">{errors.privacy}</p>
        )}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="marketing"
            className="mt-0.5 h-4 w-4 flex-shrink-0 accent-brand-accent cursor-pointer"
          />
          <span className="text-sm text-brand-muted leading-relaxed">
            <span className="text-white/60 mr-1">(선택)</span>
            홍보 및 마케팅 정보 수신 동의
            <a
              href="/privacy"
              target="_blank"
              rel="noreferrer"
              className="ml-2 underline underline-offset-2 text-white/40 hover:text-brand-accent transition-colors text-xs"
            >
              전문보기
            </a>
          </span>
        </label>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex w-fit items-center gap-3 bg-brand-accent px-10 py-4 font-display text-sm uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-brand-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "submitting" ? "전송 중..." : "Send Message"}
        </button>
        {errors.submit && (
          <p className="text-xs text-brand-accent">{errors.submit}</p>
        )}
      </div>
    </form>
  );
}
