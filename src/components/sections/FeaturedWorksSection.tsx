"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { WorkCard } from "@/components/ui/WorkCard";
import { worksOrdered } from "@/data/works";

export function FeaturedWorksSection({
  label = "Featured Works",
  viewAllText = "View All",
  viewAllHref = "/works",
}: {
  label?: string;
  viewAllText?: string;
  viewAllHref?: string;
} = {}) {
  const items = worksOrdered.slice(0, 3);

  return (
    <section className="bg-brand-black py-16 md:py-24">
      {/* 섹션 헤더 */}
      <div className="section-padding mb-10 flex items-end justify-between">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="label-text"
        >
          {label}
        </motion.p>
        <Button href={viewAllHref} className="text-xs">
          {viewAllText}
        </Button>
      </div>

      {/* edge-to-edge 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {items.map((work, i) => (
          <WorkCard
            key={work.id}
            work={work}
            index={i}
            ratio="aspect-[16/9]"
          />
        ))}
      </div>
    </section>
  );
}
