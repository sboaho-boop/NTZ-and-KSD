import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { newsImage } from "@/lib/images";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news and updates from NTZ SPRL, KSD SARL and Terrakili SARL.",
};

export default async function NewsPage() {
  let articles = [];
  try {
    articles = await db.news.findMany({
      where: { published: true },
      orderBy: { date: "desc" },
    });
  } catch {
    articles = [
      {
        id: "1", title: "Terrakili SARL Gains 48,000-Hectare Agricultural Concession in Kasai", slug: "terrakili-agricultural-concession-kasai",
        category: "Announcements", date: new Date().toISOString(), summary: "Terrakili SARL holds a 48,000-hectare agricultural concession in the Kasai province, awarded by provincial and national decrees and leased for 25 years.",
      },
      {
        id: "2", title: "The Mweka Agri-Project: Commercial Farming for Food Security", slug: "mweka-agri-project-commercial-farming",
        category: "Industry", date: new Date().toISOString(), summary: "The Mweka Agri-Project combines commercial crop farming with job creation, smallholder training and community development in the Kasai province.",
      },
      {
        id: "3", title: "Terrakili Partners with INERA and CAPSA to Train Smallholder Farmers in Kasai", slug: "terrakili-smallholder-farmer-training-kasai",
        category: "Community", date: new Date().toISOString(), summary: "The Mweka Agri-Project partners with INERA and CAPSA to train smallholder farmers and build modern agricultural capacity in the Kasai province.",
      },
      {
        id: "4", title: "Establishment of NTZ SPRL and KSD SARL", slug: "establishment-of-ntz-sprl-and-ksd-sarl",
        category: "Company News", date: new Date().toISOString(), summary: "NTZ SPRL and KSD SARL (Kasai Sud Diamant) have been established in Kinshasa, DRC, under the leadership of Franck Nyimilongo Pieme.",
      },
      {
        id: "5", title: "KSD SARL — Kasai Sud Diamant Launch", slug: "ksd-sarl-kasai-sud-diamant-launch",
        category: "Announcements", date: new Date().toISOString(), summary: "KSD SARL launches operations under the Kasai Sud Diamant brand, focusing on natural resources in the DRC.",
      },
      {
        id: "6", title: "Building Business in the Democratic Republic of Congo", slug: "building-business-in-drc",
        category: "Industry", date: new Date().toISOString(), summary: "Exploring the opportunities and challenges of building sustainable business in the DRC.",
      },
      {
        id: "7", title: "Mweka Agri-Project Plans 4–5 MW Mini-Hydro Plant on the Luekedi River", slug: "mweka-agri-project-mini-hydro-luekedi-river",
        category: "Energy", date: new Date().toISOString(), summary: "The Mweka Agri-Project plans a 4–5 MW mini-hydro plant on the Luekedi River to power its operations and neighbouring communities.",
      },
      {
        id: "8", title: "How the Mweka Agri-Project Connects to Its Markets", slug: "mweka-agri-project-logistics-rail-river-road",
        category: "Industry", date: new Date().toISOString(), summary: "The Mweka Agri-Project links to market through the Ilebo–Lubumbashi railway, the Kasai River and key road outlets, supported by on-site storage and milling capacity.",
      },
    ];
  }

  return (
    <>
      <section className="py-24 lg:py-32 bg-charcoal-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-gold mb-6">News</p>
          <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl text-warm-white mb-6">Latest News</h1>
          <div className="line-separator" />
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link key={article.id} href={`/news/${article.slug}`} className="group border border-border hover:border-gold/30 transition-all duration-500">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={newsImage(article)}
                    alt={article.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-gold">{article.category}</span>
                    <span className="w-1 h-1 rounded-full bg-stone-light" />
                    <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-stone">{formatDate(article.date)}</span>
                  </div>
                  <h2 className="heading-editorial text-xl text-charcoal mb-3 group-hover:text-gold-dark transition-colors duration-300">{article.title}</h2>
                  <p className="text-stone-dark text-sm leading-relaxed">{article.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
