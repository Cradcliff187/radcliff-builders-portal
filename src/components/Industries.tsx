import { Hospital, Briefcase, ShoppingBag, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import PageContainer from "@/components/PageContainer";

const industries = [
  {
    icon: Hospital,
    title: "Healthcare",
    description: "Specialized construction for hospitals, clinics, and medical offices where infection control and patient safety are non-negotiable. Our ICRA-certified teams deliver compliant, efficient renovations in fully operational environments.",
    ctaText: "Start Your Healthcare Project",
    ctaLink: "/contact?industry=Healthcare",
  },
  {
    icon: Briefcase,
    title: "Professional",
    description: "Law firms, corporate offices, and administrative spaces where business continuity matters. We work around your schedule to deliver precise, disruption-free upgrades that keep teams productive.",
    ctaText: "Plan Your Office Buildout",
    ctaLink: "/contact?industry=Professional",
  },
  {
    icon: ShoppingBag,
    title: "Retail & Multi-Site",
    description: "Stores, restaurants, banks, and customer-facing spaces where downtime means lost revenue. We deliver fast, consistent renovations across regional portfolios, keeping your doors open and your brand aligned.",
    ctaText: "Request a Multi-Site Estimate",
    ctaLink: "/contact?industry=Retail",
  },
  {
    icon: Building2,
    title: "Commercial",
    description: "Office buildings, mixed-use spaces, and operational environments requiring flexible scheduling, code compliance, and zero surprises. We deliver safe, predictable results for high-stakes commercial spaces.",
    ctaText: "Start Your Commercial Project",
    ctaLink: "/contact?industry=Commercial",
  },
];

const Industries = () => {
  return (
    <section className="py-24 bg-background">
      <PageContainer>
        <div className="text-center mb-16">
          <h2 className="mb-6 uppercase">Trusted in These Environments</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Where precision, compliance, and partnership matter most
          </p>
        </div>

        {/* Desktop: 2x2 Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {industries.map((industry) => (
            <Link
              key={industry.title}
              to={industry.ctaLink}
              className="bg-light-grey p-6 rounded-none hover:shadow-md transition-all duration-300 group block h-full flex flex-col"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <industry.icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="uppercase text-xl font-heading font-semibold break-words">{industry.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4 flex-grow">
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
                to={industry.ctaLink}
                className="bg-light-grey p-6 block hover:bg-light-grey/80 transition-colors"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0">
                    <industry.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="uppercase text-lg font-heading font-semibold break-words">{industry.title}</h3>
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

        {/* CTA Banner */}
        <div className="mt-16 bg-primary text-white p-12 rounded-none text-center">
          <h3 className="text-3xl font-heading font-bold uppercase mb-4 tracking-wide">
            Not Sure Which Service Fits Your Project?
          </h3>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            We'll help you find the right solution. Schedule a consultation to discuss your specific needs.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link to="/contact">
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </PageContainer>
    </section>
  );
};

export default Industries;
