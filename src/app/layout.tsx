import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NTZ SPRL & KSD SARL | Business & Strategic Opportunities in DRC",
    template: "%s | NTZ SPRL & KSD SARL",
  },
  description:
    "A Congolese business group pursuing strategic opportunities and building lasting commercial relationships in the Democratic Republic of Congo.",
  keywords: ["NTZ SPRL", "KSD SARL", "Kasai Sud Diamant", "DRC", "Kinshasa", "business", "natural resources", "trading"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "NTZ SPRL & KSD SARL",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-warm-white text-charcoal">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
