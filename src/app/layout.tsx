import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zara Tours & Travels | Your Journey, Our Priority",
  description: "Reliable travel services and comfortable vehicles for sightseeing, family trips, group tours and outstation journeys in Ooty, Tamil Nadu.",
  keywords: ["Ooty travel", "Zara Tours & Travels", "taxi in ooty", "ooty sightseeing", "cab booking ooty"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-900 text-slate-50 antialiased`}>
        {children}
      </body>
    </html>
  );
}
