import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = await db.news.findUnique({ where: { slug } });
    if (!article) return { title: "Article Not Found" };
    return { title: article.title, description: article.summary };
  } catch {
    return { title: "News Article" };
  }
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  let article = null;
  try {
    article = await db.news.findUnique({ where: { slug } });
  } catch {}

  if (!article) notFound();

  return (
    <>
      <section className="py-24 lg:py-32 bg-charcoal-dark">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          <Link href="/news" className="text-[12px] font-medium tracking-widest uppercase text-gold hover:text-gold-light transition-colors mb-8 inline-block">
            ← Back to News
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-gold">{article.category}</span>
            <span className="w-1 h-1 rounded-full bg-warm-white/30" />
            <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-warm-white/50">{formatDate(article.date)}</span>
          </div>
          <h1 className="heading-display text-4xl md:text-5xl text-warm-white mb-6 leading-tight">{article.title}</h1>
          <div className="line-separator" />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-warm-white">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          {article.image && (
            <div className="relative aspect-[16/9] overflow-hidden mb-12">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(min-width: 768px) 800px, 100vw"
                className="object-cover"
              />
            </div>
          )}
          <div className="space-y-5 text-stone-dark leading-relaxed text-lg">
            {article.content.split("\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
