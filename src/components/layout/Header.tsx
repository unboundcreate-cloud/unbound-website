"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { studio } from "@/data/clients";
import { Logo } from "@/components/ui/Logo";

const NAV = [
  { label: "Works", href: "/works" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "bg-black/60 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="section-padding flex h-16 items-center justify-between md:h-20">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label="Unbound Studio 홈"
          >
            <Logo variant="white" height={20} />
          </Link>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-[5px]"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-px w-7 bg-white"
            />
            <motion.span
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="block h-px w-7 bg-white"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-px w-7 bg-white"
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-brand-black"
          >
            <nav className="section-padding flex flex-1 flex-col justify-center gap-2 pt-20">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.6 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 font-display uppercase leading-[0.95] text-white transition-colors hover:text-brand-accent"
                  >
                    <span className="text-[14vw] transition-transform duration-300 group-hover:translate-x-4 md:text-[7vw]">
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="section-padding flex flex-col gap-4 border-t border-white/10 py-8 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex gap-6 font-mono text-[13px] uppercase tracking-[0.2em] text-brand-muted">
                <a href={studio.social.youtube} target="_blank" rel="noreferrer" className="hover:text-white">YouTube</a>
                <a href={studio.social.instagram} target="_blank" rel="noreferrer" className="hover:text-white">Instagram</a>
              </div>
              <a
                href={`mailto:${studio.email}`}
                className="font-mono text-[13px] uppercase tracking-[0.2em] text-white/70 hover:text-brand-accent"
              >
                {studio.email}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
