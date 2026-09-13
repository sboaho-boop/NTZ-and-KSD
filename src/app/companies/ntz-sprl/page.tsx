import type { Metadata } from "next";
import Image from "next/image";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "NTZ SPRL",
  description: "NTZ SPRL — A Congolese company led by Franck Nyimilongo Pieme, pursuing strategic business opportunities in the Democratic Republic of Congo.",
};

export default async function NTZPage() {
  let company: Awaited<ReturnType<typeof db.company.findUnique>> | null = null;
  let activities: Awaited<ReturnType<typeof db.activity.findMany>> = [];
  let projects: Awaited<ReturnType<typeof db.project.findMany>> = [];
  try {
    company = await db.company.findUnique({ where: { slug: "ntz-sprl" } });
    activities = await db.activity.findMany({ where: { companyId: company?.id } });
    projects = await db.project.findMany({ where: { companyId: company?.id } });
  } catch {}

  return (
    <>
      <section className="py-24 lg:py-32 bg-charcoal">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-gold mb-6">Company</p>
          <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl text-warm-white mb-4">NTZ SPRL</h1>
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
                <p>{company?.description || "A Congolese company led by its Associé Gérant, Franck Nyimilongo Pieme. Operating from Kinshasa-Gombe, NTZ SPRL pursues strategic business opportunities and develops lasting commercial relationships."}</p>
                <p>NTZ SPRL is focused on identifying opportunities, developing commercial relationships and building sustainable business operations in the Democratic Republic of Congo.</p>
              </div>

              <div className="relative aspect-[16/9] overflow-hidden mt-12 mb-16">
                <Image
                  src="/images/office.jpg"
                  alt="NTZ SPRL — modern office space"
                  fill
                  sizes="(min-width: 1024px) 850px, 100vw"
                  className="object-cover"
                />
              </div>

              {activities.length > 0 && (
                <div className="mt-16">
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
                <p className="text-sm text-stone mt-1">Associé Gérant</p>
              </div>
              <div className="p-8 border border-border">
                <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-4">Location</p>
                <p className="text-sm text-stone-dark leading-relaxed">
                  Avenue Katanga N°02<br />Appartement A1<br />Kinshasa-Gombe<br />Democratic Republic of Congo
                </p>
              </div>
              <div className="p-8 border border-border">
                <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-4">Contact</p>
                <p className="text-sm text-stone-dark">
                  <a href="mailto:fnyimilongo@yahoo.fr" className="hover:text-gold transition-colors">fnyimilongo@yahoo.fr</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
