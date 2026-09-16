import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { projectImage } from "@/lib/images";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore selected projects and business activities by NTZ SPRL, KSD SARL and Terrakili SARL.",
};

export default async function ProjectsPage() {
  let projects = [];
  try {
    projects = await db.project.findMany({ orderBy: { createdAt: "desc" } });
  } catch {
    projects = [
      { id: "1", name: "Mweka Agri-Project", slug: "mweka-agri-project", location: "Mweka Territory, Kasai Province, DRC", sector: "Agriculture & Agribusiness", status: "Planning", description: "A commercial crop farming project by Terrakili SARL on about 48,000 hectares in the Kasai province — an initial 1,310-hectare phase growing maize, cassava, soybeans, beans, banana and cereals, with job creation, smallholder training and community development at its core." },
      { id: "2", name: "Mineral Exploration Initiative", slug: "mineral-exploration-initiative", location: "Kasai Region, DRC", sector: "Natural Resources", status: "Planning", description: "A preliminary exploration initiative targeting mineral-rich areas in the Kasai region." },
      { id: "3", name: "Kinshasa Commercial Hub", slug: "kinshasa-commercial-hub", location: "Kinshasa-Gombe, DRC", sector: "Investment & Development", status: "Planning", description: "A commercial development project in Kinshasa-Gombe aimed at creating modern business infrastructure." },
    ];
  }

  return (
    <>
      <section className="py-24 lg:py-32 bg-charcoal-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-gold mb-6">Projects</p>
          <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl text-warm-white mb-6">Our Projects</h1>
          <div className="line-separator mb-8" />
          <p className="text-xl text-warm-white/60 max-w-2xl">Explore selected projects and business activities.</p>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.slug}`} className="group border border-border hover:border-gold/30 transition-all duration-500">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={projectImage(project)}
                    alt={project.name}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-stone">{project.location}</span>
                    <span className="w-1 h-1 rounded-full bg-gold" />
                    <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-stone">{project.status}</span>
                  </div>
                  <h3 className="heading-editorial text-2xl text-charcoal mb-3 group-hover:text-gold-dark transition-colors duration-300">{project.name}</h3>
                  <p className="text-stone-dark leading-relaxed">{project.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
