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
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-ivory-100 text-charcoal-900 flex flex-col">
      <a href="#main-content" className="skip-link visually-hidden">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 flex flex-col">
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
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
