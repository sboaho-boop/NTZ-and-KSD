import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OPPORTUNITIES, getOpportunity } from "@/lib/opportunities";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return OPPORTUNITIES.map((o) => ({ slug: o.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const opp = getOpportunity(slug);
  if (!opp) return { title: "Opportunity Not Found" };
  return { title: opp.name, description: opp.summary };
}

export default async function OpportunityPage({ params }: Props) {
  const { slug } = await params;
  const opp = getOpportunity(slug);
  if (!opp) notFound();

  return (
    <>
      <section className="py-24 lg:py-32 bg-charcoal-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Link
            href="/opportunities"
            className="text-[12px] font-medium tracking-widest uppercase text-gold hover:text-gold-light transition-colors mb-8 inline-block"
          >
            ← Back to Opportunities
          </Link>
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-warm-white/40 mb-4">
            {opp.sector}
          </p>
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-warm-white mb-4">
            {opp.name}
          </h1>
          <div className="line-separator mb-6" />
          <div className="flex flex-wrap items-center gap-4 text-sm text-warm-white/50">
            <span>{opp.entity}</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span>{opp.location}</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span>{opp.status}</span>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-[900px] mx-auto px-6 lg:px-12">
          <div className="relative aspect-[16/9] overflow-hidden mb-12">
            <Image
              src={opp.image}
              alt={opp.name}
              fill
              sizes="(min-width: 900px) 900px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="space-y-5 text-stone-dark leading-relaxed text-lg">
            {opp.description.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-12 p-8 border border-border">
            <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-5">
              Key Facts
            </p>
            <ul className="space-y-3">
              {opp.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-stone-dark">
                  <span className="mt-2 w-1 h-1 rounded-full bg-gold shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 p-8 border border-border bg-warm-cream">
            <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-5">
              Partnership Options
            </p>
            <ul className="space-y-3">
              {opp.collaboration.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-stone-dark">
                  <span className="mt-2 w-1 h-1 rounded-full bg-gold shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {opp.gallery.length > 0 && (
        <section className="pb-24 lg:pb-32 bg-warm-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <h2 className="heading-editorial text-3xl md:text-4xl text-charcoal mb-8">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {opp.gallery.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden bg-warm-cream border border-border"
                >
                  <Image
                    src={src}
                    alt={`${opp.name} — image ${i + 1}`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
