import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { projectImage } from "@/lib/images";

type Props = { params: Promise<{ slug: string }> };

type Project = {
  id: string;
  name: string;
  slug: string;
  location: string;
  sector: string;
  status: string;
  description: string;
  image: string | null;
  startDate: string | null;
};

const FALLBACK_PROJECTS: Project[] = [
  {
    id: "1",
    name: "Mweka Agri-Project",
    slug: "mweka-agri-project",
    location: "Mweka Territory, Kasai Province, DRC",
    sector: "Agriculture & Agribusiness",
    status: "Planning",
    description:
      "A commercial crop farming project developed by Terrakili SARL on an agricultural concession of about 48,000 hectares in the Kasai province. The first phase covers approximately 1,310 hectares near Ndambo, growing maize, cassava, soybeans, beans, banana and cereals.\n\nThe concession — about 25 km from the town of Mweka and served by the Ilebo–Lubumbashi railway — was awarded to Terrakili by decrees of the Kasai Provincial Governor and the President of the Republic, and is leased for 25 years, renewable. The project uses modern machinery, drones, GIS and IoT, and is managed in partnership with experienced South African commercial farmers as part of a wider commitment to job creation, smallholder farmer training and food security.",
    image: "/images/mweka-site-1.jpg",
    startDate: null,
  },
  {
    id: "2",
    name: "Mineral Exploration Initiative",
    slug: "mineral-exploration-initiative",
    location: "Kasai Region, DRC",
    sector: "Natural Resources",
    status: "Planning",
    description:
      "A preliminary exploration initiative targeting mineral-rich areas in the Kasai region. This project is in its early planning stages and focuses on identifying viable resource extraction opportunities.",
    image: "/images/industry.jpg",
    startDate: null,
  },
  {
    id: "3",
    name: "Kinshasa Commercial Hub",
    slug: "kinshasa-commercial-hub",
    location: "Kinshasa-Gombe, DRC",
    sector: "Investment & Development",
    status: "Planning",
    description:
      "A commercial development project in Kinshasa-Gombe aimed at creating modern business infrastructure. Currently in the feasibility and planning stage.",
    image: "/images/cranes.jpg",
    startDate: null,
  },
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await db.project.findUnique({ where: { slug } });
    if (!project) return { title: "Project Not Found" };
    return { title: project.name, description: project.description };
  } catch {
    return { title: "Project" };
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  let project = FALLBACK_PROJECTS.find((p) => p.slug === slug) ?? null;
  try {
    const found = await db.project.findUnique({ where: { slug } });
    if (found) project = found;
  } catch {}

  if (!project) notFound();

  return (
    <>
      <section className="py-24 lg:py-32 bg-charcoal-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Link href="/projects" className="text-[12px] font-medium tracking-widest uppercase text-gold hover:text-gold-light transition-colors mb-8 inline-block">
            ← Back to Projects
          </Link>
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-warm-white/40 mb-4">{project.sector}</p>
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl text-warm-white mb-4">{project.name}</h1>
          <div className="line-separator mb-6" />
          <div className="flex items-center gap-4 text-sm text-warm-white/50">
            <span>{project.location}</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span>{project.status}</span>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          <div className="relative aspect-[16/9] overflow-hidden mb-12">
            <Image
              src={projectImage(project)}
              alt={project.name}
              fill
              sizes="(min-width: 768px) 800px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="prose max-w-none">
            <div className="space-y-5 text-stone-dark leading-relaxed text-lg">
              {project.description.split("\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          {project.startDate && (
            <div className="mt-12 p-6 border border-border">
              <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-2">Start Date</p>
              <p className="text-charcoal">{project.startDate}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
