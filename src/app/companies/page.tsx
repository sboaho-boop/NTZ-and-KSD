import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Companies",
  description: "Two companies. One commitment to building meaningful business opportunities in the Democratic Republic of Congo.",
};

export default function CompaniesPage() {
  return (
    <>
      <section className="py-24 lg:py-32 bg-charcoal-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-gold mb-6">Our Companies</p>
          <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl text-warm-white mb-6">Our Companies</h1>
          <div className="line-separator mb-8" />
          <p className="text-xl text-warm-white/60 max-w-2xl">
            Two companies. One commitment to building meaningful business opportunities in the Democratic Republic of Congo.
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* NTZ */}
            <div className="group">
              <div className="relative aspect-[16/10] overflow-hidden flex flex-col justify-end p-10 lg:p-14 mb-8 transition-transform duration-700 group-hover:scale-[1.01]">
                <Image
                  src="/images/business-strategy.jpg"
                  alt="NTZ SPRL"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/90 via-charcoal-dark/30 to-transparent" />
                <div className="relative z-10">
                  <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-3">Company 01</p>
                  <h2 className="heading-display text-3xl lg:text-4xl text-warm-white mb-2">NTZ SPRL</h2>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <p className="text-stone-dark leading-relaxed">
                  A Congolese company led by its Associé Gérant, Franck Nyimilongo Pieme. Operating from Kinshasa-Gombe, NTZ SPRL pursues strategic business opportunities and develops lasting commercial relationships.
                </p>
                <p className="text-sm text-stone">
                  <strong className="text-charcoal">Leadership:</strong> Franck Nyimilongo Pieme — Associé Gérant
                </p>
              </div>
              <Link href="/companies/ntz-sprl" className="inline-flex items-center gap-2 px-8 py-3 bg-charcoal text-warm-white text-[13px] font-semibold tracking-widest uppercase hover:bg-charcoal-light transition-colors duration-300">
                Explore NTZ →
              </Link>
            </div>

            {/* KSD */}
            <div className="group">
              <div className="relative aspect-[16/10] overflow-hidden flex flex-col justify-end p-10 lg:p-14 mb-8 transition-transform duration-700 group-hover:scale-[1.01]">
                <Image
                  src="/images/diamond.jpg"
                  alt="KSD SARL"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth-dark/90 via-earth-dark/30 to-transparent" />
                <div className="relative z-10">
                  <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-3">Company 02</p>
                  <h2 className="heading-display text-3xl lg:text-4xl text-warm-white mb-1">KSD SARL</h2>
                  <p className="font-serif text-xl text-warm-white/60">Kasai Sud Diamant</p>
                </div>
              </div>
              <div className="space-y-4 mb-8">
                <p className="text-stone-dark leading-relaxed">
                  A company operating under the Kasai Sud Diamant identity, connecting opportunity, resources and commercial ambition in the Democratic Republic of Congo.
                </p>
                <p className="text-sm text-stone">
                  <strong className="text-charcoal">Leadership:</strong> Franck Nyimilongo Pieme — Directeur Général
                </p>
              </div>
              <Link href="/companies/ksd-sarl" className="inline-flex items-center gap-2 px-8 py-3 bg-earth-dark text-warm-white text-[13px] font-semibold tracking-widest uppercase hover:bg-earth transition-colors duration-300">
                Explore KSD →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
