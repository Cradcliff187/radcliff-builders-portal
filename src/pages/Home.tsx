import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
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
        title="ICRA-Certified Healthcare & Commercial Renovations | Cincinnati, Dayton, Lexington | RCG"
        description="ICRA-certified healthcare renovations and commercial buildouts serving Cincinnati, Dayton, Lexington, and Northern Kentucky. Specializing in $25K-$500K projects. OSHA 30 certified. Request a free estimate."
      />
      <Header />
      <Hero />
      <TrustBadges />
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
