"use client";

import { motion } from "framer-motion";

export function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 1 }}
      className="flex flex-col items-center gap-3"
    >
      <span className="font-mono text-[12px] uppercase tracking-[0.3em] text-white/60">
        Scroll
      </span>
      <span className="relative block h-12 w-px overflow-hidden bg-white/20">
        <motion.span
          className="absolute left-0 top-0 block h-1/2 w-full bg-brand-accent"
          animate={{ y: ["-100%", "200%"] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </motion.div>
  );
}
