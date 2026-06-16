"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WELCOME = "안녕하세요! Unbound Studio AI입니다. 서비스, 포트폴리오, 제작 프로세스 등 궁금한 점을 물어보세요.";

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages: [{ id: "welcome", role: "assistant", content: WELCOME }],
    });

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, messages]);

  return (
    <div className="fixed bottom-6 right-6 z-[9990] flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 flex h-[500px] w-[340px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-2xl"
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-brand-accent" />
                <span className="font-display text-xs uppercase tracking-[0.18em] text-white">
                  Unbound Studio
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-brand-muted transition-colors hover:text-white"
                aria-label="닫기"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* 메시지 */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-brand-accent text-white"
                        : "bg-white/8 text-white/85"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-xl bg-white/8 px-4 py-3">
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="h-1.5 w-1.5 rounded-full bg-brand-muted"
                        style={{ animation: `bounce 1.2s ${delay}ms infinite` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* 입력 */}
            <form
              onSubmit={handleSubmit}
              className="flex gap-2 border-t border-white/10 p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                placeholder="메시지를 입력하세요..."
                className="flex-1 rounded-xl bg-white/6 px-4 py-2.5 text-sm text-white placeholder:text-brand-muted focus:outline-none focus:ring-1 focus:ring-brand-accent/60"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-accent text-white transition-opacity hover:opacity-85 disabled:opacity-35"
                aria-label="전송"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-4 w-4">
                  <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 토글 버튼 */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent text-white shadow-xl"
        aria-label="AI 채팅 열기"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-5 w-5"
            >
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-5 w-5"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
