import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTASection from "@/components/CTASection";
import { Card } from "@/components/ui/card";
import { CheckCircle, Building2, FileCheck, ClipboardList, Users, Wrench } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Building2,
      title: "Healthcare Renovations",
      description: "ICRA-certified renovations in occupied healthcare facilities with full infection control protocols, regulatory compliance, and minimal patient disruption.",
      features: [
        "ICRA and ROSS certified teams",
        "Infection control protocols",
        "Phased construction scheduling",
        "24/7 occupied facility support",
      ],
    },
    {
      icon: FileCheck,
      title: "Professional Facility Upgrades",
      description: "Strategic renovations in active professional environments with flexible scheduling to minimize disruption to staff, clients, and operations.",
      features: [
        "After-hours and weekend scheduling",
        "Phased project delivery",
        "Security and safety protocols",
        "Minimal business disruption",
      ],
    },
    {
      icon: Wrench,
      title: "Commercial Renovations",
      description: "Efficient tenant improvements and renovations that maintain business continuity while delivering on-time, on-budget results.",
      features: [
        "Flexible scheduling options",
        "Tenant coordination expertise",
        "Code compliance specialists",
        "Budget-conscious solutions",
      ],
    },
    {
      icon: ClipboardList,
      title: "Project Management",
      description: "Strategic planning and execution that ensures regulatory compliance, operational continuity, and exceptional results on every project.",
      features: [
        "Comprehensive project planning",
        "Regulatory compliance management",
        "Quality control systems",
        "Transparent communication",
      ],
    },
    {
      icon: Users,
      title: "Partnership Approach",
      description: "We don't just build—we partner with you throughout the entire process to ensure your vision becomes reality with minimal stress.",
      features: [
        "Dedicated project teams",
        "Proactive communication",
        "Collaborative problem-solving",
        "Long-term relationship focus",
      ],
    },
  ];

  const process = [
    {
      number: "01",
      title: "Discovery & Planning",
      description: "We begin by understanding your unique requirements, regulatory needs, and operational constraints to develop a comprehensive project plan.",
    },
    {
      number: "02",
      title: "Compliance Review",
      description: "Our team conducts thorough regulatory and code compliance reviews to ensure all certifications and approvals are in place before work begins.",
    },
    {
      number: "03",
      title: "Phased Execution",
      description: "Strategic phasing minimizes disruption to your operations while maintaining the highest standards of safety, quality, and regulatory compliance.",
    },
    {
      number: "04",
      title: "Quality Delivery",
      description: "We deliver your completed project on schedule and on budget, with comprehensive documentation and ongoing support as needed.",
    },
  ];

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-32 pb-20 bg-primary text-white">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h1 className="mb-6 uppercase">Our Services</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Specialized renovation services for healthcare, professional, and commercial environments requiring compliance expertise and minimal disruption.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="p-8 rounded-none hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-none bg-secondary/10 flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-secondary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-semibold uppercase mb-3">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="text-center mb-16">
            <h2 className="mb-6 uppercase">Our Process</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A proven methodology that delivers compliant, efficient results every time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step) => (
              <div key={step.number} className="text-center">
                <div className="text-6xl font-heading font-bold text-secondary/20 mb-4">{step.number}</div>
                <h3 className="text-xl font-heading font-semibold uppercase mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Highlight */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h2 className="mb-6 uppercase text-white">Certified Excellence</h2>
          <p className="text-white/90 text-lg max-w-3xl mx-auto leading-relaxed mb-12">
            Our ROSS and ICRA certifications ensure your project meets the highest standards for safety, compliance, and quality in sensitive environments.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            <div className="text-center">
              <p className="text-4xl font-heading font-bold text-secondary mb-2">ROSS</p>
              <p className="text-white/80 text-sm">Certified Construction</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-heading font-bold text-secondary mb-2">ICRA</p>
              <p className="text-white/80 text-sm">Infection Control</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-heading font-bold text-secondary mb-2">Licensed</p>
              <p className="text-white/80 text-sm">Fully Bonded & Insured</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  );
};

export default Services;
