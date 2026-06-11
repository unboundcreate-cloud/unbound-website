"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { services as servicesData } from "@/data/services";

type Svc = {
  number: string;
  title: string;
  subtitle?: string;
  description: string;
  images?: string[];
};

export function ServicesSection({
  hideLabel = false,
  label = "What We Do",
  services = servicesData as Svc[],
  variant = "compact",
}: {
  hideLabel?: boolean;
  label?: string;
  services?: Svc[];
  variant?: "compact" | "showcase";
} = {}) {
  return (
    <section id="services" className="bg-brand-black">
      <div className="section-padding py-24 md:py-32">
        {!hideLabel && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="label-text mb-14"
          >
            {label}
          </motion.p>
        )}

        {variant === "showcase" ? (
          <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 md:gap-y-20">
            {services.map((service, i) => (
              <motion.div
                key={`${service.title}-${i}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              >
                {/* 이미지 2장 세로 배치 */}
                <div className="flex flex-col gap-1">
                  {(service.images ?? []).slice(0, 2).map((img, j) => (
                    <div
                      key={j}
                      className="relative aspect-video overflow-hidden bg-brand-gray"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={service.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>

                <h3 className="mt-6 font-display text-2xl uppercase leading-tight text-white md:text-3xl">
                  {service.title}
                </h3>
                {service.subtitle && (
                  <p className="mt-1 font-mono text-[12px] tracking-[0.15em] text-brand-muted">
                    {service.subtitle}
                  </p>
                )}
                <div className="mt-4 h-px w-full bg-white/15" />
                <p className="mt-4 text-sm leading-relaxed text-brand-muted md:text-base">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <motion.div
                key={`${service.title}-${i}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group border-t border-white/15 pt-6"
              >
                <p className="mb-6 font-number text-xs tracking-[0.2em] text-brand-accent">
                  {service.number}
                </p>
                <h3 className="font-display text-3xl uppercase leading-none text-white transition-colors duration-300 group-hover:text-brand-accent">
                  {service.title}
                </h3>
                {service.subtitle && (
                  <p className="mt-2 font-mono text-[11px] tracking-[0.15em] text-brand-muted">
                    {service.subtitle}
                  </p>
                )}
                <p className="mt-4 min-h-[4rem] text-sm leading-relaxed text-brand-muted">
                  {service.description}
                </p>
                <div className="mt-6">
                  <Button href="/works" className="text-xs">
                    View Works
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
