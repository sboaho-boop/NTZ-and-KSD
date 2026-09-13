import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-charcoal-dark text-warm-white/70">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-baseline gap-1.5 mb-6">
              <span className="font-serif text-2xl font-semibold text-warm-white">
                NTZ
              </span>
              <span className="w-5 h-px bg-gold inline-block mb-1" />
              <span className="font-serif text-lg font-medium text-warm-white/50">
                KSD
              </span>
            </div>
            <p className="text-sm leading-relaxed text-warm-white/50 max-w-xs">
              Building businesses. Creating value in the Democratic Republic of
              Congo and beyond.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-warm-white/50 hover:text-warm-white transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Companies */}
          <div>
            <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-6">
              Our Companies
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/companies/ntz-sprl"
                  className="text-sm text-warm-white/50 hover:text-warm-white transition-colors duration-300"
                >
                  NTZ SPRL
                </Link>
              </li>
              <li>
                <Link
                  href="/companies/ksd-sarl"
                  className="text-sm text-warm-white/50 hover:text-warm-white transition-colors duration-300"
                >
                  KSD SARL — Kasai Sud Diamant
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-6">
              Contact
            </h4>
            <div className="space-y-4 text-sm text-warm-white/50">
              <p>
                Avenue Katanga N°02
                <br />
                Appartement A1
                <br />
                Kinshasa-Gombe
                <br />
                Democratic Republic of Congo
              </p>
              <p>
                <a
                  href="mailto:fnyimilongo@yahoo.fr"
                  className="hover:text-warm-white transition-colors"
                >
                  fnyimilongo@yahoo.fr
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-warm-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-warm-white/40">
            &copy; {new Date().getFullYear()} NTZ SPRL &amp; KSD SARL. All Rights
            Reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-warm-white/40">
            <Link
              href="/privacy"
              className="hover:text-warm-white/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-warm-white/60 transition-colors"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
