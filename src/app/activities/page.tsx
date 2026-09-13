import type { Metadata } from "next";
import Image from "next/image";
import { db } from "@/lib/db";
import { activityImage } from "@/lib/images";

export const metadata: Metadata = {
  title: "Activities",
  description: "Our activities are shaped by opportunities within the markets in which we operate, with a focus on responsible business development.",
};

const fallbackActivities = [
  { id: "1", title: "Natural Resources", description: "We identify and develop opportunities within the natural resources sector, working with partners to unlock value from the Democratic Republic of Congo's significant mineral wealth.", slug: "natural-resources" },
  { id: "2", title: "Trading & Commerce", description: "Our trading operations connect Congolese products and resources with regional and international markets, building reliable supply chains and commercial relationships.", slug: "trading-commerce" },
  { id: "3", title: "Investment & Development", description: "We pursue investment opportunities that contribute to economic development in the DRC, focusing on sustainable projects with long-term commercial viability.", slug: "investment-development" },
  { id: "4", title: "Strategic Partnerships", description: "We develop partnerships with local and international businesses, institutions and stakeholders to create mutually beneficial commercial opportunities.", slug: "strategic-partnerships" },
];

export default async function ActivitiesPage() {
  let activities = fallbackActivities;
  try {
    const dbActivities = await db.activity.findMany({ orderBy: { order: "asc" } });
    if (dbActivities.length > 0) activities = dbActivities;
  } catch {}

  return (
    <>
      <section className="py-24 lg:py-32 bg-charcoal-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-gold mb-6">Activities</p>
          <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl text-warm-white mb-6">What We Do</h1>
          <div className="line-separator mb-8" />
          <p className="text-xl text-warm-white/60 max-w-2xl">
            Our activities are shaped by opportunities within the markets in which we operate.
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
          <div className="space-y-0">
            {activities.map((activity, index) => (
              <div key={activity.id} className="py-12 border-t border-border group">
                <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 md:gap-12 items-center">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={activityImage(activity)}
                      alt={activity.title}
                      fill
                      sizes="(min-width: 768px) 300px, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex items-start gap-8">
                    <span className="font-serif text-5xl lg:text-6xl font-light text-gold/30 shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="heading-editorial text-2xl md:text-3xl text-charcoal mb-4 group-hover:text-gold-dark transition-colors duration-300">
                        {activity.title}
                      </h2>
                      <p className="text-stone-dark leading-relaxed text-lg">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </section>
    </>
  );
}
