import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FourPillars from "@/components/FourPillars";
import FeaturedProjects from "@/components/FeaturedProjects";
import Industries from "@/components/Industries";
import Certifications from "@/components/Certifications";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FourPillars />
      <FeaturedProjects />
      <Industries />
      <Certifications />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Home;
