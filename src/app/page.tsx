import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EnquirySection from "@/components/EnquirySection";
import AboutUs from "@/components/AboutUs";
import Fleet from "@/components/Fleet";
import Services from "@/components/Services";
import Destinations from "@/components/Destinations";
import OotySpecial from "@/components/OotySpecial";
import WhyChooseUs from "@/components/WhyChooseUs";
import ExperienceBanner from "@/components/ExperienceBanner";
import Gallery from "@/components/Gallery";
import TrustSection from "@/components/TrustSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-navy-900 text-white flex flex-col">
      <Navbar />
      <Hero />
      <EnquirySection />
      <AboutUs />
      <Fleet />
      <Services />
      <Destinations />
      <OotySpecial />
      <WhyChooseUs />
      <ExperienceBanner />
      <Gallery />
      <TrustSection />
      <Contact />
      <Footer />
    </main>
  );
}
