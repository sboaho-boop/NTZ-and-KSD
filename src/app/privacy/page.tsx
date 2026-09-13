import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for NTZ SPRL and KSD SARL.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="py-24 lg:py-32 bg-charcoal-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h1 className="heading-display text-4xl md:text-5xl text-warm-white">Privacy Policy</h1>
          <div className="line-separator mt-6" />
        </div>
      </section>
      <section className="py-16 lg:py-24 bg-warm-white">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          <div className="space-y-6 text-stone-dark leading-relaxed">
            <p className="text-sm text-stone">Last updated: January 2026</p>
            <h2 className="heading-editorial text-2xl text-charcoal">1. Introduction</h2>
            <p>NTZ SPRL and KSD SARL (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use and protect information when you visit our website.</p>
            <h2 className="heading-editorial text-2xl text-charcoal">2. Information We Collect</h2>
            <p>We may collect personal information that you voluntarily provide when contacting us, including your name, email address, phone number, company name and any information contained in your message.</p>
            <h2 className="heading-editorial text-2xl text-charcoal">3. How We Use Your Information</h2>
            <p>We use the information we collect to respond to your enquiries, communicate with you about business opportunities and maintain records of our correspondence.</p>
            <h2 className="heading-editorial text-2xl text-charcoal">4. Data Protection</h2>
            <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is completely secure.</p>
            <h2 className="heading-editorial text-2xl text-charcoal">5. Contact Us</h2>
            <p>If you have any questions about this privacy policy, please contact us at <a href="mailto:fnyimilongo@yahoo.fr" className="text-gold hover:text-gold-dark transition-colors">fnyimilongo@yahoo.fr</a>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
