import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/shared/HeroSection";
import ModelsSection from "@/components/shared/ModelsSection";
import FeaturesSection from "@/components/shared/FeaturesSection";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ModelsSection />
      <FeaturesSection />
      <Footer />
    </main>
  );
}