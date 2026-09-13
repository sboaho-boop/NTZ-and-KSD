import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for the NTZ SPRL and KSD SARL website.",
};

export default function TermsPage() {
  return (
    <>
      <section className="py-24 lg:py-32 bg-charcoal-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h1 className="heading-display text-4xl md:text-5xl text-warm-white">Terms of Use</h1>
          <div className="line-separator mt-6" />
        </div>
      </section>
      <section className="py-16 lg:py-24 bg-warm-white">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          <div className="space-y-6 text-stone-dark leading-relaxed">
            <p className="text-sm text-stone">Last updated: January 2026</p>
            <h2 className="heading-editorial text-2xl text-charcoal">1. Acceptance of Terms</h2>
            <p>By accessing and using this website, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use this website.</p>
            <h2 className="heading-editorial text-2xl text-charcoal">2. Use of Website</h2>
            <p>This website is intended to provide general information about NTZ SPRL and KSD SARL. The content on this website is for informational purposes only and does not constitute an offer or commitment.</p>
            <h2 className="heading-editorial text-2xl text-charcoal">3. Intellectual Property</h2>
            <p>All content on this website, including text, graphics, logos and design elements, is the property of NTZ SPRL and KSD SARL and is protected by applicable intellectual property laws.</p>
            <h2 className="heading-editorial text-2xl text-charcoal">4. Limitation of Liability</h2>
            <p>We strive to ensure that the information on this website is accurate and up-to-date. However, we make no warranties or representations about the accuracy or completeness of the content.</p>
            <h2 className="heading-editorial text-2xl text-charcoal">5. Contact</h2>
            <p>For any questions regarding these terms, please contact us at <a href="mailto:fnyimilongo@yahoo.fr" className="text-gold hover:text-gold-dark transition-colors">fnyimilongo@yahoo.fr</a>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
