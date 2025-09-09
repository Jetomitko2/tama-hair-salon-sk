import Navigation from "@/components/Navigation";
import HeroSlider from "@/components/HeroSlider";
import SalonInteriorSection from "@/components/SalonInteriorSection";
import StaffSection from "@/components/StaffSection";
import GallerySection from "@/components/GallerySection";
import ServicesSection from "@/components/ServicesSection";
import ProductsSection from "@/components/ProductsSection";
import ContactSection from "@/components/ContactSection";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Animate elements on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
        }
      });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navigation />
      <main>
        <HeroSlider />
        <SalonInteriorSection />
        <StaffSection />
        <GallerySection />
        <ServicesSection />
        <ProductsSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Index;
