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

const Home = () => {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <StatsBar />
      <ProblemSolution />
      <FeaturedProjects />
      <Industries />
      <FourPillars />
      <Process />
      <Certifications />
      <Testimonials />
      <PartnerLogos />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Home;
