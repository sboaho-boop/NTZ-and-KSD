import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "TERRAKILI SARL",
  description: "TERRAKILI SARL — A Congolese agricultural development company and the project owner of the Mweka Agri-Project in the Kasai province.",
};

const FALLBACK_DESCRIPTION =
  "A Congolese agricultural development company incorporated in the Democratic Republic of Congo. Terrakili is the project owner and sponsor of the Mweka Agri-Project and holds the leasehold title to an agricultural concession of about 48,000 hectares in the Kasai province, awarded by decrees of the Kasai Provincial Governor and the President of the Republic.";

const FALLBACK_ACTIVITIES = [
  {
    id: "1",
    title: "Agriculture & Agribusiness",
    description:
      "Through Terrakili SARL, we are developing the Mweka Agri-Project — a commercial crop farming operation in the Kasai province growing maize, cassava, soybeans, beans, banana and cereals. Using modern machinery, drones, GIS and IoT, it combines sustainable production with job creation and training for local farmers.",
  },
];

const FALLBACK_PROJECTS = [
  {
    id: "1",
    name: "Mweka Agri-Project",
    slug: "mweka-agri-project",
    location: "Mweka Territory, Kasai Province, DRC",
    status: "Planning",
    description:
      "A commercial crop farming project on about 48,000 hectares in the Kasai province — an initial 1,310-hectare phase growing maize, cassava, soybeans, beans, banana and cereals, with job creation, smallholder training and community development at its core.",
  },
];

export default async function TerrakiliPage() {
  let company: Awaited<ReturnType<typeof db.company.findUnique>> | null = null;
  let activities = FALLBACK_ACTIVITIES;
  let projects = FALLBACK_PROJECTS;
  try {
    company = await db.company.findUnique({ where: { slug: "terrakili-sarl" } });
    const dbActivities = await db.activity.findMany({ where: { companyId: company?.id } });
    const dbProjects = await db.project.findMany({ where: { companyId: company?.id } });
    if (dbActivities.length > 0) activities = dbActivities;
    if (dbProjects.length > 0) projects = dbProjects;
  } catch {}

  const description = company?.description || FALLBACK_DESCRIPTION;

  return (
    <>
      <section className="py-24 lg:py-32 bg-charcoal">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-gold mb-6">Company</p>
          <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl text-warm-white mb-2">TERRAKILI SARL</h1>
          <p className="font-serif text-2xl text-warm-white/50 mb-4">Agriculture & Agribusiness</p>
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
                <p>{description}</p>
                <p>
                  Terrakili was founded by Congolese entrepreneurs Serge Ngandu and Franck Nyimilongo Pieme, who together
                  bring over 50 years of combined experience in agriculture, agri-business and business management in
                  Southern Africa. The company is committed to strengthening food security in the DRC through professional,
                  sustainable commercial farming.
                </p>
              </div>

              <div className="relative aspect-[16/9] overflow-hidden mt-12 mb-16">
                <Image
                  src="/images/mweka-site-1.jpg"
                  alt="Mweka Agri-Project — Kasai province"
                  fill
                  sizes="(min-width: 1024px) 850px, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Concession highlights */}
              <div className="mt-16 mb-16">
                <h3 className="heading-editorial text-2xl text-charcoal mb-8">The Mweka Concession</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { value: "48,000 ha", label: "Concession area" },
                    { value: "1,310 ha", label: "Phase-one focus (Ndambo)" },
                    { value: "25 years", label: "Renewable leasehold" },
                    { value: "6 crops", label: "Maize, cassava, soybeans, beans, banana, cereals" },
                  ].map((stat) => (
                    <div key={stat.label} className="p-6 border border-border">
                      <p className="heading-display text-3xl text-gold-dark mb-3">{stat.value}</p>
                      <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-stone-dark">{stat.label}</p>
                    </div>
                  ))}
                </div>
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
                      <Link key={project.id} href={`/projects/${project.slug}`} className="block p-6 border border-border hover:border-gold/40 transition-colors duration-300">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-stone">{project.location}</span>
                          <span className="w-1 h-1 rounded-full bg-gold" />
                          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-stone">{project.status}</span>
                        </div>
                        <h4 className="heading-editorial text-lg text-charcoal mb-2">{project.name}</h4>
                        <p className="text-stone-dark text-sm">{project.description}</p>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-widest uppercase text-charcoal mt-4">
                          View Project →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="p-8 border border-border">
                <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-4">Leadership</p>
                <p className="text-charcoal font-medium">Serge Ngandu</p>
                <p className="text-sm text-stone mt-1">Co-Founder — Terrakili SARL</p>
                <div className="my-4 border-t border-border" />
                <p className="text-charcoal font-medium">Franck Nyimilongo Pieme</p>
                <p className="text-sm text-stone mt-1">Co-Founder — Terrakili SARL</p>
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