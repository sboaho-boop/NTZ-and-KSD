import Image from "next/image";
import Link from "next/link";

export default function IntroSection() {
  return (
    <section className="py-24 lg:py-32 bg-warm-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <div>
            <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-6">
              Who We Are
            </p>
            <h2 className="heading-editorial text-4xl md:text-5xl lg:text-6xl text-charcoal mb-8">
              A Business Built Around Opportunity
            </h2>
            <div className="line-separator mb-8" />
            <div className="space-y-5 text-stone-dark leading-relaxed">
              <p>
                NTZ SPRL and KSD SARL are Congolese companies operating from
                Kinshasa, Democratic Republic of Congo.
              </p>
              <p>
                The businesses are led by Franck Nyimilongo Pieme and are
                focused on identifying opportunities, developing commercial
                relationships and building sustainable business operations.
              </p>
              <p>
                Our approach combines local understanding, strategic thinking
                and a commitment to creating long-term value.
              </p>
            </div>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-10 text-[13px] font-semibold tracking-widest uppercase text-charcoal hover:text-gold transition-colors duration-300 group"
            >
              Discover Our Story
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/office.jpg"
                alt="Modern office space"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 border border-gold/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
