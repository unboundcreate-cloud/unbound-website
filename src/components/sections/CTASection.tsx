"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { studio } from "@/data/clients";

export function CTASection({
  headlineLine1 = studio.conclusion.headline[0],
  headlineLine2 = studio.conclusion.headline[1],
  body = studio.conclusion.body,
  buttonText = "프로젝트 문의하기",
  buttonHref = "/contact",
}: {
  headlineLine1?: string;
  headlineLine2?: string;
  body?: string;
  buttonText?: string;
  buttonHref?: string;
} = {}) {
  const headline = [headlineLine1, headlineLine2];
  return (
    <section className="bg-brand-accent text-white">
      <div className="section-padding flex flex-col items-center py-28 text-center md:py-40">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl uppercase leading-[0.95] md:text-6xl lg:text-7xl"
        >
          {headline[0]}
          <br />
          {headline[1]}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-8 max-w-xl text-sm leading-relaxed text-white/85 md:text-base"
        >
          {body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mt-12"
        >
          <Button
            href={buttonHref}
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-brand-accent"
          >
            {buttonText}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
