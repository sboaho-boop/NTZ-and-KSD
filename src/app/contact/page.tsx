"use client";

import { useState, FormEvent } from "react";

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormState("success");
        setFormData({ name: "", company: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  return (
    <>
      <section className="py-24 lg:py-32 bg-charcoal-dark">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-gold mb-6">Contact</p>
          <h1 className="heading-display text-5xl md:text-6xl lg:text-7xl text-warm-white mb-6">Let&apos;s Discuss Business</h1>
          <div className="line-separator mb-8" />
          <p className="text-xl text-warm-white/60 max-w-2xl">
            Whether you are looking to establish a partnership, explore an opportunity or contact our management team, we would be pleased to hear from you.
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-warm-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-16">
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-4">NTZ SPRL</p>
                  <p className="text-stone-dark leading-relaxed">
                    Avenue Katanga N°02<br />Appartement A1<br />Kinshasa-Gombe<br />Democratic Republic of Congo
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-4">KSD SARL</p>
                  <p className="text-stone-dark leading-relaxed">
                    Kinshasa-Gombe<br />Democratic Republic of Congo
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-4">Email</p>
                  <div className="space-y-1 text-stone-dark">
                    <p><a href="mailto:fnyimilongo@yahoo.fr" className="hover:text-gold transition-colors">fnyimilongo@yahoo.fr</a></p>
                    <p><a href="mailto:fpnyimilongo@gmail.com" className="hover:text-gold transition-colors">fpnyimilongo@gmail.com</a></p>
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-4">Telephone</p>
                  <p className="text-stone-dark text-sm">Contact us via email for telephone details.</p>
                </div>
              </div>

              <div className="border border-border overflow-hidden">
                <div className="aspect-[16/9] bg-gradient-to-br from-warm-cream to-warm-gray flex items-center justify-center">
                  <div className="text-center text-stone-light">
                    <p className="text-sm tracking-widest uppercase mb-2">Google Maps</p>
                    <p className="text-xs">Kinshasa-Gombe, DRC</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="p-8 lg:p-10 border border-border bg-warm-cream/50">
                <h2 className="heading-editorial text-2xl text-charcoal mb-8">Send an Enquiry</h2>
                {formState === "success" ? (
                  <div className="py-12 text-center">
                    <div className="w-12 h-px bg-gold mx-auto mb-6" />
                    <p className="text-lg text-charcoal font-medium mb-2">Thank you.</p>
                    <p className="text-stone-dark">Your enquiry has been received. Our team will get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-[11px] font-medium tracking-[0.15em] uppercase text-stone-dark mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-border bg-white text-charcoal text-sm outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium tracking-[0.15em] uppercase text-stone-dark mb-2">Company</label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-4 py-3 border border-border bg-white text-charcoal text-sm outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-medium tracking-[0.15em] uppercase text-stone-dark mb-2">Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 border border-border bg-white text-charcoal text-sm outline-none focus:border-gold transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium tracking-[0.15em] uppercase text-stone-dark mb-2">Telephone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 border border-border bg-white text-charcoal text-sm outline-none focus:border-gold transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium tracking-[0.15em] uppercase text-stone-dark mb-2">Subject *</label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 border border-border bg-white text-charcoal text-sm outline-none focus:border-gold transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium tracking-[0.15em] uppercase text-stone-dark mb-2">Message *</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 border border-border bg-white text-charcoal text-sm outline-none focus:border-gold transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="w-full px-8 py-4 bg-charcoal text-warm-white text-[13px] font-semibold tracking-widest uppercase hover:bg-charcoal-light disabled:opacity-50 transition-colors duration-300"
                    >
                      {formState === "submitting" ? "Sending..." : "Send Enquiry"}
                    </button>
                    {formState === "error" && (
                      <p className="text-sm text-red-600 mt-2">Something went wrong. Please try again.</p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
