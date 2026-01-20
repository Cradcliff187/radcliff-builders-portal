import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { Hospital, Briefcase, ShoppingBag, Building2, ArrowRight } from "lucide-react";

const industries = [
  {
    icon: Hospital,
    title: "Healthcare",
    description: "Hospitals, clinics, and medical offices where infection control isn't optional—it's life or death. Our ICRA-certified crews have completed renovations in fully operational ORs, ICUs, and patient care areas with zero infection control incidents. We handle the compliance so you can focus on patient care.",
    ctaText: "Discuss Your Healthcare Project",
    routingKey: "Healthcare",
  },
  {
    icon: Briefcase,
    title: "Professional",
    description: "Law firms, corporate headquarters, and professional offices where your reputation is on the line. We've delivered lobby renovations, conference room buildouts, and full floor remodels—all while your teams stayed productive. After-hours and weekend scheduling available to minimize disruption.",
    ctaText: "Plan Your Office Renovation",
    routingKey: "Professional",
  },
  {
    icon: ShoppingBag,
    title: "Retail & Multi-Site",
    description: "Stores, restaurants, and customer-facing spaces where every closed day costs you revenue. We've executed multi-site rollouts for regional and national brands—delivering consistent results across 10+ locations with minimal store closures. Your brand standards, our execution.",
    ctaText: "Get a Multi-Site Estimate",
    routingKey: "Retail",
  },
  {
    icon: Building2,
    title: "Commercial",
    description: "Tenant-occupied office buildings and mixed-use properties where keeping the building operational is non-negotiable. We've completed lobby modernizations, common area upgrades, and tenant buildouts—all while maintaining 100% occupancy. Phased construction, clear communication, zero surprises.",
    ctaText: "Start Your Commercial Project",
    routingKey: "Commercial",
  },
];

const IndustriesPage = () => {
  return (
    <main id="main-content" className="min-h-screen">
      <SEO
        title="Industries We Serve | Healthcare, Retail, Commercial Construction | Cincinnati Region | RCG"
        description="ICRA-certified healthcare construction, professional office renovations, retail and multi-site buildouts, commercial construction. Serving Greater Cincinnati, Dayton, Lexington, and Northern Kentucky."
      />
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-20 pb-12 md:pt-24 md:pb-16 bg-primary text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-6 uppercase leading-tight tracking-wider">Industries We Serve</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Specialized expertise across diverse construction sectors with a commitment to excellence
          </p>
        </div>
      </section>

      {/* Industries Detail */}
      <section className="py-24 bg-background">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-20">
          {/* Desktop: 2x2 Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-8">
            {industries.map((industry) => (
              <Link
                key={industry.title}
                to={`/contact?industry=${industry.routingKey}`}
                className="bg-light-grey p-8 rounded-none hover:shadow-md transition-all duration-300 group block h-full flex flex-col"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <industry.icon className="w-10 h-10 text-secondary" />
                  </div>
                  <h2 className="uppercase text-2xl font-heading font-semibold break-words">{industry.title}</h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6 flex-grow">
                  {industry.description}
                </p>
                <div className="mt-auto">
                  <span className="text-sm font-heading font-semibold uppercase text-secondary">
                    {industry.ctaText}
                  </span>
                  <ArrowRight className="ml-2 w-4 h-4 inline text-secondary group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile: Stacked Vertical */}
          <div className="flex flex-col gap-0 md:hidden">
            {industries.map((industry, index) => (
              <div key={industry.title}>
                <Link
                  to={`/contact?industry=${industry.routingKey}`}
                  className="bg-light-grey p-6 block hover:bg-light-grey/80 transition-colors"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0">
                      <industry.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <h2 className="uppercase text-xl font-heading font-semibold break-words">{industry.title}</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
                    {industry.description}
                  </p>
                  <div>
                    <span className="text-xs font-heading font-semibold uppercase text-secondary">
                      {industry.ctaText}
                    </span>
                    <ArrowRight className="ml-2 w-3 h-3 inline text-secondary" />
                  </div>
                </Link>
                {index < industries.length - 1 && (
                  <div className="h-px bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
};

export default IndustriesPage;
