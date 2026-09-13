export default async function QuoteSection() {
  let quote = "Our objective is not simply to pursue opportunities, but to build businesses and relationships that create lasting value.";
  let author = "Franck Nyimilongo Pieme";

  try {
    const { db } = await import("@/lib/db");
    const quoteSetting = await db.settings.findUnique({ where: { key: "management_quote" } });
    const authorSetting = await db.settings.findUnique({ where: { key: "quote_author" } });
    if (quoteSetting) quote = quoteSetting.value;
    if (authorSetting) author = authorSetting.value;
  } catch {}

  return (
    <section className="py-24 lg:py-32 bg-charcoal">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12 text-center">
        <div className="w-12 h-px bg-gold mx-auto mb-12" />
        <blockquote className="heading-editorial text-2xl md:text-3xl lg:text-4xl text-warm-white/90 leading-relaxed mb-10">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div>
          <p className="text-warm-white font-medium">{author}</p>
          <p className="text-[11px] tracking-[0.25em] uppercase text-gold mt-1">
            Management
          </p>
        </div>
        <div className="w-12 h-px bg-gold mx-auto mt-12" />
      </div>
    </section>
  );
}
