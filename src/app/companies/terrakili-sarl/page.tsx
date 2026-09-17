import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "TERRAKILI SARL — Mweka Agri-Project",
  description: "TERRAKILI SARL — A Congolese agricultural development company and the project owner of the Mweka Agri-Project in the Kasai province of the DRC.",
};

const FALLBACK_DESCRIPTION =
  "A Congolese agricultural development company incorporated in the Democratic Republic of Congo. Terrakili is the project owner and sponsor of the Mweka Agri-Project and holds the leasehold title to an agricultural concession of about 48,000 hectares in the Kasai province, awarded by decrees of the Kasai Provincial Governor and the President of the Republic.";

const FALLBACK_ACTIVITIES = [
  {
    id: "1",
    title: "Agriculture & Agribusiness",
    description:
      "Through Terrakili SARL, we are developing the Mweka Agri-Project — a commercial crop farming operation in the Kasai province growing maize, cassava, soybeans, tomato, beans and banana. Using modern machinery, drones, GIS and IoT, it combines sustainable production with job creation and training for local farmers.",
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
      "A commercial crop farming project on about 48,000 hectares in the Kasai province — an initial 1,310-hectare phase near Ndambo growing maize, cassava, soybeans, beans, banana and cereals, with job creation, smallholder training and community development at its core.",
  },
];

const milestones = [
  { year: "2017", title: "Soil & climate studies", description: "Land and soil samples tested at the University of Lubumbashi, confirming fertile sandy-loam soils and a favourable tropical climate." },
  { year: "2020", title: "Survey & demarcation", description: "Cadastral surveys and demarcation of the concession blocks with the Mweka land registry, followed by the state award of the concession." },
  { year: "2021", title: "Milling & storage concept", description: "Plans developed for a maize-flour mill, grain drying and silo storage of up to 30,000 tonnes." },
  { year: "2023", title: "Project documentation", description: "Detailed project descriptions, investor documents and cooperation models finalised with Government of the DRC alignment." },
  { year: "2025", title: "Launch of operations", description: "Business plan on an initial farming footprint of 1,310 hectares near Ndambo, starting up with commercial partners and local labour." },
];

const crops = [
  { name: "Maize", note: "A staple cereal; the project targets a step-change in provincial supply of maize meal." },
  { name: "Cassava", note: "The DRC's number-one staple food, processed into fufu, garri and flour." },
  { name: "Soybeans", note: "A protein-rich crop serving animal feed and humanitarian food blends." },
  { name: "Tomato", note: "High-demand fresh and processed produce for local and regional markets." },
  { name: "Beans", note: "A key protein staple within the regional diet." },
  { name: "Banana", note: "Food security and cash crop with strong local demand." },
];

const impactStats = [
  { value: "150+", label: "Permanent jobs targeted" },
  { value: "500+", label: "Casual jobs in the community" },
  { value: "2", label: "Harvests per year in Kasai" },
  { value: "80%", label: "of DRC food needs currently imported" },
];

const logistics = [
  { route: "Rail", detail: "The Ilebo–Lubumbashi railway line passes through Mweka territory, linking the project to markets in Lubumbashi and to Ilebo for river connection to Kinshasa." },
  { route: "River", detail: "The Kasai River and its tributaries connect the concession to Kinshasa via the Congo River, with plans for tug-and-barge freight." },
  { route: "Road", detail: "Key outlets include Mweka–Bena Makima (~80 km, the recommended outlet), Mweka–Ilebo (~150 km) and Mweka–Luebo (~75 km)." },
  { route: "Energy", detail: "A planned mini-hydro power plant of 4–5 MW on the Luekedi River would supply the farming operation and surrounding community." },
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
              <h2 className="heading-editorial text-3xl md:text-4xl text-charcoal mb-8">Developing Modern Agriculture in the DRC</h2>
              <div className="line-separator mb-8" />
              <div className="space-y-5 text-stone-dark leading-relaxed">
                <p>{description}</p>
                <p>
                  Terrakili was founded by Congolese entrepreneurs Serge Ngandu and Franck Nyimilongo Pieme, and works in close
                  cooperation with experienced South African commercial farmers. The company is committed to strengthening food
                  security in the DRC through professional, sustainable commercial farming that partners with local communities.
                </p>
                <p>
                  The Mweka Agri-Project supports the Government of the DRC&apos;s priorities for agriculture: creating sustainable jobs,
                  replacing costly food imports, reducing poverty in rural areas and revitalising the productive structure of the
                  Congolese countryside.
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

              {/* Vision & Mission */}
              <div className="mt-16 mb-16">
                <h3 className="heading-editorial text-2xl text-charcoal mb-4">Vision & Mission</h3>
                <div className="line-separator mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 border border-border bg-warm-cream/40">
                    <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-4">Vision</p>
                    <p className="text-charcoal leading-relaxed">
                      To develop a successful medium-sized crop farming operation that addresses food security in the Province of Kasai
                      and the DRC — a modern agro-industrial model that builds capacity for smallholder farmers while conserving natural
                      resources.
                    </p>
                  </div>
                  <div className="p-8 border border-border bg-warm-cream/40">
                    <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-4">Mission</p>
                    <p className="text-charcoal leading-relaxed">
                      To model regenerative farming that improves land health, train local farmers in modern methods and soil management,
                      and give smallholders reliable access to markets for their produce.
                    </p>
                  </div>
                </div>
              </div>

              {/* Journey */}
              <div className="mt-16 mb-16">
                <h3 className="heading-editorial text-2xl text-charcoal mb-4">The Journey So Far</h3>
                <div className="line-separator mb-10" />
                <div className="space-y-0">
                  {milestones.map((m) => (
                    <div key={m.year} className="grid grid-cols-[90px_1fr] gap-6 py-6 border-t border-border">
                      <span className="font-serif text-2xl text-gold/50">{m.year}</span>
                      <div>
                        <h4 className="heading-editorial text-xl text-charcoal mb-2">{m.title}</h4>
                        <p className="text-stone-dark text-sm leading-relaxed">{m.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Concession */}
              <div className="mt-16 mb-16">
                <h3 className="heading-editorial text-2xl text-charcoal mb-4">The Concession</h3>
                <div className="line-separator mb-8" />
                <p className="text-stone-dark leading-relaxed mb-8">
                  The concession comprises thirteen blocks across eight sites — Ndengamongo II, Itunga Mpende, Ndambo, Itapanya Camp,
                  Inema Makolo, Malongo III, Tena Mashobi and Kin-A-Mbuom — spread over a radius of roughly 100 km around the town of
                  Mweka. It was acquired in a genuine, registered process: agreements with traditional chiefs, surveys by the land and
                  agriculture administrations, and decrees of the Provincial Governor and the President of the Republic, on a renewable
                  25-year state lease. An area of about 1,310 hectares near Ndambo forms the focus of the first phase.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { value: "48,000 ha", label: "Concession area" },
                    { value: "1,310 ha", label: "Phase-one focus (Ndambo)" },
                    { value: "25 years", label: "Renewable leasehold" },
                    { value: "13 blocks", label: "Across 8 sites" },
                  ].map((stat) => (
                    <div key={stat.label} className="p-6 border border-border">
                      <p className="heading-display text-3xl text-gold-dark mb-3">{stat.value}</p>
                      <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-stone-dark">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why it matters */}
              <div className="mt-16 mb-16 p-10 bg-forest text-warm-white">
                <h3 className="heading-editorial text-2xl mb-6">Why It Matters</h3>
                <p className="text-warm-white/70 leading-relaxed mb-8">
                  The DRC holds about 80 million hectares of arable land — among the largest potentials in Africa — yet less than ten
                  percent is cultivated, and around 80 percent of the country&apos;s domestic food needs are met by imports. The Kasai
                  province offers fertile soils and two harvests a year. This is the gap the Mweka Agri-Project is built to fill.
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {impactStats.map((stat) => (
                    <div key={stat.label}>
                      <p className="heading-display text-3xl text-gold mb-2">{stat.value}</p>
                      <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-warm-white/60">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Crops & Innovation */}
              <div className="mt-16 mb-16">
                <h3 className="heading-editorial text-2xl text-charcoal mb-4">Crops & Innovation</h3>
                <div className="line-separator mb-8" />
                <p className="text-stone-dark leading-relaxed mb-8">
                  The project grows six crops selected for food security and market demand. Cultivation is designed around modern,
                  mechanised techniques — drones for crop surveillance and precision spraying, GIS for precision farming and crop
                  forecasting, and IoT sensors for real-time field monitoring — alongside enhanced seeds and regenerative soil management.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {crops.map((crop) => (
                    <div key={crop.name} className="p-6 border border-border">
                      <h4 className="heading-editorial text-lg text-charcoal mb-2">{crop.name}</h4>
                      <p className="text-stone-dark text-sm leading-relaxed">{crop.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Processing & Markets */}
              <div className="mt-16 mb-16">
                <h3 className="heading-editorial text-2xl text-charcoal mb-4">Processing & Markets</h3>
                <div className="line-separator mb-8" />
                <p className="text-stone-dark leading-relaxed mb-8">
                  Beyond primary production, the project is designed to process and store grain on-site — including a maize-flour
                  milling facility, a grain-drying unit and silo storage of up to 30,000 tonnes. The concession&apos;s position on the
                  Ilebo–Lubumbashi railway, linked by river and road to Kinshasa, places production close to the markets it serves.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { title: "Kasai Province", note: "Provincial demand for maize meal is estimated at 540–840 tonnes per day against large production deficits across maize, cassava and groundnuts." },
                    { title: "Kinshasa", note: "A market of roughly 17 million people, served via the Kasai and Congo river waterways through Ilebo." },
                    { title: "Grand Kasai", note: "The wider Kasai region adds some 14 million people, with soybean also serving animal feed and humanitarian food blends." },
                  ].map((m) => (
                    <div key={m.title} className="p-6 border border-border">
                      <h4 className="heading-editorial text-lg text-charcoal mb-2">{m.title}</h4>
                      <p className="text-stone-dark text-sm leading-relaxed">{m.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community */}
              <div className="mt-16 mb-16">
                <h3 className="heading-editorial text-2xl text-charcoal mb-4">Community & Partnership</h3>
                <div className="line-separator mb-8" />
                <div className="space-y-5 text-stone-dark leading-relaxed">
                  <p>
                    Employment and training sit at the heart of the project. Terrakili works with a model of cooperative farming in which
                    experienced commercial farmers transfer skills to local producers, who gain modern techniques, improved seeds and a
                    reliable market for their harvest.
                  </p>
                  <p>
                    The project supports established local institutions such as INERA (the National Institute for Agronomic Study &amp;
                    Research) at Bena-Longo — a research and extension station active since colonial times, located just 14–20 km from the
                    Ndambo focus area — alongside CAPSA, which produces and distributes improved seeds and coaching to farmers. Surrounding
                    technical schools (ITV and ITA) provide an agricultural and veterinary skills base the project intends to grow.
                  </p>
                  <p>
                    Key commitments include creating more than 150 permanent and 500+ casual jobs, supporting smallholder farmers with
                    training and a market for their produce, and contributing to community infrastructure such as a school, health
                    facilities, water and electricity access.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src="/images/mweka-field.jpg"
                      alt="Agricultural field at the Mweka Agri-Project"
                      fill
                      sizes="(min-width: 1024px) 400px, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src="/images/mweka-site-2.jpg"
                      alt="Landscape of the Mweka Agri-Project concession"
                      fill
                      sizes="(min-width: 1024px) 400px, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Site gallery */}
              <div className="mt-16 mb-16">
                <h3 className="heading-editorial text-2xl text-charcoal mb-4">From the Site</h3>
                <div className="line-separator mb-8" />
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {["mweka-site-3", "mweka-site-4", "mweka-site-5", "mweka-site-6", "mweka-site-7", "mweka-site-8"].map((img) => (
                    <div key={img} className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={`/images/${img}.jpg`}
                        alt="Mweka Agri-Project site"
                        fill
                        sizes="(min-width: 1024px) 25vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Team & Governance */}
              <div className="mt-16 mb-16">
                <h3 className="heading-editorial text-2xl text-charcoal mb-4">Team & Governance</h3>
                <div className="line-separator mb-8" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-6 border border-border">
                    <h4 className="heading-editorial text-lg text-charcoal mb-2">Founders</h4>
                    <p className="text-stone-dark text-sm leading-relaxed">
                      Serge Ngandu and Franck Nyimilongo Pieme bring decades of combined experience in agriculture, agribusiness
                      and business management in Southern Africa.
                    </p>
                  </div>
                  <div className="p-6 border border-border">
                    <h4 className="heading-editorial text-lg text-charcoal mb-2">Management</h4>
                    <p className="text-stone-dark text-sm leading-relaxed">
                      Terrakili operates with a professional management structure covering Finance, Operations, Commercial &amp;
                      Marketing, Human Resources, Logistics, Maintenance, Production, Distribution and Legal affairs.
                    </p>
                  </div>
                  <div className="p-6 border border-border">
                    <h4 className="heading-editorial text-lg text-charcoal mb-2">Farming Model</h4>
                    <p className="text-stone-dark text-sm leading-relaxed">
                      Production runs on a cooperative model in which experienced commercial farmers transfer techniques to a
                      Congolese farmers&apos; co-operative through hands-on training and skills development.
                    </p>
                  </div>
                </div>
              </div>

              {/* Logistics */}
              <div className="mt-16 mb-16">
                <h3 className="heading-editorial text-2xl text-charcoal mb-4">Location & Access</h3>
                <div className="line-separator mb-8" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src="/images/mweka-bloc-1.jpg"
                      alt="Ndambo Bloc 1 — demarcation map"
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src="/images/mweka-bloc-2.jpg"
                      alt="Ndambo Bloc 2 — demarcation map"
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src="/images/mweka-inema-map.jpg"
                      alt="Inema blocks A and B — demarcation map"
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src="/images/mweka-bloc-b-satellite.jpg"
                      alt="Satellite view of the concession area"
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {logistics.map((item) => (
                    <div key={item.route} className="p-6 border border-border">
                      <h4 className="heading-editorial text-lg text-charcoal mb-2">{item.route}</h4>
                      <p className="text-stone-dark text-sm leading-relaxed">{item.detail}</p>
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