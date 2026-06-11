import { cn } from "@/lib/utils";

export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block border border-white/20 px-3 py-1 font-mono text-[12px] uppercase tracking-[0.2em] text-brand-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
