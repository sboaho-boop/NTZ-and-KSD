import type { Metadata } from "next";
import Image from "next/image";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Meet the leadership of NTZ SPRL, KSD SARL and Terrakili SARL.",
};

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default async function LeadershipPage() {
  let leaders = [];
  try {
    leaders = await db.leadership.findMany();
  } catch {
    leaders = [
      {
        id: "1",
        name: "Franck Nyimilongo Pieme",
        slug: "frank-nyimilongo-pieme",
        position: "Associé Gérant — NTZ SPRL\nDirecteur Général — KSD SARL\nCo-Founder — Terrakili SARL",
        biography: "Franck Nyimilongo Pieme is a business executive based in the Democratic Republic of Congo, providing leadership across NTZ SPRL and KSD SARL.\n\nHe is also a founder of Terrakili SARL, the company behind the Mweka Agri-Project, a commercial crop farming initiative in the Kasai province. Together with his co-founders, he brings over 50 years of combined experience in agriculture, agri-business and business management across Southern Africa, and is committed to strengthening food security in the DRC.\n\nHis approach combines a deep understanding of the Congolese business environment with strategic thinking and a commitment to creating lasting value.",
        photo: "/images/leadership-franck.jpg",
      },
      {
        id: "2",
        name: "Serge Ngandu",
        slug: "serge-ngandu",
        position: "Co-Founder — Terrakili SARL",
        biography: "Serge Ngandu is a Congolese businessman and one of the founders and shareholders of Terrakili SARL, the project owner and sponsor of the Mweka Agri-Project.\n\nTogether with his co-founders, he brings over 50 years of combined experience in agriculture, agri-business and business management in Southern Africa. He is passionate about developing a crop farming operation that contributes to food security in the Democratic Republic of Congo.\n\nThe initiative has received the blessing of local authorities, who made land available to Terrakili for the commercial farming development in the Kasai province.",
        photo: "/images/leadership-serge.jpg",
      },
    ];
  }

  return (
    <>
      <section className="py-24 lg:py-32 bg-charcoal-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-gold mb-6">Leadership</p>
          <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl text-warm-white mb-6">Leadership</h1>
          <div className="line-separator" />
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {leaders.map((leader) => (
            <div key={leader.id} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <div className="relative aspect-[3/4] bg-gradient-to-br from-charcoal to-charcoal-light flex items-center justify-center overflow-hidden">
                {leader.photo ? (
                  <Image
                    src={leader.photo}
                    alt={leader.name}
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <span className="heading-display text-7xl text-gold/50 select-none">{initials(leader.name)}</span>
                )}
                <div className="absolute -top-6 -right-6 w-full h-full border border-gold/10" />
              </div>
              <div className="lg:pt-12">
                <h2 className="heading-editorial text-4xl md:text-5xl text-charcoal mb-4">{leader.name}</h2>
                <div className="line-separator mb-8" />
                <div className="space-y-1 mb-10">
                  {leader.position.split("\n").map((pos: string, i: number) => (
                    <p key={i} className="text-stone-dark font-medium text-lg">{pos}</p>
                  ))}
                </div>
                <div className="space-y-5 text-stone-dark leading-relaxed">
                  {leader.biography.split("\n\n").map((para: string, i: number) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
