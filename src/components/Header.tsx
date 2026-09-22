"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-warm-white/95 backdrop-blur-md shadow-[0_1px_0_0_theme(colors.border)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-baseline gap-1.5 group">
              <span className="font-serif text-2xl font-semibold tracking-tight text-charcoal">
                NTZ
              </span>
              <span className="w-5 h-px bg-gold inline-block mb-1" />
              <span className="font-serif text-lg font-medium text-stone">
                KSD
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-7">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[13px] font-medium tracking-wide uppercase text-stone-dark hover:text-charcoal transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="ml-4 px-6 py-2.5 bg-charcoal text-warm-white text-[13px] font-medium tracking-wide uppercase hover:bg-charcoal-light transition-colors duration-300"
              >
                Contact Us
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="xl:hidden p-2 text-charcoal"
              aria-label="Open menu"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-charcoal-dark">
          <div className="flex justify-end p-6">
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-warm-white"
              aria-label="Close menu"
            >
              <X size={28} strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center gap-8 pt-16">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-serif text-3xl font-medium text-warm-white/80 hover:text-gold transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-8 py-3 border border-gold text-gold text-sm tracking-widest uppercase hover:bg-gold hover:text-charcoal-dark transition-all duration-300"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
