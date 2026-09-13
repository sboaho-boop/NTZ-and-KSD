import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { projectImage } from "@/lib/images";

export default async function ProjectsSection() {
  let projects = [];
  try {
    projects = await db.project.findMany({
      where: { featured: true },
      take: 3,
    });
  } catch {
    projects = [
      {
        id: "1",
        name: "Mineral Exploration Initiative",
        slug: "mineral-exploration-initiative",
        location: "Kasai Region, DRC",
        sector: "Natural Resources",
        status: "Planning",
        description: "A preliminary exploration initiative targeting mineral-rich areas in the Kasai region.",
      },
      {
        id: "2",
        name: "Kinshasa Commercial Hub",
        slug: "kinshasa-commercial-hub",
        location: "Kinshasa-Gombe, DRC",
        sector: "Investment & Development",
        status: "Planning",
        description: "A commercial development project in Kinshasa-Gombe aimed at creating modern business infrastructure.",
      },
    ];
  }

  return (
    <section className="py-24 lg:py-32 bg-warm-cream">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <h2 className="heading-editorial text-4xl md:text-5xl lg:text-6xl text-charcoal mb-4">
              Our Projects
            </h2>
            <div className="line-separator mb-6" />
            <p className="text-stone-dark text-lg max-w-xl">
              Explore selected projects and business activities.
            </p>
          </div>
          <Link
            href="/projects"
            className="mt-6 md:mt-0 text-[12px] font-semibold tracking-widest uppercase text-charcoal hover:text-gold transition-colors duration-300"
          >
            View All Projects →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-warm-white border border-border hover:border-gold/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={projectImage(project)}
                  alt={project.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-stone">
                    {project.location}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gold" />
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-stone">
                    {project.status}
                  </span>
                </div>
                <h3 className="heading-editorial text-xl text-charcoal mb-3 group-hover:text-gold-dark transition-colors duration-300">
                  {project.name}
                </h3>
                <p className="text-stone-dark text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-widest uppercase text-charcoal hover:text-gold transition-colors duration-300"
                >
                  View Project
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
