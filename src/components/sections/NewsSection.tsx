import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { newsImage } from "@/lib/images";

export default async function NewsSection() {
  let articles = [];
  try {
    articles = await db.news.findMany({
      where: { published: true },
      orderBy: { date: "desc" },
      take: 3,
    });
  } catch {
    articles = [
      {
        id: "9",
        title: "KSD SARL Develops Diamond Investment Project in Tshikapa",
        slug: "ksd-diamond-project-tshikapa",
        category: "Announcements",
        date: new Date().toISOString(),
        summary: "KSD SARL is developing a diamond investment project in Tshikapa, Kasai province, with a 2007 resource statement of 16.5 million carats and Kimberley Process-certified exports.",
      },
      {
        id: "1",
        title: "Terrakili SARL Gains 48,000-Hectare Agricultural Concession in Kasai",
        slug: "terrakili-agricultural-concession-kasai",
        category: "Announcements",
        date: new Date().toISOString(),
        summary: "Terrakili SARL holds a 48,000-hectare agricultural concession in the Kasai province, awarded by provincial and national decrees and leased for 25 years.",
      },
      {
        id: "2",
        title: "The Mweka Agri-Project: Commercial Farming for Food Security",
        slug: "mweka-agri-project-commercial-farming",
        category: "Industry",
        date: new Date().toISOString(),
        summary: "The Mweka Agri-Project combines commercial crop farming with job creation, smallholder training and community development in the Kasai province.",
      },
      {
        id: "3",
        title: "Terrakili Partners with INERA and CAPSA to Train Smallholder Farmers in Kasai",
        slug: "terrakili-smallholder-farmer-training-kasai",
        category: "Community",
        date: new Date().toISOString(),
        summary: "The Mweka Agri-Project partners with INERA and CAPSA to train smallholder farmers and build modern agricultural capacity in the Kasai province.",
      },
    ];
  }

  return (
    <section className="py-24 lg:py-32 bg-warm-cream">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <h2 className="heading-editorial text-4xl md:text-5xl lg:text-6xl text-charcoal mb-4">
              Latest News
            </h2>
            <div className="line-separator" />
          </div>
          <Link
            href="/news"
            className="mt-6 md:mt-0 text-[12px] font-semibold tracking-widest uppercase text-charcoal hover:text-gold transition-colors duration-300"
          >
            View All News →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/news/${article.slug}`}
              className="group bg-warm-white border border-border hover:border-gold/30 transition-all duration-500"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={newsImage(article)}
                  alt={article.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-gold">
                    {article.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-stone-light" />
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-stone">
                    {formatDate(article.date)}
                  </span>
                </div>
                <h3 className="heading-editorial text-xl text-charcoal mb-3 group-hover:text-gold-dark transition-colors duration-300">
                  {article.title}
                </h3>
                <p className="text-stone-dark text-sm leading-relaxed mb-6">
                  {article.summary}
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-widest uppercase text-charcoal group-hover:text-gold transition-colors duration-300">
                  Read More
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
