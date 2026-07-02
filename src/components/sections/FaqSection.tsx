import { faqs } from "@/data/faq";
import { FadeIn } from "@/components/ui/FadeIn";
import { SpotlightText } from "@/components/ui/SpotlightText";
import { FaqList } from "./FaqList";

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
      <FaqList />
    </section>
  );
}
