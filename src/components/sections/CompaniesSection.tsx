import Image from "next/image";
import Link from "next/link";

const companies = [
  {
    label: "NTZ SPRL",
    name: "NTZ SPRL",
    description:
      "A Congolese company led by its Associé Gérant, Franck Nyimilongo Pieme.",
    href: "/companies/ntz-sprl",
    image: "/images/business-strategy.jpg",
  },
  {
    label: "KSD SARL",
    name: "KASAI SUD DIAMANT",
    description: "A company operating under the Kasai Sud Diamant identity.",
    href: "/companies/ksd-sarl",
    image: "/images/diamond.jpg",
  },
  {
    label: "TERRAKILI SARL",
    name: "Agriculture & Agribusiness",
    description:
      "Project owner of the Mweka Agri-Project — commercial farming on a 48,000-hectare concession in the Kasai province.",
    href: "/companies/terrakili-sarl",
    image: "/images/mweka-site-1.jpg",
  },
];

export default function CompaniesSection() {
  return (
    <section className="py-24 lg:py-32 bg-warm-cream">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="heading-editorial text-4xl md:text-5xl lg:text-6xl text-charcoal mb-4">
            Our Companies
          </h2>
          <div className="line-separator mx-auto mb-6" />
          <p className="text-stone-dark text-lg max-w-xl mx-auto">
            Three companies. One commitment to building meaningful business
            opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <Link
              key={company.href}
              href={company.href}
              className="group relative overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden flex flex-col justify-end p-10 lg:p-14 transition-transform duration-700 group-hover:scale-[1.02]">
                <Image
                  src={company.image}
                  alt={company.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/90 via-charcoal-dark/30 to-transparent" />
                <div className="relative z-10">
                  <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-3">
                    {company.label}
                  </p>
                  <h3 className="heading-display text-3xl lg:text-4xl text-warm-white mb-3">
                    {company.name}
                  </h3>
                  <p className="text-warm-white/60 text-sm max-w-md mb-6">
                    {company.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-widest uppercase text-gold group-hover:text-gold-light transition-colors duration-300">
                    Explore{" "}
                    {company.label.split(" ")[0]}{" "}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
