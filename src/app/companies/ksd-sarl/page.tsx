import type { Metadata } from "next";
import Image from "next/image";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "KSD SARL — Kasai Sud Diamant",
  description: "KSD SARL (Kasai Sud Diamant) — Connecting opportunity, resources and commercial ambition in the Democratic Republic of Congo.",
};

export default async function KSDPage() {
  let company: Awaited<ReturnType<typeof db.company.findUnique>> | null = null;
  let activities: Awaited<ReturnType<typeof db.activity.findMany>> = [];
  let projects: Awaited<ReturnType<typeof db.project.findMany>> = [];
  try {
    company = await db.company.findUnique({ where: { slug: "ksd-sarl" } });
    activities = await db.activity.findMany({ where: { companyId: company?.id } });
    projects = await db.project.findMany({ where: { companyId: company?.id } });
  } catch {}

  return (
    <>
      <section className="py-24 lg:py-32 bg-earth-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-gold mb-6">Company</p>
          <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl text-warm-white mb-2">KSD SARL</h1>
          <p className="font-serif text-2xl md:text-3xl text-warm-white/60 mb-6">Kasai Sud Diamant</p>
          <div className="line-separator" />
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-16">
            <div>
              <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-6">Overview</p>
              <h2 className="heading-editorial text-3xl md:text-4xl text-charcoal mb-8">Company Overview</h2>
              <div className="line-separator mb-8" />
              <div className="space-y-5 text-stone-dark leading-relaxed">
                <p>{company?.description || "KSD SARL operates under the Kasai Sud Diamant identity, connecting opportunity, resources and commercial ambition in the Democratic Republic of Congo."}</p>
                <p>Led by Directeur Général Franck Nyimilongo Pieme, KSD SARL focuses on the natural resources sector, leveraging the DRC&apos;s significant mineral wealth and the strategic importance of the Kasai region.</p>
                <p>The company is committed to responsible business practices, sustainable development and creating value for all stakeholders.</p>
              </div>

              <div className="relative aspect-[16/9] overflow-hidden mt-12 mb-16">
                <Image
                  src="/images/diamond.jpg"
                  alt="KSD SARL — diamond"
                  fill
                  sizes="(min-width: 1024px) 850px, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Decorative mineral pattern */}
              <div className="my-16 flex justify-center gap-3">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="w-2 h-2 border border-gold/30 rotate-45" style={{ opacity: 0.2 + i * 0.1 }} />
                ))}
              </div>

              {activities.length > 0 && (
                <div>
                  <h3 className="heading-editorial text-2xl text-charcoal mb-8">Activities</h3>
                  <div className="space-y-0">
                    {activities.map((activity, index) => (
                      <div key={activity.id} className="py-6 border-t border-border">
                        <div className="flex items-start gap-6">
                          <span className="font-serif text-3xl font-light text-gold/40">{String(index + 1).padStart(2, "0")}</span>
                          <div>
                            <h4 className="heading-editorial text-xl text-charcoal mb-2">{activity.title}</h4>
                            <p className="text-stone-dark text-sm leading-relaxed">{activity.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {projects.length > 0 && (
                <div className="mt-16">
                  <h3 className="heading-editorial text-2xl text-charcoal mb-8">Projects</h3>
                  <div className="space-y-6">
                    {projects.map((project) => (
                      <div key={project.id} className="p-6 border border-border">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-stone">{project.location}</span>
                          <span className="w-1 h-1 rounded-full bg-gold" />
                          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-stone">{project.status}</span>
                        </div>
                        <h4 className="heading-editorial text-lg text-charcoal mb-2">{project.name}</h4>
                        <p className="text-stone-dark text-sm">{project.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="p-8 border border-border">
                <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-4">Leadership</p>
                <p className="text-charcoal font-medium">Franck Nyimilongo Pieme</p>
                <p className="text-sm text-stone mt-1">Directeur Général</p>
              </div>
              <div className="p-8 border border-border">
                <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-4">Location</p>
                <p className="text-sm text-stone-dark leading-relaxed">
                  Kinshasa-Gombe<br />Democratic Republic of Congo
                </p>
              </div>
              <div className="p-8 border border-border">
                <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-4">Contact</p>
                <p className="text-sm text-stone-dark">
                  <a href="mailto:fpnyimilongo@gmail.com" className="hover:text-gold transition-colors">fpnyimilongo@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
