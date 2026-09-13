import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { projectImage } from "@/lib/images";

type Props = { params: Promise<{ slug: string }> };

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
  let project = null;
  try {
    project = await db.project.findUnique({ where: { slug } });
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
