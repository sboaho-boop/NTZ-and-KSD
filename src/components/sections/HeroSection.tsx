"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-drc.jpg"
        alt="Congolese landscape at dusk"
        fill
        sizes="100vw"
        className="object-cover"
        loading="eager"
        fetchPriority="high"
      />

      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal-dark/90 via-charcoal/70 to-earth-dark/80" />

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
        <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-gold mb-8 animate-fade-in-up">
          Kinshasa — Democratic Republic of Congo
        </p>

        <h1 className="heading-display text-5xl md:text-7xl lg:text-[5.5rem] text-warm-white mb-2 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          Building Businesses.
        </h1>
        <h1 className="heading-display text-5xl md:text-7xl lg:text-[5.5rem] text-gold mb-8 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Creating Value.
        </h1>

        <p className="text-lg md:text-xl text-warm-white/60 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          A Congolese business group pursuing strategic opportunities and building lasting commercial relationships.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <Link
            href="/companies"
            className="px-8 py-4 bg-gold text-charcoal-dark text-[13px] font-semibold tracking-widest uppercase hover:bg-gold-light transition-colors duration-300"
          >
            Explore Our Companies
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 border border-warm-white/30 text-warm-white text-[13px] font-medium tracking-widest uppercase hover:bg-warm-white/10 transition-all duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-warm-white/30" size={28} strokeWidth={1} />
      </div>
    </section>
  );
}
