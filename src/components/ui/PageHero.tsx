export function PageHero({
  label,
  title,
  description,
}: {
  label: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <header className="section-padding pb-12 pt-36 md:pt-44">
      <p className="label-text mb-6">{label}</p>
      <h1 className="font-display text-5xl uppercase leading-[0.85] sm:text-6xl md:text-8xl lg:text-9xl">
        {title}
      </h1>
      {description && (
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-brand-muted md:text-base">
          {description}
        </p>
      )}
    </header>
  );
}
