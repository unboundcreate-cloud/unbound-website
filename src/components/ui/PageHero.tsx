"use client";

import { motion } from "framer-motion";
import { SpotlightText } from "@/components/ui/SpotlightText";

export function PageHero({
  label,
  title,
  description,
  spotlight = true,
}: {
  label?: string;
  title: React.ReactNode;
  description?: string;
  spotlight?: boolean;
}) {
  return (
    <header className="section-padding pb-12 pt-36 md:pt-44">
      {label && (
        <motion.p
          className="label-text mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {label}
        </motion.p>
      )}
      <motion.h1
        className="font-display text-5xl uppercase leading-[0.85] text-white sm:text-6xl md:text-8xl lg:text-9xl"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
      >
        {spotlight ? <SpotlightText>{title}</SpotlightText> : title}
      </motion.h1>
      {description && (
        <motion.p
          className="mt-6 max-w-xl whitespace-pre-line text-sm leading-relaxed text-brand-muted md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
        >
          {description}
        </motion.p>
      )}
    </header>
  );
}
