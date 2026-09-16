import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default async function LeadershipSection() {
  let leaders = [];
  try {
    leaders = await db.leadership.findMany({ take: 1 });
  } catch {
    leaders = [
      {
        id: "1",
        name: "Franck Nyimilongo Pieme",
        slug: "frank-nyimilongo-pieme",
        position: "Associé Gérant — NTZ SPRL\nDirecteur Général — KSD SARL\nCo-Founder — Terrakili SARL",
        biography: "Franck Nyimilongo Pieme is a business executive based in the Democratic Republic of Congo, providing leadership across NTZ SPRL, KSD SARL and Terrakili SARL. He is co-founder of the Mweka Agri-Project.",
        photo: "/images/leadership-franck.jpg",
      },
    ];
  }

  const leader = leaders[0];

  return (
    <section className="py-24 lg:py-32 bg-warm-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Portrait */}
          <div className="order-2 lg:order-1">
            <div className="relative aspect-[3/4] bg-gradient-to-br from-charcoal to-charcoal-light flex items-center justify-center overflow-hidden">
              {leader.photo ? (
                <Image
                  src={leader.photo}
                  alt={leader.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <span className="heading-display text-7xl text-gold/50 select-none">{initials(leader.name)}</span>
              )}
              <div className="absolute -top-6 -right-6 w-full h-full border border-gold/10" />
            </div>
          </div>

          {/* Info */}
          <div className="order-1 lg:order-2">
            <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-6">
              Leadership
            </p>
            <h2 className="heading-editorial text-4xl md:text-5xl text-charcoal mb-6">
              {leader.name}
            </h2>
            <div className="line-separator mb-6" />
            <div className="space-y-1 mb-8">
              {leader.position.split("\n").map((pos: string, i: number) => (
                <p key={i} className="text-stone-dark font-medium">
                  {pos}
                </p>
              ))}
            </div>
            <p className="text-stone-dark leading-relaxed mb-10">
              {leader.biography}
            </p>
            <Link
              href="/leadership"
              className="inline-flex items-center gap-2 text-[13px] font-semibold tracking-widest uppercase text-charcoal hover:text-gold transition-colors duration-300 group"
            >
              Read Profile
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
