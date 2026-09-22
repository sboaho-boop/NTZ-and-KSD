import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { OPPORTUNITIES } from "@/lib/opportunities";

export const metadata: Metadata = {
  title: "Opportunities",
  description:
    "Business and partnership opportunities across the Kasai province — diamond mining, hydroelectric power, quarry, forestry and agriculture, presented by the NTZ SPRL and KSD SARL group.",
};

export default function OpportunitiesPage() {
  return (
    <>
      <section className="py-24 lg:py-32 bg-charcoal-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-gold mb-6">
            Opportunities
          </p>
          <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl text-warm-white mb-6">
            Business &amp; Partnership Opportunities
          </h1>
          <div className="line-separator mb-8" />
          <p className="text-xl text-warm-white/60 max-w-3xl">
            A portfolio of win-win partnership opportunities across the Kasai province —
            spanning diamond mining, hydroelectric power, quarry, forestry and agriculture.
            Each opportunity is open to equity participation, joint venture or acquisition.
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {OPPORTUNITIES.map((opp) => (
              <Link
                key={opp.id}
                href={`/opportunities/${opp.slug}`}
                className="group border border-border hover:border-gold/30 transition-all duration-500 flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={opp.image}
                    alt={opp.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-gold mb-3">
                    {opp.sector}
                  </p>
                  <h2 className="heading-editorial text-2xl text-charcoal mb-3 group-hover:text-gold-dark transition-colors duration-300">
                    {opp.name}
                  </h2>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-stone">
                      {opp.location}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gold" />
                    <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-stone">
                      {opp.status}
                    </span>
                  </div>
                  <p className="text-stone-dark leading-relaxed mb-6">{opp.summary}</p>
                  <span className="mt-auto inline-flex items-center gap-1 text-[11px] font-semibold tracking-widest uppercase text-charcoal group-hover:text-gold transition-colors duration-300">
                    View Opportunity
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
