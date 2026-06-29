import { faqs } from "@/data/faq";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightText } from "@/components/ui/SpotlightText";

// FAQ 섹션 + FAQPage 구조화데이터(JSON-LD) — 구글 FAQ 리치결과 노출 대상.
export function FaqSection() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="section-padding py-24 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FadeIn>
        <p className="label-text mb-4 text-brand-accent">FAQ</p>
        <h2 className="mb-12 font-display text-3xl uppercase leading-tight text-white md:mb-16 md:text-4xl lg:text-5xl">
          <SpotlightText>자주 묻는 질문</SpotlightText>
        </h2>
      </FadeIn>
      <div className="border-t border-white/10">
        {faqs.map((f, i) => (
          <FadeIn key={i} delay={Math.min(i * 0.05, 0.3)}>
            <details className="group border-b border-white/10 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-white transition-colors hover:text-brand-accent md:text-lg">
                {f.q}
                <span className="flex-shrink-0 text-xl text-brand-accent transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/60 md:text-base">
                {f.a}
              </p>
            </details>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
