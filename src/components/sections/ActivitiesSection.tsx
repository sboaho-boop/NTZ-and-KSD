import { db } from "@/lib/db";

export default async function ActivitiesSection() {
  let activities = [];
  try {
    activities = await db.activity.findMany({
      orderBy: { order: "asc" },
      take: 4,
    });
  } catch {
    // Fallback if db not ready
    activities = [
      { id: "1", title: "Natural Resources", description: "We identify and develop opportunities within the natural resources sector, working with partners to unlock value from the Democratic Republic of Congo's significant mineral wealth.", slug: "natural-resources" },
      { id: "2", title: "Trading & Commerce", description: "Our trading operations connect Congolese products and resources with regional and international markets, building reliable supply chains and commercial relationships.", slug: "trading-commerce" },
      { id: "3", title: "Investment & Development", description: "We pursue investment opportunities that contribute to economic development in the DRC, focusing on sustainable projects with long-term commercial viability.", slug: "investment-development" },
      { id: "4", title: "Strategic Partnerships", description: "We develop partnerships with local and international businesses, institutions and stakeholders to create mutually beneficial commercial opportunities.", slug: "strategic-partnerships" },
      { id: "5", title: "Agriculture & Agribusiness", description: "Through Terrakili SARL, we are developing the Mweka Agri-Project — a commercial crop farming operation in the Kasai province growing maize, cassava, soybeans, beans, banana and cereals. Using modern machinery, drones, GIS and IoT, it combines sustainable production with job creation and training for local farmers.", slug: "agriculture-agribusiness" },
    ];
  }

  return (
    <section className="py-24 lg:py-32 bg-warm-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="mb-20">
          <h2 className="heading-editorial text-4xl md:text-5xl lg:text-6xl text-charcoal mb-4">
            What We Do
          </h2>
          <div className="line-separator mb-6" />
          <p className="text-stone-dark text-lg max-w-2xl leading-relaxed">
            Our activities are shaped by opportunities within the markets in
            which we operate, with a focus on responsible business development
            and long-term commercial relationships.
          </p>
        </div>

        <div className="space-y-0">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className="group grid grid-cols-1 lg:grid-cols-[80px_1fr] gap-6 lg:gap-12 py-10 border-t border-border hover:bg-warm-cream/50 transition-colors duration-500"
            >
              <span className="font-serif text-5xl font-light text-gold/40">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="max-w-2xl">
                <h3 className="heading-editorial text-2xl lg:text-3xl text-charcoal mb-4 group-hover:text-gold-dark transition-colors duration-300">
                  {activity.title}
                </h3>
                <p className="text-stone-dark leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}
