import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about NTZ SPRL, KSD SARL and Terrakili SARL — Congolese companies building sustainable businesses and modern agriculture in the Democratic Republic of Congo.",
};

const values = [
  {
    title: "Integrity",
    description: "We conduct our business relationships with honesty and transparency.",
  },
  {
    title: "Responsibility",
    description: "We recognize our responsibility to our partners, communities and stakeholders.",
  },
  {
    title: "Excellence",
    description: "We pursue high standards in the way we operate and deliver.",
  },
  {
    title: "Partnership",
    description: "We believe strong relationships create stronger businesses.",
  },
  {
    title: "Long-Term Thinking",
    description: "We focus on sustainable opportunities rather than short-term gains.",
  },
];

export default async function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 lg:py-32 bg-charcoal-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-gold mb-6">About</p>
          <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl text-warm-white mb-6">About Us</h1>
          <div className="line-separator" />
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-6">Our Story</p>
              <h2 className="heading-editorial text-4xl md:text-5xl text-charcoal mb-8">
                A Business Built Around Opportunity
              </h2>
              <div className="line-separator mb-8" />
              <div className="space-y-5 text-stone-dark leading-relaxed">
                <p>
                  NTZ SPRL and KSD SARL (Kasai Sud Diamant) are Congolese companies operating from Kinshasa, Democratic Republic of Congo.
                </p>
                <p>
                  Founded under the leadership of Franck Nyimilongo Pieme, the companies were established with a clear vision: to identify opportunities in one of Africa&apos;s most resource-rich nations and build sustainable business operations that create lasting value.
                </p>
                <p>
                  The group&apos;s third company, Terrakili SARL, is dedicated to agriculture and agribusiness. Through the Mweka Agri-Project, it is developing a commercial crop farming operation on a 48,000-hectare concession in the Kasai province — building modern farming capacity, creating jobs and strengthening food security in the DRC.
                </p>
                <p>
                  From our base in Kinshasa-Gombe, we combine deep local knowledge with an international approach to business, working with partners and stakeholders across the Democratic Republic of Congo and beyond.
                </p>
                <p>
                  Our approach is grounded in professionalism, integrity and a commitment to developing businesses that contribute to economic growth while serving the interests of all stakeholders.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/about-drc.jpg"
                  alt="Misty Congolese landscape"
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

      {/* Vision & Mission */}
      <section className="py-24 lg:py-32 bg-warm-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="p-10 lg:p-14 bg-warm-white border border-border">
              <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-6">Our Vision</p>
              <h3 className="heading-editorial text-3xl text-charcoal mb-6 leading-snug">
                To build sustainable businesses that create long-term value and meaningful opportunities.
              </h3>
            </div>
            <div className="p-10 lg:p-14 bg-warm-white border border-border">
              <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-6">Our Mission</p>
              <h3 className="heading-editorial text-3xl text-charcoal mb-6 leading-snug">
                To identify opportunities, develop strong partnerships and operate with professionalism, responsibility and integrity.
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="heading-editorial text-4xl md:text-5xl text-charcoal mb-4">Our Values</h2>
            <div className="line-separator mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <div key={value.title} className="p-8 border border-border hover:border-gold/30 transition-colors duration-500">
                <h3 className="heading-editorial text-xl text-charcoal mb-4 uppercase tracking-wider text-[13px] font-medium">
                  {value.title}
                </h3>
                <div className="w-8 h-px bg-gold mb-4" />
                <p className="text-stone-dark leading-relaxed text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
