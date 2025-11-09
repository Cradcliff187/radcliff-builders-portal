import { Hospital, Briefcase, ShoppingBag, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const industries = [
  {
    icon: Hospital,
    title: "Healthcare",
    description: "Hospitals, outpatient facilities, and medical offices where infection control and patient safety aren't optional—they're essential. We're ICRA and OSHA 30 certified because your patients depend on it.",
    ctaText: "Schedule a Healthcare Facility Assessment",
    ctaLink: "/contact?industry=Healthcare",
  },
  {
    icon: Briefcase,
    title: "Professional",
    description: "Law firms, corporate offices, and administrative facilities where business continuity matters. We work around your schedule so your team stays productive.",
    ctaText: "Plan Your Next Office Buildout",
    ctaLink: "/contact?industry=Professional",
  },
  {
    icon: ShoppingBag,
    title: "Retail",
    description: "Stores, restaurants, and customer-facing spaces where downtime means lost revenue. We deliver fast, efficient renovations that keep your doors open.",
    ctaText: "Request a Multi-Site Rollout Estimate",
    ctaLink: "/contact?industry=Retail",
  },
  {
    icon: Building2,
    title: "Commercial",
    description: "Office buildings, warehouses, and mixed-use developments that require flexible scheduling, code compliance, and zero surprises.",
    ctaText: "Start Your Commercial Project",
    ctaLink: "/contact?industry=Commercial",
  },
];

const Industries = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="mb-6 uppercase">Trusted in These Environments</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Where precision, compliance, and partnership matter most
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {industries.map((industry) => (
            <div
              key={industry.title}
              className="bg-card p-8 rounded-none hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-none bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <industry.icon className="w-8 h-8 text-secondary" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-3 uppercase text-2xl">{industry.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {industry.description}
                  </p>
                  <Button variant="outline" size="sm" asChild className="group">
                    <Link to={industry.ctaLink}>
                      {industry.ctaText}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
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
      </div>
    </section>
  );
};

export default Industries;
