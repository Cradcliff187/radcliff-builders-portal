import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import ProblemSolution from "@/components/ProblemSolution";
import FeaturedProjects from "@/components/FeaturedProjects";
import Industries from "@/components/Industries";
import FourPillars from "@/components/FourPillars";
import Process from "@/components/Process";
import Certifications from "@/components/Certifications";
import Testimonials from "@/components/Testimonials";
import PartnerLogos from "@/components/PartnerLogos";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Home = () => {
  return (
    <main id="main-content" className="min-h-screen">
      <SEO
        title="Healthcare & Commercial Renovations | Radcliff Construction Group (RCG)"
        description="ICRA-certified healthcare renovations and commercial buildouts. Specializing in $25K-$500K projects across Greater Cincinnati, Dayton, Lexington, and Northern Kentucky. OSHA 30 certified, multi-site portfolio expertise."
      />
      <Header />
      <Hero />
      <StatsBar />
      <ProblemSolution />
      <FeaturedProjects />
      <Industries />
      <FourPillars />
      <Certifications />
      <Process />
      <Testimonials />
      <PartnerLogos />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Home;
