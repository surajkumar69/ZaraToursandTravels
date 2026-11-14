import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zara Tours & Travels | Luxury Ooty & Nilgiris Travel Experiences",
  description:
    "Reliable travel services and comfortable vehicles for sightseeing, family trips, group tours and outstation journeys in Ooty, Tamil Nadu.",
  keywords: [
    "Ooty travel",
    "Zara Tours & Travels",
    "taxi in ooty",
    "ooty sightseeing",
    "cab booking ooty",
    "Nilgiris tours",
    "Coonoor cab service",
  ],
  openGraph: {
    title: "Zara Tours & Travels | Your Journey, Our Priority",
    description:
      "Explore the beauty of Ooty and the Nilgiris with comfortable rides, trusted drivers and unforgettable travel experiences.",
    type: "website",
    locale: "en_IN",
    url: "https://www.zaratoursandtravels.in",
    siteName: "Zara Tours & Travels",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Zara Tours & Travels",
    description:
      "Reliable travel services and comfortable vehicles for sightseeing, family trips, group tours and outstation journeys in Ooty, Tamil Nadu.",
    url: "https://www.zaratoursandtravels.in",
    telephone: "+91-8523923843",
    email: "Dhanushjr279@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bharathi Nagar, Ketti",
      addressLocality: "Ooty",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
  };

  return (
    <html
      lang="en"
      className={`scroll-smooth ${cormorant.variable} ${jakarta.variable}`}
    >
      <body className="font-sans bg-ivory-100 text-charcoal-900 antialiased selection:bg-champagne-300 selection:text-forest-950">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
