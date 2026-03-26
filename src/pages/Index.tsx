import Navbar from "@/components/Navbar";
import HeroSlideshow from "@/components/HeroSlideshow";
import ServicesPreview from "@/components/ServicesPreview";
import BookingSection from "@/components/BookingSection";
import TrainingSection from "@/components/TrainingSection";
import GallerySection from "@/components/GallerySection";
import SocialSection from "@/components/SocialSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Index() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSlideshow />
      <ServicesPreview />
      <BookingSection />
      <TrainingSection />
      <GallerySection />
      <SocialSection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
