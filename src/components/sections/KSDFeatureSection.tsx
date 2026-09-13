import Image from "next/image";
import Link from "next/link";

export default function KSDFeatureSection() {
  return (
    <section className="relative py-32 lg:py-40 bg-charcoal-dark overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/diamond.jpg"
        alt="Diamond"
        fill
        sizes="100vw"
        className="object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-charcoal-dark/80" />

      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23b8960c' fill-opacity='1'/%3E%3C/svg%3E")`
      }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-gold/80 mb-6">
            KSD SARL
          </p>
          <h2 className="heading-display text-5xl md:text-6xl lg:text-7xl text-warm-white mb-8">
            Kasai Sud Diamant
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <p className="text-xl text-warm-white/50 leading-relaxed mb-12 max-w-xl mx-auto">
            Connecting opportunity, resources and commercial ambition in the
            Democratic Republic of Congo.
          </p>

          {/* Decorative mineral/diamond pattern */}
          <div className="flex justify-center gap-4 mb-12">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 border border-gold/30 rotate-45"
                style={{ opacity: 0.3 + i * 0.15 }}
              />
            ))}
          </div>

          <Link
            href="/companies/ksd-sarl"
            className="inline-flex items-center gap-2 px-8 py-4 border border-gold/50 text-gold text-[13px] font-semibold tracking-widest uppercase hover:bg-gold hover:text-charcoal-dark transition-all duration-300"
          >
            Discover KSD
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
