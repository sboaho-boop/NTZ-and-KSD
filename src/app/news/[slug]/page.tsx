import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: Date;
  image: string | null;
  content: string;
  summary: string;
};

const FALLBACK_ARTICLES: Article[] = [
  {
    id: "1",
    title: "Terrakili SARL Gains 48,000-Hectare Agricultural Concession in Kasai",
    slug: "terrakili-agricultural-concession-kasai",
    category: "Announcements",
    date: new Date(),
    image: "/images/mweka-field.jpg",
    content:
      "Terrakili SARL has secured an agricultural concession of about 48,000 hectares in the Mweka territory of the Kasai province, Democratic Republic of Congo.\n\nThe land was acquired through a thorough process involving traditional authorities, local departments of the Ministry of Land Affairs and the Ministry of Agriculture, and the provincial and national governments. Decrees were signed by the Governor of the Kasai province for 15,000 hectares and by the President of the Republic for 33,000 hectares.\n\nThe concession comprises thirteen blocks across eight sites — including Ndengamongo II, Itunga Mpende, Ndambo, Itapanya Camp, Inema Makolo, Malongo III, Tena Mashobi and Kin-A-Mbuom — surveyed and demarcated with the Mweka cadastre in 2020. The state leases the concession to Terrakili for 25 years, renewable without limitation.\n\nFarming is planned to begin on the focus areas of Ndambo Bloc 1 and Bloc 2, which together cover about 1,310 hectares.",
    summary:
      "Terrakili SARL holds a 48,000-hectare agricultural concession in the Kasai province, awarded by provincial and national decrees and leased for 25 years.",
  },
  {
    id: "2",
    title: "The Mweka Agri-Project: Commercial Farming for Food Security",
    slug: "mweka-agri-project-commercial-farming",
    category: "Industry",
    date: new Date(),
    image: "/images/mweka-site-2.jpg",
    content:
      "The Mweka Agri-Project is a commercial crop farming initiative developed by Terrakili SARL in the Kasai province of the Democratic Republic of Congo.\n\nThe first phase covers approximately 1,310 hectares near the village of Ndambo, growing maize, cassava, soybeans, beans, banana and cereals. Crops are cultivated with modern machinery and technology — including drones for crop surveillance and spraying, and GIS and IoT for precision farm management.\n\nExperienced South African commercial farmers will manage operations and provide training and upskilling for local personnel, as part of the project's wider goals of creating over 500 permanent jobs, supporting smallholder farmers with training and a market for their produce, and building essential community facilities.\n\nThe project sits about 25 km from the town of Mweka, on the Ilebo–Lubumbashi railway line that links the operation to major markets in Kinshasa and Lubumbashi.",
    summary:
      "The Mweka Agri-Project combines commercial crop farming with job creation, smallholder training and community development in the Kasai province.",
  },
  {
    id: "6",
    title: "Terrakili Partners with INERA and CAPSA to Train Smallholder Farmers in Kasai",
    slug: "terrakili-smallholder-farmer-training-kasai",
    category: "Community",
    date: new Date(),
    image: "/images/mweka-field.jpg",
    content:
      "The Mweka Agri-Project is building on a foundation of local agricultural knowledge to develop modern farming capacity in the Kasai province.\n\nTerrakili works with INERA — the National Institute for Agronomic Study & Research — which has run a research and extension station at Bena-Longo, just 14–20 km from the project's focus area near Ndambo, since the colonial era. Alongside INERA, CAPSA produces and distributes improved seeds and coaches farmers in better cultivation techniques.\n\nThe model is cooperative: experienced commercial farmers transfer modern methods and soil management skills to local producers, while surrounding technical schools (ITV for veterinary sciences and ITA for agricultural sciences) provide a growing skills base the project intends to support.\n\nThe project's goals include creating more than 150 permanent jobs and 500+ casual roles, guaranteeing smallholder farmers a reliable market for their produce, and contributing to community infrastructure such as a school, health facilities and access to water and electricity.",
    summary:
      "The Mweka Agri-Project partners with INERA and CAPSA to train smallholder farmers and build modern agricultural capacity in the Kasai province.",
  },
  {
    id: "3",
    title: "Establishment of NTZ SPRL and KSD SARL",
    slug: "establishment-of-ntz-sprl-and-ksd-sarl",
    category: "Company News",
    date: new Date(),
    image: "/images/office.jpg",
    content:
      "NTZ SPRL and KSD SARL (Kasai Sud Diamant) have been established as Congolese companies operating from Kinshasa, Democratic Republic of Congo.\n\nUnder the leadership of Franck Nyimilongo Pieme, the companies are positioned to pursue strategic business opportunities in the DRC and develop lasting commercial relationships with partners and stakeholders.\n\nBoth companies bring a commitment to professionalism, integrity and long-term value creation to the Congolese business landscape.",
    summary:
      "NTZ SPRL and KSD SARL (Kasai Sud Diamant) have been established in Kinshasa, DRC, under the leadership of Franck Nyimilongo Pieme.",
  },
  {
    id: "4",
    title: "KSD SARL — Kasai Sud Diamant Launch",
    slug: "ksd-sarl-kasai-sud-diamant-launch",
    category: "Announcements",
    date: new Date(),
    image: "/images/diamond.jpg",
    content:
      "KSD SARL has officially launched its operations under the Kasai Sud Diamant brand identity.\n\nThe company will focus on opportunities in the natural resources sector, leveraging the DRC's significant mineral wealth and the strategic location of the Kasai region.\n\nKSD SARL aims to build partnerships that create value for all stakeholders while contributing to economic development in the region.",
    summary:
      "KSD SARL launches operations under the Kasai Sud Diamant brand, focusing on natural resources in the DRC.",
  },
  {
    id: "5",
    title: "Building Business in the Democratic Republic of Congo",
    slug: "building-business-in-drc",
    category: "Industry",
    date: new Date(),
    image: "/images/team-working.jpg",
    content:
      "The Democratic Republic of Congo presents significant opportunities for business development across multiple sectors.\n\nWith abundant natural resources, a growing economy and strategic positioning in Central Africa, the DRC offers a compelling environment for companies focused on long-term value creation.\n\nNTZ SPRL and KSD SARL are committed to contributing to this growth while maintaining the highest standards of business practice.",
    summary:
      "Exploring the opportunities and challenges of building sustainable business in the DRC.",
  },
];

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
  let article = FALLBACK_ARTICLES.find((a) => a.slug === slug) ?? null;
  try {
    const found = await db.news.findUnique({ where: { slug } });
    if (found) article = found;
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
